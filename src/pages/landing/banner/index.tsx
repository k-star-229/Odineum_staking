import React from "react";
import Typing from 'react-typing-animation';
import { motion } from "framer-motion"
import styles from "./Banner.module.scss";

function Banner() {
  return (
    <>
      <div className={`flex justify-start py-24 px-8 md:px-28 max-w-1920 mx-auto ${styles.banner}`}>
        <div className={`flex flex-col justify-center items-center w-2/3 ${styles.bannerIntro}`}>
          <h3 className="shadow-lg">WELCOME TO</h3>
          <div className="relative">
            <p>ODINEUM</p>
          </div>
          <h4 className="text-center">ORGANIZING DEFI. </h4> 
          <h4 className="text-center">TIERED NFT STAKING AND REWARDS </h4>
          <h4 className="text-center">COLLECT STAKE EARN</h4>
          <div>
            <ul className="flex gap-4 mt-6">
              <li>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a href="https://twitter.com/OdineumOfficial" target="_blank" rel="noreferrer">
                    <img src="/img/ico_twitter.png" alt="twitter" />
                  </a>
                </motion.button>
              </li>
              <li>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a href="https://discord.gg/6DewFA5d" target="_blank" rel="noreferrer">
                    <img src="/img/ico_discord.png" alt="discord" />
                  </a>
                </motion.button>
              </li>
              <li>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a href="https://t.me/Odineum" target="_blank" rel="noreferrer">
                    <img src="/img/ico_telegram.png" alt="telegram" />
                  </a>
                </motion.button>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative hidden">
          <img src="img/Ebene 6.png" alt="nftBg" />
          <img src="img/Ebene 7.png" alt="nft" className={styles.bannerNft} />
        </div>
      </div>
    </>
  );
};

export default Banner;