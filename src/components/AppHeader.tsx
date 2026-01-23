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
        <img src="/menuIcon.png" alt="메뉴" className="header-logo" onClick={onMenu} />
        
        <div className="header-title">  
          <Link href="/" className="logo">
            <img src="/logo1.png" alt="로고" className="header-logo" />
          </Link>
        </div>
        <Link href="/" className="header-btn">
          <img src="/homeIcon.png" alt="홈" className="header-logo"/>
        </Link>
      </div>
    </header>
  );
}
