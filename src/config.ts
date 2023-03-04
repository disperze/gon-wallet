import { AppConfig, getAppConfig, NetworkConfigs } from "./App/services/config/network";
import junoLogo from "./App/assets/tokens/juno.svg";
import croLogo from "./App/assets/tokens/cro.png";

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
  codeId: 4,
  contract: "",
  marketContract: ""
};

const irisnet: AppConfig = {
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
  codeId: 4,
  contract: "",
  marketContract: ""
};

const testnet: AppConfig = {
  chainId: "lucina",
  chainName: "Juno Tesnet",
  addressPrefix: "juno",
  rpcUrl: "https://rpc.juno.giansalex.dev",
  httpUrl: "https://lcd.juno.giansalex.dev",
  token: {
    coinDenom: "JUNO",
    coinDecimals: 6,
    coinMinimalDenom: "ujuno"
  },
  gasPrice: 0.025,
  codeId: 4,
  contract: "juno1gnc0533drmdq2u9d70z0fyr9jg74dd2av9gtxw",
  marketContract: "juno16te3h0x8gnwhlunhh383j2jqsv4q556x22gtj0"
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
    logo: junoLogo,
  },
];

const configs: NetworkConfigs = { local, testnet: irisnet };
export const config = getAppConfig(configs);
