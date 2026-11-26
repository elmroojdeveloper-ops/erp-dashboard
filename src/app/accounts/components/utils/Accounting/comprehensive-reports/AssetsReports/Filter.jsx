"use client";

import React, { useEffect, useState } from "react";
import {
  FiCalendar,
  FiChevronDown,
  FiFilter,
  FiRotateCcw,
} from "react-icons/fi";
import { LuLayers, LuMapPin } from "react-icons/lu";

const Filter = ({
  fiscalPeriod = "fy24_q3",
  onFiscalPeriodChange,
  assetClass = "all",
  onAssetClassChange,
  location = "all",
  onLocationChange,
  assetStatus = "all",
  onAssetStatusChange,
  onApply,
  onReset,
}) => {
  const [localPeriod, setLocalPeriod] = useState(fiscalPeriod);
  const [localClass, setLocalClass] = useState(assetClass);
  const [localLocation, setLocalLocation] = useState(location);
  const [localStatus, setLocalStatus] = useState(assetStatus);

  useEffect(() => {
    setLocalPeriod(fiscalPeriod);
  }, [fiscalPeriod]);

  useEffect(() => {
    setLocalClass(assetClass);
  }, [assetClass]);

  useEffect(() => {
    setLocalLocation(location);
  }, [location]);

  useEffect(() => {
    setLocalStatus(assetStatus);
  }, [assetStatus]);

  const handleApply = (e) => {
    e?.preventDefault();
    onFiscalPeriodChange?.(localPeriod);
    onAssetClassChange?.(localClass);
    onLocationChange?.(localLocation);
    onAssetStatusChange?.(localStatus);
    onApply?.({
      fiscalPeriod: localPeriod,
      assetClass: localClass,
      location: localLocation,
      assetStatus: localStatus,
    });
  };

  const handleReset = () => {
    const defaultPeriod = "fy24_q3";
    const defaultClass = "all";
    const defaultLocation = "all";
    const defaultStatus = "all";

    setLocalPeriod(defaultPeriod);
    setLocalClass(defaultClass);
    setLocalLocation(defaultLocation);
    setLocalStatus(defaultStatus);

    onFiscalPeriodChange?.(defaultPeriod);
    onAssetClassChange?.(defaultClass);
    onLocationChange?.(defaultLocation);
    onAssetStatusChange?.(defaultStatus);
    onReset?.();
  };

  return (
    <section
      dir="rtl"
      className="rounded-[20px] my-6 border border-[#e6ecf2] bg-white p-4 text-[#1e293b]"
      style={{
        fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif",
      }}
    >
      <form onSubmit={handleApply} className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* الفترة المحاسبية */}
          <div>
            <label className="mb-1.5 block text-right text-[11.5px] font-bold text-[#475569]">
              الفترة المحاسبية
            </label>
            <div className="relative">
              <select
                value={localPeriod}
                onChange={(e) => setLocalPeriod(e.target.value)}
                className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-white pr-3 pl-8 text-right text-[12px] font-extrabold text-[#0f172a] focus:border-[#086382] focus:outline-none"
              >
                <option value="fy24_q3">السنة المالية 2024 - الربع الثالث</option>
                <option value="fy24_q2">السنة المالية 2024 - الربع الثاني</option>
                <option value="fy24_q1">السنة المالية 2024 - الربع الأول</option>
                <option value="fy24_full">السنة المالية 2024 بالكامل</option>
              </select>
              <FiCalendar className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          {/* فئة الأصل الرأسمالي */}
          <div>
            <label className="mb-1.5 block text-right text-[11.5px] font-bold text-[#475569]">
              فئة الأصل الرأسمالي
            </label>
            <div className="relative">
              <select
                value={localClass}
                onChange={(e) => setLocalClass(e.target.value)}
                className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-white pr-8 pl-7 text-right text-[12px] font-extrabold text-[#0f172a] focus:border-[#086382] focus:outline-none"
              >
                <option value="all">
                  كافة الفئات (عقارات، معدات، مركبات، برمجيات)
                </option>
                <option value="buildings">المباني والعقارات</option>
                <option value="equipment">الآلات ومعدات الإنتاج</option>
                <option value="vehicles">أسطول النقل واللوجستيات</option>
                <option value="it">الأجهزة التقنية والبرمجيات</option>
              </select>
              <LuLayers className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
              <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          {/* الموقع الجغرافي / الفرع */}
          <div>
            <label className="mb-1.5 block text-right text-[11.5px] font-bold text-[#475569]">
              الموقع الجغرافي / الفرع
            </label>
            <div className="relative">
              <select
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-white pr-8 pl-7 text-right text-[12px] font-extrabold text-[#0f172a] focus:border-[#086382] focus:outline-none"
              >
                <option value="all">الفرع الرئيسي والمستودعات العامة</option>
                <option value="riyadh_hq">الرياض - المقر الرئيسي</option>
                <option value="jeddah_ops">جدة - فرع العمليات</option>
                <option value="eastern_khobar">الخبر - المنطقة الشرقية</option>
              </select>
              <LuMapPin className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
              <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>

          {/* حالة الأصل الحالية */}
          <div>
            <label className="mb-1.5 block text-right text-[11.5px] font-bold text-[#475569]">
              حالة الأصل الحالية
            </label>
            <div className="relative">
              <select
                value={localStatus}
                onChange={(e) => setLocalStatus(e.target.value)}
                className="h-[38px] w-full appearance-none rounded-[10px] border border-[#e2e8f0] bg-white pr-3 pl-8 text-right text-[12px] font-extrabold text-[#0f172a] focus:border-[#086382] focus:outline-none"
              >
                <option value="all">جميع الحالات</option>
                <option value="in_service">في الخدمة</option>
                <option value="maintenance">تحت الصيانة</option>
                <option value="unused">لم التصرف فيه</option>
              </select>
              <FiChevronDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#64748b]" />
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-end gap-2 pt-0.5">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-[34px] items-center gap-1.5 rounded-[9px] border border-[#e2e8f0] bg-white px-3 text-[11.5px] font-bold text-[#475569] transition hover:bg-[#f8fafc]"
          >
            <FiRotateCcw className="h-3.5 w-3.5 text-[#64748b]" />
            <span>إعادة ضبط</span>
          </button>

          <button
            type="submit"
            className="inline-flex h-[34px] items-center gap-1.5 rounded-[9px] bg-[#086382] px-3.5 text-[11.5px] font-extrabold text-white transition hover:bg-[#064e67]"
          >
            <FiFilter className="h-3.5 w-3.5" />
            <span>تطبيق</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
