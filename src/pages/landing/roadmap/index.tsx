import React, { useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from "framer-motion";
// import Modal from '../modal';
import 'react-vertical-timeline-component/style.min.css';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import { RiCloseLine } from "react-icons/ri";
import styles from "./RoadMap.module.scss";
import imgNFT from "../../../assets/breakdown_view.png";
import ModalStyles from "./Modal.module.css";

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     height: '90vh',
//     transform: 'translate(-50%, -50%)'
//   },
// };

function RoadMap() {
  const [open, setOpen] = useState<boolean>(false);
  
  const handleView = () => {
    setOpen(true);
  }
  const closeModal = () => {
    setOpen(false);
  }
  return (
    <div className="relative mt-32 ">
      <div className="max-w-1920 mx-auto flex items-start">
        <motion.div className="relative cursor-pointer flex justify-start px-8 transform xl:translate-y-full items-center" id="roadmap"
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0 }
          }}
        >
          <p className={styles.title}>ROADMAP</p>
          <img src="/img/brush_roadmap.png" alt="brush roadmap" className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 w-1/2" />
        </motion.div>
      </div>
      {/* <Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <button type="button" onClick={ closeModal }>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <img src={imgNFT} className="w-full h-full p-0" alt="viewNFT"/>
      </Modal> */}
      <Popup open={open} position="right center" onClose={() => setOpen(false)}>
        <img src={imgNFT} alt="viewNFT"/>
      </Popup>
      <div className="relative">
        <img src="/img/img_roadmap.png" alt="roadmap" className="w-full" />
        <div className="absolute container mx-auto bottom-0 lg:bottom-36 flex items-end justify-end w-full left-1/2 transform -translate-x-1/2 px-4 sm:px-8 2xl:-translate-y-20 3xl:-translate-y-32 md:-bottom-24">
          <div className="bottom-0 right-0 flex flex-col items-end justify-end gap-12 ">
            <div className="uppercase text-center text-white text-xl flex justify-center flex-col items-center px-4 sm:px-8">
              <p className="whitespace-nowrap">View NFT</p>
              <p>Breakdown</p>
              <p>(pdf)</p>
              <motion.button
                className="px-14 py-3 bg-app-cyan rounded-full mt-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={ () => handleView() }
              >
                View
              </motion.button>
            </div>
            <div className="gap-4 text-white uppercase text-xl hidden md:flex">
              <motion.div
                className="text-white text-right text-xl xl:leading-10 2xl:text-xl 2xl:leading-11 3xl:text-2xl 3xl:leading-12"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h6 className="font-bold">ODINEUMS UTILITY WILL BE RELEASED IN WAVES,<br />
                  STARTING WITH ONE PROJECT, THEN MOVING ON TO<br />
                  THE NEXT EVENTUALLY HAVING AN ENTIRE PLATFORM<br />
                  THAT COVERS A WIDE RANGE OF USE CASES<br />
                  AND SERVICES IN THE<br />
                  CRYPTO SPHERE.</h6>
              </motion.div>
              <div className="bg-gradient-to-b from-app-yellow-light to-app-yellow-dark h-90 w-3 flex-shrink-0">{" "}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 text-white uppercase text-xl md:hidden mt-12 px-4">
        <motion.div
          className="text-white text-right text-xl xl:leading-10 2xl:text-xl 2xl:leading-11 3xl:text-2xl 3xl:leading-12"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h6 className="font-bold">ODINEUMS UTILITY WILL BE RELEASED IN WAVES,<br />
            STARTING WITH ONE PROJECT, THEN MOVING ON TO<br />
            THE NEXT EVENTUALLY HAVING AN ENTIRE PLATFORM<br />
            THAT COVERS A WIDE RANGE OF USE CASES<br />
            AND SERVICES IN THE<br />
            CRYPTO SPHERE.</h6>
        </motion.div>
        <div className="bg-gradient-to-b from-app-yellow-light to-app-yellow-dark h-90 w-3 flex-shrink-0">{" "}</div>
      </div>
    </div>
  );
};

export default RoadMap;