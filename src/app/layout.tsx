import "./globals.css";
import "../styles/page-transition.css";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "아 맞다!",
  description: "원터치 점검으로 아맞다!는 이제 그만~",
  manifest: "/manifest.json",
  themeColor: "#4A90E2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
