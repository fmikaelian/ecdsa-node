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
const publicKey = secp.secp256k1.getPublicKey(privateKey);

function getAddress(publicKey) {
    const pks = publicKey.slice(1);
    const hash = keccak256(pks)
    const hashs = hash.slice(-20)
    const address = '0x' + toHex(hashs).toLowerCase()
    return address
  }

const address = getAddress(publicKey)

// define your transaction message by inserting the transaction amount, recipient and nonce below
const message = JSON.stringify({ 'address': address, 'amount': 20, 'recipient': '$RECIPIENT_ADDRESS', 'nonce': 0 })

const messageHash = hashMessage(message)
const signature = secp.secp256k1.sign(messageHash, privateKey);
const recovery = signature.recovery
const signatureCompactHex = signature.toCompactHex();

console.log('message:', message)
console.log('messageHash:', toHex(messageHash))
console.log('signature:', signature)
console.log('signature:', signatureCompactHex)
console.log('recovery:', recovery)