"use client";

import { useEffect, useState } from "react";
import AddItemModal from "@/components/AddItemModal";
import MenuModal from "@/components/MenuModal";
import { loadFromStorage, saveToStorage } from "@/utils/storage";
import { RecordItem } from "@/types/recordItem";

const STORAGE_KEY = "amatda_medicine";

export default function MedicinePage() {
  const [items, setItems] = useState<RecordItem[]>(() =>
    loadFromStorage<RecordItem[]>(STORAGE_KEY, [])
  );
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        i.id === id
          ? { ...i, lastCheckedAt: new Date().toISOString() }
          : i
      )
    );
  };

  return (
    <>
      {/* 메뉴 모달 */}
      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* HERO */}
      <div className="hero-cover menu-hero-cover">
        <div className="hero-card menu-hero-card accent-pink">
          <div className="hero-text">
            <h2>이 약들, 언제 먹었었지..?</h2>
            <p>
              먹을 약, 참 많죠?<br />
              약 별로 먹을때만 터치해 두세요!
            </p>
          </div>
          <div className="hero-icon">💊</div>
        </div>
      </div>

      {/* 본문 */}
      <main className="app-container">
        <button
          className="add-btn primary"
          onClick={() => setOpen(true)}
        >
          약 추가하기
        </button>

        {items.length === 0 && (
          <div className="empty-state">
            아직 항목이 없어요.<br />
            추가해보세요!
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

            <button
              className="update-main"
              onClick={() => handleUpdate(item.id)}
            >
              방금 먹음!
            </button>
          </div>
        ))}

        <AddItemModal
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={addItem}
          title="💊 약 추가하기"
          nameLabel="📄 약 이름"
          namePlaceholder="예) 비타민, 감기약"
          descLabel="🩺 복용 상황"
          descPlaceholder="예) 아침 식사 후"
        />
      </main>
    </>
  );
}
