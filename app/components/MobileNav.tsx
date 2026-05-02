"use client";

import { usePathname, useRouter } from "next/navigation";
import { Search, Heart, Briefcase, User } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show mobile nav on login/signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const navItems = [
    { icon: Search, label: "Search", path: "/" },
    { icon: Heart, label: "Saved", path: "/saved" },
    { icon: Briefcase, label: "Trips", path: "/trips" },
    { icon: User, label: "Profile", path: "/login" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 pb-safe pt-2 px-6 flex justify-between items-center z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.path || (item.path === "/" && pathname === "/search");
        const Icon = item.icon;
        
        return (
          <button
            key={item.label}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center justify-center w-16 h-14 relative group ${isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
          >
            {isActive && (
              <span className="absolute -top-2 w-8 h-1 bg-blue-600 rounded-b-full"></span>
            )}
            <Icon className={`w-6 h-6 mb-1 transition-transform ${isActive ? "scale-110" : "group-active:scale-95"}`} />
            <span className={`text-[10px] font-bold ${isActive ? "text-blue-600" : "text-slate-500"}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
