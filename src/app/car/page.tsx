"use client";

import { useEffect, useState } from "react";
import AddItemModal from "@/components/AddItemModal";
import { loadFromStorage, saveToStorage } from "@/utils/storage";
import { RecordItem } from "@/types/recordItem";
import MenuModal from "@/components/MenuModal";

const STORAGE_KEY = "amatda_car";

export default function CarPage() {
  const [items, setItems] = useState<RecordItem[]>(() =>
    loadFromStorage<RecordItem[]>(STORAGE_KEY, [])
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, items);
  }, [items]);

  const addItem = (name: string, desc: string) => {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        desc,
        lastCheckedAt: new Date().toISOString(),
      },
    ]);
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdate = (id: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, lastCheckedAt: new Date().toISOString() } : i
      )
    );
  };
  const [menuOpen, setMenuOpen] = useState(false);

return (
  <>
    {/* 헤더 */}
    <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />

    {/* HERO (청소와 동일 패턴) */}
    <div className="hero-cover menu-hero-cover">
      <div className="hero-card menu-hero-card accent-green">
        <div className="hero-text">
          <h2>차량 정비일 기억나세요?</h2>
          <p>
            마지막 정비일만 체크하면 <br />
            다음 정비 문제 없어요!
          </p>
        </div>
        <div className="hero-icon">🚗</div>
      </div>
    </div>

    {/* 본문 */}
    <main className="app-container">
      <button
        className="add-btn primary"
        onClick={() => setOpen(true)}
      >
        차량 정비 추가하기
      </button>

      {items.length === 0 && (
        <div className="empty-state">
          아직 항목이 없어요.<br />추가해보세요.
        </div>
      )}

      {items.map((item) => (
        <div key={item.id} className="record-card">
          <button
            className="delete-x"
            onClick={() => {
              if (confirm("정말 삭제할까요?")) {
                handleDelete(item.id);
              }
            }}
          >
            ✕
          </button>

          <div className="record-info">
            <div className="record-title">{item.name}</div>
            <div className="record-desc">{item.desc}</div>
            <div className="record-date">
                <span
                  style={{
                    color: "#e47272",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  {new Date(item.lastCheckedAt).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
            </div>
          </div>

          <button className="update-main" onClick={() => handleUpdate(item.id)}>
            방금 완료!
          </button>
        </div>
      ))}

      <AddItemModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={addItem}
        title="🛻 차량 정비 추가하기"
        nameLabel="🛠️ 할 일 이름"
        namePlaceholder="예) 세차, 엔진오일 교체"
        descLabel="🔈 간단한 설명"
        descPlaceholder="예) 실내세차"
      />
    </main>
    </>
  );
}
