import { AppConfig, getAppConfig, NetworkConfigs } from "./App/services/config/network";
import irisToken from "./App/assets/tokens/iris.svg";

const local: AppConfig = {
  chainId: "testing",
  chainName: "Testing",
  addressPrefix: "juno",
  rpcUrl: "http://localhost:26657",
  httpUrl: "http://localhost:1317",
  token: {
    coinDenom: "STAKE",
    coinDecimals: 6,
    coinMinimalDenom: "ustake"
  },
  gasPrice: 0.025,
  keplrFeatures: ['ibc-transfer', 'cosmwasm'],
  channels: [],
};

const testnet: AppConfig = {
  chainId: "gon-irishub-1",
  chainName: "IRIS GoN",
  addressPrefix: "iaa",
  rpcUrl: "http://34.80.93.133:26657",
  httpUrl: "http://34.80.93.133:1317",
  token: {
    coinDenom: "IRIS",
    coinDecimals: 6,
    coinMinimalDenom: "uiris"
  },
  gasPrice: 0.025,
  keplrFeatures: ['ibc-transfer'],
  channels: [{
    id: "juno",
    channel: "channel-24",
    port: "nft-transfer",
  }, {
    id: "stars",
    channel: "channel-22",
    port: "nft-transfer",
  }, {
    id: "uptick",
    channel: "channel-17",
    port: "nft-transfer",
  }, {
    id: "omniflix",
    channel: "channel-0",
    port: "nft-transfer",
  }],
};

export interface Token {
  readonly denom: string;
  readonly name: string;
  readonly decimals: number;
  readonly logo?: string
}

export const coins: Token[] = [
  {
    denom: "uiris",
    name: "IRIS",
    decimals: 6,
    logo: irisToken,
  },
];

const configs: NetworkConfigs = { local, testnet };
export const config = getAppConfig(configs);
