import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className="bg-black bg-opacity-40 pt-10 pb-8 xl:py-20">
      <div className="max-w-1920 mx-auto flex flex-col xl:flex-row justify-between items-center text-white relative gap-2 sm:gap-8 px-4 sm:px-8">
        <div className="w-full xl:w-max flex gap-2 sm:gap-8 lg:gap-16 2xl:gap-16 3xl:gap-8 justify-around ">
          <div className="flex flex-col uppercase items-start gap-4">
            <p className="text-lg 3xl:text-xl text-left">quick links</p>
            <Link to="https://odineum.app/" >Home</Link>
            <Link to="/nft">NFTS</Link>
            <a href="#roadmap" className="flex items-center">ROADMAP</a>
            <a href="#tokenomic" className="flex items-center">TOKENOMICS</a>
            <a href="/whitepaper" className="flex items-center">WHITEPAPER</a>
            {/* <Link to="/">ROADMAP</Link>
            <Link to="/">TOKENOMICS</Link>
            <Link to="/">TEAM</Link>
            <Link to="/">WHITEPAPER</Link> */}
          </div>          
          <div className="flex flex-col uppercase items-start gap-4">
            <p className="text-lg 3xl:text-xl">Dapps</p>
            <Link to="/nft" >NFT market</Link>
            <Link to="/stake">staking</Link>
            <Link to="/mint">mint page</Link>
          </div>
        </div>
        <div className="absolute left-1/2 top-2/3 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center flex-col xl:flex hidden">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/img/logo.png" alt="logo" />
          </motion.button>
          <p className="mt-6">stay in touch</p>
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
        <div className=" flex-col justify-center items-end text-right xl:flex hidden">
          <p>ODINEUM IS A REFLECTIONARY TOKEN THAT UTILIZES<br />
            A STAKING PROTOCOL AND A TIERED<br />
            BASED NFT REWARDS SYSTEM TO MAXIMIZE<br />
            PASSIVE EARNINGS</p>

          <div className="bg-white w-1/2 h-2 my-4">{" "}</div>
          <p>
            COPYRIGHT ODINEUM 2022-2023
          </p>
          <p>
            ALL RIGHTS RESERVED
          </p>
        </div>
        <div className="flex flex-col xl:hidden justify-center items-center w-full gap-8">
          <div className="flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src="/img/logo.png" alt="logo" />
            </motion.button>
            <p className="mt-6">stay in touch</p>
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
          <div className="flex justify-between w-full">
            <p className="text-left">
              COPYRIGHT ODINEUM 2022-2023
            </p>
            <p className="text-right">
              ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;