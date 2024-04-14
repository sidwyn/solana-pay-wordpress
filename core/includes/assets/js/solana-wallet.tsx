import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React, { FC, useMemo } from "react";
import SolanaPayButton, { CURRENCY } from "./solana-pay-button";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

type SolanaPayWalletProps = {
  payCurrency: CURRENCY;
  payAmount: number;
};

const SolanaWallet: FC = (walletProps: SolanaPayWalletProps) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      // new PhantomWalletAdapter(),
      // new SolflareWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  const walletChildren = (
    <WalletModalProvider>
      <div className="solana-wallet-multi-button">
        <WalletMultiButton />
      </div>
      {/* Your app's components go here, nested within the context providers. */}
      <SolanaPayButton
        environment={process.env.SOL_ENV} // Set this in your .env file as 'devnet', 'testnet' or 'mainnet
        openConfirmationPage={true} // Callback coming soon
        payAmount={walletProps.payAmount}
        payCurrency={walletProps.payCurrency}
      />
    </WalletModalProvider>
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        autoConnect
        children={walletChildren}
      ></WalletProvider>
    </ConnectionProvider>
  );
};
export default SolanaWallet;
