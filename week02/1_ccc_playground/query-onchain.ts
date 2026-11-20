import { ccc } from "@ckb-ccc/ccc";
import { client, signer } from "@ckb-ccc/playground";

console.log("CKBuilder Week 2 - Exercise 01");

const tip = await client.getTip();
console.log("Current block:", tip.toString());

const address = await signer.getRecommendedAddress();
console.log("Address:", address);

const balance = await signer.getBalance();
console.log(
  "Balance:",
  ccc.fixedPointToString(balance),
  "CKB"
);
