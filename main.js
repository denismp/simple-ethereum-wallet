const ethers = require("ethers");

/**
 * Summary  New Wallet by Private Key.
 * Description  First, create a function, which by a given private key returns a Wallet 
 *              instance. The wallet instance has the wallet's private key, address, and functionality to sign.
 * @param {string} privateKey 
 * @returns {Wallet} instance of type Wallet.
 */
function createWalletFromPrivateKey(privateKey) {
    return new ethers.Wallet(privateKey);
}

/**
 * Summary  New Random Wallet.
 * Description  Second, create a method that returns a random generated Wallet using ethers.Wallet.createRandom. This method creates a random 
 *              mnemonic using entropy then from the hierarchical node, it derives once and creates a wallet from its private key. 
 * @returns {Wallet} instance of type Wallet.
 */
function createRandomWallet() {
    return new ethers.Wallet.createRandom();
}

function testApp() {
    let privateKey = "0x495d5c34c912291807c25d5e8300d20b749f6be44a178d5c50f167d495f3315a";
    console.log(createWalletFromPrivateKey(privateKey));
    console.log(createRandomWallet());
}

testApp();