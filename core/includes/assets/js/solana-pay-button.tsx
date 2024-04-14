import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import React, { FC, useCallback, useState } from "react";

import { WalletNotConnectedError } from "@solana/wallet-adapter-base";

export enum CURRENCY {
  SOL = 0,
  // USDC = 1,  // coming soon
}

export enum ENVIRONMENT {
  DEVNET = "devnet",
  TESTNET = "testnet",
  MAINNET = "mainnet",
}

type SolanaPayButtonProps = {
  payCurrency: CURRENCY;
  payAmount: number;
  environment: ENVIRONMENT;
  openConfirmationPage: boolean;
};

const SolanaPayButton: FC = ({
  payCurrency,
  payAmount,
  environment,
  openConfirmationPage = false,
}: SolanaPayButtonProps) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [hasPaid, setHasPaid] = useState(false);
  const [errorMessage, setHasErrorMessage] = useState();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    if (hasPaid) {
      alert("You have already paid!");
      return;
    }
    if (payCurrency != CURRENCY.SOL) {
      alert("Invalid currency");
    }

    const payAddress = process.env.SHOP_SOL_ADDRESS;
    if (payAddress == null || payAddress.length === 0) {
      alert("Payer address not found. Please define it in your .env file.");
    }

    setHasErrorMessage(null);
    const lamports = await connection.getMinimumBalanceForRentExemption(0);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(payAddress),
        lamports: payAmount * LAMPORTS_PER_SOL ?? lamports,
      })
    );

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, {
      minContextSlot,
    });

    const confirmation = await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });

    if (confirmation.value.err == null) {
      setHasPaid(true);

      if (openConfirmationPage) {
        const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=${environment}`;
        window.open(explorerUrl, "_blank"); // Open in new tab
      }
    } else {
      setHasPaid(false);
      setHasErrorMessage(confirmation.value.err);
    }
  }, [publicKey, sendTransaction, connection]);

  return (
    <>
      {!hasPaid && (
        <button
          onClick={onClick}
          disabled={!publicKey}
          className="solana-pay-button"
        >
          Pay Sol Test Store in SOL
        </button>
      )}
      <div className="solana-pay-status">
        {hasPaid && "You have successfully paid!"}
        {errorMessage}
      </div>
    </>
  );
};

export default SolanaPayButton;
