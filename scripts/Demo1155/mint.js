//to run this on testnet:
// $ npx hardhat run scripts/Demo1155/mint.js

const hardhat = require('hardhat')

const mintRecipient = ''
const mintTokenId = 1
const mintAmount = 100

function estimateGas(provider, multiplier = 5) {
  const gasPrice = (await provider.getGasPrice()).mul(multiplier).toString(); //wei
  const GgasPrice = Math.ceil(parseInt(gasPrice) / 1000000000)
  const gasLimit = Math.floor(GgasPrice * 21000)
  return { gasPrice, gasLimit }
}

async function main() {
  await hre.run('compile');
  const network = hardhat.config.networks[hardhat.config.defaultNetwork]
  const provider = new hardhat.ethers.providers.JsonRpcProvider(network.url)

  const Factory = await hardhat.ethers.getContractFactory('Demo20')
  const contract = await Factory.attach(network.contracts[0])
  const tx = await contract.mint(mintRecipient, mintTokenId, mintAmount, estimateGas(provider))
  console.log('Minted', mintTokenId, 'x', mintAmount, 'to', mintRecipient, tx)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0)).catch(error => {
  console.error(error)
  process.exit(1)
})
