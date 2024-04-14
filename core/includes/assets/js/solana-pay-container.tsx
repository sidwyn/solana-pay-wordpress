import React, { FC } from "react";

import { CURRENCY } from "./solana-pay-button";
import SolanaWallet from "./solana-wallet";

type SolanaPayContainerProps = {
  payCurrency: CURRENCY;
  payAmount: number;
};

export const SolanaPayContainer: FC = (
  containerProps: SolanaPayContainerProps
) => {
  return (
    <>
      <SolanaWallet
        payAmount={containerProps.payAmount}
        payCurrency={containerProps.payCurrency}
      />
    </>
  );
};
export default SolanaPayContainer;
