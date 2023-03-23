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
  explorerTx: 'https://gon.ping.pub/iris/tx/',
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

const juno: AppConfig = {
  chainId: "uni-6",
  chainName: "JUNO Testnet",
  addressPrefix: "juno",
  rpcUrl: "https://rpc.juno.giansalex.dev",
  httpUrl: "https://lcd.juno.giansalex.dev",
  explorerTx: 'https://blueprints.juno.giansalex.dev/#/transactions/',
  token: {
    coinDenom: "JUNO",
    coinDecimals: 6,
    coinMinimalDenom: "ujunox"
  },
  gasPrice: 0.025,
  keplrFeatures: ['ibc-transfer', 'cosmwasm'],
  channels: [{
    id: "iaa",
    channel: "channel-89",
    port: "wasm.juno1stv6sk0mvku34fj2mqrlyru6683866n306mfv52tlugtl322zmks26kg7a",
  }, {
    id: "stars",
    channel: "channel-120",
    port: "wasm.juno1stv6sk0mvku34fj2mqrlyru6683866n306mfv52tlugtl322zmks26kg7a",
  }, {
    id: "uptick",
    channel: "channel-86",
    port: "wasm.juno1stv6sk0mvku34fj2mqrlyru6683866n306mfv52tlugtl322zmks26kg7a",
  }, {
    id: "omniflix",
    channel: "channel-91",
    port: "wasm.juno1stv6sk0mvku34fj2mqrlyru6683866n306mfv52tlugtl322zmks26kg7a",
  }],
};

const stars: AppConfig = {
  chainId: "elgafar-1",
  chainName: "Stargaze GoN",
  addressPrefix: "stars",
  rpcUrl: "https://rpc.elgafar-1.stargaze-apis.com",
  httpUrl: "https://rest.elgafar-1.stargaze-apis.com",
  explorerTx: 'https://gon.ping.pub/stargaze/tx/',
  token: {
    coinDenom: "STARS",
    coinDecimals: 6,
    coinMinimalDenom: "ustars"
  },
  gasPrice: 0.025,
  keplrFeatures: ['ibc-transfer', 'cosmwasm'],
  channels: [{
    id: "iaa",
    channel: "channel-207",
    port: "wasm.stars1ve46fjrhcrum94c7d8yc2wsdz8cpuw73503e8qn9r44spr6dw0lsvmvtqh",
  }, {
    id: "juno",
    channel: "channel-230",
    port: "wasm.stars1ve46fjrhcrum94c7d8yc2wsdz8cpuw73503e8qn9r44spr6dw0lsvmvtqh",
  }, {
    id: "uptick",
    channel: "channel-203",
    port: "wasm.stars1ve46fjrhcrum94c7d8yc2wsdz8cpuw73503e8qn9r44spr6dw0lsvmvtqh",
  }, {
    id: "omniflix",
    channel: "channel-209",
    port: "wasm.stars1ve46fjrhcrum94c7d8yc2wsdz8cpuw73503e8qn9r44spr6dw0lsvmvtqh",
  }],
};

const omniflix: AppConfig = {
  chainId: "gon-flixnet-1",
  chainName: "Omniflix GoN",
  addressPrefix: "omniflix",
  rpcUrl: "http://65.21.93.56:26657",
  httpUrl: "http://65.21.93.56:1317",
  explorerTx: 'https://gon.ping.pub/omniflix/tx/',
  token: {
    coinDenom: "FLIX",
    coinDecimals: 6,
    coinMinimalDenom: "uflix"
  },
  gasPrice: 0.025,
  keplrFeatures: ['ibc-transfer'],
  channels: [{
    id: "iaa",
    channel: "channel-24",
    port: "nft-transfer",
  }, {
    id: "juno",
    channel: "channel-46",
    port: "nft-transfer",
  }, {
    id: "uptick",
    channel: "channel-41",
    port: "nft-transfer",
  }, {
    id: "stars",
    channel: "channel-44",
    port: "nft-transfer",
  }],
};

const uptick: AppConfig = {
  chainId: "uptick_7000-2",
  chainName: "Uptick GoN",
  addressPrefix: "uptick",
  coinType: 60,
  rpcUrl: "http://185.252.235.216:8084",
  httpUrl: "http://52.220.252.160:1317",
  explorerTx: 'https://explorer.testnet.uptick.network/uptick-network-testnet/tx/',
  token: {
    coinDenom: "UPTICK",
    coinDecimals: 18,
    coinMinimalDenom: "auptick"
  },
  gasPrice: 25000000000,
  keplrFeatures: ['ibc-transfer', 'eth-address-gen', 'eth-key-sign',],
  channels: [{
    id: "juno",
    channel: "channel-7",
    port: "nft-transfer",
  }, {
    id: "stars",
    channel: "channel-6",
    port: "nft-transfer",
  }, {
    id: "iaa",
    channel: "channel-3",
    port: "nft-transfer",
  }, {
    id: "omniflix",
    channel: "channel-5",
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

export const networks: NetworkConfigs = { local, testnet, iaa: testnet, juno, stars, omniflix, uptick };
export const config = getAppConfig(networks);
