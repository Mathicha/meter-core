'use strict';

var lz4Napi = require('lz4-napi');
var oodle = require('oodle');
var snappyjs = require('snappyjs');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var oodle__default = /*#__PURE__*/_interopDefault(oodle);

// src/decompressor.ts
var Decompressor = class {
  oodle;
  xorTable;
  constructor(oodle_state, xorTable) {
    this.oodle = new oodle__default.default.Oodle(oodle_state);
    if (xorTable.length != 256)
      throw new Error("Invalid xorTable length");
    this.xorTable = xorTable;
  }
  decrypt(data, xorShift, compression, xor) {
    if (xor)
      this.xor(data, xorShift);
    let out;
    switch (compression) {
      case 0: {
        out = data;
        break;
      }
      case 1: {
        out = lz4Napi.uncompressSync(data);
        break;
      }
      case 2: {
        out = snappyjs.uncompress(data);
        break;
      }
      case 3: {
        if (data.length < 4)
          throw new Error(`Invalid oodle packet: size=${data.length}, comp=${compression}, opcode=${xorShift}`);
        out = this.oodle.decode(data.subarray(4), data.readUInt32LE(0));
        break;
      }
      default:
        throw new Error(`Unknown compression: ${compression}`);
    }
    if (out.length < 16)
      throw new Error(`Invalid packet: size=${out.length}, comp=${compression}, opcode=${xorShift}`);
    return out.subarray(16);
  }
  xor(data, seed) {
    for (let i = 0; i < data.length; i++)
      data[i] ^= this.xorTable[seed++ % 256];
  }
};

exports.Decompressor = Decompressor;
