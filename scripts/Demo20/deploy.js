//to run this on testnet:
// $ npx hardhat run scripts/Demo20/deploy.js

const hardhat = require('hardhat')

async function main() {
  await hre.run('compile')
  const Token = await hardhat.ethers.getContractFactory('Demo20')
  const token = await Token.deploy('Demo 20', 'DTWTY')
  await token.deployed()
  
  console.log('Token contract deployed to (update .env):', token.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0)).catch(error => {
  console.error(error)
  process.exit(1)
});
