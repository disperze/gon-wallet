import { AxiosInstance } from "axios";

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
  nft: NftINfo;
}

export interface NftINfo {
  id:       string;
  name:     string;
  uri:      string;
  data:     string;
  owner:    string;
  uri_hash: string;
}

export class IrisNFTClient {
  constructor(private instance: AxiosInstance) {
  }

  async getCollections(address: string): Promise<CollectionsResponse> {
      const res = await this.instance.get(`/irismod/nft/nfts?owner=${address}`);

      return res.data;
  }

  async getNFT(denom: string, tokenId: string): Promise<NftINfo> {
    const res = await this.instance.get(`/irismod/nft/nfts/${denom}/${tokenId}`);

    return res.data.nft;
  }
}
