// Auto Generated, do not edit.
import { Read } from "../../stream";
export type PKTMigrationExecute = {
  Account_CharacterId1: bigint;
  Account_CharacterId2: bigint;
  ServerAddr: string;
  AuthKey: number;
};
export function read(buf: Buffer) {
  const reader = new Read(buf);
  const data = {} as PKTMigrationExecute;
  data.Account_CharacterId1 = reader.u64();
  data.Account_CharacterId2 = reader.u64();
  data.ServerAddr = reader.string(256);
  data.AuthKey = reader.u32();
  return data;
}
export const name = "PKTMigrationExecute";
export const opcode = 43659;
