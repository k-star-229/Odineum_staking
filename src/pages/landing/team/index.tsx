import React from "react";
import { motion } from "framer-motion"
import styles from "./Team.module.scss";

function Team() {
  return (
    <div className="flex flex-col px-2 sm:px-8 max-w-1920 mx-auto justify-center items-center mt-20 lg:mt-32">
      <motion.div className="relative cursor-pointer flex justify-center"
        id="team"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0 }
        }}
      >
        <p className={`${styles.title} uppercase`}>Team</p>
        <img src="/img/brush_team.png" alt="brush team" className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 w-full" />
      </motion.div>
      <div className="flex flex-col gap-4 sm:gap-8 xl:gap-12 mt-12 lg:mt-32">
        <motion.div className=""
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={{
            visible: { opacity: 1, scale: 1, rotate: 0 },
            hidden: { opacity: 0, scale: 0.5, rotate: 10 }
          }}
        >
          <img src="/img/img_team.png" alt="team" />
        </motion.div>
        <div className="flex justify-around text-white uppercase text-base tiny:text-lg sm:text-xl md:text-2xl">
          <div className="flex flex-col sm:gap-2 xl:gap-4 items-center justify-center">
            <p>AJR</p>
            <div className="w-8 sm:w-12 xl:w-20 h-1 sm:h-2 bg-gradient-to-r from-app-yellow-dark to-app-yellow-light">{" "}</div>
            <p>Community lead</p>
          </div>
          <div className="flex flex-col sm:gap-2 xl:gap-4 items-center justify-center">
            <p>SCOTT</p>
            <div className="w-8 sm:w-12 xl:w-20 h-1 sm:h-2 bg-gradient-to-r from-app-yellow-dark to-app-yellow-light">{" "}</div>
            <p>Founder/ marketer</p>
          </div>
          <div className="flex flex-col sm:gap-2 xl:gap-4 items-center justify-center">
            <p>ALEXI</p>
            <div className="w-8 sm:w-12 xl:w-20 h-1 sm:h-2 bg-gradient-to-r from-app-yellow-dark to-app-yellow-light">{" "}</div>
            <p>Graphic designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;