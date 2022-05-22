import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconTwitter, IconDiscord, IconTelegram } from "../../constant/Icons";
import styles from "./Header.module.scss";

function Header() {
  const [isHamburger, setIsHamburger] = useState<boolean>(false);
  return (
    <>
      <div className={`${styles.navbar} bg-black bg-opacity-40 lg:bg-transparent items-center`}>
        <img src="img/logo.png" alt="logo" className={styles.logo} />
        <div className={`${styles.menu}  ${isHamburger && styles.active}`}>
          <ul>
            <li className="">
              <Link to="/">Home</Link>
            </li>
            <li className="lg:border-2 border-yellow rounded-full">
              <Link to="/nft">NFT</Link>
            </li>
            <li className="lg:border-2 border-yellow rounded-full">
              <Link to="/mint">MINT</Link>
            </li>
            <li className="lg:border-2 border-yellow rounded-full">
              <Link to="/Stake">STAKE</Link>
            </li>
            <li>
              <a href="#roadmap" className="flex items-center">ROADMAP</a>
            </li>
            <li>
              <a href="#tokenomic" className="flex items-center">TOKENOMICS</a>
            </li>
            <li>
              <a href="#chart" className="flex items-center">CHART</a>
            </li>
            <li>
            <Link to="/whitepaper">WHITEPAPER</Link>             
            </li>
          </ul>
        </div>
        {/* <div className={styles.socialgroup}>
          <div className="relative">
            <img src="img/socialbg.png" alt="social" />
            <div className={styles.socialitems}>
              <div>
                <a href="https://twitter.com/OdineumOfficial">
                  <IconTwitter color='white' />
                </a>
              </div>
              <div>
                <Link to="/">
                  <IconDiscord color='white' />
                </Link>
              </div>
              <div>
                <a href="https://t.me/Odineum">
                  <IconTelegram color='white' />
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <button type="button" onClick={() => setIsHamburger(!isHamburger)} className={`${isHamburger && styles.active}`}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </>
  );
};

export default Header;