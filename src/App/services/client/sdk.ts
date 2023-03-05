import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { defaultRegistryTypes, GasPrice } from "@cosmjs/stargate";
import { GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { MsgTransfer } from "./../../proto/nft_transfer/tx";

import { AppConfig } from "../config/network";
import { MsgIssueDenom, MsgMintNFT } from "../../proto/nft/tx";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";

export type WalletLoader = (chainId: string, addressPrefix?: string) => Promise<OfflineSigner>;

export async function loadKeplrWallet(chainId: string): Promise<OfflineSigner> {
  const anyWindow = window as any;
  if (!anyWindow.getOfflineSignerAuto) {
    throw new Error("Keplr extension is not available");
  }

  const signer = anyWindow.getOfflineSignerAuto(chainId);

  return Promise.resolve(signer);
}

// this creates a new connection to a server at URL,
export async function createClient(config: AppConfig, signer: OfflineSigner): Promise<SigningCosmWasmClient> {
  return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer, {
    prefix: config.addressPrefix,
    gasPrice: GasPrice.fromString(`${config.gasPrice}${config.token.coinMinimalDenom}`),
    registry: createDefaultRegistry(),
  });
}

export function createSimpleClient(config: AppConfig): Promise<CosmWasmClient> {
  return CosmWasmClient.connect(config.rpcUrl);
}

function createDefaultRegistry() {
  const nftTypes: ReadonlyArray<[string, GeneratedType]> = [
    ['/irismod.nft.MsgIssueDenom', MsgIssueDenom],
    ['/irismod.nft.MsgMintNFT', MsgMintNFT],
    ['/ibc.applications.nft_transfer.v1.MsgTransfer', MsgTransfer],
  ];

  const wasmTypes: ReadonlyArray<[string, GeneratedType]> = [
    ['/cosmwasm.wasm.v1.MsgExecuteContract', MsgExecuteContract],
  ];

  return new Registry([
    ...defaultRegistryTypes,
    ...wasmTypes,
    ...nftTypes,
  ])
}
