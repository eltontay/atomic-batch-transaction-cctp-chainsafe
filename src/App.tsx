import React, { useState, useEffect } from 'react';
import { CreateWalletForm } from './components/CreateWalletForm.tsx';
import { WalletInfo } from './components/WalletInfo.tsx';
import { TransferForm } from './components/TransferForm.tsx';
import { TransactionView } from './components/TransactionView.tsx';
import { ENGINE_URL, CONTRACTS } from './constants/index.ts';

const App: React.FC = () => {
  const [wallet, setWallet] = useState<any>(null);
  const [balances, setBalances] = useState<any[]>([]);
  const [selectedChain, setSelectedChain] = useState('avalanche-fuji');
  const [latestTransaction, setLatestTransaction] = useState<any>(null);
  const [allTransactions, setAllTransactions] = useState<any[]>([]);

  // Fetch all transactions when wallet is created
  useEffect(() => {
    if (wallet?.id) {
      fetchTransactions();
    }
  }, [wallet, latestTransaction]); // Re-fetch when new transaction is made

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `${ENGINE_URL}/transaction/get-all?walletId=${wallet.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`
          }
        }
      );
      const data = await response.json();
      setAllTransactions(data.result || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleWalletCreated = async (walletId: string, address: string) => {
    const newWallet = {
      id: walletId,
      address: address,
      blockchain: selectedChain,
      name: "My CCTP Wallet",
      state: "LIVE",
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      custodyType: "DEVELOPER",
      walletSetId: "default-set"
    };
    
    setWallet(newWallet);
    
    // Fetch initial balances
    try {
      const response = await fetch(
        `${ENGINE_URL}/backend-wallet/${selectedChain}/get-wallet-balance?walletId=${walletId}`
      );
      const data = await response.json();
      setBalances([{
        amount: data.balance,
        token: {
          id: "usdc-token",
          blockchain: selectedChain,
          symbol: "USDC",
          name: "USD Coin",
          isNative: false,
          tokenAddress: CONTRACTS[selectedChain].USDC,
          decimals: 6
        }
      }]);
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
  };

  const handleTransactionSubmitted = (transaction: any) => {
    setLatestTransaction(transaction);
  };

  const networkOptions = [
    { value: 'avalanche-fuji', label: 'Avalanche Fuji' },
    { value: 'ethereum-goerli', label: 'Ethereum Goerli' }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-center">
          CCTP V2 Wallet Demo
        </h1>

        <select
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {networkOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {!wallet ? (
          <CreateWalletForm onWalletCreated={handleWalletCreated} />
        ) : (
          <div className="space-y-8">
            <WalletInfo 
              wallet={wallet}
              balances={balances}
            />
            
            <TransferForm
              wallet={wallet}
              balances={balances}
              onTransactionSubmitted={(tx) => {
                setLatestTransaction(tx);
                fetchTransactions(); // Refresh transactions after new transfer
              }}
            />

            <TransactionView
              transaction={latestTransaction}
              showTable={true}
              transactions={allTransactions}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;