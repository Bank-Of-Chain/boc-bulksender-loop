import * as fs from 'fs'
import { ethers } from 'ethers'

export const getKeyFromEncryptedFile = () => {
  const encryptedJson = fs.readFileSync(
    `${process.cwd()}/utils/.encryptedKey.json`,
    'utf-8'
  )
  console.debug(
    '🚀 ~ file: functions.ts ~ line 10 ~ encryptedJson',
    encryptedJson
  )
  //@ts-expect-error
  const wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.WALLET_PK_PASSWORD!
  )

  return wallet
}
