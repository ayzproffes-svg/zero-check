import Link from "next/link";
import "./content.css";
export default function NotFound() { return <main className="content-shell" style={{display:"grid",placeItems:"center",minHeight:"100vh",textAlign:"center",padding:24}}><div><span className="content-eyebrow">ZERO CHECK / 404</span><h1>Nothing at this address.</h1><p>The page may have moved. Return to the decision workspace.</p><Link href="/">BACK TO HOME ↗</Link></div></main>; }
