"use client";

import { useEffect, useRef, useState } from "react";
import { loadFromStorage, saveToStorage } from "@/utils/storage";
import { LastCheckItem } from "@/types/lastCheck";

const MAX_ITEMS = 8;

export function useLastCheck(storageKey: string) {
  const [items, setItems] = useState<LastCheckItem[]>([]);
  const [ready, setReady] = useState(false);

  // ✅ 로딩 완료 전에는 저장하지 않기 위한 가드
  const initializedRef = useRef(false);

  // 1) 최초 1회: localStorage에서만 로드
  useEffect(() => {
    const stored = loadFromStorage<LastCheckItem[]>(storageKey, []);
    setItems(stored);
    initializedRef.current = true;
    setReady(true);
  }, [storageKey]);

  // 2) 로딩이 끝난 뒤에만 저장
  useEffect(() => {
    if (!initializedRef.current) return;
    saveToStorage(storageKey, items);
  }, [items, storageKey]);

  const addItem = (name: string, desc: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setItems((prev) => {
      if (prev.length >= MAX_ITEMS) return prev;
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: trimmed,
          desc: desc?.trim() ?? "",
          lastCheckedAt: new Date().toISOString(),
        },
      ];
    });
  };

  const updateNow = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, lastCheckedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    items,
    ready, // ✅ hydration 방지에 씀
    addItem,
    updateNow,
    removeItem,
    isFull: items.length >= MAX_ITEMS,
  };
}
