import { ccc } from "@ckb-ccc/shell";

async function main() {
  const owner = ccc.ClientPublicTestnet.open();
  const client = owner.value;

  try {
    const address =
      "ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqfkq57ph0pr0ctyzd7qxej0aquykt8ekfsf9s6lq";

    const tip = await client.getTip();

    console.log("Connected to CKB Testnet");
    console.log("Block height:", tip.toString());
    console.log("Address:", address);

    const { script: lock } =
      await ccc.Address.fromString(address, client);

    let cellCount = 0;
    let typedCells = 0;
    let totalCapacity = 0n;

    for await (const cell of client.findCellsByLock(lock)) {
      cellCount++;
      totalCapacity += cell.cellOutput.capacity;

      if (cell.cellOutput.type) {
        typedCells++;
      }
    }

    console.log("\nLive cells:", cellCount);
    console.log("With type script:", typedCells);
    console.log("Without type script:", cellCount - typedCells);
    console.log(
      "Total capacity:",
      ccc.fixedPointToString(totalCapacity),
      "CKB"
    );
  } finally {
    await owner.dispose();
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
