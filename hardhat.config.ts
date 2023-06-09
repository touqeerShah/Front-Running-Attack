import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-gas-reporter"
import "dotenv/config"
import "solidity-coverage"
import "hardhat-deploy"
import { HardhatUserConfig } from "hardhat/config"

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 1000
      }
    },
    localhost: {
      mining: {
        auto: false,
        interval: 1000
      }
    },

  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.8.17",
      }, {
        version: "0.6.6",
      }, {
        version: "0.4.24",
      },
    ]
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    }, deployer2: {
      default: 1,
      2: 1,
    },
  },
  mocha: {
    timeout: 300000, // 200 seconds max for running tests
  },
}


export default config;
