import React from "react";
import { Link } from "react-router-dom";
import styles from "./Chart.module.scss";

function Chart() {
  return (
    <div className={`flex flex-col items-center ${styles.container}`} id="chart">
      <Link to="/">CHART <img src="img/arrowRight.png" alt="arrow" /></Link>
      <Link to="/whitepaper">WHITEPAPER <img src="img/arrowRight.png" alt="arrow" /></Link>
    </div>
  );
};

export default Chart;