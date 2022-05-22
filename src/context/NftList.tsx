import React, { useState, createContext, useContext } from 'react';

const NftContext = createContext<any>(null);

export const NftProvider: React.FC = ({ children }) => {
  const [nftList, setNftList] = useState<any>([]);

  return (
    <NftContext.Provider
        value={{ 
            nftList, 
            setNftList 
        }}
    >
      {children}
    </NftContext.Provider>
  );
};

export const useNftContext = () => useContext(NftContext);
