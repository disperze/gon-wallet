import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Account, defaultRegistryTypes, GasPrice } from "@cosmjs/stargate";
import { SigningStargateClient } from "@cosmjs/stargate";
import { GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { MsgTransfer } from "./../../proto/nft_transfer/tx";
import { Any } from "cosmjs-types/google/protobuf/any";

import { AppConfig } from "../config/network";
import { MsgIssueDenom, MsgMintNFT } from "../../proto/nft/tx";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { EthAccount } from "../../proto/ethermint/types/account";
import { EtherminSigningClient, SinginClient } from "./eth_sign";

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

export async function createStargateClient(config: AppConfig, signer: OfflineSigner): Promise<SinginClient> {
  let accountParser;
  if (config.coinType === 60) {
    accountParser = (data: Any): Account => {
      if (data.typeUrl !== "/ethermint.types.v1.EthAccount") {
        throw new Error(`Unexpected account type: ${data.typeUrl}`);
      }
      const acc = EthAccount.decode(data.value).baseAccount!;
      return {
        address: acc.address,
        pubkey: {
          type: acc.pubKey!.typeUrl,
          value: acc.pubKey?.value,
        },
        accountNumber: acc.accountNumber.toNumber(),
        sequence: acc.sequence.toNumber(),
      }
    }
  }
  const options = {
    prefix: config.addressPrefix,
    gasPrice: GasPrice.fromString(`${config.gasPrice}${config.token.coinMinimalDenom}`),
    registry: createDefaultRegistry(),
    accountParser,
  };

  const client = await SigningStargateClient.connectWithSigner(config.rpcUrl, signer, options);

  return config.coinType === 60 ? new EtherminSigningClient(client, signer, options): client;
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
