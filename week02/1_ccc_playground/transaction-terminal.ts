import { ccc } from "@ckb-ccc/shell";

async function main() {
  const owner = ccc.ClientPublicTestnet.open();
  const client = owner.value;

  try {
    const tip = await client.getTip();

    console.log("Connected to CKB Testnet");
    console.log("Block height:", tip.toString());

    // Example lock script for a transaction draft
    const lock = await ccc.Script.fromKnownScript(
      client,
      ccc.KnownScript.Secp256k1Blake160,
      "0x" + "00".repeat(20)
    );

    const tx = ccc.Transaction.from({
      outputs: [
        {
          capacity: ccc.fixedPointFrom("100"),
          lock,
        },
      ],
    });

    console.log("\nTransaction draft");
    console.log("Inputs:", tx.inputs.length);
    console.log("Outputs:", tx.outputs.length);
    console.log(
      "Output capacity:",
      ccc.fixedPointToString(tx.outputs[0].capacity),
      "CKB"
    );

    console.log("\nTransaction not signed or broadcast.");
    console.log("Inputs and fees have not been completed.");
  } finally {
    await owner.dispose();
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
