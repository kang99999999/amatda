"use client";

import Link from "next/link";

export default function AppHeader({
  onMenu,
}: {
  onMenu?: () => void;
}) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <button className="header-btn" onClick={onMenu}>
          ☰
        </button>
        <div className="header-title">  
          <img src="/logo1.png" alt="아맞다 로고" className="header-logo" />
        </div>
        <Link href="/" className="header-btn">
          ⌂
        </Link>
      </div>
    </header>
  );
}
