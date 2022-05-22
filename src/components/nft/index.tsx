import React from "react";
import { usePriceContext } from "../../context/usePrice";
import styles from "./NftItem.module.scss";

declare type NftProps = {
  imageUrl: string,
  title: string,
  price: number,
  paymentType: string
}
const Nft = ({ imageUrl, title, price, paymentType }: NftProps) => {
  const { bnbToUSD, bcToUSD } = usePriceContext();
  return (
    <div className={`flex flex-col justify-center items-center ${styles.container}`}>
      <div className={styles.nft} style={{ backgroundImage: `url(${imageUrl})` }} />
      <h5>{title}</h5>
      <h6>{price}<span>{paymentType}</span> (${ paymentType === "ETH" ? (price * bnbToUSD).toFixed(3) : (price * bcToUSD).toFixed(3) })</h6>
    </div>
  );
}
export default Nft;