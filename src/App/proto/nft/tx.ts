/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "irismod.nft";

/** MsgIssueDenom defines an SDK message for creating a new denom. */
export interface MsgIssueDenom {
  id: string;
  name: string;
  schema: string;
  sender: string;
  symbol: string;
  mintRestricted: boolean;
  updateRestricted: boolean;
  description: string;
  uri: string;
  uriHash: string;
  data: string;
}

/** MsgIssueDenomResponse defines the Msg/IssueDenom response type. */
export interface MsgIssueDenomResponse {
}

/** MsgTransferNFT defines an SDK message for transferring an NFT to recipient. */
export interface MsgTransferNFT {
  id: string;
  denomId: string;
  name: string;
  uri: string;
  data: string;
  sender: string;
  recipient: string;
  uriHash: string;
}

/** MsgTransferNFTResponse defines the Msg/TransferNFT response type. */
export interface MsgTransferNFTResponse {
}

/** MsgEditNFT defines an SDK message for editing a nft. */
export interface MsgEditNFT {
  id: string;
  denomId: string;
  name: string;
  uri: string;
  data: string;
  sender: string;
  uriHash: string;
}

/** MsgEditNFTResponse defines the Msg/EditNFT response type. */
export interface MsgEditNFTResponse {
}

/** MsgMintNFT defines an SDK message for creating a new NFT. */
export interface MsgMintNFT {
  id: string;
  denomId: string;
  name: string;
  uri: string;
  data: string;
  sender: string;
  recipient: string;
  uriHash: string;
}

/** MsgMintNFTResponse defines the Msg/MintNFT response type. */
export interface MsgMintNFTResponse {
}

/** MsgBurnNFT defines an SDK message for burning a NFT. */
export interface MsgBurnNFT {
  id: string;
  denomId: string;
  sender: string;
}

/** MsgBurnNFTResponse defines the Msg/BurnNFT response type. */
export interface MsgBurnNFTResponse {
}

/**
 * MsgTransferDenom defines an SDK message for transferring an denom to
 * recipient.
 */
export interface MsgTransferDenom {
  id: string;
  sender: string;
  recipient: string;
}

/** MsgTransferDenomResponse defines the Msg/TransferDenom response type. */
export interface MsgTransferDenomResponse {
}

function createBaseMsgIssueDenom(): MsgIssueDenom {
  return {
    id: "",
    name: "",
    schema: "",
    sender: "",
    symbol: "",
    mintRestricted: false,
    updateRestricted: false,
    description: "",
    uri: "",
    uriHash: "",
    data: "",
  };
}

