"use client";

import "./globals.css";
import "../styles/page-transition.css";

import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import MenuModal from "@/components/MenuModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="ko">
      <body>
        {/* ✅ 공통 헤더 */}
        <AppHeader onMenu={() => setMenuOpen(true)} />

        {/* ✅ 공통 메뉴 모달 */}
        <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />

        {/* ✅ 각 페이지 */}
        {children}
      </body>
    </html>
  );
}