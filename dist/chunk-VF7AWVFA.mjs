import { IPTracker } from './chunk-J367NFGR.mjs';
import { EventEmitter } from 'stream';

// src/pkt-buffer.ts
var PacketBuffer = class {
  buffer;
  position;
  out;
  constructor() {
    this.buffer = null;
    this.position = 0;
    this.out = [];
  }
  write(data) {
    while (data.length > 0) {
      if (this.buffer) {
        if (this.buffer.length < 2) {
          const old = this.buffer[0];
          const size2 = (data[0] << 8) + old;
          this.buffer = Buffer.alloc(size2);
          this.buffer[0] = old;
          this.position = 1;
        }
        const remaining = Math.min(data.length, this.buffer.length - this.position);
        data.copy(this.buffer, this.position, 0, remaining);
        this.position += remaining;
        if (this.position === this.buffer.length) {
          this.out.push(this.buffer);
          this.buffer = null;
          this.position = 0;
        }
        data = data.subarray(remaining);
        continue;
      }
      if (data.length < 2) {
        this.buffer = Buffer.from(data);
        this.position = data.length;
        break;
      }
      const size = data.readUInt16LE(0);
      if (size === 0) {
        this.buffer = null;
        return;
      }
      if (size > data.length) {
        this.buffer = Buffer.alloc(size);
        data.copy(this.buffer);
        this.position = data.length;
        break;
      }
      this.out.push(data.subarray(0, size));
      data = data.subarray(size);
    }
  }
  read() {
    return this.out.shift();
  }
};

