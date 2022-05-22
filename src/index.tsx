import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from '@ethersproject/providers';
import Web3ReactManager from "./context/Web3ReactManager";
import reportWebVitals from "./reportWebVitals";
import { PriceProvider } from "./context/usePrice";
import App from "./App";
import "./index.scss";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactManager>
        <PriceProvider>
          <App />
        </PriceProvider>
      </Web3ReactManager>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
