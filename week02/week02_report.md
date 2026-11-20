# CKB Weekly Report - Week 2

**Participant:** g1BSsQ
**Practice period:** 17-20 November 2026
**Environment:** GitHub Codespaces (Linux), CCC Playground, CKB Testnet

## 1. Summary

I used CCC to query CKB Testnet data, inspect live cells,
and create an unsigned transaction draft. I also ran a
small Next.js wallet viewer, connected MetaMask, and
checked its address and balance on CKB Testnet.

| Exercise | Result |
| --- | --- |
| 01. CCC Fundamentals | Queried Testnet data and created a 100 CKB transaction draft |
| 02. Query Live Cells | Queried 14 live cells on CKB Testnet using CCC |
| 03. Mini CKB dApp | Built a wallet viewer, connected MetaMask and queried CKB Testnet data |

## 2. Environment

- GitHub Codespaces running Linux
- CKB Public Testnet
- CCC Playground
- TypeScript and Node.js
- Next.js and React
- `@ckb-ccc/connector-react` for wallet integration
- `@ckb-ccc/ccc` in CCC Playground
- `@ckb-ccc/shell` and `tsx` in Codespaces

## 3. Exercise 01: CCC Fundamentals

### What I Did

**Part 1: Query CKB Testnet**

I used CCC Playground to query blockchain data through
`client.getTip()`, `signer.getRecommendedAddress()` and
`signer.getBalance()`.

The script printed the current block height, a Testnet
address and its CKB balance.

**Part 2: Create a Transaction Draft**

I created `transaction-terminal.ts` in GitHub Codespaces
using `@ckb-ccc/shell`.

The script connected to CKB Testnet and used
`ccc.Transaction.from()` to create a transaction draft
with one output containing 100 CKB.

I checked the number of inputs, outputs and output
capacity in the Terminal.

The transaction was not signed or broadcast.

### Result

**Part 1: Testnet Query**

- Network: CKB Testnet
- Block height at execution: 23,089,588
- Balance at execution: 11,444 Testnet CKB
- Address query: successful

**Part 2: Transaction Preview**

- Block height at execution: 23,089,734
- Transaction inputs: 0
- Transaction outputs: 1
- Output capacity: 100 CKB
- Inputs and fee: not completed
- Transaction status: unsigned
- Broadcast: no

### What I Learned

CCC can query blockchain data without creating a
transaction. A transaction draft can contain an output
before any input cells have been selected.

The transaction I created was only a preview. It would
still need inputs, fees and a valid signature before
it could be submitted to the blockchain.

### Evidence

- [Testnet query screenshot](./1_ccc_playground/1_query_onchain.png)
- [Transaction preview screenshot](./1_ccc_playground/2_transaction_preview.png)
- [Playground source code](./1_ccc_playground/query-onchain.ts)
- [Transaction source code](./1_ccc_playground/transaction-terminal.ts)

## 4. Exercise 02: Query Live Cells with CCC

### What I Did

I used `@ckb-ccc/shell` and TypeScript in GitHub
Codespaces to query live cells on CKB Testnet.

I connected using `ClientPublicTestnet` and used
`client.findCellsByLock()` to find cells belonging
to a Testnet address.

The script counted the live cells, checked whether
each cell had a type script, and calculated their
combined capacity.

### Result

- Network: CKB Testnet
- Block height at execution: 23,126,203
- Live cells found: 14
- Cells with type script: 3
- Cells without type script: 11
- Combined cell capacity: 11,870 CKB

The query completed without errors. No private key
was used, and no transaction was sent.

### What I Learned

The query showed that one address can have multiple
live cells. Some of those cells have type scripts,
while others do not.

The capacity shown in the result is the sum of the
queried cells, not necessarily the amount that can
be freely spent.

### Evidence

- [Terminal screenshot](./2_nodejs/1_query_cells.png)
- [TypeScript source](./2_nodejs/query-cells.ts)

## 5. Exercise 03: Mini CKB dApp

### What I Did

I built a small CKB wallet viewer using Next.js,
React, TypeScript and `@ckb-ccc/connector-react`
in GitHub Codespaces.

The application uses `ccc.Provider` with
`ClientPublicTestnet` to connect to CKB Testnet.

I added a wallet connection button and used CCC
to read the connected address, CKB balance and
live cells.

I started the application on port 3001 and
opened it in the browser.

I then connected MetaMask and checked the
blockchain data displayed by the application.

### Result

- Application: CKB Wallet Viewer
- Network: CKB Testnet
- Framework: Next.js and React
- Wallet connected: MetaMask
- Testnet address: displayed successfully
- CKB balance: 0 CKB
- Live cells: 0
- Cells with type script: 0
- Combined cell capacity: 0 CKB

The connected wallet had a different address
from the Testnet address used in Exercise 02.

The application displayed the connected wallet's
data without requiring a private key in the
application code.

No transaction was signed or broadcast.

### What I Learned

I tested how CCC connects a browser wallet
to a CKB application.

After connecting MetaMask, the application
could retrieve a CKB Testnet address and
query its balance and live cells.

The connected address had no CKB or live cells,
so the application displayed zero values.

### Evidence

- [Application running](./3_mini_dapp/evidence/1_app_running.png)
- [Wallet connected](./3_mini_dapp/evidence/2_wallet_connected.png)
- [Application source](./3_mini_dapp/app/page.tsx)
- [CCC Provider](./3_mini_dapp/app/providers.tsx)

## 6. Problems I Ran Into

The mini dApp initially failed to build because
the project's package.json used CommonJS while
the Next.js source used ES module imports.

I changed the package type to `module`, removed
the previous `.next` build cache and restarted
the development server.

After this change, the application loaded
successfully in the browser.

## 7. References

- [CKBuilder Handbook](https://docs.google.com/document/d/1aFHXU1ZL1MyIbBAIVRjG6stqdWwPUPyHV90O1QNwY-M/edit)
- [CCC Documentation](https://docs.ckbccc.com/)
- [Nervos CKB Documentation](https://docs.nervos.org/)
- [Next.js Documentation](https://nextjs.org/docs)
