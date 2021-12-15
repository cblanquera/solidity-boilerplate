const { expect } = require('chai');
require('dotenv').config()

if (process.env.BLOCKCHAIN_NETWORK != 'hardhat') {
  console.error('Exited testing with network:', process.env.BLOCKCHAIN_NETWORK)
  process.exit(1);
}

async function getSigners(name, ...params) {
  //deploy the contract
  const ContractFactory = await ethers.getContractFactory(name)
  const contract = await ContractFactory.deploy(...params)
  await contract.deployed()
  //get the signers
  const signers = await ethers.getSigners()
  //attach contracts
  for (let i = 0; i < signers.length; i++) {
    const Contract = await ethers.getContractFactory(name, signers[i])
    signers[i].withContract = await Contract.attach(contract.address)
  }

  return signers
}

describe('Demo20 Tests', function () {
  it('Should mint', async function () {
    const [contractOwner, tokenOwner] = await getSigners(
      'Demo20',
      'Demo 20',
      'DTWTY'
    )

    //----------------------------------------//
    // This is the minting
    await contractOwner.withContract.mint(tokenOwner.address, 100)
    expect(await contractOwner.withContract.balanceOf(tokenOwner.address)).to.equal(100)
  })
})