import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react';
import { formatEther } from '@ethersproject/units';
import useSWR from 'swr';

export const Balance: React.FC = () => {
  const { account, library } = useWeb3React();

  const fetcher =
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (library: any) =>
    (...args: any) => {
      const [method, ...params] = args;
      return library[method](...params);
    };
  // eslint-disable-next-line no-unused-vars
  const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
    fetcher: fetcher(library),
  });

  // const { data: balance, mutate } = useSWR(['getBalance', account, 'latest']);
  useEffect(() => {
    library.on('block', () => {
      mutate(undefined, true);
    });
    return () => {
      library.removeAllListeners('block');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <span>
      {balance ? parseFloat(formatEther(balance)).toFixed(2) : '...'}{' '}
    </span>
  );
};
