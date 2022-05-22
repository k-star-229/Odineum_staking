import React from "react";
import Banner from "./banner";
import Nft from "./nft";
import RoadMap from "./roadmap";
import Tokenomic from "./tokenomics";
import Chart from "./chart";
import Header from "../../components/header";
import WhitePaper from "./whitepaper";
import Team from "./team";
import Footer from "../../components/footer";

function Landing() {
  return (
    <div className="landing-bg">
      <Header />
      <Banner />
      <Nft />
      <RoadMap />
      <Tokenomic />
      <Team />
      <WhitePaper />
      <Footer />
    </div>
  );
};

export default Landing;