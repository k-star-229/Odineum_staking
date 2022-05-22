import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { PROVIDER_URL, supportedChainIds } from "../constant";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  97: PROVIDER_URL,
  56: "https://bsc-dataseed.binance.org/",
  4: "https://rinkeby.infura.io/v3/e254d35aa64b4c16816163824d9d5b83",
};

export const network = new NetworkConnector({
  urls: { 97: RPC_URLS[97], 56: RPC_URLS[56], 4: RPC_URLS[4] },
  // urls: { 80001: RPC_URLS[80001], 4: RPC_URLS[4] },
  defaultChainId: supportedChainIds[0],
});

export const injected = new InjectedConnector({
  supportedChainIds,
});