export const MsgIssueDenom = {
  encode(message: MsgIssueDenom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.schema !== "") {
      writer.uint32(26).string(message.schema);
    }
    if (message.sender !== "") {
      writer.uint32(34).string(message.sender);
    }
    if (message.symbol !== "") {
      writer.uint32(42).string(message.symbol);
    }
    if (message.mintRestricted === true) {
      writer.uint32(48).bool(message.mintRestricted);
    }
    if (message.updateRestricted === true) {
      writer.uint32(56).bool(message.updateRestricted);
    }
    if (message.description !== "") {
      writer.uint32(66).string(message.description);
    }
    if (message.uri !== "") {
      writer.uint32(74).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(82).string(message.uriHash);
    }
    if (message.data !== "") {
      writer.uint32(90).string(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIssueDenom {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIssueDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.schema = reader.string();
          break;
        case 4:
          message.sender = reader.string();
          break;
        case 5:
          message.symbol = reader.string();
          break;
        case 6:
          message.mintRestricted = reader.bool();
          break;
        case 7:
          message.updateRestricted = reader.bool();
          break;
        case 8:
          message.description = reader.string();
          break;
        case 9:
          message.uri = reader.string();
          break;
        case 10:
          message.uriHash = reader.string();
          break;
        case 11:
          message.data = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgIssueDenom {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      schema: isSet(object.schema) ? String(object.schema) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      symbol: isSet(object.symbol) ? String(object.symbol) : "",
      mintRestricted: isSet(object.mintRestricted) ? Boolean(object.mintRestricted) : false,
      updateRestricted: isSet(object.updateRestricted) ? Boolean(object.updateRestricted) : false,
      description: isSet(object.description) ? String(object.description) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? String(object.uriHash) : "",
      data: isSet(object.data) ? String(object.data) : "",
    };
  },

  toJSON(message: MsgIssueDenom): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.schema !== undefined && (obj.schema = message.schema);
    message.sender !== undefined && (obj.sender = message.sender);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.mintRestricted !== undefined && (obj.mintRestricted = message.mintRestricted);
    message.updateRestricted !== undefined && (obj.updateRestricted = message.updateRestricted);
    message.description !== undefined && (obj.description = message.description);
    message.uri !== undefined && (obj.uri = message.uri);
    message.uriHash !== undefined && (obj.uriHash = message.uriHash);
    message.data !== undefined && (obj.data = message.data);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgIssueDenom>, I>>(object: I): MsgIssueDenom {
    const message = createBaseMsgIssueDenom();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.schema = object.schema ?? "";
    message.sender = object.sender ?? "";
    message.symbol = object.symbol ?? "";
    message.mintRestricted = object.mintRestricted ?? false;
    message.updateRestricted = object.updateRestricted ?? false;
    message.description = object.description ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.data = object.data ?? "";
    return message;
  },
};

function createBaseMsgIssueDenomResponse(): MsgIssueDenomResponse {
  return {};
}

export const MsgIssueDenomResponse = {
  encode(_: MsgIssueDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIssueDenomResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIssueDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgIssueDenomResponse {
    return {};
  },

  toJSON(_: MsgIssueDenomResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgIssueDenomResponse>, I>>(_: I): MsgIssueDenomResponse {
    const message = createBaseMsgIssueDenomResponse();
    return message;
  },
};

function createBaseMsgTransferNFT(): MsgTransferNFT {
  return { id: "", denomId: "", name: "", uri: "", data: "", sender: "", recipient: "", uriHash: "" };
}

export const MsgTransferNFT = {
  encode(message: MsgTransferNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.denomId !== "") {
      writer.uint32(18).string(message.denomId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.uri !== "") {
      writer.uint32(34).string(message.uri);
    }
    if (message.data !== "") {
      writer.uint32(42).string(message.data);
    }
    if (message.sender !== "") {
      writer.uint32(50).string(message.sender);
    }
    if (message.recipient !== "") {
      writer.uint32(58).string(message.recipient);
    }
    if (message.uriHash !== "") {
      writer.uint32(66).string(message.uriHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferNFT {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferNFT();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.denomId = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.uri = reader.string();
          break;
        case 5:
          message.data = reader.string();
          break;
        case 6:
          message.sender = reader.string();
          break;
        case 7:
          message.recipient = reader.string();
          break;
        case 8:
          message.uriHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTransferNFT {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      name: isSet(object.name) ? String(object.name) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      data: isSet(object.data) ? String(object.data) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      uriHash: isSet(object.uriHash) ? String(object.uriHash) : "",
    };
  },

  toJSON(message: MsgTransferNFT): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.name !== undefined && (obj.name = message.name);
    message.uri !== undefined && (obj.uri = message.uri);
    message.data !== undefined && (obj.data = message.data);
    message.sender !== undefined && (obj.sender = message.sender);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.uriHash !== undefined && (obj.uriHash = message.uriHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferNFT>, I>>(object: I): MsgTransferNFT {
    const message = createBaseMsgTransferNFT();
    message.id = object.id ?? "";
    message.denomId = object.denomId ?? "";
    message.name = object.name ?? "";
    message.uri = object.uri ?? "";
    message.data = object.data ?? "";
    message.sender = object.sender ?? "";
    message.recipient = object.recipient ?? "";
    message.uriHash = object.uriHash ?? "";
    return message;
  },
};

function createBaseMsgTransferNFTResponse(): MsgTransferNFTResponse {
  return {};
}

export const MsgTransferNFTResponse = {
  encode(_: MsgTransferNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferNFTResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgTransferNFTResponse {
    return {};
  },

  toJSON(_: MsgTransferNFTResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferNFTResponse>, I>>(_: I): MsgTransferNFTResponse {
    const message = createBaseMsgTransferNFTResponse();
    return message;
  },
};

function createBaseMsgEditNFT(): MsgEditNFT {
  return { id: "", denomId: "", name: "", uri: "", data: "", sender: "", uriHash: "" };
}

export const MsgEditNFT = {
  encode(message: MsgEditNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.denomId !== "") {
      writer.uint32(18).string(message.denomId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.uri !== "") {
      writer.uint32(34).string(message.uri);
    }
    if (message.data !== "") {
      writer.uint32(42).string(message.data);
    }
    if (message.sender !== "") {
      writer.uint32(50).string(message.sender);
    }
    if (message.uriHash !== "") {
      writer.uint32(58).string(message.uriHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditNFT {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEditNFT();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.denomId = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.uri = reader.string();
          break;
        case 5:
          message.data = reader.string();
          break;
        case 6:
          message.sender = reader.string();
          break;
        case 7:
          message.uriHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEditNFT {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      name: isSet(object.name) ? String(object.name) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      data: isSet(object.data) ? String(object.data) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      uriHash: isSet(object.uriHash) ? String(object.uriHash) : "",
    };
  },

  toJSON(message: MsgEditNFT): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.name !== undefined && (obj.name = message.name);
    message.uri !== undefined && (obj.uri = message.uri);
    message.data !== undefined && (obj.data = message.data);
    message.sender !== undefined && (obj.sender = message.sender);
    message.uriHash !== undefined && (obj.uriHash = message.uriHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEditNFT>, I>>(object: I): MsgEditNFT {
    const message = createBaseMsgEditNFT();
    message.id = object.id ?? "";
    message.denomId = object.denomId ?? "";
    message.name = object.name ?? "";
    message.uri = object.uri ?? "";
    message.data = object.data ?? "";
    message.sender = object.sender ?? "";
    message.uriHash = object.uriHash ?? "";
    return message;
  },
};

function createBaseMsgEditNFTResponse(): MsgEditNFTResponse {
  return {};
}

export const MsgEditNFTResponse = {
  encode(_: MsgEditNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditNFTResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgEditNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgEditNFTResponse {
    return {};
  },

  toJSON(_: MsgEditNFTResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEditNFTResponse>, I>>(_: I): MsgEditNFTResponse {
    const message = createBaseMsgEditNFTResponse();
    return message;
  },
};

function createBaseMsgMintNFT(): MsgMintNFT {
  return { id: "", denomId: "", name: "", uri: "", data: "", sender: "", recipient: "", uriHash: "" };
}

export const MsgMintNFT = {
  encode(message: MsgMintNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.denomId !== "") {
      writer.uint32(18).string(message.denomId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.uri !== "") {
      writer.uint32(34).string(message.uri);
    }
    if (message.data !== "") {
      writer.uint32(42).string(message.data);
    }
    if (message.sender !== "") {
      writer.uint32(50).string(message.sender);
    }
    if (message.recipient !== "") {
      writer.uint32(58).string(message.recipient);
    }
    if (message.uriHash !== "") {
      writer.uint32(66).string(message.uriHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintNFT {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintNFT();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.denomId = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.uri = reader.string();
          break;
        case 5:
          message.data = reader.string();
          break;
        case 6:
          message.sender = reader.string();
          break;
        case 7:
          message.recipient = reader.string();
          break;
        case 8:
          message.uriHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgMintNFT {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      name: isSet(object.name) ? String(object.name) : "",
      uri: isSet(object.uri) ? String(object.uri) : "",
      data: isSet(object.data) ? String(object.data) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
      uriHash: isSet(object.uriHash) ? String(object.uriHash) : "",
    };
  },

  toJSON(message: MsgMintNFT): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.name !== undefined && (obj.name = message.name);
    message.uri !== undefined && (obj.uri = message.uri);
    message.data !== undefined && (obj.data = message.data);
    message.sender !== undefined && (obj.sender = message.sender);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.uriHash !== undefined && (obj.uriHash = message.uriHash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintNFT>, I>>(object: I): MsgMintNFT {
    const message = createBaseMsgMintNFT();
    message.id = object.id ?? "";
    message.denomId = object.denomId ?? "";
    message.name = object.name ?? "";
    message.uri = object.uri ?? "";
    message.data = object.data ?? "";
    message.sender = object.sender ?? "";
    message.recipient = object.recipient ?? "";
    message.uriHash = object.uriHash ?? "";
    return message;
  },
};

function createBaseMsgMintNFTResponse(): MsgMintNFTResponse {
  return {};
}

export const MsgMintNFTResponse = {
  encode(_: MsgMintNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintNFTResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgMintNFTResponse {
    return {};
  },

  toJSON(_: MsgMintNFTResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgMintNFTResponse>, I>>(_: I): MsgMintNFTResponse {
    const message = createBaseMsgMintNFTResponse();
    return message;
  },
};

function createBaseMsgBurnNFT(): MsgBurnNFT {
  return { id: "", denomId: "", sender: "" };
}

export const MsgBurnNFT = {
  encode(message: MsgBurnNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.denomId !== "") {
      writer.uint32(18).string(message.denomId);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnNFT {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnNFT();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.denomId = reader.string();
          break;
        case 3:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBurnNFT {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      denomId: isSet(object.denomId) ? String(object.denomId) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
    };
  },

  toJSON(message: MsgBurnNFT): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.denomId !== undefined && (obj.denomId = message.denomId);
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBurnNFT>, I>>(object: I): MsgBurnNFT {
    const message = createBaseMsgBurnNFT();
    message.id = object.id ?? "";
    message.denomId = object.denomId ?? "";
    message.sender = object.sender ?? "";
    return message;
  },
};

function createBaseMsgBurnNFTResponse(): MsgBurnNFTResponse {
  return {};
}

export const MsgBurnNFTResponse = {
  encode(_: MsgBurnNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnNFTResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgBurnNFTResponse {
    return {};
  },

  toJSON(_: MsgBurnNFTResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBurnNFTResponse>, I>>(_: I): MsgBurnNFTResponse {
    const message = createBaseMsgBurnNFTResponse();
    return message;
  },
};

function createBaseMsgTransferDenom(): MsgTransferDenom {
  return { id: "", sender: "", recipient: "" };
}

export const MsgTransferDenom = {
  encode(message: MsgTransferDenom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.recipient !== "") {
      writer.uint32(26).string(message.recipient);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferDenom {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.recipient = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTransferDenom {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      recipient: isSet(object.recipient) ? String(object.recipient) : "",
    };
  },

  toJSON(message: MsgTransferDenom): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.sender !== undefined && (obj.sender = message.sender);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferDenom>, I>>(object: I): MsgTransferDenom {
    const message = createBaseMsgTransferDenom();
    message.id = object.id ?? "";
    message.sender = object.sender ?? "";
    message.recipient = object.recipient ?? "";
    return message;
  },
};

function createBaseMsgTransferDenomResponse(): MsgTransferDenomResponse {
  return {};
}

export const MsgTransferDenomResponse = {
  encode(_: MsgTransferDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferDenomResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgTransferDenomResponse {
    return {};
  },

  toJSON(_: MsgTransferDenomResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferDenomResponse>, I>>(_: I): MsgTransferDenomResponse {
    const message = createBaseMsgTransferDenomResponse();
    return message;
  },
};

/** Msg defines the nft Msg service. */
export interface Msg {
  /** IssueDenom defines a method for issue a denom. */
  IssueDenom(request: MsgIssueDenom): Promise<MsgIssueDenomResponse>;
  /** MintNFT defines a method for mint a new nft */
  MintNFT(request: MsgMintNFT): Promise<MsgMintNFTResponse>;
  /** RefundHTLC defines a method for editing a nft. */
  EditNFT(request: MsgEditNFT): Promise<MsgEditNFTResponse>;
  /** TransferNFT defines a method for transferring a nft. */
  TransferNFT(request: MsgTransferNFT): Promise<MsgTransferNFTResponse>;
  /** BurnNFT defines a method for burning a nft. */
  BurnNFT(request: MsgBurnNFT): Promise<MsgBurnNFTResponse>;
  /** TransferDenom defines a method for transferring a denom. */
  TransferDenom(request: MsgTransferDenom): Promise<MsgTransferDenomResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.IssueDenom = this.IssueDenom.bind(this);
    this.MintNFT = this.MintNFT.bind(this);
    this.EditNFT = this.EditNFT.bind(this);
    this.TransferNFT = this.TransferNFT.bind(this);
    this.BurnNFT = this.BurnNFT.bind(this);
    this.TransferDenom = this.TransferDenom.bind(this);
  }
  IssueDenom(request: MsgIssueDenom): Promise<MsgIssueDenomResponse> {
    const data = MsgIssueDenom.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Msg", "IssueDenom", data);
    return promise.then((data) => MsgIssueDenomResponse.decode(new _m0.Reader(data)));
  }

  MintNFT(request: MsgMintNFT): Promise<MsgMintNFTResponse> {
    const data = MsgMintNFT.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Msg", "MintNFT", data);
    return promise.then((data) => MsgMintNFTResponse.decode(new _m0.Reader(data)));
  }

  EditNFT(request: MsgEditNFT): Promise<MsgEditNFTResponse> {
    const data = MsgEditNFT.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Msg", "EditNFT", data);
    return promise.then((data) => MsgEditNFTResponse.decode(new _m0.Reader(data)));
  }

  TransferNFT(request: MsgTransferNFT): Promise<MsgTransferNFTResponse> {
    const data = MsgTransferNFT.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Msg", "TransferNFT", data);
    return promise.then((data) => MsgTransferNFTResponse.decode(new _m0.Reader(data)));
  }

  BurnNFT(request: MsgBurnNFT): Promise<MsgBurnNFTResponse> {
    const data = MsgBurnNFT.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Msg", "BurnNFT", data);
    return promise.then((data) => MsgBurnNFTResponse.decode(new _m0.Reader(data)));
  }

  TransferDenom(request: MsgTransferDenom): Promise<MsgTransferDenomResponse> {
    const data = MsgTransferDenom.encode(request).finish();
    const promise = this.rpc.request("irismod.nft.Msg", "TransferDenom", data);
    return promise.then((data) => MsgTransferDenomResponse.decode(new _m0.Reader(data)));
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
