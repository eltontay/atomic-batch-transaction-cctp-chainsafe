import React from 'react';
import { 
  WalletDetails, 
  WalletBalance,
} from '@circle-libs/react-elements';
import { Blockchain, CustodyType, WalletState, Balance } from '../constants/index.ts';

interface WalletInfoProps {
  wallet: {
    id: string;
    address: string;
    blockchain: Blockchain;
    name: string;
    state: WalletState;
    createDate: string;
    updateDate: string;
    custodyType: CustodyType;
    walletSetId: string;
  };
  balances: Balance[];
}

export const WalletInfo: React.FC<WalletInfoProps> = ({ wallet, balances }) => {
  return (
    <>
      <WalletDetails wallet={wallet} />
      {balances.map((balance) => (
        <WalletBalance 
          key={balance.token.id}
          balance={balance}
        />
      ))}
    </>
  );
};