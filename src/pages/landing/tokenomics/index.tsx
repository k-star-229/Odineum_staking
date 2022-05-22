import React from "react";
import { motion } from "framer-motion"
import styles from "./Tokenomic.module.scss";

function Tokenomic() {
  return (
    <>
      <div className="flex flex-col max-w-1920 mx-auto gap-12 sm:mt-32">
        <div className="flex flex-col xl:flex-row-reverse xl:gap-4 ">
          <div className="w-full xl:w-2/3 flex justify-center items-center">
            <motion.div className="relative cursor-pointer flex justify-center"
              id="tokenomic"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0 }
              }}
            >
              <p className={styles.title}>TOKENOMICS</p>
              <img src="/img/brush_tokenomics.png" alt="brush tokenomics" className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 w-1/5" />
            </motion.div>
          </div>
          <div className="flex items-center justify-center px-4 sm:px-8 sm:mt-12 lg:mt-32 xl:mt-0">
            <div className="flex gap-4">
              <div className="bg-gradient-to-b from-app-yellow-light to-app-yellow-dark h-90 w-3 flex-shrink-0">{" "}</div>
              <motion.div
                className="text-white text-left text-xl xl:leading-10 2xl:text-xl 2xl:leading-11 3xl:text-2xl 3xl:leading-12"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h6 className="font-bold 3xl:whitespace-nowrap">THERE ARE 5 NFTS IN TOTAL YOU CAN COLLECT<br />
                  EACH ONE PERTAINING TO A DIFFERENT AMOUNT<br />
                  OF REFLECTIONS. THESE 5 NFTS ALSO CREATE<br />
                  10 DIFFERENT SETS THAT CAN BE USED<br />
                  TO EARN STAKING REWARDS.</h6>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-4">
          <div className="w-full lg:w-2/3 flex items-center justify-center">
            <img src="/img/img_tokenomic.png" alt="tokenomic" />
          </div>
          <div className="flex items-center justify-center w-full lg:w-1/3 px-4 sm:px-8">
            <div className="flex gap-2">
              <div className="text-white text-left text-xl xl:leading-10 2xl:text-xl 2xl:leading-11 3xl:text-2xl 3xl:leading-12">
                <p>TOTAL SUPPLY - 309 MILLION</p>
                <div className="bg-gradient-to-r from-app-yellow-light to-app-yellow-dark h-2 w-1/4 my-2">{" "}</div>
                <h6 className="font-bold">SLIPPAGE 14%<br />
                  1% AUTO LIQUIDITY<br />
                  5% STAKING PROTOCOL<br />
                  UP TO 5% REFLECTIONS<br />
                  REMAINDER = CORPORATE/<br />
                  PROJECT WALLET</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Tokenomic;