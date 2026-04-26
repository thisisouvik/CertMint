"use client";

import { useState } from "react";
import { isAllowed, setAllowed, requestAccess } from "@stellar/freighter-api";

function extractAddress(result: unknown): string | null {
  if (typeof result === "string") return result;
  if (result && typeof result === "object" && "address" in result) {
    const addr = (result as { address: unknown }).address;
    if (typeof addr === "string" && addr.length > 0) return addr;
  }
  return null;
}

export function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  async function handleConnect() {
    setIsConnecting(true);
    try {
      if (await isAllowed()) {
        const access = await requestAccess();
        const addr = extractAddress(access);
        if (addr) setWalletAddress(addr);
      } else {
        await setAllowed();
        const access = await requestAccess();
        const addr = extractAddress(access);
        if (addr) setWalletAddress(addr);
      }
    } catch (e) {
      console.error(e);
      alert("Freighter connection rejected or not installed.");
    } finally {
      setIsConnecting(false);
    }
  }

  if (walletAddress) {
    const formatted = `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4)}`;
    return (
      <div className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#B9D9C0] bg-[#EFFAF1] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#1A6A31]">
        <span>✅</span>
        <span className="font-mono">{formatted}</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleConnect}
      disabled={isConnecting}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#C55B34] bg-[#C55B34] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#A64C2B] disabled:opacity-50"
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
