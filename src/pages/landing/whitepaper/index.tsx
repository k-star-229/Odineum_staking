import React from "react";
import { motion } from "framer-motion"
import styles from "./Whitepaper.module.scss";

function WhitePaper() {
  return (
    <div className="flex flex-col max-w-1920 mx-auto 3xl:mt-20 pb-8 mt-36 justify-center items-center">
      <motion.div className="relative cursor-pointer flex justify-center xl:hidden"
        id="whitepaper"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0 }
        }}
      >
        <p className={`${styles.title} uppercase`}>whitepaper</p>
        <img src="/img/brush_whitepaper.png" alt="brush whitepaper" className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 w-2/3" />
      </motion.div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex items-center justify-center flex-col w-full">
          <motion.div className="relative cursor-pointer justify-center  hidden xl:flex"
            id="whitepaper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0 }
            }}
          >
            <p className={`${styles.title} uppercase`}>whitepaper</p>
            <img src="/img/brush_whitepaper.png" alt="brush whitepaper" className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 w-4/5" />
          </motion.div>
          <div className="flex gap-2 px-4 sm:px-8 flex-1 items-center">
            <div className="flex gap-4">
              <div className="bg-gradient-to-b from-app-yellow-light to-app-yellow-dark h-90 w-3 flex-shrink-0">{" "}</div>
              <motion.div
                className="text-white text-left text-xl md:text-lg xl:leading-10 2xl:text-xl 2xl:leading-11 3xl:text-2xl 3xl:leading-12 w-full"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p>OUR OFFICIAL WHITEPAPER GOES INTO </p>
                <p>GREAT DETAIL ABOUT ODINEUMS VISION</p>
                <p>AND FUNCTIONALITY.</p>
                <p>SEASONED INVESTORS WILL FIND A MAJORITY</p>
                <p>OF THEIR QUESTIONS ANSWERED HERE.</p>
                <p>ALL UTILITIES ARE EXPLAINED IN DETAIL</p>
                <p>AS WELL AS MARKETING PLANS MOVING FOWARD</p>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <img src="/img/img_whitepaper.png" alt="whitepaper" />
        </div>
      </div>
    </div>
  );
};

export default WhitePaper;