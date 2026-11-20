"use client";

import { ccc } from "@ckb-ccc/connector-react";

const testnet = new ccc.ClientPublicTestnet();

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ccc.Provider
      name="CKB Wallet Viewer"
      defaultClient={testnet}
      clientOptions={[
        { name: "Testnet", client: testnet },
      ]}
    >
      {children}
    </ccc.Provider>
  );
}
