// src/components/LastCheckPage.tsx
"use client";

import { useState } from "react";
import { useLastCheck } from "@/hooks/useLastCheck";

interface Props {
  title: string;
  storageKey: string;
  placeholder: string;
}

export default function LastCheckPage(props: Props) {
  const { title, storageKey, placeholder } = props;

  const { items, addItem, updateNow, removeItem, isFull } =
    useLastCheck(storageKey);

  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim() || isFull) return;
    addItem(name.trim(), "");
    setName("");
  };

  return (
    <main style={{ padding: "24px" }}>
      <h1>{title}</h1>

      <div style={{ marginTop: "16px" }}>
        <input
          type="text"
          maxLength={20}
          placeholder={placeholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isFull}
        />
        <button onClick={handleAdd} disabled={isFull}>
          추가
        </button>

        {isFull && (
          <p style={{ fontSize: "12px", opacity: 0.6 }}>
            최대 8개까지 추가할 수 있어요
          </p>
        )}
      </div>

      <ul style={{ marginTop: "24px" }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "12px" }}>
            <strong>{item.name}</strong>

            <div style={{ fontSize: "14px", opacity: 0.7 }}>
              마지막: {new Date(item.lastCheckedAt).toLocaleString()}
            </div>

            <button onClick={() => updateNow(item.id)}>지금 했어요</button>
            <button
              onClick={() => removeItem(item.id)}
              style={{ marginLeft: "8px" }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
