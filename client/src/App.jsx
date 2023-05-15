import Wallet from "./Wallet";
import Signature from "./Signature";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signatureCompactHex, setSignatureCompactHex] = useState("");
  const [signatureRecovery, setSignatureRecovery] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Signature
        signatureCompactHex={signatureCompactHex}
        setSignatureCompactHex={setSignatureCompactHex}
        signatureRecovery={signatureRecovery}
        setSignatureRecovery={setSignatureRecovery}
      />
      <Transfer setBalance={setBalance} signatureCompactHex={signatureCompactHex} signatureRecovery={signatureRecovery} />
    </div>
  );
}

export default App;
