"use client";
import { Anchor, Waves } from "lucide-react";
import Link from "next/link";


export function NavKrabbyPop() {
return (
<header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
<nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
<Link href="#" className="flex items-center gap-2 font-bold">
<Anchor className="w-5 h-5" />
<span>Krabby Patty</span>
</Link>
<ul className="flex items-center gap-6 text-sm">
<li><a href="#menu" className="hover:underline">Menu</a></li>
<li><a href="#news" className="hover:underline">News</a></li>
<li><a href="#store" className="hover:underline flex items-center gap-1">Store <Waves className="w-4 h-4"/></a></li>
</ul>
</nav>
</header>
);
}