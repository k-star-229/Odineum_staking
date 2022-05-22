import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import CustomDropdown from "../../../components/ui/customDropdown";
import Nft from "../../../components/nft";
import styles from './Nfts.module.scss';
import { firestore } from "../../../firebase";
import { useNftContext } from "../../../context/NftList";

const sortTypes = [
  'LATEST',
  'OLDEST',
  'MOST EXPENSIVE'
];

const filterTypes = [
  'ALL',
  'LIVE AUCTIONS',
  'FIXED SALE'
];

interface SelectFunction {
  selectNft: (e: any) => void
}

function Lists({ selectNft }: SelectFunction) {
  // const { NftList, setNftList } = useNftContext();

  const [sortType, setSortType] = useState<string>(sortTypes[0]);
  const { account, library, active, activate } = useWeb3React();
  const [auctionList, setAuctionList] = useState<any>([]);
  const [fixedList, setFixedList] = useState<any>([]);
  const [selectedNft, setSelectedNft] = useState<any>();
  const [filterType, setFilterType] = useState<string>(filterTypes[0]);
  const [nftLists, setNftLists] = useState<any>([]);

  const getMyNFTs = async () => {
    await firestore.collection("nftCollection").where("isSale", "==", true).get().then((querySnapshot) => {
      const nftList: any = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const temp = { ...data };
        nftList.push(temp);
      });
      selectNft(nftList[0]);
      setNftLists(nftList);
    });
  }

  const getAuctionNFTs = async () => {
    await firestore.collection("nftCollection").where("isSale", "==", true).where('saleType', '==', 'auction').get().then((querySnapshot) => {
      const nftList: any = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const temp = { ...data };
        nftList.push(temp);
      });
      nftList.sort((a: any, b: any) => (a.price < b.price) ? 1 : -1);
      setNftLists(nftList);
    });
  }

  const getFixedNfts = async () => {
    await firestore.collection("nftCollection").where("isSale", "==", true).where('saleType', '==', 'fixed').get().then((querySnapshot) => {
      const nftList: any = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const temp = { ...data };
        nftList.push(temp);
      });
      nftList.sort((a: any, b: any) => (a.price < b.price) ? 1 : -1);
      setNftLists(nftList);
    });
  }

  const sortNfts = async () => {
    switch (sortType) {
      case 'LATEST':
        await nftLists.sort((a: any, b: any) => (a.created < b.created) ? 1 : -1);
        setNftLists(nftLists);
        break;

      case 'OLDEST':
        await nftLists.sort((a: any, b: any) => (a.created > b.created) ? 1 : -1);
        setNftLists(nftLists);
        break;

      case 'MOST EXPENSIVE':
        await nftLists.sort((a: any, b: any) => (a.price < b.price) ? 1 : -1);
        setNftLists(nftLists);
        break;

      default:
        break;
    }
  }

  const filterNfts = async () => {
    switch (filterType) {
      case 'ALL':
        await getMyNFTs();
        break;

      case 'LIVE AUCTIONS':
        await getAuctionNFTs();
        break;

      case 'FIXED SALE':
        await getFixedNfts();
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    getMyNFTs();
  }, [])

  useEffect(() => {
    sortNfts();
  }, [sortType])

  useEffect(() => {
    filterNfts();
  }, [filterType])

  return (
    <>
      <div className={styles.selection}>
        <div className={styles.line} />
        <CustomDropdown selected={filterType} forNftList classProps="mx-4" lists={filterTypes} handleSelect={(item) => setFilterType(item)} />
        <CustomDropdown selected={sortType} forNftList classProps="mx-4" lists={sortTypes} handleSelect={(item) => setSortType(item)} />
      </div>
      {nftLists && nftLists.length > 0 ?
        <div className={styles.lists}>
          {nftLists.map((item: any, index: any) => (
            // eslint-disable-next-line react/no-array-index-key
            <a onClick={() => selectNft(item)} key={`nft-${index}`} href="#detail">
              <Nft imageUrl={item.image} title={item.title} price={item.price} paymentType={item.paymentType} />
            </a>
          ))}
        </div> :
        <div className="py-16">
          <p className="text-2xl text-white m-48">Loading...</p>
        </div>
      }
    </>
  );
};

export default Lists;