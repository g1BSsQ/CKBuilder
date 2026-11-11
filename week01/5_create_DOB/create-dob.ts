import { readFileSync } from "node:fs";
import { createSporeDOB } from "./lib";
import { cccClient } from "./ccc-client";
import { unpackToRawSporeData } from "@spore-sdk/core";

async function main() {
  const privateKey = readFileSync(
    "/tmp/ckb-devnet-account0.key",
    "utf8"
  ).trim();

  const image = readFileSync("assets/dob-sample.png");

  if (!image.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"))) {
    throw new Error("The input is not a valid PNG header");
  }

  console.log("Network: CKB Devnet");
  console.log("Content type: image/png");
  console.log("Image size:", image.length, "bytes");
  console.log("Creating Spore DOB...");

  const { txHash, outputIndex } = await createSporeDOB(
    privateKey,
    new Uint8Array(image)
  );

  console.log("Transaction hash:", txHash);
  console.log("Output index:", outputIndex);
  console.log("Waiting for Spore Cell...");

  for (let i = 0; i < 30; i++) {
    const cell = await cccClient.getCellLive(
      {
        txHash,
        index: "0x" + outputIndex.toString(16),
      },
      true
    );

    if (cell) {
      const spore = unpackToRawSporeData(cell.outputData);
      const restored = Buffer.from(
        spore.content.toString().replace(/^0x/, ""),
        "hex"
      );

      if (
        spore.contentType !== "image/png" ||
        !restored.equals(image)
      ) {
        throw new Error("Spore content verification failed");
      }

      console.log("Spore ID:", cell.cellOutput.type?.args);
      console.log("Content type:", spore.contentType);
      console.log("Verified image size:", restored.length);
      console.log("SUCCESS: DOB created and verified on CKB Devnet");
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  throw new Error(
    "Transaction submitted, but Spore Cell is not available yet"
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
