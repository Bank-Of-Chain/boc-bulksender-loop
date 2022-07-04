import { ethers, network } from 'hardhat'
import { WALLETS_TO_SEND } from '../utils/addresses'

const USDIContractAddress = '0x8DEb399a86f28f62f0F24daF56c4aDD8e57EEcD5'

//This is useful to test the real contract locally if you fork the current state of the blockchain
//to the local hardhat network
const USDILocalDeployed = 'ADD LOCALLY DEPLOOYED USDi CONTRACT INTERFACE'

const accountDEV = 'ADD SENDER TEST ACCOUNT HERE'
const accountTwo = 'ADD SENDER TWO TEST ACCOUNT HERE'
const DECIMALS = Array(18).fill(0).join('')

const main = async () => {
  if (network.name !== 'hardhat') {
    console.log('ONLY HARDHAT NETWORK ALLOWED FOR TEST')
    throw new Error('BAD NETWORK')
  }
  console.debug(
    '🚀 ~ CURRENT BLOCK',
    (await ethers.provider.getBlock('latest'))?.number
  )
  // METHOD TO ATTACH | Use the TestUSDi ERC-20 interface with the real forked USDI contract for testing
  // const contract = await ethers.getContractAt('TestUSDi', USDILocalDeployed)

  const contractFactory = await await ethers.getContractFactory('TestUSDi')
  console.log('🚀 ~ Deploying TestUSDi contract...')

  //Change this string number to the total amount of USDi to deploy in the constructor
  //Recommended to take the total supply from the real contract
  const contract = await contractFactory.deploy('15639629060321637356512')
  await contract.deployed()
  console.log('TestUSDi deployed to:', contract.address)

  console.log('TOTAL SUPPLY', await contract.totalSupply())
  console.log('BALANCE OF deployer', await contract.balanceOf(accountDEV))
  console.log('BALANCE OF other', await contract.balanceOf(accountTwo))

  console.debug("🚀 ~ 'TRANSFER TEST'", 'TRANSFER TEST')
  const receipt = await contract.transfer(accountTwo, `10${DECIMALS}`)
  for (let address of WALLETS_TO_SEND) {
    await contract.transfer(address, `10${DECIMALS}`)
  }
  await receipt.wait(1)
  for (let address of WALLETS_TO_SEND) {
    console.log('BALANCE OF EACH ADDRESS', await contract.balanceOf(address))
  }

  console.log(
    'BALANCE OF other AFTER SEND',
    await contract.balanceOf(accountTwo)
  )
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
