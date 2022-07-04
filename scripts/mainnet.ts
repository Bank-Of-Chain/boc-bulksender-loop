import { ethers, network } from 'hardhat'
import { WALLETS_TO_SEND } from '../utils/addresses'

const USDIContractAddress =
  process.env.ERC20Contract || '0x8DEb399a86f28f62f0F24daF56c4aDD8e57EEcD5' // USDI Polygon contract address

// wallet to send tokens from
const REAL_DEV_ACC = process.env.DEV_WALLET_PUBLIC_ADDRESS!

// 18 decimals in string format
const DECIMALS = Array(18).fill(0).join('')

// 16 decimals in string format, used to send less than 1 USDi to addresses
const D16 = Array(16).fill(0).join('')

// 5USDi in string format to send, change according to reward amount to send to each wallet.
const AMOUNT_TO_SEND = `5${DECIMALS}`

const main = async () => {
  //Get the interface of the USDi contract to interact with
  const contract = await ethers.getContractAt('TestUSDi', USDIContractAddress)

  // Check the total balance of USDi in the DEV Account, recommended to run this first.
  console.log('BALANCE OF DEV', await contract.balanceOf(REAL_DEV_ACC))
  console.debug('🚀 ~ TRANSFERING TOKENS')

  for (let address of WALLETS_TO_SEND) {
    await contract.transfer(address, AMOUNT_TO_SEND)
  }

  // UNCOMMENT THIS TO CHECK THE TOTAL AMOUNT OF EACH WALLET, but will not work after transfer because blocks should be minedf
  // for (let address of WALLETS_TO_SEND) {
  //   console.log('BALANCE OF EACH ADDRESS', await contract.balanceOf(address))
  // }

  //Check amount of sender wallet after sending. Should be improved to wait for all transactions to be mined first to reflect
  //the most updated amount after sending
  console.log('BALANCE OF DEV', await contract.balanceOf(REAL_DEV_ACC))
  console.log('FINISHED')
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
