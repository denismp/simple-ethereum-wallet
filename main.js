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
 * Description  Create a method that returns a random generated Wallet using ethers.Wallet.createRandom. This method creates a random 
 *              mnemonic using entropy then from the hierarchical node, it derives once and creates a wallet from its private key. 
 * @returns {Wallet} instance of type Wallet.
 */
function createRandomWallet() {
    return new ethers.Wallet.createRandom();
}

/**
 * Summary  Save Wallet as JSON.
 * Description  Create a method called saveWalletToJSON, which takes a Wallet instance 
 *              and a password and returns a JSON V3 Keystore. Use the wallet’s encrypt method.

 * @param {Wallet} wallet 
 * @param {string} password
 * @returns {string} A JSON V3 Keystore.
 */
function saveWalletToJSON(wallet, password) {
    console.log("saveWalletToJSON(): called...");
    return wallet.encrypt(password).then(console.log);
}

/**
 * Summary  Save Wallet as JSON.
 * Description  Create a method called saveWalletToJSON, which takes a Wallet instance 
 *              and a password and returns a JSON V3 Keystore. Use the wallet’s encrypt method.
 * @param {Wallet} wallet 
 * @param {string} password 
 * @returns {string} A JSON V3 Keystore.
 */
async function saveWalletToJSONnoThen(wallet, password) {
    console.log("saveWalletToJSONnoThen(): called...");
    return await wallet.encrypt(password);
}

/**
 * Summary  Load Wallet from JSON.  Get the wallet from the previous call to one of the saveWalletToJSON calls.
 * Description  Create a method that takes JSON and a password, decrypts the JSON and returns a wallet instance.
 * @param {string} json - this is not encrypted.
 * @param {string} password 
 * @returns {Wallet} an instance of Wallet.
 */
async function getWalletFromEncryptedJSON(json, password) {
    console.log("getWalletFromEncryptedJSON(): called...");
    return ethers.Wallet.fromEncryptedJson(json, password);
}

/**
 * Summary  Create and get a wallet.
 * Description  Creates a new wallet with the privateKey, saves it with the saveWalletToJSONnoThen() 
 *              async function.  It then calls the getWalletFromEncryptedJSON(). The JSON argument
 *              appears to actually be unencrypted, which is confusing.  The saveWalletToJSONnoThen()
 *              is an sync function unlike the saveWalletToJSON() in order to wait for the Promise
 *              to populate the return JSON string.
 * @param {string} privateKey 
 * @param {string} password 
 */
async function getMyWallet(privateKey, password) {
    console.log("getMyWallet(): called...");
    let wallet = createWalletFromPrivateKey(privateKey);
    let json = await saveWalletToJSONnoThen(wallet, password);
    console.log(json);

    let decryptedWallet = await getWalletFromEncryptedJSON(json, password);
    console.log(decryptedWallet);
}

function testApp() {
    let privateKey = "0x495d5c34c912291807c25d5e8300d20b749f6be44a178d5c50f167d495f3315a";
    console.log(createWalletFromPrivateKey(privateKey));
    console.log(createRandomWallet());
    let wallet = createWalletFromPrivateKey(privateKey);
    let password = "p@$$w0rd~3";
    let savedJSON = saveWalletToJSON(wallet, password);
    getMyWallet(privateKey, password);

}

testApp();