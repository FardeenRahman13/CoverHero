import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Assignment Cover Generator", description: "Choose your university, enter your details, and download a print-ready A4 assignment cover page." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
