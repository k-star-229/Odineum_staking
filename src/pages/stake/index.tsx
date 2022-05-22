import React, { memo, useRef, useState, useEffect } from "react";
import { Contract } from '@ethersproject/contracts';
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { firestore } from "../../firebase";
import StakeHeader, { injectedConnector } from "./header";
import NFT_INFO from '../../artifacts/contracts/OdinNFT.sol/ODINNFT.json';
import Market_INFO from '../../artifacts/contracts/OdinMarketplace.sol/OdinMarketplace.json';
import Stake_INFO from '../../artifacts/contracts/OdinStaking.sol/OdinNFTStaking.json';
import Token_INFO from '../../artifacts/contracts/Odin.sol/Odin.json';
import styles from "./Stake.module.scss";
import btnLeft from "../../assets/btn_left.png";


function Stake(this: any) {
  const { account, library, active, activate } = useWeb3React();
  const [approveDate, setApproveDate] = useState(5)
  const [stakeDate, setStakeDate] = useState(5)
  const [nftLists, setNftLists] = useState<any>([]);
  const [isStakeProcess, setIsStakeProcessing] = useState<boolean>(false);
  const [isClaimable, setIsClaimable] = useState<boolean>(false);
  const [btnName, setBtnName] = useState<String>('STAKE');
  const [remainTime, setRemainTime] = useState(-1);
  const [days, setDays] = useState(-1);
  const [hours, setHours] = useState(-1);
  const [mins, setMins] = useState(-1);
  const [secs, setSecs] = useState(-1);
  const thumb = useRef()

  const init = async () => {
    const stakeContract = new Contract(
      process.env.REACT_APP_STAKE_ADDRESS || '',
      Stake_INFO.abi,
      library.getSigner(),
    );
    const isStaking = await stakeContract.getIsStaking(account);

    if(isStaking) {
      setIsStakeProcessing(isStaking);
      setBtnName('CLAIM');
      const isclaimable = await stakeContract.isClaimable(account);
      setIsClaimable(isclaimable);
      if(!isclaimable) {
        const time = await stakeContract.getRestTime(account);
        console.log('remainTime', Number(time));
        setRemainTime(time);
      }
    }
  }

  useEffect(() => {
    if (active) {
      init();
    }
  }, []);

  const getRemaining = function () {
    let rest = remainTime;
    rest -= 1;

    setDays(Math.floor(rest/(3600*24)));
    setHours(Math.floor((rest%(3600*24))/3600));
    setMins(Math.floor((rest%3600)/60));
    setSecs(Math.floor(rest%60));

    if(rest === 0) {
      setBtnName('CLAIM');
      setIsClaimable(true);
      setIsStakeProcessing(false);
    }
    setRemainTime(rest);
  }

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        getRemaining();
      },1000);
    }
  }, [remainTime]);

  const getMyNFTs = async () => {
    const nftContract = new Contract(
      process.env.REACT_APP_NFT_ADDRESS || '',
      NFT_INFO.abi,
      library.getSigner(),
    );

    const tokens = await nftContract.getTokensOfOwner(account);
    const nftList: any = [];
    for(let i = 0; i < tokens.length; i += 1) {
      firestore.collection("nftCollection").where("tokenId", "==", Number(tokens[i])).where("isSale", "==", false).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const temp = { ...data };
          nftList.push(temp);
        });
      });
    }
    setNftLists(nftList);
  }

  useEffect(() => {
    setTimeout(() => {
      if (active) { 
        getMyNFTs();
      }
    }, 1000);
  }, [active]);
  
  const stakeNFTs = async () => {
    if(active) {
      if (account) {
        const checkUser = (await firestore.collection('users').doc(account).get()).data();
        if (!checkUser?.nickName) {
          toast.warning('Please complete your profile first!');
          return;
        }
      }
      
      const stakeContract = new Contract(
        process.env.REACT_APP_STAKE_ADDRESS || '',
        Stake_INFO.abi,
        library.getSigner()
      );

      const nftContract = new Contract(
        process.env.REACT_APP_NFT_ADDRESS || '',
        NFT_INFO.abi,
        library.getSigner()
      );

      const tokenContract = new Contract(
        process.env.REACT_APP_TOKEN_ADDRESS || '', 
        Token_INFO.abi,
        library.getSigner()
      );

      const marketContract = new Contract(
        process.env.REACT_APP_MARKET_ADDRESS || '',
        Market_INFO.abi,
        library.getSigner(),
      );

      
      if(!isStakeProcess) {

        const level = await nftContract.checkAccountLevel(account);
      
        if(Number(level) === 0) {
          toast.warning("You have no NFT.");
          return;
        }

        const levels = await stakeContract.getAccountLevelsInfo(account);
        
        const arr = [];

        for(let i = 0; i < levels.length;  i+= 1) {
          arr.push(Number(levels[i]));
        }
  
        const uniqueLevels = arr.filter((val: any,id: any,array: any) => array.indexOf(val) === id);
        console.log(uniqueLevels);
  
        if(uniqueLevels.length < 2) {
          toast.warning("Cannot Stake! Must have at least 2 different NFTs");
          return;
        }
        
        const balance = await tokenContract.balanceOf(account);
        
        if(Number(balance) === 0) {
          toast.warning("Can not Stake! Must have some ODINs");
          return;
        }
        const charityBalance = await tokenContract.balanceOf(process.env.REACT_APP_ADMIN_ADDRESS);
        console.log('charityBalance', Number(charityBalance));
        
        if(Number(charityBalance) === 0) {
          toast.warning("Charity wallet balance is 0");
          return;
        }
        
        const isApproved = await nftContract.isApprovedForAll(
          account,
          process.env.REACT_APP_STAKE_ADDRESS,
        );
        if (!isApproved) {
          const approve = await nftContract.setApprovalForAll(
            process.env.REACT_APP_STAKE_ADDRESS,
            true,
          );
          await approve.wait();
        }

        const res = await stakeContract.stake(stakeDate);
        res.wait().then(async (result:any) => {
          const events = result?.events;
          toast.success('Successfully staked.');
          
          console.log('success', events);
        })
        const tokens = await nftContract.getTokensOfOwner(account);
        for(let i = 0; i < tokens.length; i += 1) {
          const ress = await firestore.collection("nftCollection").doc(String(Number(tokens[i]))).update({
            saleType: "stake"
          });
        }
        setIsStakeProcessing(true);
        setBtnName("CLAIM");
        setRemainTime(24*3600*stakeDate);
        await getMyNFTs();
        return;
      }
      if(isClaimable) {
        const stakedTokens = await nftContract.getStakedTokens(account);
        for(let i = 0; i < stakedTokens.length; i += 1) {
          const ress = await firestore.collection("nftCollection").doc(String(Number(stakedTokens[i]))).update({
            saleType: "auction",
            isSale: false,
            time: 0
          });
        }
        const res = await stakeContract.claimReward();
        res.wait().then(async (result:any) => {
          const events = result?.events;
          console.log(events);
        })
        setIsStakeProcessing(false);
        setBtnName("STAKE");

        await getMyNFTs();
      } else {
        toast.warning(`Please wait for ${days} days ${hours} hours ${mins} mins ${secs} secs.`);
      }
    }
  }

  return (
    <div>
      <StakeHeader />
      <div className={`${styles.stakeContainer} min-h-screen items-center flex py-32 lg:py-12 xl:py-8`}>
        <div className="flex w-full justify-center lg:flex-row flex-col items-center px-4">
          <div className="flex flex-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 ">
            <p className="text-center text-xl font-bold text-white py-4">FULL SET OWNER</p>
            <div className="rounded-2xl bg-gray-100 flex flex-col divide-y p-8 justify-center">
              <div className="flex justify-between pb-6">
                <p className="text-left">TOTAL REWARDS ACCUMULATED:</p>
                <p>N/A</p>
              </div>
              <div className="flex flex-col gap-10 pt-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p>APPRECTION</p>
                    <p>1100%</p>
                  </div>
                  <div className="flex justify-between">
                    <p>START</p>
                    <p>-</p>
                  </div>
                  <div className="flex justify-between">
                    <p>YOUR STAKE</p>
                    <p>-</p>
                  </div>
                  <div className="flex justify-between">
                    <p>LOCK DURATION</p>
                    <p>-</p>
                  </div>
                  <div className="flex justify-between">
                    <p>DAYS LEFT</p>
                    <p>-</p>
                  </div>
                  <div className="flex justify-between">
                    <p>PENDING REWARDS</p>
                    <p>-</p>
                  </div>
                </div>
                <div className="bg-black rounded-xl p-4 text-white 2xl:w-2/3 mx-auto mt-8 pb-16 flex flex-col gap-12">
                  <div className="flex justify-between items-center">
                    <p className="text-xs">ODINEUM BALANCE</p>
                    <p className="text-xs">2,000,000,000</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-lg">5,000,000,000</p>
                    <p>$OD</p>
                  </div>
                </div>
                <div className="relative flex flex-col h-12">
                  <input className={styles.seekOwner} type="range" name="vol" min="0" max="99" step={1} value={approveDate} onChange={(e) => setApproveDate(parseFloat(e.target.value))} style={{ background: `linear-gradient(to right, #d5bf46 0%, #d5bf46 ${approveDate / 99 * 100}%, #4d4d4d ${approveDate / 99 * 100}%, #4d4d4d 100%)` }} />
                  <div className="w-full pr-16 relative">
                    <div className="relative h-8">
                      <p style={{ left: `${approveDate / 99 * 100}%` }} className="absolute transform bottom-0 whitespace-nowrap">{approveDate} DAYS</p>
                    </div>
                  </div>
                </div>
                <button className="bg-black text-white text-xl font-bold mx-8 py-4 rounded-full" type="button">APPROVE</button>
              </div>
            </div>
          </div>
          <div className="flex h-64 w-full lg:w-64 lg:h-full lg:items-center justify-start items-start lg:justify-start relative">
            <div className="w-full lg:w-1/2 flex flex-row lg:flex-col gap-1 px-4 items-center justify-center py-4">
              {
                nftLists.length > 0 &&
                nftLists.map((item: any, index: any) => (
                  <img src={item.image} className="w-14" alt="-nft" />
                ))
              }
            </div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 lg:rotate-0">
              <button type="button">
                <img src={btnLeft} className="shadow-md" alt="button" />
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-2/3 md:w-1/2 lg:w-1/3 ">
            <p className="text-center text-xl font-bold text-black py-4">REGULAR INVESTOR</p>
            <div className="rounded-3xl bg-black flex flex-col divide-y p-8 justify-center text-white border-white border-2">
              <div className="flex justify-between pb-6">
                <p className="text-left">TOTAL REWARDS ACCUMULATED:</p>
                <p>N/A</p>
              </div>
              <div className="flex flex-col gap-10 pt-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p>APPRECTION</p>
                    <p>1100%</p>
                  </div>
                  <div className="flex justify-between">
                    <p>START</p>
                    <p>-</p>
                  </div>
                  <div className="flex justify-between">
                    <p>YOUR STAKE</p>
                    <p>-</p>
                  </div>
                  <div className="flex justify-between">
                    <p>LOCK DURATION</p>
                    <p>-</p>
                  </div>
                  <div className="flex justify-between">
                    <p>DAYS LEFT</p>
                    <p>-</p>
                  </div>
                  <div className="flex justify-between">
                    <p>PENDING REWARDS</p>
                    <p>-</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 text-black w-3/4 2xl:w-2/3 mx-auto mt-8 pb-16 flex flex-col gap-12">
                  <div className="flex justify-between items-center text-gray-500">
                    <p className="text-xs">ODINEUM BALANCE</p>
                    <p className="text-xs">2,000,000,000</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-lg">5,000,000,000</p>
                    <p>$OD</p>
                  </div>
                </div>
                {!isStakeProcess &&
                  <div className="relative flex flex-col h-12">
                    <input className={styles.seekStake} type="range" name="vol" min="0" max="99" step={1} value={stakeDate} onChange={(e) => setStakeDate(parseFloat(e.target.value))} style={{ background: `linear-gradient(to right, #d5bf46 0%, #d5bf46 ${stakeDate / 99 * 100}%, #c3c3c3 ${stakeDate / 99 * 100}%, #c3c3c3 100%)` }} />
                    <div className="w-full pr-16 relative">
                      <div className="relative h-8">
                        <p style={{ left: `${stakeDate / 99 * 100}%` }} className="absolute transform bottom-0 whitespace-nowrap">{stakeDate} DAYS</p>
                      </div>
                    </div>
                  </div>
                }
                {active ?
                  <button className="bg-white text-black text-xl font-bold mx-8 py-4 rounded-full" type="button" onClick={stakeNFTs}>
                    {btnName}
                  </button>
                  :
                  <button className="bg-white text-black text-xl font-bold mx-8 py-4 rounded-full" type="button" onClick={() => activate(injectedConnector)}>
                    SALE IS NOT ACTIVE OR NO WALLET IS CONNECTED
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stake