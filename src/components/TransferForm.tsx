import React from 'react';
import { 
  SendTransactionForm,
  TokenSelect
} from '@circle-libs/react-elements';
import { 
  ENGINE_URL, 
  CONTRACTS, 
  Blockchain, 
  CustodyType, 
  WalletState 
} from '../constants/index.ts';

interface TransferFormProps {
  wallet: {
    id: string;
    blockchain: Blockchain;
    address: string;
    createDate: string;
    updateDate: string;
    custodyType: CustodyType;
    state: WalletState;
    name: string;
    walletSetId: string;
  };
  balances: any[];
  onTransactionSubmitted?: (tx: any) => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({ wallet, balances, onTransactionSubmitted }) => {
  const handleAddressChange = (address: string) => {
    // Address validation logic here
    console.log('Address changed:', address);
  };

  const handleSubmit = async (transactionData: any) => {
    try {
      // CCTP Atomic Batch Transaction
      const response = await fetch(
        `${ENGINE_URL}/backend-wallet/${wallet.blockchain}/send-transaction-batch-atomic`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`
          },
          body: JSON.stringify({
            walletId: wallet.id,
            transactions: [
              {
                contractAddress: CONTRACTS[wallet.blockchain].CCTP,
                method: 'transferTokens',
                params: [
                  transactionData.destinationAddress,
                  transactionData.amount,
                  transactionData.destinationChain || 'ethereum-goerli' // Default destination chain
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();
      onTransactionSubmitted?.(data);
      return data;
    } catch (error) {
      console.error('Transfer error:', error);
      throw error;
    }
  };

  return (
    <>
      <SendTransactionForm
        wallet={wallet}
        balances={balances}
        onChangeAddress={handleAddressChange}
        onSubmit={handleSubmit}
      />
      <TokenSelect
        balances={balances}
        defaultValue={balances[0]?.token.id}
      />
    </>
  );
}; 