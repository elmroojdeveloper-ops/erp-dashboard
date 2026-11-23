"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiFileText,
  FiInfo,
  FiPlay,
  FiShield,
  FiUploadCloud,
} from "react-icons/fi";
import { LuHistory, LuShieldCheck, LuTableProperties } from "react-icons/lu";

const Export = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedExtensions = ["xlsx", "csv"];
    const extension = selectedFile.name.split(".").pop()?.toLowerCase();

    if (!allowedExtensions.includes(extension)) return;

    setFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="pb-2">
      {/* Header: عنوان يمين | رجوع شمال */}
      <section className="mb-5 min-h-[128px] rounded-[12px] bg-white px-6 py-5 shadow-[0_1px_3px_rgba(32,70,90,0.04)]">
        <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[22px] font-bold leading-8 text-[#147ca5]">
              استيراد القيود اليومية
            </h1>
            <p className="mt-1 max-w-[700px] text-[14px] leading-7 text-[#5e6875]">
              استخدم هذه الأداة لتحميل القيود المحاسبية من ملفات خارجية دفعة
              واحدة وبدقة عالية عبر معالج الاستيراد الذكي.
            </p>
          </div>

          <Link
            href="/accounts/Entries"
            className="flex shrink-0 items-center gap-1 text-[14px] font-medium text-[#147ca5] transition hover:text-[#0d6386]"
          >
            الرجوع
            <FiArrowLeft className="size-[18px]" />
          </Link>
        </div>
      </section>

      {/*
        RTL grid:
        العمود الأول = يمين = الخطوات 1 و 2
        العمود الثاني = شمال = رفع الملف
      */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.55fr]">
        {/* RIGHT — Steps 1 & 2 */}
        <div className="flex flex-col gap-5">
          {/* Step 1 */}
          <section className="relative overflow-hidden rounded-[12px] bg-white shadow-[0_1px_4px_rgba(32,70,90,0.05)]">
            <div className="absolute right-0 top-0 h-full w-[3px] bg-[#2781a8]" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="text-[11px] font-bold text-[#2781a8]">
                    الخطوة الأولى
                  </span>
                  <h2 className="mt-1 text-[18px] font-medium text-[#303841]">
                    تحميل النموذج
                  </h2>
                </div>
                <div className="flex size-[46px] shrink-0 items-center justify-center rounded-[10px] bg-[#287fa6] text-white shadow-[0_3px_7px_rgba(40,120,155,0.15)]">
                  <FiDownload className="size-[21px]" />
                </div>
              </div>

              <p className="mt-5 text-[13px] leading-7 text-[#596574]">
                قم بتحميل النموذج المحاسبي المعتمد لضمان توافق البيانات مع شجرة
                الحسابات والعملات المسجلة في النظام.
              </p>

              <button
                type="button"
                className="mt-5 flex h-[58px] w-full items-center justify-center gap-2 rounded-[8px] border-2 border-[#167eaa] bg-white text-[14px] font-medium text-[#167eaa] transition hover:bg-[#f3fafc]"
              >
                تحميل نموذج XLSX
                <FiDownload className="size-[17px]" />
              </button>
            </div>
          </section>

          {/* Step 2 */}
          <section className="relative overflow-hidden rounded-[12px] bg-white shadow-[0_1px_4px_rgba(32,70,90,0.05)]">
            <div className="absolute right-0 top-0 h-full w-[3px] bg-[#2781a8]" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="text-[11px] font-bold text-[#2781a8]">
                    الخطوة الثانية
                  </span>
                  <h2 className="mt-1 text-[18px] font-medium text-[#303841]">
                    تجهيز البيانات
                  </h2>
                </div>
                <div className="flex size-[46px] shrink-0 items-center justify-center rounded-[10px] bg-[#287fa6] text-white shadow-[0_3px_7px_rgba(40,120,155,0.15)]">
                  <LuTableProperties className="size-[21px]" />
                </div>
              </div>

              <p className="mt-5 text-[13px] leading-7 text-[#596574]">
                أدخل البيانات المحاسبية في الحقول المخصصة داخل الملف المحمل،
                وتأكد من صحة التواريخ والمبالغ.
              </p>

              <div className="mt-5 flex items-start gap-2 rounded-[8px] border border-[#b9d9e7] bg-[#edf6fa] px-3 py-3">
                <FiInfo className="mt-0.5 size-[15px] shrink-0 text-[#247fa6]" />
                <p className="text-[11px] leading-5 text-[#247fa6]">
                  يرجى عدم تغيير أسماء الأعمدة أو ترتيبها في الملف لضمان القراءة
                  الصحيحة.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* LEFT — Step 3 Upload */}
        <section className="overflow-hidden rounded-[12px] bg-white shadow-[0_1px_4px_rgba(32,70,90,0.05)]">
          <div className="flex h-[87px] items-center gap-3 border-b border-[#edf1f3] px-6">
            <div className="flex size-[46px] items-center justify-center rounded-full bg-[#287fa6] text-white">
              <span className="text-[17px] font-bold">٣</span>
            </div>
            <h2 className="text-[19px] font-medium text-[#303841]">
              الخطوة الثالثة: رفع الملف
            </h2>
          </div>

          <div className="p-5">
            <div
              onDragEnter={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex min-h-[292px] cursor-pointer flex-col items-center justify-center rounded-[15px] border-2 border-dashed px-6 text-center transition ${
                isDragging
                  ? "border-[#247fa6] bg-[#f1f9fc]"
                  : "border-[#b9c9d3] bg-white hover:border-[#247fa6] hover:bg-[#f8fcfd]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.csv"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              <div className="mb-5 flex size-[87px] items-center justify-center rounded-full bg-[#edf6fa]">
                <FiUploadCloud className="size-[38px] text-[#2781a8]" />
              </div>

              {!file ? (
                <>
                  <h3 className="text-[16px] font-medium text-[#303841]">
                    اسحب وأفلت الملف هنا أو تصفح من جهازك
                  </h3>
                  <p className="mt-2 text-[13px] text-[#687481]">
                    يدعم ملفات القيود الشهرية، فواتير المشتريات، وتسويات المخزون.
                  </p>
                  <span className="mt-4 rounded-full bg-[#edf6fa] px-4 py-2 text-[12px] text-[#64717d]">
                    الصيغ المدعومة: .xlsx, .csv
                  </span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#e7f7f1] text-[#0aa47a]">
                      <FiFileText className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#303841]">
                        {file.name}
                      </p>
                      <p className="mt-1 text-xs text-[#7c8792]">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="mt-5 text-xs font-medium text-red-500 hover:underline"
                  >
                    إزالة الملف
                  </button>
                </>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                disabled={!file}
                className="inline-flex h-[56px] items-center justify-center gap-2 rounded-[10px] bg-[#287fa6] px-6 text-[15px] font-medium text-white shadow-[0_3px_7px_rgba(30,120,160,0.15)] transition hover:bg-[#216f91] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiPlay className="size-[17px]" />
                بدء الاستيراد والمعالجة
              </button>

              <div className="flex items-center gap-1.5 text-[11px] text-[#8a959f]">
                <FiInfo className="size-[14px]" />
                <span>حجم الملف الأقصى: 20 ميجابايت</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom info cards */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        <InfoCard
          icon={<FiShield />}
          title="أمان البيانات"
          description={
            <>
              يتم تشفير كافة البيانات
              <br />
              المرفوعة لضمان أقصى
              <br />
              درجات الخصوصية.
            </>
          }
        />
        <InfoCard
          icon={<LuHistory />}
          title="سجل العمليات"
          description={
            <>
              يتم أرشفة جميع عمليات
              <br />
              الاستيراد للرجوع إليها لاحقًا
              <br />
              عند التدقيق.
            </>
          }
        />
        <InfoCard
          icon={<LuShieldCheck />}
          title="التحقق الذكي"
          description={
            <>
              يقوم النظام تلقائيًا بالتحقق
              <br />
              من توازن القيد قبل الحفظ
              <br />
              النهائي.
            </>
          }
        />
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, description }) => {
  return (
    <section className="min-h-[132px] rounded-[12px] bg-white px-5 py-5 shadow-[0_1px_4px_rgba(32,70,90,0.05)]">
      <div className="flex items-center gap-4">
        <div className="flex size-[48px] shrink-0 items-center justify-center rounded-full bg-[#edf6fa] text-[#247fa6]">
          <span className="text-[23px]">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-[16px] font-medium text-[#303841]">{title}</h3>
          <p className="mt-1 text-[12px] leading-6 text-[#697582]">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Export;
