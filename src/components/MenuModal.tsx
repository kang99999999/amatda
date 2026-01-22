"use client";

import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MenuModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="menu-backdrop" onClick={onClose}>
      <aside
        className="menu-drawer open"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== Header ===== */}
        <div className="menu-header">
          <h2>☰ <span style={{padding:"0 5px"}}>  </span> 메뉴로 이동하기</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* ===== Menu Items ===== */}
        <nav className="menu-list">
          <Link href="/leave-home" className="menu-item blue" onClick={onClose}>
            <div className="menu-icon">🏠</div>
            <div className="menu-text">
              <strong>집 나가기 전에</strong>
              <span className="menu-desc">→ 체크리스트 확인하기</span>
            </div>
          </Link>

          <Link href="/medicine" className="menu-item pink" onClick={onClose}>
            <div className="menu-icon">💊</div>
            <div className="menu-text">
              <strong>약 언제 먹었지?</strong>
              <span className="menu-desc">→ 마지막 복용일 확인하기</span>
            </div>
          </Link>

          <Link href="/cleaning" className="menu-item yellow" onClick={onClose}>
            <div className="menu-icon">🧹</div>
            <div className="menu-text">
              <strong>청소 언제 했지?</strong>
              <span className="menu-desc">→ 최근 청소일 확인하기</span>
            </div>
          </Link>

          <Link href="/car" className="menu-item green" onClick={onClose}>
            <div className="menu-icon">🚗</div>
            <div className="menu-text">
              <strong>차 언제 정비 했더라?</strong>
              <span className="menu-desc">→ 정비 기록 확인하기</span>
            </div>
          </Link>
        </nav>

        {/* ===== Footer Anchor ===== */}
        <div className="menu-footer">
          AMATDA  v1.0.0 
        </div>
      </aside>
    </div>
  );
}
