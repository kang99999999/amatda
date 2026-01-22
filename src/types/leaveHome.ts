// src/types/leaveHome.ts
import { ItemId } from "./common";

export interface LeaveHomeItem {
  id: ItemId;
  label: string;        // "가스밸브", "전등"
  isOn: boolean;        // 켜짐 / 꺼짐
  createdAt: string;
}
