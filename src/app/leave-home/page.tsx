"use client";

import { useState } from "react";
import { useLeaveHome } from "@/hooks/useLeaveHome";
import AddLeaveHomeModal from "@/components/AddLeaveHomeModal";
import ResetConfirmModal from "@/components/resetConfirmModal";

export default function LeaveHomePage() {
  const {
    items,
    addItem,
    toggleItem,
    removeItem,
    resetItems,
  } = useLeaveHome();

  const [addOpen, setAddOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  return (
    <>
    {/* 히어로 */}
      <div className="hero-cover">
        <div className="hero-card">
          <div className="hero-text">
            <h2>내가 이거.. 하고 나왔나..?</h2>
            <p style={{lineHeight: "20px"}}>
              <strong>외출 전,</strong> 가볍게 점검해보세요<br />
              불안한 마음을 떨칠 수 있습니다.
            </p>
          </div>
          <div className="hero-icon">🏠</div>
        </div>
      </div>

    <main className="app-container">
      
      {/* 버튼 */}
      <div className="button-row">
        <button className="add-btn primary-home" onClick={() => setAddOpen(true)}>
          항목 추가하기
        </button>
        <button className="reset-btn outline" onClick={() => setResetOpen(true)}>
          점검상태 초기화
        </button>
      </div>

      {/* 빈 상태 */}
      {items.length === 0 && (
        <div className="empty-state">
          아직 확인할 항목이 없어요.<br />
          하나 추가해보세요. 
        </div>
      )}

      {/* 카드 */}
      <div className="leave-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className={`leave-card ${item.isOn ? "on" : "off"}`}
            onClick={() => toggleItem(item.id)}
          >
            <button
              className="delete-x"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm("정말 삭제할까요?")) {
                  removeItem(item.id);
                }              }}
            >
              ✕
            </button>

            <div className="leave-icon-circle">
              {item.icon}
            </div>

            <div className="leave-title">{item.title}</div>

            {item.subtitle && (
              <div className="leave-sub">{item.subtitle}</div>
            )}

            <div className="leave-status">
              {item.isOn ? "확인 전" : "확인 완료"}
            </div>
          </div>
        ))}
      </div>

      <AddLeaveHomeModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onConfirm={addItem}
      />

      <ResetConfirmModal
        open={resetOpen}
        onCancel={() => setResetOpen(false)}
        onConfirm={() => {
          resetItems();
          setResetOpen(false);
        }}
      />
    </main>
    </>
  );
}
