/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "ibc.applications.nft_transfer.v1";

/**
 * ClassTrace contains the base classID for ICS721 non-fungible tokens and the
 * source tracing information path.
 */
export interface ClassTrace {
  /**
   * path defines the chain of port/channel identifiers used for tracing the
   * source of the non-fungible token.
   */
  path: string;
  /** base classID of the relayed non-fungible token. */
  baseClassId: string;
}

function createBaseClassTrace(): ClassTrace {
  return { path: "", baseClassId: "" };
}

export const ClassTrace = {
  encode(message: ClassTrace, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.baseClassId !== "") {
      writer.uint32(18).string(message.baseClassId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassTrace {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassTrace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.path = reader.string();
          break;
        case 2:
          message.baseClassId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClassTrace {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      baseClassId: isSet(object.baseClassId) ? String(object.baseClassId) : "",
    };
  },

  toJSON(message: ClassTrace): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    message.baseClassId !== undefined && (obj.baseClassId = message.baseClassId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClassTrace>, I>>(object: I): ClassTrace {
    const message = createBaseClassTrace();
    message.path = object.path ?? "";
    message.baseClassId = object.baseClassId ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
