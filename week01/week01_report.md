# CKB Weekly Report - Week 1

**Participant:** g1BSsQ  
**Practice date:** 11 November 2026  
**Environment:** GitHub Codespaces (Linux), local CKB Devnet

## 1. Summary

I worked through the five beginner exercises in the CKBuilder Handbook. I also set up OffCKB before starting them. I used the official Nervos example projects as a starting point and ran the exercises in GitHub Codespaces. The transactions below were made on my local Devnet, not on CKB Mainnet.

| Exercise | Result |
| --- | --- |
| 00. Set up Devnet | OffCKB started and test accounts were available |
| 01. Transfer CKB | Sent 100 CKB to another Devnet account |
| 02. Store Data on Cell | Stored a message and read it back |
| 03. Create Fungible Token | Issued 50 xUDT and transferred 1 xUDT |
| 04. Create DOB | Created a Spore with a PNG image and checked its contents |
| 05. Build a Simple Lock | Built and deployed a hash lock, funded it, and spent from it |

## 2. Environment

- GitHub Codespaces running Linux
- Node.js v24.22.2 and npm 11.19.1
- OffCKB CLI and CKB node v0.208.0
- Local Devnet RPC: `http://127.0.0.1:8114`
- Local RPC proxy: `http://127.0.0.1:28114`
- TypeScript, CCC, npm, pnpm and the official example code

## 3. Exercise 00: Set Up CKB Devnet

### What I Did

I installed OffCKB with `npm install -g @offckb/cli` and started it with `offckb node`. I then used `offckb accounts` to check the available test accounts.

### Result

The CKB node started on port 8114 and the RPC proxy started on port 28114. The account list showed pre-funded accounts, including accounts #0 and #1 with an initial balance of 42,000,000 Devnet CKB each.

### What I Learned

OffCKB gave me a local blockchain and test accounts to use for the other exercises. I could run transactions without using real CKB.

### Evidence

- `week01/1_setup/devnet-running.png`
- `week01/1_setup/devnet-accounts.png`

## 4. Exercise 01: Transfer CKB

### What I Did

I used account #0 to send 100 CKB to account #1 through the OffCKB CLI. I kept the Devnet test key in a temporary file outside the repository. After sending the transaction, I checked the receiver's balance.

### Result

- Amount sent: **100 Devnet CKB**
- Receiver balance afterward: **42,000,100 CKB**
- Transaction: `0x7331bf4e510c8b0f11a7b0c4508138e81cf576f014056ad512868a884386cca4`

### What I Learned

I used the CLI to send CKB and checked the balance afterward instead of relying only on the transfer command's output. The balance increased by the amount I sent.

### Evidence

- `week01/2_transfer_CKB/2_transfer_by_cli.png`
- `week01/2_transfer_CKB/3_balance_after_transfer.png`

## 5. Exercise 02: Store Data on Cell

### What I Did

I copied the official Store Data on Cell example and installed its dependencies. I synced the Devnet system scripts and made a `run-exercise.ts` file using the example's `buildMessageTx` and `readOnChainMessage` functions. I ran it with `tsx`.

### Result

The message was:

```text
CKBuilder Week 1 - Hello from g1BSsQ!
```

After the transaction, the script read back the same text and printed `SUCCESS: Data stored and verified on CKB Devnet`.

- Transaction: `0xf5c721311413110c2910e49d4e82d862ab99d3d2a09918ae9f6fe61a63f8f2eb`

### What I Learned

This exercise showed me that a Cell can contain data, not only CKB capacity. I checked the result by reading the message back from the new Cell.

### Evidence

- `week01/3_store_Data_On_Cells/store-and-read-success.png`
- `week01/3_store_Data_On_Cells/run-exercise.ts`

## 6. Exercise 03: Create Fungible Token (xUDT)

### What I Did

I used the official xUDT example and wrote `issue-token.ts` to issue 50 xUDT on Devnet. I then used OffCKB to send 1 xUDT from account #0 to account #1 and checked both balances.

### Result

- Issued: **50 xUDT**
- After transfer: **49 xUDT in account #0 and 1 xUDT in account #1**
- Issuance transaction: `0x4439ccad1682864ef149a49fba0cda69f47cdf3000749e8a5b07b53e71685dc0`
- Transfer transaction: `0xf428e7736d2513efd617662c05830d324b20707f5932d4b7deddc0c2c067b2b5`
- Token type args: `0x7de82d61a7eb2ec82b0dc653e558ba120efcbfbb44dac87c12972d05bf25065300000000`

### What I Learned

I used the token's type args to identify the xUDT I had issued. Checking the balance for each account helped me confirm that 1 token had moved to the receiver.

### Evidence

