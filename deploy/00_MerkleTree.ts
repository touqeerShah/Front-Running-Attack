import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../instructions/verify-code"
import { networkConfig, developmentChains, contractAddressFile } from "../helper-hardhat-config"
import { storeAddress } from "../utils/storeContractAddress"
import { encodeLeaf } from "../utils/encodeLeaf"
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs")
import { ethers } from "hardhat";


const deployMerkleTreeDeployment: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let { network, deployments, getNamedAccounts } = hre
    let { deploy, log } = deployments
    let { deployer } = await getNamedAccounts();
    const testAddresses = await ethers.getSigners();

    // Create an array of ABI-encoded elements to put in the Merkle Tree
    const list = [
        encodeLeaf(testAddresses[0].address, 2),
        encodeLeaf(testAddresses[1].address, 2),
        encodeLeaf(testAddresses[2].address, 2),
        encodeLeaf(testAddresses[3].address, 2),
        encodeLeaf(testAddresses[4].address, 2),
        encodeLeaf(testAddresses[5].address, 2),
    ];

    // Using keccak256 as the hashing algorithm, create a Merkle Tree
    // We use keccak256 because Solidity supports it
    // We can use keccak256 directly in smart contracts for verification
    // Make sure to sort the tree so it can be reproduced deterministically each time
    const merkleTree = new MerkleTree(list, keccak256, {
        hashLeaves: true, // Hash each leaf using keccak256 to make them fixed-size
        sortPairs: true, // Sort the tree for determinstic output
        sortLeaves: true,
    });

    // Compute the Merkle Root in Hexadecimal
    const root = merkleTree.getHexRoot();


    const MerkleTreeDeployment = await deploy("MerkleTree", {
        from: deployer,
        args: [root],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,

    })

    await storeAddress(MerkleTreeDeployment.address, "MerkleTreeDeployment", contractAddressFile)


    log(`MerkleTreeDeployment at ${MerkleTreeDeployment.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCANAPIKEY) {
        await verify(MerkleTreeDeployment.address, [root])
    }

}

export default deployMerkleTreeDeployment
deployMerkleTreeDeployment.tags = ["all", "merkle"];