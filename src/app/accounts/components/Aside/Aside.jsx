"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronRight, FiLogOut, FiX } from "react-icons/fi";
import { isGroupActive, isRouteActive, navItems } from "./mock-data";

// 1 - اكتيف اللينك العادي
const activeClass = "bg-primary font-semibold text-white";
const idleClass = "font-medium text-muted hover:bg-surface/70";

// 2 - اكتيف الجروب اللي بيتفتح - مختلف تماما
const groupActiveClass = "bg-[#E8F7FB] font-semibold text-primary";
const groupIdleClass = "font-medium text-muted hover:bg-surface/70";

// 3 - اكتيف الابن اللي جوة الجروب
const childActiveClass = "font-semibold text-primary";
const childIdleClass = "font-medium text-muted hover:bg-surface/70";

export function Aside({ mobileOpen = false, onClose }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 1024) setCollapsed(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const next = {};
    navItems.forEach((item) => {
      if (item.children?.length && isGroupActive(pathname, item)) {
        next[item.id] = true;
      }
    });
    setOpenGroups((prev) => ({ ...prev, ...next }));
  }, [pathname]);

  const compact = collapsed && !mobileOpen;

  const toggleGroup = (id) => {
    if (compact) return;
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside
      className={`fixed inset-y-2 right-2 z-50 flex h-[calc(100vh-1rem)] w-[min(255px,85vw)] flex-col overflow-hidden rounded-[20px] bg-white shadow-card transition-transform duration-300 lg:static lg:inset-auto lg:z-auto lg:h-full lg:shrink-0 ${
        collapsed ? "lg:w-[88px]" : "lg:w-[255px]"
      } ${mobileOpen ? "translate-x-0" : "translate-x-[110%] lg:translate-x-0"}`}
    >
      <div className="flex items-center gap-3 border-b border-surface px-4 py-6 lg:justify-center lg:py-8">
        <button
          type="button"
          onClick={onClose}
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-surface lg:hidden"
          aria-label="إغلاق القائمة"
        >
          <FiX className="size-5" />
        </button>

        {!compact && (
          <Image
            src="/accounts/assets/logo.png"
            alt="ROOJ Marketing Agency"
            width={146}
            height={40}
            className="h-10 w-[146px] object-cover"
            priority
          />
        )}

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="hidden size-8 shrink-0 items-center justify-center rounded-full text-primary transition hover:bg-surface lg:flex"
          aria-label={collapsed ? "توسيع القائمة" : "طي القائمة"}
        >
          <FiChevronRight
            className={`size-6 object-cover transition ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <nav className="scrollbar-thin flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
        {navItems.map((item) => {
          const Icon = item.Icon;
          const hasChildren = Boolean(item.children?.length);
          const itemActive = !hasChildren && isRouteActive(pathname, item.href);
          const groupActive = hasChildren && isGroupActive(pathname, item);
          const isOpen = Boolean(openGroups[item.id]);
          const showChevron = Array.isArray(item.children);

          if (hasChildren) {
            return (
              <div key={item.id} className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => toggleGroup(item.id)}
                  className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-3 transition sm:px-4 ${
                    groupActive ? groupActiveClass : groupIdleClass
                  } ${compact ? "justify-center px-2" : ""}`}
                >
                  <Icon className="size-5 shrink-0" />
                  {!compact && (
                    <>
                      <span className="min-w-0 flex-1 text-start text-sm font-medium sm:text-base">
                        {item.label}
                      </span>
                      <FiChevronDown
                        className={`size-5 shrink-0 opacity-70 transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  )}
                </button>

                {!compact && isOpen && (
                  <div className="flex flex-col gap-0.5 pe-2 ps-7">
                    {item.children.map((child) => {
                      const ChildIcon = child.Icon;
                      const childActive = isRouteActive(pathname, child.href);

                      return (
                        <Link
                          key={child.id}
                          href={child.href}
                          onClick={onClose}
                          className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 transition sm:px-1 ${
                            childActive ? childActiveClass : childIdleClass
                          }`}
                        >
                          <ChildIcon className="size-5 shrink-0" />
                          <span className="min-w-0 flex-1 text-start text-sm sm:text-base">
                            {child.label}
                          </span>
                         
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-[10px] px-3 py-3 transition sm:px-4 ${
                itemActive ? activeClass : idleClass
              } ${compact ? "justify-center px-2" : ""}`}
            >
              <Icon className="size-5 shrink-0" />
              {!compact && (
                <>
                  <span className="min-w-0 flex-1 text-start text-sm sm:text-base">
                    {item.label}
                  </span>
                  {showChevron && (
                    <FiChevronDown className="size-5 shrink-0 opacity-70" />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-surface px-3 py-4 sm:px-4">
        <button
          type="button"
          className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-3 text-[#B20008] transition hover:bg-red-50 sm:px-4 ${
            compact ? "justify-center" : ""
          }`}
        >
          <FiLogOut className="size-5 shrink-0" />
          {!compact && (
            <span className="text-start text-sm font-medium sm:text-base">
              تسجيل الخروج
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}