// src/tcp_tracker.ts
var TCPTracker = class extends EventEmitter {
  sessions;
  listen_options;
  constructor(listen_options) {
    super();
    this.sessions = {};
    this.listen_options = listen_options;
    EventEmitter.call(this);
  }
  track_packet(buffer, ip, tcp) {
    let src = ip.info.srcaddr + ":" + tcp.info.srcport;
    let dst = ip.info.dstaddr + ":" + tcp.info.dstport;
    let key;
    if (src < dst) {
      key = src + "-" + dst;
    } else {
      key = dst + "-" + src;
    }
    let is_new = false;
    let session = this.sessions[key];
    if (!session) {
      if (!(tcp.info.flags & 8 /* psh */) && !(tcp.info.flags & 2 /* syn */))
        return;
      is_new = true;
      session = new TCPSession(this.listen_options);
      this.sessions[key] = session;
      session.on("end", () => {
        delete this.sessions[key];
        console.info(
          `[meter-core/tcp-tracker] - Remove session ${session?.src}->${session?.dst} (Total: ${Object.keys(this.sessions).length})`
        );
      });
    }
    session.track(buffer, ip, tcp);
    if (is_new) {
      this.emit("session", session);
    }
  }
};
var TCPSession = class extends EventEmitter {
  state;
  src;
  dst;
  send_seqno;
  // Current seq number flushed
  send_buffers;
  recv_seqno;
  // Current seq number flushed
  recv_buffers;
  listen_options;
  is_ignored;
  packetBuffer;
  send_ip_tracker;
  recv_ip_tracker;
  skip_socks5;
  in_handshake;
  constructor(listen_options) {
    super();
    this.listen_options = listen_options;
    this.state = "NONE";
    this.send_seqno = 0;
    this.send_buffers = [];
    this.recv_seqno = 0;
    this.recv_buffers = [];
    this.is_ignored = false;
    this.packetBuffer = new PacketBuffer();
    this.send_ip_tracker = new IPTracker();
    this.recv_ip_tracker = new IPTracker();
    this.send_ip_tracker.on("segment", this.handle_send_segment.bind(this));
    this.recv_ip_tracker.on("segment", this.handle_recv_segment.bind(this));
    this.skip_socks5 = 0;
    this.in_handshake = true;
    EventEmitter.call(this);
  }
  track(buffer, ip, tcp) {
    let src = ip.info.srcaddr + ":" + tcp.info.srcport;
    let dst = ip.info.dstaddr + ":" + tcp.info.dstport;
    if (this.state === "NONE") {
      const isSrcDeviceIp = isDeviceIp(ip.info.srcaddr, this.listen_options);
      const isDstDeviceIp = isDeviceIp(ip.info.dstaddr, this.listen_options);
      if (isSrcDeviceIp && this.listen_options.port === tcp.info.dstport) {
        this.src = src;
        this.dst = dst;
      } else if (this.listen_options.port === tcp.info.srcport && isDstDeviceIp) {
        this.src = dst;
        this.dst = src;
      } else if (!isSrcDeviceIp && !isDstDeviceIp) {
        if (this.listen_options.port === tcp.info.dstport) {
          this.src = src;
          this.dst = dst;
        } else if (this.listen_options.port === tcp.info.srcport) {
          this.src = dst;
          this.dst = src;
        } else {
          this.src = src;
          this.dst = dst;
          this.is_ignored = true;
        }
      } else {
        this.src = src;
        this.dst = dst;
        this.is_ignored = true;
      }
      this.state = "ESTAB";
    }
    if (tcp.info.flags & 4 /* rst */ || tcp.info.flags & 1 /* fin */) {
      this.ESTAB(buffer, ip, tcp);
      this.emit("end", this);
    } else {
      this.ESTAB(buffer, ip, tcp);
    }
  }
  ESTAB(buffer, ip, tcp) {
    if (this.is_ignored)
      return;
    let src = ip.info.srcaddr + ":" + tcp.info.srcport;
    if (src === this.src) {
      this.handle_recv_segment(buffer, ip, tcp);
    } else if (src === this.dst) {
      this.handle_send_segment(buffer, ip, tcp);
    } else {
      console.error("[meter-core/tcp_tracker] - non-matching packet in session: ip=" + ip + "tcp=" + tcp);
    }
  }
  flush_buffers(ackno, direction) {
    if (direction === "recv") {
      if (this.recv_seqno === 0) {
        this.recv_seqno = ackno;
      }
      const flush_payload = TCPSession.get_flush(this.recv_buffers, this.recv_seqno, ackno);
      if (!flush_payload) {
        return;
      }
      this.recv_seqno = ackno;
      if (this.in_handshake && flush_payload.length === 2 && flush_payload.equals(Buffer.from([5, 2])))
        this.skip_socks5 = 4;
      if (this.skip_socks5 > 0) {
        this.skip_socks5--;
        return;
      }
      this.in_handshake = false;
      this.packetBuffer.write(flush_payload);
      let pkt;
      while (pkt = this.packetBuffer.read()) {
        this.emit("payload_recv", pkt);
      }
    }
  }
  static get_flush(buffers, seqno, ackno) {
    const totalLen = ackno - seqno;
    if (totalLen <= 0)
      return null;
    let flush_payload = Buffer.alloc(totalLen);
    let flush_mask = Buffer.alloc(totalLen);
    const newBuffers = buffers.filter((segment) => {
      if (segment.seqno > ackno)
        return true;
      if (segment.seqno < seqno) {
        if (segment.seqno + segment.payload.length < seqno)
          return false;
        segment.payload = segment.payload.subarray(seqno - segment.seqno);
        segment.seqno = seqno;
      }
      const flush_offset = segment.seqno - seqno;
      const len_to_flush = Math.min(ackno - segment.seqno, segment.payload.length);
      segment.payload.copy(flush_payload, flush_offset, 0, len_to_flush);
      flush_mask.fill(1, flush_offset, flush_offset + len_to_flush);
      if (len_to_flush < segment.payload.length) {
        segment.payload = segment.payload.subarray(len_to_flush);
        segment.seqno += len_to_flush;
        return true;
      }
      return false;
    });
    if (flush_mask.includes(0)) {
      if (buffers.length >= 50) {
        console.warn(`[meter-core/tcp_tracker] - Dropped ${totalLen} bytes`);
        return Buffer.alloc(0);
      }
      return null;
    } else {
      buffers.length = 0;
      buffers.push(...newBuffers);
      return flush_payload;
    }
  }
  handle_recv_segment(packet, ip, tcp) {
    const tcpDataLength = ip.info.totallen - ip.hdrlen - tcp.hdrlen;
    let is_sack = false;
    try {
      is_sack = is_sack_in_header(packet, ip, tcp);
    } catch (e) {
      console.error(e);
      return;
    }
    if (tcpDataLength > 0) {
      this.send_buffers.push({
        seqno: tcp.info.seqno,
        payload: Buffer.from(packet.subarray(tcp.offset, tcp.offset + tcpDataLength))
      });
    }
    if (tcp.info.ackno && !is_sack) {
      this.flush_buffers(tcp.info.ackno ?? 0, "recv");
    }
  }
  handle_send_segment(packet, ip, tcp) {
    const tcpDataLength = ip.info.totallen - ip.hdrlen - tcp.hdrlen;
    let is_sack = false;
    try {
      is_sack = is_sack_in_header(packet, ip, tcp);
    } catch (e) {
      console.error(e);
      return;
    }
    if (tcpDataLength > 0) {
      this.recv_buffers.push({
        seqno: tcp.info.seqno,
        payload: Buffer.from(packet.subarray(tcp.offset, tcp.offset + tcpDataLength))
      });
    }
    if (tcp.info.ackno && !is_sack) {
      this.flush_buffers(tcp.info.ackno ?? 0, "send");
    }
  }
};
function is_sack_in_header(buffer, ip, tcp) {
  if (tcp.hdrlen == 20)
    return false;
  let options_offset = ip.offset + 20;
  const options_len = tcp.hdrlen - 20;
  const end_offset = options_offset + options_len;
  while (options_offset < end_offset) {
    switch (buffer[options_offset]) {
      case 0:
        options_offset = end_offset;
        break;
      case 1:
        options_offset += 1;
        break;
      case 2:
        options_offset += 4;
        break;
      case 3:
        options_offset += 3;
        break;
      case 4:
        options_offset += 2;
        break;
      case 5:
        return true;
      case 8:
        options_offset += 10;
        break;
      case 254:
      case 255:
        options_offset += buffer[options_offset + 1] ?? 1;
        break;
      default:
        throw new Error(
          `[meter-core/tcp-tracker] - Unknown TCPOption ${buffer[options_offset]}, packet is probably malformed, should drop.`
        );
    }
  }
  return false;
}
function IPnumber(IPaddress) {
  var ip = IPaddress.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (ip && ip.length === 5) {
    return (+ip[1] << 24) + (+ip[2] << 16) + (+ip[3] << 8) + +ip[4];
  }
  return null;
}
function isDeviceIp(ip, listen_options) {
  const testIp = IPnumber(ip), listen_ip = IPnumber(listen_options.ip), mask = IPnumber(listen_options.mask);
  if (!testIp || !listen_ip || !mask)
    return false;
  return (testIp & mask) === (listen_ip & mask);
}

export { TCPSession, TCPTracker };
