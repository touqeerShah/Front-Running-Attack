import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig, developmentChains, contractAddressFile } from "../helper-hardhat-config"
import { ethers } from "hardhat"
import { ORCALE_URL_PROVIDER } from "../helper-hardhat-config"

const deployFactoryWithAttack: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let { network, deployments, getNamedAccounts } = hre
    let { deploy, log } = deployments
    let { deployer } = await getNamedAccounts();
    log("Deploying Orcale Url Provider Contract .... ", ORCALE_URL_PROVIDER)
    const FactoryWithAttack = await deploy("FactoryWithAttack", {
        from: deployer,
        args: [],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
        // proxy: {
        //     proxyContract: "OpenZeppelinTransparentProxy",
        //     viaAdminContract: {
        //         name: "FactoryWithAttackAdmin",
        //         artifact: "FactoryWithAttackAdmin",
        //     },
        // },
    })

    // let orcaleUr = await ethers.getContractAt("FactoryWithAttack_Proxy", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    // let proxyBox = await ethers.getContractAt("FactoryWithAttack", orcaleUr.address)// let url = await orcaleUr.getURL()
    // // console.log("url => ", await proxyBox.g÷tURL());
    // console.log("orcaleUr", proxyBox.address);

    log(`FactoryWithAttack at ${FactoryWithAttack.address}`)

}

export default deployFactoryWithAttack
deployFactoryWithAttack.tags = ["all", "oup", "orcale"];