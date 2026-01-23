import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // ✅ Capacitor / PWA용 정적 빌드
  output: "export",

  // (선택) 이미지 최적화 비활성화 — export 모드에서 안전
  images: {
    unoptimized: true,
  },
};

export default nextConfig;