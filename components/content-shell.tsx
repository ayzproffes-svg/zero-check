import Link from "next/link";
import type { ReactNode } from "react";
import { Disclaimer } from "./disclaimer";

export function ContentShell({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return <div className="content-shell"><header><Link href="/" aria-label="Zero check home"><span className="content-mark">◩</span> ZERO CHECK</Link><nav><Link href="/">HOME</Link><Link href="/lab">DEMO LAB</Link><a href="mailto:ayz.proffes@gmail.com?subject=Zero%20check%20enquiry">CONTACT ↗</a></nav></header><main><span className="content-eyebrow">{eyebrow}</span><h1>{title}</h1><div className="content-body">{children}</div></main><footer><Disclaimer/><div><span>© {new Date().getFullYear()} ZERO CHECK</span><Link href="/">BACK TO HOME ↑</Link></div></footer></div>;
}
