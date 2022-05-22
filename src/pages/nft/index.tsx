import React, { useState } from "react";
import NftHeader from "./nftheader";
import Detail from "./detail";
import Footer from "../../components/footer";
import Lists from "./lists";

function Landing() {
  const [selectedNft, setSelectedNft] = useState<any>();
  const selectNft = (nft: any) => {
    setSelectedNft(nft);
  }
  return (
    <div className="nft-bg">
      <NftHeader />
      <Detail nft={selectedNft} />
      <Lists selectNft={selectNft} />
      <Footer />
    </div>
  );
};

export default Landing;