- `week01/4_create_Fungible_Token/1_xudt_issued.png`
- `week01/4_create_Fungible_Token/2_xudt_balance.png`
- `week01/4_create_Fungible_Token/3_xudt_transfer.png`
- `week01/4_create_Fungible_Token/4_xudt_balances_after_transfer.png`
- `week01/4_create_Fungible_Token/issue-token.ts`

## 7. Exercise 04: Create DOB (Spore)

### What I Did

I copied the official Create DOB example and added a small image. The file was named `.jpg`, but a file check showed it was actually PNG data. I renamed it `dob-sample.png` and set the content type to `image/png`. I used `create-dob.ts` to create the Spore, read its Cell afterward, and compare the image data with the original file.

### Result

- Image size: **3,145 bytes**
- Content type: `image/png`
- Transaction: `0x78b212f6e9df5d77a77a66a6ac165c19ddb1a7ee657c82409a7a59c9500627f9`
- Spore ID: `0xf302fc0f6cb8f7ac27addbdaf81a77ea1d35fbbf60e516e030bc6a49f7ee372a`
- Output index: `0`

The image bytes read from the Cell matched the original PNG.

### What I Learned

I saw why the file's real format matters. The image had a `.jpg` name but contained PNG data, so I had to fix the filename and content type before recording the result. I also checked the stored bytes rather than assuming the Spore was correct just because the creation transaction succeeded.

### Evidence

- `week01/5_create_DOB/1_dob_created_and_verified.png`
- `week01/5_create_DOB/create-dob.ts`
- `week01/5_create_DOB/assets/dob-sample.png`
- `week01/5_create_DOB/lib.ts`

## 8. Exercise 05: Build a Simple Lock

### What I Did

I copied the official Simple Lock example. The first `pnpm install` was blocked because some packages needed approval to run their build scripts. I approved the required packages and installed the dependencies. I also installed the official prebuilt `ckb-debugger` for Linux because the Codespaces environment did not have Rust or Cargo.

I ran `pnpm build` and deployed the `hash-lock` contract to Devnet. The build produced `hash-lock.js` and `hash-lock.bc`.

The frontend did not work at first. It was trying to access `localhost:28114` from the browser, which was not the Codespaces container's localhost. I checked the contract OutPoints with RPC and found they were live. I then updated the Next.js configuration to send browser RPC calls through `/ckb-rpc`. After restarting the frontend, its deployment check showed **READY**.

I used the preimage `Hello World`, funded the hash-lock address with 400 Devnet CKB, and then used the frontend to transfer 99 CKB to the receiver. The UI showed the unlock transaction as **committed**.

### Result

- Build outputs: `dist/hash-lock.js` (about 21 KB) and `dist/hash-lock.bc` (about 28 KB)
- Deployment transaction: `0x767db0cea95d8e2090afd35f002f10544149137d35f523573b1f1ebc7ff5b0bd`
- Funding transaction: `0xf1d308408220d05063118ae6465951b8f2467db8dac3a74e8dfbb0e520ea7d45`
- Amount funded: **400 Devnet CKB**
- Unlock transaction: `0x1b0d7e11bdadbd0abfecdea25cbc5e3927d2b28a100dfd95d3b37f956e73c8af`
- Amount transferred when unlocked: **99 Devnet CKB**
- Unlock transaction status: **committed**

### What I Learned

I built and deployed a hash-lock and tested it with a real transaction on Devnet. The hardest part for me was getting the browser frontend to reach the RPC service running inside Codespaces. I also saw that the preimage `Hello World` had to be revealed to spend from the lock. This example is for testing, not for holding real funds.

### Evidence

- `week01/6_build_Simple_Lock/1_lock_built.png`
- `week01/6_build_Simple_Lock/2_lock_deployed.png`
- `week01/6_build_Simple_Lock/3_lock_funded.png`
- `week01/6_build_Simple_Lock/4_lock_unlocked.png`
- `week01/6_build_Simple_Lock/contracts/hash-lock/src/index.ts`
- `week01/6_build_Simple_Lock/frontend/next.config.mjs`
- `week01/6_build_Simple_Lock/frontend/app/ccc-client.ts`

## 9. Problems I Ran Into

The main problems were installing dependencies for Simple Lock, correcting the image format in Create DOB, and connecting the Simple Lock frontend to Devnet inside Codespaces. I fixed those issues and completed the exercises. I did not use real funds. The application examples were taken from the official Nervos documentation and modified where needed for these tests.

## 10. References

- [CKBuilder Handbook](https://docs.google.com/document/d/1aFHXU1ZL1MyIbBAIVRjG6stqdWwPUPyHV90O1QNwY-M/edit)
- [CKB Quick Start](https://docs.nervos.org/docs/getting-started/quick-start)
- [Nervos documentation example source](https://github.com/nervosnetwork/docs.nervos.org/tree/develop/examples/dApp)
