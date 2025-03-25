import React from 'react';
import { Transaction, TransactionDetails } from '@circle-libs/react-elements';
import { Blockchain, CustodyType, Operation, TransactionState, TransactionType } from '../constants/index.ts';

interface TransactionViewProps {
  transaction: {
    id: string;
    txHash: string;
    blockHash: string;
    blockHeight: number;
    blockchain: Blockchain;
    createDate: string;
    updateDate: string;
    custodyType?: CustodyType;
    destinationAddress: string;
    firstConfirmDate: string;
    networkFee: string;
    operation?: Operation;
    refId?: string;
    sourceAddress: string;
    state: TransactionState;
    token: {
      blockchain: Blockchain;
      createDate: string;
      decimals: number;
      id: string;
      isNative: boolean;
      updateDate: string;
    };
    tokenId: string;
    transactionScreeningEvaluation?: {
      screeningDate: string;
    };
    transactionType: TransactionType;
    amounts: string[];
    abiParameters: any[];
    nfts?: any;
    walletId: string;
  };
  showTable?: boolean;
  transactions?: Array<any>; // Only needed if showing table view
}

export const TransactionView: React.FC<TransactionViewProps> = ({ 
  transaction, 
  showTable = false,
  transactions = []
}) => {
  if (showTable && transactions.length > 0) {
    return (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          {transactions.map(tx => (
            <Transaction.Root key={tx.id} transaction={tx}>
              <Transaction.Address type="from" />
              <Transaction.Address type="to" />
              <Transaction.Status />
              <Transaction.Token />
              <Transaction.Amount />
              <Transaction.Date />
              <Transaction.Actions />
            </Transaction.Root>
          ))}
        </Transaction.Table.Body>
      </Transaction.Table>
    );
  }

  return (
    <TransactionDetails
      transaction={transaction}
    />
  );
}; 