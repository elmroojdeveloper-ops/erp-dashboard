"use client";

import { useEffect, useState } from "react";
import { Aside } from "./Aside/Aside";
import { Topbar } from "./Header/Header";

export function AccountsShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div dir="rtl" className="flex h-screen gap-0 overflow-hidden bg-surface p-2 sm:gap-3 sm:p-3 lg:gap-4 lg:p-4">
      {mobileOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Aside mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col gap-3 overflow-hidden sm:gap-4">
        <div className="shrink-0 px-1 pt-1 sm:px-2 sm:pt-2 lg:px-4 lg:pt-4">
          <Topbar onMenuClick={() => setMobileOpen(true)} />
        </div>
        <main className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-1 pb-3 sm:px-2 sm:pb-4 lg:px-4">
          {children}
        </main>
      </div>
    </div>
  );
}
