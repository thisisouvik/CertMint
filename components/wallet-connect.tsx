"use client";

import { useState, useEffect, useRef } from "react";
import { useIntegration, fetchXlmBalance, BalanceResult } from "@/hooks/use-integration";

export function WalletConnect() {
  const { walletAddress, connectWallet, disconnectWallet } = useIntegration();
  const [balance, setBalance] = useState<BalanceResult | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close card when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch balance when wallet connects
  useEffect(() => {
    if (!walletAddress) return;
    let cancelled = false;

    async function load() {
      setIsLoadingBalance(true);
      const bal = await fetchXlmBalance(walletAddress!);
      if (!cancelled) {
        setBalance(bal);
        setIsLoadingBalance(false);
      }
    }

    load();

    return () => { cancelled = true; };
  }, [walletAddress]);

  async function handleConnect() {
    setIsConnecting(true);
    try {
      await connectWallet();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setIsConnecting(false);
    }
  }

  function handleDisconnect() {
    disconnectWallet();
    setBalance(null);
    setIsOpen(false);
  }

  function refreshBalance() {
    if (!walletAddress) return;
    setIsLoadingBalance(true);
    setBalance(null);
    fetchXlmBalance(walletAddress).then((bal) => {
      setBalance(bal);
      setIsLoadingBalance(false);
    });
  }

  if (walletAddress) {
    const short = `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4)}`;

    return (
      <div className="relative" ref={cardRef}>
        {/* Pill trigger */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#B9D9C0] bg-[#EFFAF1] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#1A6A31] transition hover:border-[#91C9A0] hover:shadow-md"
        >
          <span className="h-2 w-2 rounded-full bg-[#34A853] shadow-[0_0_6px_#34A853]" />
          <span className="font-mono">{short}</span>
          <svg
            className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown card */}
        {isOpen && (
          <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 animate-[fadeIn_0.15s_ease] rounded-2xl border border-[#E0D0C8] bg-white shadow-[0_16px_40px_-12px_rgba(120,70,40,0.25)] backdrop-blur-sm">
            {/* Header */}
            <div className="rounded-t-2xl bg-[linear-gradient(135deg,#FFF4EE_0%,#FFF9F5_100%)] px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C55B34]">
                Connected Wallet
              </p>
              <p className="mt-1 font-mono text-sm font-medium text-[#1A1211] break-all">
                {walletAddress}
              </p>
            </div>

            {/* Balance */}
            <div className="border-t border-[#F0E4DC] px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#866E65]">XLM Balance</p>
                <button
                  type="button"
                  onClick={refreshBalance}
                  disabled={isLoadingBalance}
                  className="rounded-md p-1 text-[#C55B34] transition hover:bg-[#FFF1EA] disabled:opacity-40"
                  title="Refresh balance"
                >
                  <svg className={`h-3.5 w-3.5 ${isLoadingBalance ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              <div className="mt-2">
                {isLoadingBalance ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#C55B34]/30 border-t-[#C55B34]" />
                    <span className="text-sm text-[#A08880]">Fetching balance…</span>
                  </div>
                ) : balance?.status === "ok" ? (
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-[family-name:var(--font-display)] text-2xl text-[#1A1211]">{balance.amount}</span>
                    <span className="text-xs font-semibold text-[#866E65]">XLM</span>
                  </div>
                ) : balance?.status === "unfunded" ? (
                  <p className="text-xs text-[#A54527]">
                    ⚠️ Account not activated on Testnet yet.<br />
                    <a
                      href={`https://friendbot.stellar.org?addr=${walletAddress}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-[#C55B34]"
                    >
                      Fund via Friendbot →
                    </a>
                  </p>
                ) : balance?.status === "error" ? (
                  <p className="text-xs text-[#A08880]">Failed to load. <button type="button" onClick={refreshBalance} className="underline text-[#C55B34]">Retry</button></p>
                ) : (
                  <p className="text-xs text-[#A08880] animate-pulse">Loading…</p>
                )}
              </div>
              <p className="mt-2 text-[10px] text-[#A08880]">Stellar Testnet</p>
            </div>

            {/* Actions */}
            <div className="border-t border-[#F0E4DC] px-5 py-3">
              <button
                type="button"
                onClick={handleDisconnect}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E7B6A0] bg-[#FFF1EA] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#A54527] transition hover:bg-[#FFE4D6]"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Disconnect
              </button>
            </div>
          </div>
        )}
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
      {isConnecting ? (
        <>
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Connecting…
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Connect Wallet
        </>
      )}
    </button>
  );
}
