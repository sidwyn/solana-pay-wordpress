import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

import BigNumber from "bignumber.js";
/*------------------------ 
Backend related javascript
------------------------*/
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

// Your shop wallet address
export const shopAddress = new PublicKey("...");

console.log("Hello World BACKENDER");

export type MakeTransactionInputData = {
  account: string;
};

export type MakeTransactionOutputData = {
  transaction: string;
  message: string;
};

type ErrorOutput = {
  error: string;
};

document
  .getElementById("hello-world-button")
  ?.addEventListener("click", function () {
    console.log("Hello World");
    onClick();
  });

const onClick = async () => {
  console.log("Hello World 2");

  const reference = Keypair.generate().publicKey; // unique reference for this transaction
  const buyerPublicKey = Keypair.generate().publicKey; // Need to update to buyer's public key

  try {
    // We pass the selected items in the query, calculate the expected cost
    let amount = new BigNumber("10");
    // if (amount === 0) {
    //   console.error({ error: "Can't checkout with charge of 0" });
    //   return;
    // }

    // We pass the buyer's public key in JSON body
    const shopPublicKey = shopAddress;

    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const connection = new Connection(endpoint);

    // Get a recent blockhash to include in the transaction
    const { blockhash } = await connection.getLatestBlockhash("finalized");

    const transaction = new Transaction({
      recentBlockhash: blockhash,
      // The buyer pays the transaction fee
      feePayer: buyerPublicKey,
    });

    // Create the instruction to send SOL from the buyer to the shop
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: buyerPublicKey,
      lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
      toPubkey: shopPublicKey,
    });

    // Add the reference to the instruction as a key
    // This will mean this transaction is returned when we query for the reference
    transferInstruction.keys.push({
      pubkey: new PublicKey(reference),
      isSigner: false,
      isWritable: false,
    });

    // Add the instruction to the transaction
    transaction.add(transferInstruction);

    // Serialize the transaction and convert to base64 to return it
    const serializedTransaction = transaction.serialize({
      // We will need the buyer to sign this transaction after it's returned to them
      requireAllSignatures: false,
    });
    const base64 = serializedTransaction.toString("base64");

    // Insert into database: reference, amount

    // Return the serialized transaction
    console.log({
      transaction: base64,
      message: "Thanks for your order! 🍪",
    });
  } catch (err) {
    console.error({ error: "error creating transaction" });
    return;
  }
};
