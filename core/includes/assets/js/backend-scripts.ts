import * as buffer from "buffer";
import * as ReactDOM from "react-dom/client";

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
  const modalRoot = ReactDOM.createRoot(solanaPayContainer);
  modalRoot.render(SolanaPayContainer());
});
