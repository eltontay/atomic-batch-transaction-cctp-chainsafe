# CCTP V2 Wallet Demo with Circle + Thirdweb Engine + ChainSafe SDK

This demo application showcases the integration of Circle's React Elements with Thirdweb Engine for Circle's Cross-Chain Transfer Protocol (CCTP) V2. It demonstrates wallet creation, USDC balance display, and atomic batch transfers using CCTP V2.

## 🛠️ Tech Stack

- [ChainSafe Circle React Elements](https://circle-react-elements.replit.app/?path=/docs/getting-started--docs) (@circle-libs/react-elements)
- [Circle Developer Controlled Wallets](https://developers.circle.com/developer/docs/developer-controlled-wallets) (@circle-fin/developer-controlled-wallets)
- [Thirdweb Engine SDK](https://thirdweb-engine.apidocumentation.com)
- [TailwindCSS](https://tailwindcss.com)
- [Lucide React](https://lucide.dev) (for icons)

## 📋 Prerequisites

- Node.js (v16 or higher)
- Docker (for running thirdweb Engine locally)
- Circle Developer Account and API Credentials

## 🚀 Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/eltontay/atomic-batch-transaction-cctp-chainsafe.git
   cd atomic-batch-transaction-cctp-chainsafe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_CIRCLE_API_KEY=your_circle_api_key_here
    REACT_APP_THIRDWEB_WALLET_CREDENTIAL_ID=your_credential_id_here 
   ```

4. For running thirdweb Engine locally, follow the instructions at:
   https://github.com/eltontay/thirdweb_engine_circle_pw

5. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.
