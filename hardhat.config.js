require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: process.env.BLOCKCHAIN_NETWORK,
  networks: {
    hardhat: {
      chainId: 1337,
      mining: {
        //set this to false if you want localhost to mimick a real blockchain
        auto: true,
        interval: 5000
      }
    },
    localhost: {
      url: process.env.BLOCKCHAIN_LOCALHOST_RPC_URL,
      accounts: [process.env.BLOCKCHAIN_LOCALHOST_PRIVATE_KEY],
      contracts: [process.env.BLOCKCHAIN_LOCALHOST_CONTRACT_ADDRESS]
    },
    testnet: {
      url: process.env.BLOCKCHAIN_TESTNET_RPC_URL,
      accounts: [process.env.BLOCKCHAIN_TESTNET_PRIVATE_KEY],
      contracts: [process.env.BLOCKCHAIN_TESTNET_CONTRACT_ADDRESS]
    },
    mainnet: {
      url: process.env.BLOCKCHAIN_MAINNET_RPC_URL,
      accounts: [process.env.BLOCKCHAIN_MAINNET_PRIVATE_KEY],
      contracts: [process.env.BLOCKCHAIN_MAINNET_CONTRACT_ADDRESS]
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  },
  gasReporter: {
    currency: 'USD',
    token: 'MATIC', //comment this out if you want ETH
    coinmarketcap: process.env.BLOCKCHAIN_CMC_KEY,
    gasPrice: 200,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.BLOCKCHAIN_SCANNER_KEY
  }
};
