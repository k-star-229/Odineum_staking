import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from "../pages/landing";
import Nft from "../pages/nft";
import Mint from "../pages/mint";
import Setting from "../pages/setting";
import WhitePaper from "../pages/whitepaper";
import Stake from "../pages/stake";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/nft" element={<Nft />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/stake" element={<Stake />} />
        <Route path="/profile" element={<Setting />} />
        <Route path="/whitepaper" element={<WhitePaper />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;