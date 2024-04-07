import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import React, { FC, useCallback, useState } from "react";

import { WalletNotConnectedError } from "@solana/wallet-adapter-base";

const SendSOLToRandomAddress: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, wallets } = useWallet();
  const [hasPaid, setHasPaid] = useState(false);
  const [errorMessage, setHasErrorMessage] = useState();

  console.log("Wallets are", wallets);

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    if (hasPaid) alert("You have already paid!");

    setHasErrorMessage(null);
    const lamports = await connection.getMinimumBalanceForRentExemption(0);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: Keypair.generate().publicKey,
        lamports,
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
      const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
      window.open(explorerUrl, "_blank"); // Open in new tab
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
          Pay Sol Test Store 1 SOL!
        </button>
      )}
      <div className="solana-pay-status">
        {hasPaid && "You have successfully paid!"}
        {errorMessage}
      </div>
    </>
  );
};

export default SendSOLToRandomAddress;
