import axios from 'axios';
import React, { useState, createContext, useEffect, useContext } from 'react';

interface PriceProps {
  bnbToUSD: number;
  bcToUSD: number;
  updatePrice: (paymentType: string) => void;
}
const PriceContext = createContext<PriceProps>({} as PriceProps);

export const PriceProvider: React.FC = ({ children }) => {
  const [bnbToUSD, setBbnPrice] = useState<number>(0);
  const [bcToUSD, setBcPrice] = useState<number>(0);

  const updatePrice = () => {
    const token = "binancecoin";
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`
      )
      .then((res) => {
        // console.log("res:", res);
        if (res?.status === 200) {
          const curRate = res.data[token]?.usd;
          setBbnPrice(curRate);
        } else {
          console.log("not found price");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updatePrice();
  },[])

  return (
    <PriceContext.Provider
      value={{ bnbToUSD, bcToUSD, updatePrice }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export const usePriceContext = () => useContext(PriceContext);
