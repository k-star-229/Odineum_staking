/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { parseUnits, formatEther } from "@ethersproject/units";
import { Contract } from '@ethersproject/contracts';
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { usePriceContext } from "../../../context/usePrice";
import NFT_INFO from '../../../artifacts/contracts/OdinNFT.sol/ODINNFT.json';
import Market_INFO from '../../../artifacts/contracts/OdinMarketplace.sol/OdinMarketplace.json';
import TOKEN_INFO from '../../../artifacts/contracts/Odin.sol/Odin.json';
import { firestore } from "../../../firebase";
import { injectedConnector } from "../../mint/header";
import styles from "./Detail.module.scss";
import { useNftContext } from "../../../context/NftList";
import { IconClose } from "../../../utils/Icons";

interface RenderProps {
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  completed: any;
}

function Detail({ nft }: any) {
  const { bnbToUSD, updatePrice } = usePriceContext();
  // const { NftList, setNftList } = useNftContext();
  const [user, setUser] = useState<any>();
  const { error, account, library, activate, active, connector } = useWeb3React();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentNft, setCurrentNft] = useState<any>(nft);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [price, setPrice] = useState(0);
  const [nftLists, setNftLists] = useState<any>([]);
  const getUser = async () => {
    if (currentNft) {
      const res = await (await firestore.collection("users").doc(currentNft.owner).get()).data();
      if (res) {
        setUser(res);
      }
    }
  }

  const connectWallet = async () => {
    try {
      await activate(injectedConnector);

    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentNft = async () => {
    if (nft) {
      const res = (await firestore.collection("nftCollection").doc(nft.id).get()).data();
      setCurrentNft(res);
    }
  }

  const getMyNFTs = async () => {
    await firestore.collection("nftCollection").where("isSale", "==", true).get().then((querySnapshot) => {
      const nftList: any = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const temp = { ...data };
        nftList.push(temp);
      });
      // selectNft(nftList[0]);
      setNftLists(nftLists);
    });
  }

  useEffect(() => {
    getUser();
  }, [currentNft])

  useEffect(() => {
    if (nft) {
      setCurrentNft(nft);
      const nftPrice = nft.price * 1.1;
      setPrice(Number(nftPrice.toFixed(2)));
    }
  }, [nft])

  useEffect(() => {
    getMyNFTs();
  }, []);

  useEffect(() => {
    if (!currentNft)
      setCurrentNft(nftLists[0]);
  }, [nftLists]);

  const renderer = ({ days, hours, minutes, seconds, completed }: RenderProps) => (
    <div>
      {days} Days {hours}:{minutes}:{seconds}
    </div>
  );

  const buyNFT = async () => {
    if (active) {
      if (account === currentNft.owner) {
        toast.error('You cannot buy your nft');
        return;
      }
      if (account) {
        const checkUser = (await firestore.collection('users').doc(account).get()).data();
        if (!checkUser?.nickName) {
          toast.warning('Please complete your profile first!');
          return;
        }
      }
      const contract = new Contract(
        process.env.REACT_APP_MARKET_ADDRESS || '',
        Market_INFO.abi,
        library.getSigner(),
      );
      const nftContract = new Contract(
        process.env.REACT_APP_NFT_ADDRESS || '',
        NFT_INFO.abi,
        library.getSigner(),
      );

      // check if the wallet is approved to contract
      const isApproved = await nftContract.isApprovedForAll(
        account,
        process.env.REACT_APP_MARKET_ADDRESS,
      );
      if (!isApproved) {
        const approve = await nftContract.setApprovalForAll(
          process.env.REACT_APP_MARKET_ADDRESS,
          true,
        );
        await approve.wait();
      }
      if (currentNft.paymentType === "ETH") {
        try {
          const res = await contract.buy(
            currentNft.tokenId,
            ethers.utils.parseUnits(currentNft.price.toString(), 18),
            currentNft.paymentType,
            { from: account, value: ethers.utils.parseUnits(currentNft.price.toString(), 18) }
          );
          res
            .wait()
            .then(async () => {
              toast.success('You buy the NFT successfully');
              const ress = await firestore.collection("nftCollection").doc(String(currentNft.tokenId)).update({
                owner: account,
                isSale: false,
                time: 0,
                auctionLength: 0,
                saleType: "auction"
              });
              console.log(ress);
              const nftData = await (await firestore.collection("nftCollection").doc(String(currentNft.tokenId)).get()).data();
              setCurrentNft(nftData);
            })
        } catch (err: any) {
          toast.error('Buying failed');
          console.log(err);
        }
      } else {
        const tokenContract = new Contract(
          process.env.REACT_APP_TOKEN_ADDRESS || '',
          TOKEN_INFO.abi,
          library.getSigner()
        );

        const tokenBalance = await tokenContract.balanceOf(account);
        if(tokenBalance < parseUnits(price.toString())) {
          toast.error("No have sufficient funds");
          return;
        }
        const approve = await tokenContract.approve(
          process.env.REACT_APP_MARKET_ADDRESS,
          parseUnits(currentNft.price.toString())
        );
        await approve.wait();
        const res = await contract.buy(
          currentNft.tokenId,
          parseUnits(currentNft.price.toString()),
          currentNft.paymentType
        );
      }
    }
  }

  const bidNft = async () => {
    if (account) {
      const checkUser = (await firestore.collection('users').doc(account).get()).data();
      if (!checkUser?.nickName) {
        toast.warning('Please complete your profile first!');
        return;
      }
    }
    if (active) {
      setIsProcessing(true);
      if (account === currentNft.owner) {
        toast.error('You cannot buy your nft');
        return;
      }
      const contract = new Contract(
        process.env.REACT_APP_MARKET_ADDRESS || '',
        Market_INFO.abi,
        library.getSigner(),
      );
      // check if the wallet is approved to contract    
      let auctionInfo = await contract.auctions(currentNft.tokenId);
      console.log(auctionInfo)
      if (
        price <= currentNft.price ||
        (parseFloat(auctionInfo.amount) > 0 && price < currentNft.price * 1.1)
      ) {
        toast.error("Bid amount must not less than minimum bid");
        setIsProcessing(false);
        setShowModal(false);
        return;
      }

      try {
        let res;
        if (currentNft.paymentType === "ETH") {
          res = await contract.createBid(
            currentNft.tokenId,
            currentNft.paymentType,
            parseUnits(price.toString()),
            {
              value: parseUnits(price.toString()),
            }
          );
        } else {
          const tokenContract = new Contract(
            process.env.REACT_APP_TOKEN_ADDRESS || '',
            TOKEN_INFO.abi,
            library.getSigner(),
          );

          const tokenBalance = await tokenContract.balanceOf(account);
          if(tokenBalance < parseUnits(price.toString())) {
            toast.error("No have sufficient funds");
            return;
          }

          res = await contract.createBid(
            currentNft.tokenId,
            currentNft.paymentType,
            parseUnits(price.toString())
          );
        }

        res
          .wait()
          .then(async (result: any) => {
            auctionInfo = await contract.auctions(currentNft.tokenId);
            const ress = await firestore.collection("nftCollection").doc(String(currentNft.tokenId)).update({
              price: parseFloat(price.toString()),
              saleType: "auction",
              time:
                (parseInt(auctionInfo.duration, 10) +
                  parseInt(auctionInfo.firstBidTime, 10)) *
                1000,
              lastBidder: account,
            });
            const nftData = (await firestore.collection("nftCollection").doc(String(currentNft.tokenId)).get()).data();
            setCurrentNft(nftData);
            toast.success("You have placed bid this auction successfully");
            setIsProcessing(false);
          })
      } catch (err) {
        toast.error("Failed to bid auction");
        setIsProcessing(false);
      }
    } else {
      toast.error("Please connect your wallet first.");
      setIsProcessing(false);
    }
  };

  const cancelAuction = async () => {
    if (active) {
      setIsProcessing(true);
      try {
        const contract = new Contract(
          process.env.REACT_APP_MARKET_ADDRESS || '',
          Market_INFO.abi,
          library.getSigner(),
        );

        const res = await contract.cancelAuction(currentNft.tokenId);
        res
          .wait()
          .then(async () => {
            const tokenPrice = await contract.getSalePrice(currentNft.tokenId);
            const ress = await firestore.collection("nftCollection").doc(String(currentNft.tokenId)).update({
              time: 0,
              auctionCreator: null,
              isSale: false,
              price: Number(ethers.utils.formatEther(String((Number(tokenPrice))))),
              saleType: "auction"
            });
            const nftData = (await firestore.collection("nftCollection").doc(String(currentNft.tokenId)).get()).data();
            setCurrentNft(nftData);
          })
        setIsProcessing(false);
        toast.success('You canceled auction successfully');
      } catch (err) {
        toast.error("Failed to cancel auction");
        setIsProcessing(false);
      }
    }
  }

  const cancelSale = async () => {
    if (active) {
      setIsProcessing(true);
      try {
        const contract = new Contract(
          process.env.REACT_APP_MARKET_ADDRESS || '',
          Market_INFO.abi,
          library.getSigner(),
        );

        const res = await contract.closeTrade(currentNft.tokenId);
        res
        .wait()
        .then(async() => {
          const tokenPrice = await contract.getSalePrice(currentNft.tokenId);
          console.log(tokenPrice);
          const ress = await firestore.collection("nftCollection").doc(String(currentNft.tokenId)).update({
            time: 0,
            auctionLength: 0,
            auctionCreator: account,
            isSale: false,
            price: Number(ethers.utils.formatEther(String((Number(tokenPrice))))),
            saleType: "auction"
          });
          const nftData = (await firestore.collection("nftCollection").doc(String(currentNft.tokenId)).get()).data();
          setCurrentNft(nftData);

          toast.success('You close sale successfullly');
        })
        setIsProcessing(false);
      } catch(err) {
        toast.error("Failed to cancel sale");
        setIsProcessing(false);
      }
    }
  }

  const endAuction = async () => {
    if (active) {
      setIsProcessing(true);
      try {
        const contract = new Contract(
          process.env.REACT_APP_MARKET_ADDRESS || '',
          Market_INFO.abi,
          library.getSigner(),
        );

        const auctionInfo = await contract.auctions(currentNft.tokenId);
        const res = await contract.endAuction(currentNft.tokenId);

        res
          .wait()
          .then(async () => {
            toast.success('You ended auction successfully');
            const ress = await firestore.collection("nftCollection").doc(String(currentNft.tokenId)).update({
              saleType: "auction",
              time: 0,
              auctionLength: 0,
              auctionCreator: null,
              isSale: false,
              owner:
                auctionInfo.bidder !==
                  "0x0000000000000000000000000000000000000000"
                  ? auctionInfo.bidder
                  : auctionInfo.Creator,
              lastBidder: null,
            });
            const nftData = (await firestore.collection("nftCollection").doc(String(currentNft.tokenId)).get()).data();
            setCurrentNft(nftData);
          })
        setIsProcessing(false);
      } catch (err) {
        toast.error("Failed to bid auction");
        setIsProcessing(false);
      }
    }
  }

  return (
    <div className={styles.container} id='detail'>
      {currentNft ?
        <>
          <div className={styles.nft}>
            {/* <img src="img/nft_2.png" alt="nft" /> */}
            <div style={{ backgroundImage: `url(${currentNft.image})` }} />
          </div>
          <div className={styles.detail}>
            <div className="flex flex-col justify-center items-center">
              {user &&
                <>
                  <h6>{`${user.firstName} ${user.lastName}`}</h6>
                  <img src={user?.avatarImage || `img/nft_2.png`} alt="avatar" />
                </>
              }
            </div>
            <div className="flex flex-col justify-center items-center mt-4">
              <h5>#{currentNft.tokenId}</h5>
              <h4>&#34;{currentNft.title}&#34;</h4>
              {currentNft.saleType === "auction" && <Countdown date={currentNft.time} renderer={renderer} />}
              <h1>{currentNft.price} {currentNft.paymentType}</h1>
              <span>(${(currentNft.price * bnbToUSD).toFixed(3)})</span>
              {
                  currentNft.saleType === "fixed" && account !== currentNft.owner  ? 
                  <button type="button" className={styles.buyBtn} onClick={buyNFT}>BUY NOW</button>
                  : currentNft.saleType === "fixed" && account === currentNft.owner &&
                  <button type="button" className={styles.buyBtn} onClick={cancelSale}>CANCEL SALE</button>
              }
              {currentNft.saleType === "auction" &&
                <>
                  {currentNft.time > Date.now() ?
                    (account ?
                      (currentNft.owner && account === currentNft.owner ?
                        (
                          currentNft.lastBidder
                            ?
                            <button type="button" className={styles.offerBtn} >AUCTION IS STARTED</button>
                            :
                            <button type="button" className={styles.offerBtn} onClick={cancelAuction}>CANCEL AUCTION</button>
                        )
                        :
                        (
                          account === currentNft.lastBidder
                            ?
                            <button type="button" className={styles.offerBtn} >YOU APPLIED THIS NFT</button>
                            :
                            <>
                              <div className="bid-form-input size-auto py-4 mb-5">
                                <input
                                  type="number"
                                  placeholder="Enter minimum bid"
                                  value={price}
                                  onChange={(e) => setPrice(Number(e.target.value))}
                                />
                              </div>
                              <button type="button" className={styles.offerBtn} onClick={bidNft}>PLACE A BID</button>
                            </>
                        )
                      ) :
                      <button type="button" className={styles.offerBtn} >CONNECT WALLET</button>
                    ) :
                    (account ?
                      (currentNft.auctionCreator && currentNft.isSale && (account === currentNft.auctionCreator || account === currentNft.lastBidder) ?
                        <button type="button" className={styles.offerBtn} onClick={endAuction}>END AUCTION</button>
                        : currentNft.auctionCreator && currentNft.auctionLength === 0 && !currentNft.isSale && currentNft.time === 0 ?
                        <button type="button" className={styles.offerBtn} >SALE IS ENDED</button>
                        :
                        <button type="button" className={styles.offerBtn} >AUCTION IS ENDED</button>
                      ) :
                      <button type="button" className={styles.offerBtn} onClick={() => activate(injectedConnector)}>CONNECT WALLET</button>
                    )
                  }
                </>
              }
            </div>
          </div>
        </> :
        <div className="py-8">
          <p className="text-2xl text-white m-48">Loading...</p>
        </div>
      }
    </div>
  );
};

export default Detail;