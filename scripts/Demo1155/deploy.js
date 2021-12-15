//to run this on testnet:
// $ npx hardhat run scripts/Demo1155/deploy.js

const hardhat = require('hardhat')

async function main() {
  await hre.run('compile')
  const Token = await hardhat.ethers.getContractFactory('Demo1155')
  const token = await Token.deploy('http://game.com/')
  await token.deployed()
  
  console.log('Token contract deployed to (update .env):', token.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0)).catch(error => {
  console.error(error)
  process.exit(1)
});
