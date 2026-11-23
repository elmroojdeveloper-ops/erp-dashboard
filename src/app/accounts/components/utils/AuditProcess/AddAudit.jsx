"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FiX,
  FiCheckCircle,
  FiChevronDown,
  FiSearch,
  FiLink2,
  FiInfo,
} from "react-icons/fi";

const cx = (...c) => c.filter(Boolean).join(" ");

const DEFAULT_EXISTING_AUDITS = [
  { id: "AUD-2024-01", title: "تدقيق الربع الثالث 2024" },
  { id: "AUD-2024-02", title: "تدقيق الزكاة والضريبة Q2" },
  { id: "AUD-2023-03", title: "مراجعة القوائم المالية 2023" },
];

const AddAudit = ({
  openAddAudit,
  setOpenAddAudit,
  onSubmit,
  existingAudits = DEFAULT_EXISTING_AUDITS,
}) => {
  const [activeTab, setActiveTab] = useState("new"); // "new" | "existing"
  const [existingAuditId, setExistingAuditId] = useState(
    existingAudits?.[0]?.id || ""
  );
  const [auditSearch, setAuditSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [auditName, setAuditName] = useState("");
  const [auditType, setAuditType] = useState("internal"); // "internal" | "external"
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredAudits = useMemo(() => {
    const q = auditSearch.trim().toLowerCase();
    if (!q) return existingAudits;
    return existingAudits.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }, [existingAudits, auditSearch]);

  const selectedExistingAudit = useMemo(
    () => existingAudits.find((item) => item.id === existingAuditId) || null,
    [existingAudits, existingAuditId]
  );

  if (!openAddAudit) return null;

  const resetForm = () => {
    setActiveTab("new");
    setExistingAuditId(existingAudits?.[0]?.id || "");
    setAuditSearch("");
    setDropdownOpen(false);
    setAuditName("");
    setAuditType("internal");
    setFromDate("");
    setToDate("");
    setDescription("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    setOpenAddAudit?.(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === "new" && !auditName.trim()) {
      setError("يرجى إدخال اسم عملية التدقيق.");
      return;
    }

    if (activeTab === "existing" && !existingAuditId) {
      setError("يرجى اختيار عملية التدقيق الموجودة.");
      return;
    }

    setError("");
    onSubmit?.({
      mode: activeTab,
      existingAuditId: activeTab === "existing" ? existingAuditId : null,
      existingAuditTitle:
        activeTab === "existing" ? selectedExistingAudit?.title || "" : "",
      auditName: auditName.trim(),
      auditType,
      fromDate,
      toDate,
      description: description.trim(),
    });
    resetForm();
    setOpenAddAudit?.(false);
  };

  return (
    <div
      dir="rtl"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-[2px]"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-audit-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[680px] rounded-[24px] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.14)] sm:p-7"
      >
        {/* ===== رأس النافذة ===== */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-[3px] rounded-full bg-[#1b7398]" />
            <h2
              id="add-audit-title"
              className="text-[17px] font-extrabold text-[#1f2937]"
            >
              تكامل عملية التدقيق
            </h2>
          </div>

          <button
            type="button"
            aria-label="إغلاق النافذة"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#1f2937]"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* ===== التبويبات ===== */}
        <div className="mt-5 grid grid-cols-2 gap-1.5 rounded-xl bg-[#eef2f5] p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab("new");
              setDropdownOpen(false);
              setError("");
            }}
            className={cx(
              "h-[36px] rounded-lg text-[13px] font-bold transition-all",
              activeTab === "new"
                ? "bg-white text-[#1b7398] shadow-2xs"
                : "text-[#6b7280] hover:text-[#374151]"
            )}
          >
            إنشاء تدقيق جديد
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("existing");
              setError("");
            }}
            className={cx(
              "h-[36px] rounded-lg text-[13px] font-bold transition-all",
              activeTab === "existing"
                ? "bg-white text-[#1b7398] shadow-2xs"
                : "text-[#6b7280] hover:text-[#374151]"
            )}
          >
            إضافة إلى عملية موجودة
          </button>
        </div>

        {/* ===== النموذج ===== */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {activeTab === "existing" ? (
            <div className="space-y-4">
              {/* رسالة التنبيه الزرقاء المطابقة للصورة */}
              <div className="flex items-start gap-2.5 rounded-xl bg-[#eaf4f8]/80 px-4 py-3 text-[12px] font-medium leading-[19px] text-[#1b7398]">
                <FiInfo
                  size={16}
                  className="mt-0.5 shrink-0 text-[#1b7398]"
                />
                <p>
                  هناك بعض السجلات المحاسبية المرتبطة بعملية تدقيق مفتوحة
                  سابقًا. سيتم ربط هذا القيد بها تلقائيًا لضمان دقة البيانات
                  المالية.
                </p>
              </div>

              {/* حقل البحث والاختيار عن عملية التدقيق */}
              <div ref={dropdownRef} className="relative space-y-1.5">
                <label
                  htmlFor="existing-audit-search"
                  className="block text-[12.5px] font-semibold text-[#374151]"
                >
                  اسم عملية التدقيق
                </label>

                <div className="relative flex items-center">
                  <FiSearch
                    size={16}
                    className="pointer-events-none absolute right-3.5 text-[#6b7280]"
                  />
                  <input
                    id="existing-audit-search"
                    type="text"
                    value={
                      dropdownOpen
                        ? auditSearch
                        : auditSearch || selectedExistingAudit?.title || ""
                    }
                    onFocus={() => {
                      setAuditSearch("");
                      setDropdownOpen(true);
                    }}
                    onChange={(e) => {
                      setAuditSearch(e.target.value);
                      setDropdownOpen(true);
                      if (error) setError("");
                    }}
                    placeholder="ابحث عن عملية تدقيق..."
                    className="h-[42px] w-full rounded-xl border border-[#e5e7eb] bg-white pl-10 pr-10 text-[13px] font-medium text-[#1f2937] placeholder:text-[#9ca3af] transition-colors focus:border-[#1b7398] focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="عرض قائمة عمليات التدقيق"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="absolute left-3 flex h-6 w-6 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]"
                  >
                    <FiChevronDown size={16} />
                  </button>
                </div>

                {dropdownOpen && (
                  <div className="z-30 mt-1 max-h-48 overflow-y-auto rounded-xl border border-[#e5e7eb] bg-white py-1 shadow-lg">
                    {filteredAudits.length === 0 ? (
                      <div className="px-3.5 py-2.5 text-[12.5px] text-[#6b7280]">
                        لا توجد عمليات تدقيق مطابقة للبحث.
                      </div>
                    ) : (
                      filteredAudits.map((item) => {
                        const isSelected = item.id === existingAuditId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setExistingAuditId(item.id);
                              setAuditSearch(item.title);
                              setDropdownOpen(false);
                              if (error) setError("");
                            }}
                            className={cx(
                              "flex w-full items-center justify-between px-3.5 py-2 text-right text-[13px] transition-colors",
                              isSelected
                                ? "bg-[#eaf4f8] font-bold text-[#1b7398]"
                                : "font-medium text-[#374151] hover:bg-[#f8fafc]"
                            )}
                          >
                            <span>{item.title}</span>
                            <span
                              dir="ltr"
                              className="text-[11px] text-[#6b7280]"
                            >
                              {item.id}
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* الصف الأول: اسم عملية التدقيق + نوع عملية التدقيق */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="audit-name"
                    className="block text-[12.5px] font-semibold text-[#374151]"
                  >
                    اسم عملية التدقيق
                  </label>
                  <input
                    id="audit-name"
                    type="text"
                    value={auditName}
                    onChange={(e) => {
                      setAuditName(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="مثلاً تدقيق الربع السنوي 2024"
                    className="h-[42px] w-full rounded-xl border border-[#e5e7eb] bg-white px-3.5 text-[13px] text-[#1f2937] placeholder:text-[#9ca3af] transition-colors focus:border-[#1b7398] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="audit-type"
                    className="block text-[12.5px] font-semibold text-[#374151]"
                  >
                    نوع عملية التدقيق
                  </label>
                  <div className="relative">
                    <select
                      id="audit-type"
                      value={auditType}
                      onChange={(e) => setAuditType(e.target.value)}
                      className="h-[42px] w-full appearance-none rounded-xl border border-[#e5e7eb] bg-white pl-10 pr-3.5 text-[13px] font-medium text-[#1f2937] transition-colors focus:border-[#1b7398] focus:outline-none"
                    >
                      <option value="internal">داخلي</option>
                      <option value="external">خارجي</option>
                    </select>
                    <FiChevronDown
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7280]"
                    />
                  </div>
                </div>
              </div>

              {/* الصف الثاني: من تاريخ + إلى تاريخ */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="from-date"
                    className="block text-[12.5px] font-semibold text-[#374151]"
                  >
                    من تاريخ
                  </label>
                  <input
                    id="from-date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    className="h-[42px] w-full rounded-xl border border-[#e5e7eb] bg-white px-3.5 text-[13px] text-[#4b5563] transition-colors focus:border-[#1b7398] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="to-date"
                    className="block text-[12.5px] font-semibold text-[#374151]"
                  >
                    إلى تاريخ
                  </label>
                  <input
                    id="to-date"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    className="h-[42px] w-full rounded-xl border border-[#e5e7eb] bg-white px-3.5 text-[13px] text-[#4b5563] transition-colors focus:border-[#1b7398] focus:outline-none"
                  />
                </div>
              </div>

              {/* الصف الثالث: الوصف */}
              <div className="space-y-1.5">
                <label
                  htmlFor="audit-description"
                  className="block text-[12.5px] font-semibold text-[#374151]"
                >
                  الوصف
                </label>
                <textarea
                  id="audit-description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="أدخل تفاصيل القيد هنا..."
                  className="w-full resize-none rounded-xl border border-[#e5e7eb] bg-white p-3.5 text-[13px] text-[#1f2937] placeholder:text-[#9ca3af] transition-colors focus:border-[#1b7398] focus:outline-none"
                />
              </div>
            </>
          )}

          {error && (
            <p className="text-[12px] font-semibold text-[#dc2626]">{error}</p>
          )}

          {/* ===== الأزرار السفلية ===== */}
          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="submit"
              className="inline-flex h-[38px] items-center justify-center gap-1.5 rounded-xl bg-[#1b7398] px-5 text-[13px] font-bold text-white shadow-2xs transition-colors hover:bg-[#165e7d]"
            >
              {activeTab === "existing" ? (
                <>
                  <FiLink2 size={15} />
                  <span>تم الربط</span>
                </>
              ) : (
                <>
                  <FiCheckCircle size={15} />
                  <span>حفظ وتعيين</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-[38px] items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-5 text-[13px] font-semibold text-[#374151] transition-colors hover:bg-[#f9fafb]"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAudit;