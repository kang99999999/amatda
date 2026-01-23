"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import MenuModal from "@/components/MenuModal";
import { loadFromStorage } from "@/utils/storage";
import { LeaveHomeItem } from "@/types/leaveHome";
import { LastCheckItem } from "@/types/lastCheck";
import { daysAgo } from "@/utils/date";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [leaveHomeMessage, setLeaveHomeMessage] = useState<React.ReactNode>("");
  const [medicineMessage, setMedicineMessage] = useState<React.ReactNode>("");
  const [cleaningMessage, setCleaningMessage] = useState<React.ReactNode>("");
  const [carMessage, setCarMessage] = useState<React.ReactNode>("");

  useEffect(() => {
    setMounted(true);

    const leaveHomeItems = loadFromStorage<LeaveHomeItem[]>(
      "amatda_leave_home",
      []
    );

    if (leaveHomeItems.length === 0) {
      setLeaveHomeMessage("항목을 추가해 보세요!");
    } else if (leaveHomeItems.every((item) => !item.isOn)) {
      setLeaveHomeMessage(
        <>
          <span style={{ color: "#0a862f",}}>✅ 모두 확인했어요!
          </span>
        </>
      );
        
        
        
    } else {
      setLeaveHomeMessage(  
      <>
        <span style={{ color: "#d14435",}}>⚠️ 확인이 더 필요해요</span>
      </>
);
    }

    const getLastMessage = (key: string) => {
      const items = loadFromStorage<LastCheckItem[]>(key, []);
      if (items.length === 0) return "항목을 추가해 보세요!";

      const latest = items.reduce((a, b) =>
        a.lastCheckedAt > b.lastCheckedAt ? a : b
      );

      return   <>
        <span style={{ fontSize: 13, color: "#888" }}>가장 최근 기록은</span>
        <br />
        <strong style={{color:"#6FAEE8"}}>{daysAgo(latest.lastCheckedAt)}일 전</strong>이에요
      </>;
    };

    setMedicineMessage(getLastMessage("amatda_medicine"));
    setCleaningMessage(getLastMessage("amatda_cleaning"));
    setCarMessage(getLastMessage("amatda_car"));
  }, []);

  if (!mounted) return null;

  return (
    <>

      {/* ✅ 메뉴 모달 */}
      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ✅ HERO */}
      <div className="hero-cover">
        <div className="hero-card">
          <div className="hero-text">
            <h2 style={{letterSpacing:"1px"}}>간편한 
               <span style={{padding:"0px 6px",
                             textDecoration:"underline",
                             color:"#4A90E2"
                             }}>원터치
                </span>체크!
            </h2>
            <p style={{lineHeight: "20px"}}>
              <strong>"아 맞다!"</strong> 는 이제 그만! <br/>오늘도 가볍게 점검해 보세요!</p>
          </div>
          <div className="hero-icon">💡</div>
        </div>
      </div>
      {/* ✅ 안내멘트 */}
      <h3 className="app-ment">무엇을 확인해 볼까요?</h3>
      {/* ✅ 홈 카드 */}
      <main className="app-container">
        <div className="home-grid">
          <HomeCard
            href="/leave-home"
            icon="🏠"
            color="blue"
            title="집 나가기 전"
            msg={leaveHomeMessage}
          />
          <HomeCard
            href="/medicine"
            icon="💊"
            color="pink"
            title="약 먹은 날짜"
            msg={medicineMessage}
          />
          <HomeCard
            href="/cleaning"
            icon="🧹"
            color="yellow"
            title="집 청소"
            msg={cleaningMessage}
          />
          <HomeCard
            href="/car"
            icon="🚗"
            color="green"
            title="세차 · 정비"
            msg={carMessage}
          />
        </div>
      </main>
    </>
  );
}

/* 🔽 홈 카드 */
function HomeCard({
  href,
  icon,
  color,
  title,
  msg,
}: {
  href: string;
  icon: string;
  color: "blue" | "pink" | "yellow" | "green";
  title: string;
  msg: React.ReactNode;
}) {
  return (
    <div className={`home-card ${color}`}>
      <Link href={href} className="home-card-main">
        <div className={`icon-circle icon-${color}`}>{icon}</div>
        <div className="home-title">{title}</div>
      <div className="home-status">{msg}</div>
      </Link>
    </div>
  );
}
