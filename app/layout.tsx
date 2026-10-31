import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zero check — Evidence before conviction",
  description: "An evidence-first decision workspace for Indian market infrastructure equities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
