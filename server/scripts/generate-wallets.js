const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const pks = publicKey.slice(1);
    const hash = keccak256(pks)
    const hashs = hash.slice(-20)
    const address = '0x' + toHex(hashs).toLowerCase()
    return address
}

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);
const address = getAddress(publicKey)

console.log('privateKey:', toHex(privateKey))
console.log('publicKey:', toHex(publicKey))
console.log('address:', address)