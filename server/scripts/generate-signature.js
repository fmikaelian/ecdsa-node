const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes)
    return hash
}

const privateKey = '$YOUR_PRIVATE_KEY'
const message = JSON.stringify({ 'amount': 20, 'recipient': '$RECIPIENT_ADDRESS' })
const messageHash = hashMessage(message)
const signature = secp.secp256k1.sign(messageHash, privateKey);
const recovery = signature.recovery
const signatureCompactHex = signature.toCompactHex();

console.log('message:', message)
console.log('messageHash:', toHex(messageHash))
console.log('signature:', signature)
console.log('signature:', signatureCompactHex)
console.log('recovery:', recovery)