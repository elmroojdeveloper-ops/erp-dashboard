"use client";

import { Suspense, useEffect, useState } from "react";
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
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [mobileOpen]);

  return (
    <div
      dir="rtl"
      className="flex h-dvh max-h-dvh min-h-0 w-full gap-0 overflow-hidden bg-surface p-2 sm:gap-3 sm:p-3 lg:gap-4 lg:p-4"
    >
      {mobileOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Suspense
        fallback={
          <aside className="hidden h-full w-[270px] shrink-0 rounded-[20px] bg-white shadow-card lg:block" />
        }
      >
        <Aside mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      </Suspense>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <main className="scrollbar-thin flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain">
          <div className="sticky top-0 z-30 shrink-0 bg-surface/95 px-1 pb-2 pt-1 backdrop-blur-sm sm:px-2 sm:pb-3 sm:pt-2 lg:px-4 lg:pt-4">
            <Topbar onMenuClick={() => setMobileOpen(true)} />
          </div>
          <div className="flex-1 px-1 pb-3 sm:px-2 sm:pb-4 lg:px-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
