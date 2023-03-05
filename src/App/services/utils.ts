import { DeliverTxResponse } from "@cosmjs/cosmwasm-stargate";
import { isDeliverTxFailure } from "@cosmjs/stargate";
import { coins, Token } from "../../config";

export function formatAddress(wallet: string): string {
  return ellideMiddle(wallet, 24);
}

export function ellideMiddle(str: string, maxOutLen: number): string {
  if (str.length <= maxOutLen) {
    return str;
  }
  const ellide = "…";
  const frontLen = Math.ceil((maxOutLen - ellide.length) / 2);
  const tailLen = Math.floor((maxOutLen - ellide.length) / 2);
  return str.slice(0, frontLen) + ellide + str.slice(str.length - tailLen, str.length);
}

export function getTokenConfig(denom: string): Token|undefined {
  return coins.find(c => c.denom === denom);
}

export function formatPrice(price: {amount: string, denom: string}): string {
  const coin = getTokenConfig(price.denom)!;
  const amount = parseInt(price.amount) / Math.pow(10, coin.decimals);

  return amount + " " + coin.name;
}

export function toMinDenom(amount: number, denom: string): string {
  const coin = getTokenConfig(denom)!;
  return Math.ceil(amount * Math.pow(10, coin.decimals)).toString();
}

export function normalizeImg(uri: string): string {
  return uri?.endsWith(".png") || uri?.endsWith(".jpg") || uri?.endsWith(".jpeg") ? uri : "";
}

export function createDeliverTxResponseErrorMessage(result: DeliverTxResponse): string {
  return `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`;
}

export function assertTxSuccess(result: DeliverTxResponse) {
  if (isDeliverTxFailure(result)) {
    throw new Error(createDeliverTxResponseErrorMessage(result));
  }
}
