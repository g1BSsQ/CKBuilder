"use client";

import { ccc } from "@ckb-ccc/connector-react";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const { open, disconnect, wallet, signerInfo, client } =
    ccc.useCcc();

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [cells, setCells] = useState<number | null>(null);
  const [typedCells, setTypedCells] = useState(0);
  const [capacity, setCapacity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!signerInfo) return;

    setLoading(true);
    setError("");

    try {
      const signer = signerInfo.signer;
      const addr = await signer.getRecommendedAddress();
      const bal = await signer.getBalance();

      const { script: lock } =
        await ccc.Address.fromString(addr, client);

      let count = 0;
      let typed = 0;
      let total = 0n;

      for await (const cell of client.findCellsByLock(lock)) {
        count++;
        total += cell.cellOutput.capacity;

        if (cell.cellOutput.type) {
          typed++;
        }
      }

      setAddress(addr);
      setBalance(ccc.fixedPointToString(bal));
      setCells(count);
      setTypedCells(typed);
      setCapacity(ccc.fixedPointToString(total));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [signerInfo, client]);

  useEffect(() => {
    if (signerInfo) {
      void refresh();
    } else {
      setAddress("");
      setBalance("");
      setCells(null);
      setTypedCells(0);
      setCapacity("");
    }
  }, [signerInfo, refresh]);

  return (
    <main className="container">
      <div className="heading">
        <span className="network">CKB Testnet</span>
        <h1>CKB Wallet Viewer</h1>
        <p>A small wallet dashboard built with CCC.</p>
      </div>

      <section className="panel">
        <div className="topline">
          <h2>Wallet</h2>
          {wallet ? (
            <button onClick={() => disconnect()}>
              Disconnect
            </button>
          ) : (
            <button onClick={() => open()}>
              Connect Wallet
            </button>
          )}
        </div>

        {!signerInfo ? (
          <p>Connect a Testnet wallet to view your data.</p>
        ) : (
          <>
            <p>Connected: {wallet?.name ?? "Wallet"}</p>

            {loading && <p>Loading blockchain data...</p>}

            {address && (
              <>
                <div className="field">
                  <span>Address</span>
                  <code>{address}</code>
                </div>

                <div className="field">
                  <span>CKB Balance</span>
                  <strong>{balance} CKB</strong>
                </div>

                <div className="field">
                  <span>Live Cells</span>
                  <strong>{cells}</strong>
                </div>

                <div className="field">
                  <span>Cells with Type Script</span>
                  <strong>{typedCells}</strong>
                </div>

                <div className="field">
                  <span>Combined Cell Capacity</span>
                  <strong>{capacity} CKB</strong>
                </div>
              </>
            )}

            <button disabled={loading} onClick={() => void refresh()}>
              {loading ? "Loading..." : "Refresh"}
            </button>
          </>
        )}

        {error && <p className="error">{error}</p>}
      </section>

      <p className="note">
        Read-only demo. No transfers or private keys required.
      </p>
    </main>
  );
}
