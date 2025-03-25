import React from 'react';
import { NewWalletForm } from '@circle-libs/react-elements';
import { WALLET_SET_ID } from '../constants/index.ts';
import { ENGINE_URL } from '../constants/index.ts';

interface CreateWalletFormProps {
  onWalletCreated: (walletId: string, address: string) => void;
}

export const CreateWalletForm: React.FC<CreateWalletFormProps> = ({ onWalletCreated }) => {
  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch(`${ENGINE_URL}/backend-wallet/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'smart:circle',
          credentialId: process.env.REACT_APP_THIRDWEB_WALLET_CREDENTIAL_ID,
          label: formData.name,
          isTestnet: 'true',
          chain: formData.blockchain
        })
      });

      const data = await response.json();
      onWalletCreated(data.id, data.address);
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  };

  return (
    <NewWalletForm
      onSubmit={handleSubmit}
      walletSetId={WALLET_SET_ID}
    />
  );
};