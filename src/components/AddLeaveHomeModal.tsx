"use client";

import { useState } from "react";
import { LEAVE_HOME_OPTIONS } from "@/constants/leaveHomeOptions";
import { LeaveHomeItem } from "@/hooks/useLeaveHome";

export default function AddLeaveHomeModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (item: LeaveHomeItem) => void;
}) {
  const [selected, setSelected] = useState(LEAVE_HOME_OPTIONS[0].value);
  const [subtitle, setSubtitle] = useState("");

  if (!open) return null;

  const option = LEAVE_HOME_OPTIONS.find(
    (o) => o.value === selected
  )!;

  return (
    <div className="modal-backdrop">
      <div className="modal">
          <div className="modal-header">
            🕵️‍♀️ 확인할 항목 추가
          </div>

        <div className="modal-body">

          <label>📌 항목 선택</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {LEAVE_HOME_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <label style={{ marginTop: 14 }}>📑 한 줄 설명</label>
          <input
            placeholder="예) 컴퓨터 콘센트, 전기장판 등"
            maxLength={30}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <div className="modal-actions">
            <button
              className="primary"
              onClick={() => {
                onConfirm({
                  id: crypto.randomUUID(),
                  type: option.value,
                  title: option.label,
                  subtitle,
                  icon: option.icon,
                  isOn: true,
                });
                setSubtitle("");
                onClose();
              }}
            >
              추가
            </button>
            <button className="outline" onClick={onClose}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}
