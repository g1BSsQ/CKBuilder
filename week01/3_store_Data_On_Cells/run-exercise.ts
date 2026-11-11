import { readFileSync } from "node:fs";
import { buildMessageTx, readOnChainMessage } from "./lib";

async function main() {
  const privateKey = readFileSync(
    "/tmp/ckb-devnet-account0.key",
    "utf8"
  ).trim();

  const message = "CKBuilder Week 1 - Hello from g1BSsQ!";

  console.log("Writing message:", message);

  const txHash = await buildMessageTx(message, privateKey);
  console.log("Transaction hash:", txHash);

  const result = await readOnChainMessage(txHash);
  console.log("Message read from Cell:", result);

  if (result !== message) {
    throw new Error("Message verification failed");
  }

  console.log("SUCCESS: Data stored and verified on CKB Devnet");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
