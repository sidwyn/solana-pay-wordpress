import * as buffer from "buffer";
import * as ReactDOM from "react-dom/client";

import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import { SolanaPayContainer } from "./solana-pay-container";

window.Buffer = buffer.Buffer;

/*------------------------ 
Backend related javascript
------------------------*/

// Your shop wallet address
console.log("Hello World BACKENDER");

export type MakeTransactionInputData = {
  account: string;
};

export type MakeTransactionOutputData = {
  transaction: string;
  message: string;
};

const onClick = async () => {
  const amountLamports = 1000;
  const shopPublicKey = Keypair.generate().publicKey;
  const buyerPublicKey = new PublicKey(
    "BTv9YNRqryCoCq2S9pn6DaqygeyU5UK5x8DGSEWHSiHS"
  ); // Need to update to buyer's public key
  let payer = Keypair.generate();
  let connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  debugger;

  try {
    // Create Simple Transaction
    let transaction = new Transaction();

    // Add an instruction to execute
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: buyerPublicKey,
        toPubkey: shopPublicKey,
        lamports: amountLamports,
      })
    );

    // Send and confirm transaction
    // Note: feePayer is by default the first signer, or payer, if the parameter is not set
    await sendAndConfirmTransaction(connection, transaction, [payer]);

    // Return the serialized transaction
    console.log({
      message: "Thanks for your order! 🍪",
    });
  } catch (err) {
    console.error(err, { error: "error creating transaction" });
    return;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM ready");
  document.querySelector("body").addEventListener("click", (ev) => {
    if ((ev.target as HTMLElement).id == "hello-world-button") {
      console.log("Clicked on hello world button");
      onClick();
    }
  });

  const solanaPayContainer = document.getElementById(
    "solana-pay-main-container"
  );
  const modalRoot = ReactDOM.createRoot(solanaPayContainer);

  // 1. Use wallet-adapter react to add and pay (should be simple)
  modalRoot.render(SolanaPayContainer());
});
