const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require('ethereum-cryptography/secp256k1')
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils")

app.use(cors());
app.use(express.json());

const balances = {
  "$ADDRESS_WALLET_1": 100,
  "$ADDRESS_WALLET_2": 50,
  "$ADDRESS_WALLET_3": 75,
};

const nonces = {
  "$ADDRESS_WALLET_1": 0,
  "$ADDRESS_WALLET_2": 0,
  "$ADDRESS_WALLET_3": 0,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { address, recipient, amount, signatureCompactHex, signatureRecovery } = req.body;

  // re-build the message hash from the form input data
  function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes)
    return hash
  }

  setInitialNonce(address);

  const message = JSON.stringify({ 'address': address, 'amount': amount, 'recipient': recipient, 'nonce': nonces[address] })
  const messageHash = hashMessage(message)
  console.log(message)

  // recovery of sender address from the signature, provided the message hash from UI
  const signature = secp.secp256k1.Signature.fromCompact(hex=signatureCompactHex).addRecoveryBit(recovery=signatureRecovery)
  console.log(signature)

  const publicKey = signature.recoverPublicKey(messageHash).toRawBytes()
  
  function getAddress(publicKey) {
    const pks = publicKey.slice(1);
    const hash = keccak256(pks)
    const hashs = hash.slice(-20)
    const address = '0x' + toHex(hashs).toLowerCase()
    return address
  }

  const sender = getAddress(publicKey)
  console.log(sender)

  if (sender === address) {
    setInitialBalance(sender);
    setInitialBalance(recipient);
  
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
    nonces[sender] += 1
  }

});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function setInitialNonce(address) {
  if (!nonces[address]) {
    nonces[address] = 0;
  }
}
