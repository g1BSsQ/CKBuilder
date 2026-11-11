import { readFileSync } from "node:fs";
import {
  generateAccountFromPrivateKey,
  issueToken,
} from "./lib";

async function main() {
  const privateKey = readFileSync(
    "/tmp/ckb-devnet-account0.key",
    "utf8"
  ).trim();

  const { lockScript, address } =
    await generateAccountFromPrivateKey(privateKey);

  const xudtArgs = lockScript.hash() + "00000000";

  console.log("Network: CKB Devnet");
  console.log("Issuer:", address);
  console.log("Token amount: 50");
  console.log("xUDT type args:", xudtArgs);

  const result = await issueToken(privateKey, "50");

  console.log("Transaction hash:", result.hash);
  console.log("Token issuance transaction submitted");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
