export interface Currency {
  readonly coinDenom: string;
  readonly coinMinimalDenom: string;
  readonly coinDecimals: number;
  /**
   * This is used to fetch asset's fiat value from coingecko.
   * You can get id from https://api.coingecko.com/api/v3/coins/list.
   */
  readonly coinGeckoId?: string;
  readonly coinImageUrl?: string;
}

export interface Channel {
  readonly id: string;
  readonly channel: string;
  readonly port: string;
}

export interface AppConfig {
  readonly chainId: string;
  readonly chainName: string;
  readonly coinType?: number;
  readonly addressPrefix: string;
  readonly rpcUrl: string;
  readonly httpUrl: string;
  readonly token: Currency;
  readonly gasPrice: number;
  readonly codeId?: number;
  readonly contract?: string;
  readonly marketContract?: string;
  readonly keplrFeatures: string[];
  readonly channels: Channel[];
  readonly explorerTx?: string;
}

export interface NetworkConfigs {
  readonly testnet: AppConfig;
  readonly [key: string]: AppConfig;
}

export function getAppConfig(configs: NetworkConfigs): AppConfig {
  const network = process.env.REACT_APP_NETWORK;
  if (!network) return configs.testnet;

  const config = configs[network];
  if (!config) {
    throw new Error(`No configuration found for network ${network}`);
  }

  return config;
}

export function configKeplr(config: AppConfig) {
  return {
    chainId: config.chainId,
    chainName: config.chainName,
    rpc: config.rpcUrl,
    rest: config.httpUrl,
    bech32Config: {
      bech32PrefixAccAddr: `${config.addressPrefix}`,
      bech32PrefixAccPub: `${config.addressPrefix}pub`,
      bech32PrefixValAddr: `${config.addressPrefix}valoper`,
      bech32PrefixValPub: `${config.addressPrefix}valoperpub`,
      bech32PrefixConsAddr: `${config.addressPrefix}valcons`,
      bech32PrefixConsPub: `${config.addressPrefix}valconspub`,
    },
    currencies: [config.token],
    feeCurrencies: [config.token],
    stakeCurrency: config.token,
    gasPriceStep: {
      low: config.gasPrice / 2,
      average: config.gasPrice,
      high: config.gasPrice * 2,
    },
    bip44: { coinType: config.coinType ?? 118 },
    coinType: config.coinType ?? 118,
    features: config.keplrFeatures,
  };
}
