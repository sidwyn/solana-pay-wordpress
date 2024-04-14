import * as buffer from "buffer";
import * as ReactDOM from "react-dom/client";

import React from "react";
import { CURRENCY } from "./solana-pay-button";
import { SolanaPayContainer } from "./solana-pay-container";

window.Buffer = buffer.Buffer;

/*------------------------ 
Backend related javascript
------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM ready");
  const solanaPayContainer = document.getElementById(
    "solana-pay-main-container"
  );
  const containerRoot = ReactDOM.createRoot(solanaPayContainer);
  containerRoot.render(
    <SolanaPayContainer payAmount={0.01} payCurrency={CURRENCY.SOL} />
  );
});
