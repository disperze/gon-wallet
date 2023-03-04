/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";
import { ClassTrace } from "./transfer";

export const protobufPackage = "ibc.applications.nft_transfer.v1";

/**
 * QueryClassTraceRequest is the request type for the Query/ClassDenom RPC
 * method
 */
export interface QueryClassTraceRequest {
  /**
   * hash (in hex format) or classID (full classID with ibc prefix) of the
   * denomination trace information.
   */
  hash: string;
}

/**
 * QueryClassTraceResponse is the response type for the Query/ClassDenom RPC
 * method.
 */
export interface QueryClassTraceResponse {
  /** class_trace returns the requested class trace information. */
  classTrace?: ClassTrace;
}

/**
 * QueryConnectionsRequest is the request type for the Query/ClassTraces RPC
 * method
 */
export interface QueryClassTracesRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/**
 * QueryClassTracesResponse is the response type for the Query/ClassTraces RPC
 * method.
 */
export interface QueryClassTracesResponse {
  /** class_traces returns all class trace information. */
  classTraces: ClassTrace[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/**
 * QueryClassHashRequest is the request type for the Query/ClassHash RPC
 * method
 */
export interface QueryClassHashRequest {
  /** The class trace ([port_id]/[channel_id])+/[denom] */
  trace: string;
}

/**
 * QueryClassHashResponse is the response type for the Query/ClassHash RPC
 * method.
 */
export interface QueryClassHashResponse {
  /** hash (in hex format) of the denomination trace information. */
  hash: string;
}

/**
 * QueryEscrowAddressRequest is the request type for the EscrowAddress RPC
 * method.
 */
export interface QueryEscrowAddressRequest {
  /** unique port identifier */
  portId: string;
  /** unique channel identifier */
  channelId: string;
}

/**
 * QueryEscrowAddressResponse is the response type of the EscrowAddress RPC
 * method.
 */
export interface QueryEscrowAddressResponse {
  /** the escrow account address */
  escrowAddress: string;
}

function createBaseQueryClassTraceRequest(): QueryClassTraceRequest {
  return { hash: "" };
}

export const QueryClassTraceRequest = {
  encode(message: QueryClassTraceRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassTraceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassTraceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClassTraceRequest {
    return { hash: isSet(object.hash) ? String(object.hash) : "" };
  },

  toJSON(message: QueryClassTraceRequest): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryClassTraceRequest>, I>>(object: I): QueryClassTraceRequest {
    const message = createBaseQueryClassTraceRequest();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseQueryClassTraceResponse(): QueryClassTraceResponse {
  return { classTrace: undefined };
}

export const QueryClassTraceResponse = {
  encode(message: QueryClassTraceResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classTrace !== undefined) {
      ClassTrace.encode(message.classTrace, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassTraceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassTraceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classTrace = ClassTrace.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClassTraceResponse {
    return { classTrace: isSet(object.classTrace) ? ClassTrace.fromJSON(object.classTrace) : undefined };
  },

  toJSON(message: QueryClassTraceResponse): unknown {
    const obj: any = {};
    message.classTrace !== undefined &&
      (obj.classTrace = message.classTrace ? ClassTrace.toJSON(message.classTrace) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryClassTraceResponse>, I>>(object: I): QueryClassTraceResponse {
    const message = createBaseQueryClassTraceResponse();
    message.classTrace = (object.classTrace !== undefined && object.classTrace !== null)
      ? ClassTrace.fromPartial(object.classTrace)
      : undefined;
    return message;
  },
};

function createBaseQueryClassTracesRequest(): QueryClassTracesRequest {
  return { pagination: undefined };
}

export const QueryClassTracesRequest = {
  encode(message: QueryClassTracesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassTracesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassTracesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClassTracesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryClassTracesRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryClassTracesRequest>, I>>(object: I): QueryClassTracesRequest {
    const message = createBaseQueryClassTracesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryClassTracesResponse(): QueryClassTracesResponse {
  return { classTraces: [], pagination: undefined };
}

export const QueryClassTracesResponse = {
  encode(message: QueryClassTracesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.classTraces) {
      ClassTrace.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassTracesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassTracesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classTraces.push(ClassTrace.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClassTracesResponse {
    return {
      classTraces: Array.isArray(object?.classTraces) ? object.classTraces.map((e: any) => ClassTrace.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryClassTracesResponse): unknown {
    const obj: any = {};
    if (message.classTraces) {
      obj.classTraces = message.classTraces.map((e) => e ? ClassTrace.toJSON(e) : undefined);
    } else {
      obj.classTraces = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryClassTracesResponse>, I>>(object: I): QueryClassTracesResponse {
    const message = createBaseQueryClassTracesResponse();
    message.classTraces = object.classTraces?.map((e) => ClassTrace.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryClassHashRequest(): QueryClassHashRequest {
  return { trace: "" };
}

export const QueryClassHashRequest = {
  encode(message: QueryClassHashRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trace !== "") {
      writer.uint32(10).string(message.trace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassHashRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassHashRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trace = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClassHashRequest {
    return { trace: isSet(object.trace) ? String(object.trace) : "" };
  },

  toJSON(message: QueryClassHashRequest): unknown {
    const obj: any = {};
    message.trace !== undefined && (obj.trace = message.trace);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryClassHashRequest>, I>>(object: I): QueryClassHashRequest {
    const message = createBaseQueryClassHashRequest();
    message.trace = object.trace ?? "";
    return message;
  },
};

function createBaseQueryClassHashResponse(): QueryClassHashResponse {
  return { hash: "" };
}

export const QueryClassHashResponse = {
  encode(message: QueryClassHashResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassHashResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClassHashResponse {
    return { hash: isSet(object.hash) ? String(object.hash) : "" };
  },

  toJSON(message: QueryClassHashResponse): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryClassHashResponse>, I>>(object: I): QueryClassHashResponse {
    const message = createBaseQueryClassHashResponse();
    message.hash = object.hash ?? "";
    return message;
  },
};

function createBaseQueryEscrowAddressRequest(): QueryEscrowAddressRequest {
  return { portId: "", channelId: "" };
}

export const QueryEscrowAddressRequest = {
  encode(message: QueryEscrowAddressRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEscrowAddressRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEscrowAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryEscrowAddressRequest {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
    };
  },

  toJSON(message: QueryEscrowAddressRequest): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryEscrowAddressRequest>, I>>(object: I): QueryEscrowAddressRequest {
    const message = createBaseQueryEscrowAddressRequest();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    return message;
  },
};

function createBaseQueryEscrowAddressResponse(): QueryEscrowAddressResponse {
  return { escrowAddress: "" };
}

export const QueryEscrowAddressResponse = {
  encode(message: QueryEscrowAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.escrowAddress !== "") {
      writer.uint32(10).string(message.escrowAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryEscrowAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEscrowAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.escrowAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryEscrowAddressResponse {
    return { escrowAddress: isSet(object.escrowAddress) ? String(object.escrowAddress) : "" };
  },

  toJSON(message: QueryEscrowAddressResponse): unknown {
    const obj: any = {};
    message.escrowAddress !== undefined && (obj.escrowAddress = message.escrowAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryEscrowAddressResponse>, I>>(object: I): QueryEscrowAddressResponse {
    const message = createBaseQueryEscrowAddressResponse();
    message.escrowAddress = object.escrowAddress ?? "";
    return message;
  },
};

/** Query provides defines the gRPC querier service. */
export interface Query {
  /** ClassTrace queries a class trace information. */
  ClassTrace(request: QueryClassTraceRequest): Promise<QueryClassTraceResponse>;
  /** ClassTraces queries all class traces. */
  ClassTraces(request: QueryClassTracesRequest): Promise<QueryClassTracesResponse>;
  /** ClassHash queries a class hash information. */
  ClassHash(request: QueryClassHashRequest): Promise<QueryClassHashResponse>;
  /**
   * EscrowAddress returns the escrow address for a particular port and channel
   * id.
   */
  EscrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ClassTrace = this.ClassTrace.bind(this);
    this.ClassTraces = this.ClassTraces.bind(this);
    this.ClassHash = this.ClassHash.bind(this);
    this.EscrowAddress = this.EscrowAddress.bind(this);
  }
  ClassTrace(request: QueryClassTraceRequest): Promise<QueryClassTraceResponse> {
    const data = QueryClassTraceRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.nft_transfer.v1.Query", "ClassTrace", data);
    return promise.then((data) => QueryClassTraceResponse.decode(new _m0.Reader(data)));
  }

  ClassTraces(request: QueryClassTracesRequest): Promise<QueryClassTracesResponse> {
    const data = QueryClassTracesRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.nft_transfer.v1.Query", "ClassTraces", data);
    return promise.then((data) => QueryClassTracesResponse.decode(new _m0.Reader(data)));
  }

  ClassHash(request: QueryClassHashRequest): Promise<QueryClassHashResponse> {
    const data = QueryClassHashRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.nft_transfer.v1.Query", "ClassHash", data);
    return promise.then((data) => QueryClassHashResponse.decode(new _m0.Reader(data)));
  }

  EscrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse> {
    const data = QueryEscrowAddressRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.nft_transfer.v1.Query", "EscrowAddress", data);
    return promise.then((data) => QueryEscrowAddressResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
