"use client";
import { useState } from "react";

export default function AddItemModal({
  open,
  onClose,
  onConfirm,
  title,
  nameLabel,
  namePlaceholder,
  descLabel,
  descPlaceholder,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (name: string, desc: string) => void;
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  descLabel: string;
  descPlaceholder: string;
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <div className="modal-body"> 
        <label>{nameLabel}</label>
        <input
          value={name}
          placeholder={namePlaceholder}
          onChange={(e) => setName(e.target.value)}
        />

        <label style={{ marginTop: 12 }}>
          {descLabel}
        </label>
        <input
          value={desc}
          placeholder={descPlaceholder}
          onChange={(e) => setDesc(e.target.value)}
        />

        <div className="modal-actions">
          <button
              className="primary"
              onClick={() => {
                if (!name.trim()) {
                  alert("제목을 입력해주세요");
                  return;
                }

                onConfirm(name, desc);
                setName("");
                setDesc("");
              }}
          >
            추가
          </button>
          <button 
            className="outline"
            onClick={onClose}>취소</button>
        </div>
        </div>
      </div>
    </div>
  );
}

