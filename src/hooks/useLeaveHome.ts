"use client";

import { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage } from "@/utils/storage";

const STORAGE_KEY = "amatda_leave_home";
const MAX_ITEMS = 8;

export type LeaveHomeItem = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  icon: string;
  isOn: boolean;
};

export function useLeaveHome() {
  // ✅ lazy initializer (이게 핵심)
  const [items, setItems] = useState<LeaveHomeItem[]>(() =>
    loadFromStorage<LeaveHomeItem[]>(STORAGE_KEY, [])
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, items);
  }, [items]);

  const addItem = (item: LeaveHomeItem) => {
    setItems((prev) => {
      if (prev.length >= MAX_ITEMS) return prev;
      return [...prev, item];
    });
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, isOn: !i.isOn } : i
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const resetItems = () => {
    setItems((prev) =>
      prev.map((i) => ({ ...i, isOn: true }))
    );
  };

  return {
    items,
    addItem,
    toggleItem,
    removeItem,
    resetItems,
  };
}
