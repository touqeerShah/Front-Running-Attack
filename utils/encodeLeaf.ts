import { ethers } from "hardhat";

export function encodeLeaf(address: string, spots: number) {
    // Same as `abi.encodePacked` in Solidity
    return ethers.utils.defaultAbiCoder.encode(
        ["address", "uint64"], // The datatypes of arguments to encode
        [address, spots] // The actual values
    )
}
