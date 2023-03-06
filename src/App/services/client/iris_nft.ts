import { AxiosInstance } from "axios";
import { fromBase64, toHex } from "@cosmjs/encoding";
import { QueryNFTRequest, QueryNFTResponse, QueryNFTsOfOwnerRequest, QueryNFTsOfOwnerResponse } from "../../proto/nft/query";
import Long from "long";
import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";

export interface CollectionsResponse {
  owner:      Owner;
  pagination: Pagination;
}

export interface Owner {
  address:        string;
  id_collections: IDCollection[];
}

export interface IDCollection {
  denom_id:  string;
  token_ids: string[];
}

export interface Pagination {
  next_key?: string;
  total:    string;
}

export interface NFTResponse {
  nft: Nft;
}

export interface Nft {
  cid:      string;
  id:       string;
  name:     string;
  uri:      string;
  data:     string;
  owner:    string;
  uriHash: string;
}

export class IrisNFTClient {
  constructor(private instance: AxiosInstance) {
  }

  async getCollections(address: string, maxItems: number): Promise<QueryNFTsOfOwnerResponse> {
    const data = QueryNFTsOfOwnerRequest.encode({
      denomId: "",
      owner: address,
      pagination: PageRequest.fromJSON({
        countTotal: false,
        limit: Long.fromNumber(maxItems),
      })
    }).finish();

    const res = await this.callRpc("/irismod.nft.Query/NFTsOfOwner", data)
    if (!res) {
      throw new Error("Error fetching");
    }

    return QueryNFTsOfOwnerResponse.decode(res);
  }

  async getNFT(denom: string, tokenId: string): Promise<Nft> {
    const data = QueryNFTRequest.encode({
      denomId: denom,
      tokenId: tokenId
    }).finish();

    const res = await this.callRpc("/irismod.nft.Query/NFT", data)
    if (!res) {
      throw new Error("Error fetching");
    }

    const nft = QueryNFTResponse.decode(res).nft!;
    return {
      ...nft,
      cid: denom
    };
  }

  async callRpc(path: string, data: Uint8Array) {
    const payload = {
      jsonrpc:"2.0",
      id:-1,
      method:"abci_query",
      params: {
        path: path,
        data: toHex(data),
        prove:false
      }
    }
    return await this.instance.post("", payload)
      .then((res) => res.data.result.response.value ? fromBase64(res.data.result.response.value) : "")
  }
}
