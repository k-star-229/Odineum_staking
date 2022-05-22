import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { toast } from "react-toastify";
import { chainIdToHexString, shortenAddress } from '../../../utils/web3Functions';
import { DefaultNetwork, networkInfo } from '../../../constant';
import { Balance } from "../../../components/balance";
import CustomDropdown from "../../../components/ui/customDropdown";
import { IconBNB } from "../../../utils/Icons";
import styles from "./NftHeader.module.scss";
import { injectedConnector } from "../../mint/header";

const priceType = [
  'USD',
  'ETH'
];

function NftHeader() {
  const { error, account, library, activate, active, connector } = useWeb3React();  
  const [isHamburger, setIsHamburger] = useState<boolean>(false);
  const [price, setPrice] = useState<string>(priceType[0]);
  const [activatingConnector, setActivatingConnector] = useState();
  const headerRef = useRef<HTMLDivElement>(null);
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);


  const changeNetwork = async () => {
    const wa: any = window;
    const { ethereum } = wa;
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdToHexString(DefaultNetwork) }],
      });
    } catch (switchError) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const error = JSON.parse(JSON.stringify(switchError));
      if (
        error.code === 4902 ||
        (error.code === -32603 && error?.data?.originalError.code === 4902)
      ) {
        try {
          const item = networkInfo[DefaultNetwork];
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdToHexString(DefaultNetwork),
                chainName: item.label,
                rpcUrls: [item.rpcUrl],
                nativeCurrency: {
                  name: item.nativeCurrency,
                  symbol: item.nativeCurrency,
                  decimals: 18
                },
                blockExplorerUrls: [item.explorer],
              },
            ],
          });
          console.log('done');
        } catch (addError) {
          console.log('addError', addError);
        }
      }
    }
  };


  useEffect(() => {
    setWrongNetwork(isUnsupportedChainIdError);
  }, [isUnsupportedChainIdError]);

  useEffect(() => {
    if (wrongNetwork) changeNetwork();
  }, [wrongNetwork]);

  const handleClickOutside = (event: any) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      if (isOpen) setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  });

  const connectWallet = async () => {
    try {
      await activate(injectedConnector);

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={styles.navbar}>
        <div className="flex items center">
          <div className="flex items-center z-10 mr-8">
            <Link to="/">
              <img src="img/logo.png" alt="logo" className={styles.logo} />
            </Link>
            <h1 className="ml-4"><span>NFT</span> MARKETPLACE</h1>
          </div>
          {/* <CustomDropdown selected={price} lists={priceType} handleSelect={(item) => setPrice(item)} /> */}
        </div>
        <div className="flex items-center">
          <button
            type="button" className={styles.walletBtn}
            onClick={connectWallet}
          >
            {active && account ? `${shortenAddress(account)}` : 'CONNECT WALLET'}
          </button>
          {active &&
            <button type="button" onClick={() => setIsOpen(!isOpen)} className={`${styles.hamburger} ${isHamburger ? styles.active : ''}`}>
              <span />
              <span />
              <span />
            </button>
          }
          {isOpen && (
            <div
              className={`${styles.dropdown} z-10 origin-topRight absolute w-5 min-w-max py-4 px-12 rounded-md shadow-lg bg-gray ring-1 ring-black ring-opacity-5 focus:outline-none bg-body`}
              ref={headerRef}
            >
              <div className="py-1" role="none">
                <div className="flex justify-center items-center border border-white-400 mb-4 p-3 rounded-2xl cursor-pointer">
                  <div className="text-white text-black p-0">
                    <IconBNB />
                  </div>
                  <div className="flex flex-col items-center mx-4 uppercase text-sm text">
                    <p>Balance</p>
                    <div className="text-white text-black">
                      <Balance />
                      ETH
                    </div>
                  </div>
                </div>
                <Link to="/mint"
                  className="flex items-center justify-start text-2xl hover:text-white hover:text-black text-left mb-4 hover:text-gray-500"
                >
                  My NFT list
                </Link>
                <Link to="/profile"
                  className="flex items-center justify-start text-2xl hover:text-white hover:text-black text-left hover:text-gray-500"
                >
                  Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NftHeader;

