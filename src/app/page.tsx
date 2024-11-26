import { NavItem } from "@/components/nav";

export default function Home() {
  return (
    <main className="flex h-screen flex-col">
      <nav className="flex items-center">
        <NavItem className="font-bold" href="/">Marklive</NavItem>
        <NavItem href="/browse">Saved</NavItem>
        <NavItem href="/browse">Browse</NavItem>
      </nav>
      <div>

      </div>
      <div className="flex-1 flex">
        <textarea className="w-full caret-slate-200 text-slate-200 resize-none pl-2 pt-2 text-xl outline-none basis-1/2 bg-[#1E1E2E]" />
        <div className="bg-[#181825] basis-1/2">

        </div>
      </div>
    </main>
  );
}
