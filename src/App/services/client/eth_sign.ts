import { EncodeObject, isOfflineDirectSigner, makeAuthInfoBytes, makeSignDoc, OfflineSigner, TxBodyEncodeObject } from "@cosmjs/proto-signing";
import { calculateFee, DeliverTxResponse, SignerData, SigningStargateClient, SigningStargateClientOptions, StdFee } from "@cosmjs/stargate";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";
import { fromBase64 } from "@cosmjs/encoding";
import { Int53 } from "@cosmjs/math";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";

export interface SinginClient {
  signAndBroadcast(signerAddress: string, messages: readonly EncodeObject[], fee: StdFee | "auto" | number, memo?: string): Promise<DeliverTxResponse>;
}

export class EtherminSigningClient {
  constructor(
    private client: SigningStargateClient,
    private signer: OfflineSigner,
    private options: SigningStargateClientOptions
  ) {}

  async signAndBroadcast(signerAddress: string, messages: readonly EncodeObject[], fee: StdFee | "auto" | number, memo?: string): Promise<DeliverTxResponse> {
    let usedFee: StdFee;
    if (fee === "auto" || typeof fee === "number") {
      const gasEstimation = await this.client.simulate(signerAddress, messages, memo);
      const multiplier = typeof fee === "number" ? fee : 1.3;
      usedFee = calculateFee(Math.round(gasEstimation * multiplier), this.options.gasPrice!);
    } else {
      usedFee = fee;
    }
    const txRaw = await this.sign(signerAddress, messages, usedFee, memo ?? "");
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.client.broadcastTx(txBytes, this.options.broadcastTimeoutMs, this.options.broadcastPollIntervalMs);
  }

  public async sign(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
  ): Promise<TxRaw> {
    const { accountNumber, sequence } = await this.client.getSequence(signerAddress);
    const chainId = await this.client.getChainId();
    const signerData = {
      accountNumber: accountNumber,
      sequence: sequence,
      chainId: chainId,
    };

    return this.signDirect(signerAddress, messages, fee, memo, signerData);
  }

  private async signDirect(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
  ): Promise<TxRaw> {
    if (!isOfflineDirectSigner(this.signer)) {
      throw new Error("Signer must be an OfflineDirectSigner");
    }

    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress,
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkeyBytes = accountFromSigner.pubkey
    // Custom typeUrl for EVMOS
    const pubkey = Any.fromPartial({
      typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
      value: PubKey.encode({
        key: pubkeyBytes
      }).finish(),
    })
    const txBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: messages,
        memo: memo,
      },
    };
    const txBodyBytes = this.client.registry.encode(txBodyEncodeObject);
    const gasLimit = Int53.fromString(fee.gas).toNumber();
    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence }],
      fee.amount,
      gasLimit,
      fee.granter,
      fee.payer,
    );
    const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
    const { signature, signed } = await this.signer.signDirect(signerAddress, signDoc);
    return TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }
}
