export const ENGINE_URL = 'http://localhost:3005';

export const CONTRACTS = {
  'avalanche-fuji': {
    USDC: '0x5425890298aed601595a70AB815c96711a31Bc65',
    CCTP: '0x0a9f824c05a74f577a536a8a0c673183a872dff4'
  },
  'ethereum-goerli': {
    USDC: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    CCTP: '0x0a9f824c05a74f577a536a8a0c673183a872dff4'
  }
};

export const WALLET_SET_ID = 'f270e785-0a7b-578d-a43c-bd514fcc4d49';

export enum Blockchain {
  'ARB-SEPOLIA' = 'ARB-SEPOLIA',
  'ARB' = 'ARB',
  'AVAX-FUJI' = 'AVAX-FUJI',
  'AVAX' = 'AVAX',
  'ETH-SEPOLIA' = 'ETH-SEPOLIA',
  'ETH' = 'ETH',
  'EVM-TESTNET' = 'EVM-TESTNET',
  'EVM' = 'EVM',
  'MATIC-AMOY' = 'MATIC-AMOY',
  'MATIC' = 'MATIC',
  'NEAR-TESTNET' = 'NEAR-TESTNET',
  'NEAR' = 'NEAR',
  'SOL-DEVNET' = 'SOL-DEVNET',
  'SOL' = 'SOL',
  'UNI-SEPOLIA' = 'UNI-SEPOLIA',
  'UNI' = 'UNI'
}

export enum CustodyType {
  DEVELOPER = 'DEVELOPER'
}

export enum Operation {
  TRANSFER = 'TRANSFER'
}

export enum TransactionType {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND'
}

export type TransactionState = 
  | 'COMPLETE' 
  | 'CONFIRMED'
  | 'SENT' 
  | 'INITIATED' 
  | 'QUEUED'
  | 'PENDING_RISK_SCREENING'
  | 'CANCELLED'
  | 'DENIED'
  | 'FAILED'; 

export type WalletState = 'LIVE';

export type Balance = {
  amount: string;
  token: {
    id: string;
    symbol: string;
    name: string;
    blockchain: Blockchain;
    isNative: boolean;
    decimals: number;
    tokenAddress?: string;
    createDate: string;
    updateDate: string;
  };
  updateDate: string;
};