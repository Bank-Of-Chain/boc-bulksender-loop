import { ethers } from 'ethers'
import * as fs from 'fs-extra'
import 'dotenv/config'

// Script to encrypt locally stored wallet PK to avoid haveing it in plain text
// Check how to integrate with Hardhat config
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  const wallet = new ethers.Wallet(process.env.WALLET_PK!, provider)
  const encryptedJsonKey = await wallet.encrypt(
    process.env.WALLET_PK_PASSWORD!,
    process.env.WALLET_PK!
  )
  fs.writeFileSync('./.encryptedKey.json', encryptedJsonKey)
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
