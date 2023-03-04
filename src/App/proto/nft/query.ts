/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";
import { BaseNFT, Collection, Denom, Owner } from "./nft";

export const protobufPackage = "irismod.nft";

/** QuerySupplyRequest is the request type for the Query/HTLC RPC method */
export interface QuerySupplyRequest {
  denomId: string;
  owner: string;
}

/** QuerySupplyResponse is the response type for the Query/Supply RPC method */
export interface QuerySupplyResponse {
  amount: Long;
}

/**
 * QueryNFTsOfOwnerRequest is the request type for the Query/NFTsOfOwner RPC
 * method
 */
export interface QueryNFTsOfOwnerRequest {
  denomId: string;
  owner: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/**
 * QueryNFTsOfOwnerResponse is the response type for the Query/NFTsOfOwner RPC
 * method
 */
export interface QueryNFTsOfOwnerResponse {
  owner?: Owner;
  pagination?: PageResponse;
}

/**
 * QueryCollectionRequest is the request type for the Query/Collection RPC
 * method
 */
export interface QueryCollectionRequest {
  denomId: string;
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/**
 * QueryCollectionResponse is the response type for the Query/Collection RPC
 * method
 */
export interface QueryCollectionResponse {
  collection?: Collection;
  pagination?: PageResponse;
}

/** QueryDenomRequest is the request type for the Query/Denom RPC method */
export interface QueryDenomRequest {
  denomId: string;
}

/** QueryDenomResponse is the response type for the Query/Denom RPC method */
export interface QueryDenomResponse {
  denom?: Denom;
}

/** QueryDenomsRequest is the request type for the Query/Denoms RPC method */
export interface QueryDenomsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** QueryDenomsResponse is the response type for the Query/Denoms RPC method */
export interface QueryDenomsResponse {
  denoms: Denom[];
  pagination?: PageResponse;
}

/** QueryNFTRequest is the request type for the Query/NFT RPC method */
export interface QueryNFTRequest {
  denomId: string;
  tokenId: string;
}

/** QueryNFTResponse is the response type for the Query/NFT RPC method */
export interface QueryNFTResponse {
  nft?: BaseNFT;
}

function createBaseQuerySupplyRequest(): QuerySupplyRequest {
  return { denomId: "", owner: "" };
}

export const QuerySupplyRequest = {
  encode(message: QuerySupplyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySupplyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySupplyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySupplyRequest {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
    };
  },

  toJSON(message: QuerySupplyRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySupplyRequest>, I>>(object: I): QuerySupplyRequest {
    const message = createBaseQuerySupplyRequest();
    message.denomId = object.denomId ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseQuerySupplyResponse(): QuerySupplyResponse {
  return { amount: Long.UZERO };
}

export const QuerySupplyResponse = {
  encode(message: QuerySupplyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.amount.isZero()) {
      writer.uint32(8).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QuerySupplyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySupplyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySupplyResponse {
    return { amount: isSet(object.amount) ? Long.fromValue(object.amount) : Long.UZERO };
  },

  toJSON(message: QuerySupplyResponse): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = (message.amount || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QuerySupplyResponse>, I>>(object: I): QuerySupplyResponse {
    const message = createBaseQuerySupplyResponse();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Long.fromValue(object.amount)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryNFTsOfOwnerRequest(): QueryNFTsOfOwnerRequest {
  return { denomId: "", owner: "", pagination: undefined };
}

export const QueryNFTsOfOwnerRequest = {
  encode(message: QueryNFTsOfOwnerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTsOfOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTsOfOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNFTsOfOwnerRequest {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      owner: isSet(object.owner) ? String(object.owner) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryNFTsOfOwnerRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.owner !== undefined && (obj.owner = message.owner);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNFTsOfOwnerRequest>, I>>(object: I): QueryNFTsOfOwnerRequest {
    const message = createBaseQueryNFTsOfOwnerRequest();
    message.denomId = object.denomId ?? "";
    message.owner = object.owner ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryNFTsOfOwnerResponse(): QueryNFTsOfOwnerResponse {
  return { owner: undefined, pagination: undefined };
}

export const QueryNFTsOfOwnerResponse = {
  encode(message: QueryNFTsOfOwnerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== undefined) {
      Owner.encode(message.owner, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTsOfOwnerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTsOfOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = Owner.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryNFTsOfOwnerResponse {
    return {
      owner: isSet(object.owner) ? Owner.fromJSON(object.owner) : undefined,
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryNFTsOfOwnerResponse): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner ? Owner.toJSON(message.owner) : undefined);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNFTsOfOwnerResponse>, I>>(object: I): QueryNFTsOfOwnerResponse {
    const message = createBaseQueryNFTsOfOwnerResponse();
    message.owner = (object.owner !== undefined && object.owner !== null) ? Owner.fromPartial(object.owner) : undefined;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryCollectionRequest(): QueryCollectionRequest {
  return { denomId: "", pagination: undefined };
}

export const QueryCollectionRequest = {
  encode(message: QueryCollectionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCollectionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCollectionRequest {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryCollectionRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCollectionRequest>, I>>(object: I): QueryCollectionRequest {
    const message = createBaseQueryCollectionRequest();
    message.denomId = object.denomId ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryCollectionResponse(): QueryCollectionResponse {
  return { collection: undefined, pagination: undefined };
}

export const QueryCollectionResponse = {
  encode(message: QueryCollectionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.collection !== undefined) {
      Collection.encode(message.collection, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCollectionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCollectionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collection = Collection.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryCollectionResponse {
    return {
      collection: isSet(object.collection) ? Collection.fromJSON(object.collection) : undefined,
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryCollectionResponse): unknown {
    const obj: any = {};
    message.collection !== undefined &&
      (obj.collection = message.collection ? Collection.toJSON(message.collection) : undefined);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCollectionResponse>, I>>(object: I): QueryCollectionResponse {
    const message = createBaseQueryCollectionResponse();
    message.collection = (object.collection !== undefined && object.collection !== null)
      ? Collection.fromPartial(object.collection)
      : undefined;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomRequest(): QueryDenomRequest {
  return { denomId: "" };
}

export const QueryDenomRequest = {
  encode(message: QueryDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomRequest {
    return { denomId: isSet(object.denomId) ? String(object.denomId) : "" };
  },

  toJSON(message: QueryDenomRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomRequest>, I>>(object: I): QueryDenomRequest {
    const message = createBaseQueryDenomRequest();
    message.denomId = object.denomId ?? "";
    return message;
  },
};

function createBaseQueryDenomResponse(): QueryDenomResponse {
  return { denom: undefined };
}

export const QueryDenomResponse = {
  encode(message: QueryDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== undefined) {
      Denom.encode(message.denom, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = Denom.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDenomResponse {
    return { denom: isSet(object.denom) ? Denom.fromJSON(object.denom) : undefined };
  },

  toJSON(message: QueryDenomResponse): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom ? Denom.toJSON(message.denom) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomResponse>, I>>(object: I): QueryDenomResponse {
    const message = createBaseQueryDenomResponse();
    message.denom = (object.denom !== undefined && object.denom !== null) ? Denom.fromPartial(object.denom) : undefined;
    return message;
  },
};

function createBaseQueryDenomsRequest(): QueryDenomsRequest {
  return { pagination: undefined };
}

export const QueryDenomsRequest = {
  encode(message: QueryDenomsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsRequest();
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

  fromJSON(object: any): QueryDenomsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryDenomsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomsRequest>, I>>(object: I): QueryDenomsRequest {
    const message = createBaseQueryDenomsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomsResponse(): QueryDenomsResponse {
  return { denoms: [], pagination: undefined };
}

export const QueryDenomsResponse = {
  encode(message: QueryDenomsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denoms) {
      Denom.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denoms.push(Denom.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryDenomsResponse {
    return {
      denoms: Array.isArray(object?.denoms) ? object.denoms.map((e: any) => Denom.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomsResponse): unknown {
    const obj: any = {};
    if (message.denoms) {
      obj.denoms = message.denoms.map((e) => e ? Denom.toJSON(e) : undefined);
    } else {
      obj.denoms = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDenomsResponse>, I>>(object: I): QueryDenomsResponse {
    const message = createBaseQueryDenomsResponse();
    message.denoms = object.denoms?.map((e) => Denom.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryNFTRequest(): QueryNFTRequest {
  return { denomId: "", tokenId: "" };
}

export const QueryNFTRequest = {
  encode(message: QueryNFTRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.tokenId !== "") {
      writer.uint32(18).string(message.tokenId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomId = reader.string();
          break;
        case 2:
          message.tokenId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNFTRequest {
    return {
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
    };
  },

  toJSON(message: QueryNFTRequest): unknown {
    const obj: any = {};
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.tokenId !== undefined && (obj.tokenId = message.tokenId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNFTRequest>, I>>(object: I): QueryNFTRequest {
    const message = createBaseQueryNFTRequest();
    message.denomId = object.denomId ?? "";
    message.tokenId = object.tokenId ?? "";
    return message;
  },
};

function createBaseQueryNFTResponse(): QueryNFTResponse {
  return { nft: undefined };
}

export const QueryNFTResponse = {
  encode(message: QueryNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nft !== undefined) {
      BaseNFT.encode(message.nft, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nft = BaseNFT.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNFTResponse {
    return { nft: isSet(object.nft) ? BaseNFT.fromJSON(object.nft) : undefined };
  },

  toJSON(message: QueryNFTResponse): unknown {
    const obj: any = {};
    message.nft !== undefined && (obj.nft = message.nft ? BaseNFT.toJSON(message.nft) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryNFTResponse>, I>>(object: I): QueryNFTResponse {
    const message = createBaseQueryNFTResponse();
    message.nft = (object.nft !== undefined && object.nft !== null) ? BaseNFT.fromPartial(object.nft) : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service for NFT module */
export interface Query {
  /** Supply queries the total supply of a given denom or owner */
  Supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse>;
  /** NFTsOfOwner queries the NFTs of the specified owner */
  NFTsOfOwner(request: QueryNFTsOfOwnerRequest): Promise<QueryNFTsOfOwnerResponse>;
  /** Collection queries the NFTs of the specified denom */
  Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse>;
  /** Denom queries the definition of a given denom */
  Denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;
  /** Denoms queries all the denoms */
  Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>;
  /** NFT queries the NFT for the given denom and token ID */
  NFT(request: QueryNFTRequest): Promise<QueryNFTResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Supply = this.Supply.bind(this);
    this.NFTsOfOwner = this.NFTsOfOwner.bind(this);
    this.Collection = this.Collection.bind(this);
    this.Denom = this.Denom.bind(this);
    this.Denoms = this.Denoms.bind(this);
    this.NFT = this.NFT.bind(this);
  }
  Supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse> {
    const data = QuerySupplyRequest.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Query", "Supply", data);
    return promise.then((data) => QuerySupplyResponse.decode(new _m0.Reader(data)));
  }

  NFTsOfOwner(request: QueryNFTsOfOwnerRequest): Promise<QueryNFTsOfOwnerResponse> {
    const data = QueryNFTsOfOwnerRequest.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Query", "NFTsOfOwner", data);
    return promise.then((data) => QueryNFTsOfOwnerResponse.decode(new _m0.Reader(data)));
  }

  Collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse> {
    const data = QueryCollectionRequest.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Query", "Collection", data);
    return promise.then((data) => QueryCollectionResponse.decode(new _m0.Reader(data)));
  }

  Denom(request: QueryDenomRequest): Promise<QueryDenomResponse> {
    const data = QueryDenomRequest.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Query", "Denom", data);
    return promise.then((data) => QueryDenomResponse.decode(new _m0.Reader(data)));
  }

  Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse> {
    const data = QueryDenomsRequest.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Query", "Denoms", data);
    return promise.then((data) => QueryDenomsResponse.decode(new _m0.Reader(data)));
  }

  NFT(request: QueryNFTRequest): Promise<QueryNFTResponse> {
    const data = QueryNFTRequest.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Query", "NFT", data);
    return promise.then((data) => QueryNFTResponse.decode(new _m0.Reader(data)));
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
