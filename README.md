# Front-Running-Attack

This simple code where we just try to simulate  front running attack with simple example local hardhat network and try to learn how it work and how to ignore it in in your code





### What is Front Running ?

As we know Ethereum is public network when every we do some transactions on network it will first go to public pool where different miner pick th transaction and execute them based on the  gas fee ,If is profit them.

So how front running link with it let suppose you are doing some Defi or other purchase on network which you found profitable, the keep track those type of transaction in network to find those transaction and send some transaction with more `gas price ` and `gas fee ` which you paid for transaction execution and do transaction before you and get profit from it , Because more gas `gas price ` and `gas fee ` more chances of you transactions execute firsts.




## Example 

1. We carte two contract `FactoryWithAttack` contract which we used to create out new contract which we call `Wallet` it required some parameter to deploy and make us owner of that contract.
2. Once you deploy `FactoryWithAttack` Contract and Execute Transaction for Create `Wallet`
3. We keep track those type of transaction in network once get those transaction from the network
4. wWe execute Attack we send some transaction on network with more  `gas price ` and `gas fee ` with some data us your but this time we will become the `owner`






- [Hardhat Upgrades](#hardhat-upgrades)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quickstart](#quickstart)
  - [Typescript](#typescript)
    - [Optional Gitpod](#optional-gitpod)
- [Usage](#usage)
  - [Testing](#testing)
    - [Test Coverage](#test-coverage)
- [Deployment to a testnet or mainnet](#deployment-to-a-testnet-or-mainnet)
  - [Scripts](#scripts)
  - [Estimate gas](#estimate-gas)
    - [Estimate gas cost in USD](#estimate-gas-cost-in-usd)
  - [Verify on etherscan](#verify-on-etherscan)
- [Linting](#linting)
- [Formatting](#formatting)
- [Thank you!](#thank-you)

### Read Topic 

 [CreationCode](https://www.rareskills.io/post/ethereum-contract-creation-code)


 ### Hardhat Config changes

 add following config under the hardhat network config `hardhat.config.ts`
 ```
 mining:{
  auto:false,
  interval:1000
 }
 ```

## Requirements

- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node --version` and get an ouput like: `vx.x.x`
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - `yarn --version` and get an output like: `x.x.x`
    - You might need to install it with npm

## Quickstart

Just run the  and it will run all the use-case 
```
hh test
```

### How to Avoid

To Avoid this in this use case don't pase salt in argument call generate them internal with transaction nonce and other things combine


```
git clone https://github.com/touqeerShah/Front-Running-Attack.git
cd Front-Running-Attack
yarn
```


# Deployment to a testnet or mainnet

1. Setup environment variabltes

You'll want to set your `GOERLI_RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file, similar to what you see in `.env.example`.

- `PRIVATE_KEY`: The private key of your account (like from [metamask](https://metamask.io/)). **NOTE:** FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
  - You can [learn how to export it here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- `GOERLI_RPC_URL`: This is url of the goerli testnet node you're working with. You can get setup with one for free from [Alchemy](https://alchemy.com/?a=673c802981) or [Infura](https://www.infura.io/)

```
#### .evn
PRIVATE_KEY=
USER2_PRIVATE_KEY= <USER 2 Privete Key>
PROVIDER_REN_URL=https://goerli.infura.io/v3/<Infure Key>

ETHERSCANAPIKEY=<Ethetscan Key>
COINMARKETCAP_API_KEY= < Coin marketcap key>
```

2. Get testnet ETH

Head over to [Alchemy](https://goerlifaucet.com/) and get some tesnet ETH. You should see the ETH show up in your metamask.

3. Deploy

```
yarn hardhat deploy --network goerli
```

## Staging Testing

After deploy to a testnet or local net, you can run staging test.

```
yarn run test:staging
```

## Estimate gas

You can estimate how much gas things cost by running:

```
yarn hardhat test
```

And you'll see and output file called `gas-report.txt`

### Estimate gas cost in USD

To get a USD estimation of gas cost, you'll need a `COINMARKETCAP_API_KEY` environment variable. You can get one for free from [CoinMarketCap](https://pro.coinmarketcap.com/signup).

Then, uncomment the line `coinmarketcap: COINMARKETCAP_API_KEY,` in `hardhat.config.js` to get the USD estimation. Just note, everytime you run your tests it will use an API call, so it might make sense to have using coinmarketcap disabled until you need it. You can disable it by just commenting the line back out.

## Verify on etherscan

If you deploy to a testnet or mainnet, you can verify it if you get an [API Key](https://etherscan.io/myapikey) from Etherscan and set it as an environemnt variable named `ETHERSCAN_API_KEY`. You can pop it into your `.env` file as seen in the `.env.example`.

In it's current state, if you have your api key set, it will auto verify goerli contracts!

However, you can manual verify with:

```
yarn hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
```

Or when you Run you Deploy it will automatical verify the conteact when it was on testnet

# Linting

To check linting / code formatting:

```
yarn lint
```

or, to fix:

```
yarn lint:fix
```



# Thank you!

[![Touqeer Medium](https://img.shields.io/badge/Medium-000000?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@touqeershah32)
[![Touqeer YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UC3oUDpfMOBefugPp4GADyUQ)
[![Touqeer Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/touqeer-shah/)
