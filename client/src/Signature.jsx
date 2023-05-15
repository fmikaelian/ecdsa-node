function Signature({ signatureCompactHex, setSignatureCompactHex, signatureRecovery, setSignatureRecovery }) {
  async function onChangeSignatureCompactHex(evt) {

    const signatureCompactHex = evt.target.value;
    setSignatureCompactHex(signatureCompactHex)
  };

  async function onChangeSignatureRecovery(evt) {

    const signatureRecovery = evt.target.value;
    setSignatureRecovery(signatureRecovery)
  };


  return (
    <div className="container wallet">
      <h1>Your Signature</h1>

      <label>
        Signature Compact Hex
        <input placeholder="Type your signature compact hex here" value={signatureCompactHex} onChange={onChangeSignatureCompactHex}></input>
      </label>
      <label>
        Signature Recovery
        <input placeholder="Type your signature recovery here" value={signatureRecovery} onChange={onChangeSignatureRecovery}></input>
      </label>
    </div>
  );
}

export default Signature;