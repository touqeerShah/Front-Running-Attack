// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Wallet.sol";

contract FactoryWithAttack {
    // this list of all owner with their wallet address.
    mapping(address => address) public walletOwner;

    function deployWallet(bytes32 salt) internal returns (address instance) {
        require(walletOwner[msg.sender] == address(0), "");
        // take you wallet contract and convert it into bytescode of the porject
        bytes memory bytecode = type(Wallet).creationCode;
        // this yui  code which low level machine bytes code call with smart contrat
        // here we deploy code
        assembly {
            instance := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
        }
        require(instance != address(0), "ERC1167: create2 faile");
        walletOwner[msg.sender] = instance;
    }

    function createWallet(bytes32 _salt) external returns (address walletAddress) {
        walletAddress = deployWallet(_salt);
        // we made this contract upgreadeable so we don't have contractor
        Wallet(walletAddress).initialize(msg.sender);
    }
}
