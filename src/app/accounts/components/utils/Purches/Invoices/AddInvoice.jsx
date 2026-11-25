"use client";
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
  FiChevronDown,
  FiFileText,
  FiCheckCircle,
  FiCalendar,
  FiHash,
  FiUploadCloud,
  FiX,
  FiFile,
  FiExternalLink,
  FiShoppingCart,
  FiPackage,
  FiShield,
  FiZap,
  FiList,
  FiDownload,
  FiRefreshCw,
  FiMessageSquare,
  FiSave,
  FiArrowRight,
  FiLock,
  FiSliders,
} from 'react-icons/fi';
import { FaCoins, FaHandSparkles, FaReceipt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object().shape({
  purchaseOrder: Yup.string().required('يرجى اختيار أمر الشراء المرتبط'),
  invoiceNumber: Yup.string().required('رقم فاتورة المورد مطلوب'),
  invoiceDate: Yup.string().required('تاريخ الفاتورة مطلوب'),
  notes: Yup.string(),
  items: Yup.array().of(
    Yup.object().shape({
      invoicePrice: Yup.number()
        .typeError('يجب أن يكون رقماً')
        .min(0, 'القيمة غير صحيحة')
        .required('مطلوب'),
    })
  ),
});

const AddInvoice = () => {
  const [simulationMode, setSimulationMode] = useState('exact');
  const router = useRouter()
  const [uploadedFile, setUploadedFile] = useState({
    name: 'فاتورة_المورد_المعتمدة.pdf',
    status: 'تم التحقق من الختم الرقمي ZATCA',
  });

  const initialValues = {
    purchaseOrder: 'PO-2024-231',
    invoiceNumber: 'INV-2024-9041',
    invoiceDate: '19 نوفمبر 2024',
    notes: '',
    items: [
      {
        id: '01',
        title: 'خزائن إيداع حديدية مصفحة - فئة أمان عالي Tier-4',
        code: 'ETM-SAF-9002',
        spec: 'المقاس: 180×90×60 سم',
        poQty: 60,
        grnQty: 60,
        grnSub: 'استلام شحنة رئيسية',
        invoiceQty: 60,
        contractPrice: 850.0,
        invoicePrice: 850.0,
        status: 'مطابق تام',
        statusType: 'exact',
      },
      {
        id: '02',
        title: 'أقفال إلكترونية بيومترية مدمجة مع نظام التحقق المركزي',
        code: 'ETM-BIO-3321',
        spec: 'التوريد الإضافي الملحق',
        poQty: 40,
        grnQty: 40,
        grnSub: 'استلام إضافي ملحق',
        invoiceQty: 40,
        contractPrice: 624.37,
        invoicePrice: 624.37,
        status: 'استلام إضافي مطابق',
        statusType: 'additional',
      },
    ],
  };

  const calculateTotals = (items) => {
    const subtotal = items.reduce(
      (acc, item) => acc + Number(item.invoiceQty || 0) * Number(item.invoicePrice || 0),
      0
    );
    const vat = subtotal * 0.15;
    const total = subtotal + vat;
    return {
      subtotal: 75978.26,
      vat: 11396.74,
      total: 87975.0,
      dynamicSubtotal: subtotal,
      dynamicVat: vat,
      dynamicTotal: total,
    };
  };

  const formatCurrency = (num) => {
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen  text-[#1e293b] flex flex-col font-sans"
      style={{ fontFamily: "'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Submitted Purchase Invoice:', values);
         
        }}
      >
        {({ values, setFieldValue }) => {
          const totals = calculateTotals(values.items);

          return (
            <Form className="flex-1 flex flex-col justify-between">
              <div className="  w-full mx-auto space-y-4">
                {/* PAGE TITLE & TOP BADGES */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0d658a] text-white flex items-center justify-center shadow-xs">
                      <FiFileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h1 className="text-[18px] font-extrabold text-[#0f172a] leading-tight">
                        تسجيل فاتورة شراء
                      </h1>
                      <p className="text-[11.5px] text-[#64748b] mt-0.5">
                        أدخل بيانات الفاتورة الواردة من المورد لمطابقتها تلقائياً عبر خوارزمية{' '}
                        <span className="font-semibold text-[#475569]">Three-Way Match</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="bg-white border border-[#e2e8f0] rounded-lg px-3 py-1.5 flex items-center gap-2 text-[11px] font-semibold text-[#334155] shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                      <span>محرك الفحص النشط:</span>
                      <span className="text-[#0d658a] font-bold">
                        المطابقة الثلاثية الذكية v2.4
                      </span>
                    </div>
                    <div className="bg-white border border-[#e2e8f0] rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-[11px] font-bold text-[#0d658a] shadow-2xs">
                      <FiShield className="w-3.5 h-3.5 text-[#0d658a]" />
                      <span>ZATCA e-Invoice Tier 2</span>
                    </div>
                  </div>
                </div>

                {/* TOP TWO-COLUMN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* CARD 1: ربط أمر الشراء الفعلي */}
                  <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#0d658a] text-white text-[12px] font-bold flex items-center justify-center">
                            1
                          </span>
                          <h2 className="text-[14px] font-extrabold text-[#0f172a]">
                            ربط أمر الشراء الفعلي
                          </h2>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-md bg-[#f1f5f9] text-[#64748b] text-[10.5px] font-semibold border border-[#e2e8f0]">
                          إلزامي للربط
                        </span>
                      </div>

                      <div className="mb-3.5">
                        <label className="block text-[11.5px] font-bold text-[#475569] mb-1.5">
                          اختيار أمر الشراء المرتبط
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            name="purchaseOrder"
                            className="w-full h-[38px] bg-[#f8fafc] border border-[#cbd5e1] rounded-lg px-3 text-[12.5px] font-bold text-[#1e293b] appearance-none focus:outline-none focus:border-[#0d658a]"
                          >
                            <option value="PO-2024-231">
                              PO-2024-231 — شركة الخزائن المتقدمة
                            </option>
                            <option value="PO-2024-232">
                              PO-2024-232 — مؤسسة التقنية الحديثة
                            </option>
                          </Field>
                          <FiChevronDown className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <ErrorMessage
                          name="purchaseOrder"
                          component="div"
                          className="text-[11px] text-[#dc2626] mt-1 font-medium"
                        />
                      </div>

                      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3">
                        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#e2e8f0]">
                          <div className="flex items-center gap-1.5 text-[#0d658a] font-extrabold text-[13px]">
                            <FiFile className="w-4 h-4" />
                            <span>{values.purchaseOrder}</span>
                          </div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] text-[11px] font-bold">
                            <FiCheckCircle className="w-3 h-3" />
                            أمر معتمد ومطابق
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-[11.5px]">
                          <div>
                            <span className="text-[#94a3b8] block text-[10.5px]">
                              المورد المعتمد
                            </span>
                            <span className="font-bold text-[#1e293b]">
                              شركة الخزائن المتقدمة المحدودة
                            </span>
                          </div>
                          <div>
                            <span className="text-[#94a3b8] block text-[10.5px]">
                              الحجم الإجمالي
                            </span>
                            <span className="font-bold text-[#1e293b]">
                              100 وحدة توريد مجدولة
                            </span>
                          </div>
                          <div>
                            <span className="text-[#94a3b8] block text-[10.5px]">
                              رصيد الميزانية المخصص
                            </span>
                            <span className="font-extrabold text-[#0d658a] text-[13px]">
                              87,975.00 <span className="text-[10.5px] font-semibold">ر.س</span>
                            </span>
                          </div>
                          <div className="flex items-end justify-end">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#cbd5e1] text-[#0d658a] text-[11px] font-bold hover:bg-[#f1f5f9]"
                            >
                              <FiExternalLink className="w-3 h-3" />
                              <span>عرض ملف التعاقد</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: بيانات فاتورة المورد الرسمية */}
             <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
  <div>
    <div className="flex items-center justify-between mb-3.5">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-[#0d658a] text-white text-[12px] font-bold flex items-center justify-center">
          2
        </span>
        <h2 className="text-[14px] font-extrabold text-[#0f172a]">
          بيانات فاتورة المورد الرسمية
        </h2>
      </div>
      <span className="px-2.5 py-0.5 rounded-md bg-[#eff6ff] text-[#2563eb] text-[10.5px] font-semibold border border-[#dbeafe]">
        البيانات الضريبية
      </span>
    </div>

    <div className="grid grid-cols-12 gap-2.5 mb-3">
      <div className="col-span-5">
        <label className="block text-[11px] font-bold text-[#475569] mb-1">
          رقم فاتورة المورد
        </label>
        <div className="relative">
          <Field
            name="invoiceNumber"
            type="text"
            className="w-full h-[36px] bg-white border border-[#cbd5e1] rounded-lg pr-2.5 pl-7 text-[12px] font-bold text-[#1e293b] focus:outline-none focus:border-[#0d658a]"
          />
          <FiHash className="w-3.5 h-3.5 text-[#94a3b8] absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
        <ErrorMessage
          name="invoiceNumber"
          component="div"
          className="text-[10.5px] text-[#dc2626] mt-0.5"
        />
      </div>

      <div className="col-span-4">
        <label className="block text-[11px] font-bold text-[#475569] mb-1">
          تاريخ الفاتورة
        </label>
        <div className="relative">
          <Field
            name="invoiceDate"
            type="text"
            className="w-full h-[36px] bg-white border border-[#cbd5e1] rounded-lg pr-2.5 pl-7 text-[12px] font-semibold text-[#1e293b] focus:outline-none focus:border-[#0d658a]"
          />
          <FiCalendar className="w-3.5 h-3.5 text-[#94a3b8] absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
        <ErrorMessage
          name="invoiceDate"
          component="div"
          className="text-[10.5px] text-[#dc2626] mt-0.5"
        />
      </div>

      <div className="col-span-3">
        <div className="flex items-center justify-between mb-1">
          <label className="text-[11px] font-bold text-[#475569]">
            المبلغ الإجمالي
          </label>
          <span className="text-[9px] font-bold px-1 rounded bg-[#e0f2fe] text-[#0369a1]">
            15% ضريبة
          </span>
        </div>
        <div className="h-[36px] bg-[#f0f9ff] border border-[#bae6fd] rounded-lg px-2 flex items-center justify-between">
          <span className="text-[12.5px] font-extrabold text-[#0d658a]">
            {formatCurrency(totals.total)}
          </span>
          <span className="text-[10px] font-semibold text-[#64748b]">ر.س</span>
        </div>
      </div>
    </div>

    <div
      onClick={() => document.getElementById('vendor-invoice-file')?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
          setFieldValue('invoiceFile', file);
          setUploadedFile({
            name: file.name,
            status: 'تم التحقق من الختم الرقمي ZATCA',
          });
        }
      }}
      className="border border-dashed border-[#cbd5e1] bg-[#fafcfd] rounded-xl p-3 text-center cursor-pointer hover:border-[#0d658a] transition-colors"
    >
      <input
        id="vendor-invoice-file"
        type="file"
        accept=".pdf,image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setFieldValue('invoiceFile', file);
            setUploadedFile({
              name: file.name,
              status: 'تم التحقق من الختم الرقمي ZATCA',
            });
          }
        }}
      />
      <div className="w-7 h-7 rounded-full bg-[#e0f2fe] text-[#0d658a] flex items-center justify-center mx-auto mb-1">
        <FiUploadCloud className="w-4 h-4" />
      </div>
      <p className="text-[11.5px] font-bold text-[#1e293b]">
        أرفق نسخة من فاتورة المورد (PDF أو صورة ضوئية)
      </p>
      <p className="text-[10px] text-[#94a3b8] mt-0.5">
        يدعم الاستخراج الذكي للبيانات الضريبية OCR المتوافق مع هيئة الزكاة والضريبة والجمارك
      </p>

      {uploadedFile && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-2 inline-flex items-center gap-2.5 bg-white border border-[#e2e8f0] rounded-lg px-3 py-1.5 shadow-2xs"
        >
          <div className="w-6 h-6 rounded bg-[#fee2e2] text-[#dc2626] flex items-center justify-center text-[9px] font-black">
            {uploadedFile.name?.split('.').pop()?.toUpperCase() || 'PDF'}
          </div>
          <div className="text-right">
            <div className="text-[11px] font-bold text-[#1e293b] leading-tight">
              {uploadedFile.name}
            </div>
            <div className="text-[9.5px] text-[#16a34a] font-semibold flex items-center gap-1">
              <FiCheckCircle className="w-2.5 h-2.5" />
              <span>{uploadedFile.status}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setUploadedFile(null);
              setFieldValue('invoiceFile', null);
            }}
            className="text-[#94a3b8] hover:text-[#ef4444] mr-1"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  </div>
</div>
                </div>

                {/* SECTION 3: THREE-WAY MATCH ENGINE */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-[#f1f5f9]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0d658a] text-white flex items-center justify-center">
                        <FiSliders className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-[14px] font-extrabold text-[#0f172a]">
                            نتيجة المطابقة التلقائية الفورية
                          </h2>
                          <span className="px-2 py-0.5 rounded bg-[#0f172a] text-white text-[9.5px] font-bold tracking-wider uppercase">
                            THREE-WAY MATCH ENGINE
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748b]">
                          مطابقة ثلاثية متزامنة بين أمر الشراء، وإذن الاستلام الفعلي، وفاتورة المورد
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSimulationMode('exact')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                          simulationMode === 'exact'
                            ? 'bg-[#ecfdf5] border-[#a7f3d0] text-[#047857]'
                            : 'bg-white border-[#e2e8f0] text-[#64748b]'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                        <span>معاينة: مطابقة تامة (100%)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSimulationMode('discrepancy')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                          simulationMode === 'discrepancy'
                            ? 'bg-[#fffbeb] border-[#fde68a] text-[#b45309]'
                            : 'bg-white border-[#e2e8f0] text-[#64748b]'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                        <span>معاينة: وجود فروقات (تنبيه)</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-3.5">
                    {/* Pillar 1 */}
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3.5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[12px] font-extrabold text-[#334155]">
                            الركن الأول: أمر الشراء التعاقدي
                          </span>
                          <FiShoppingCart className="w-4 h-4 text-[#0d658a]" />
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[14px] font-black text-[#0d658a]">
                            {values.purchaseOrder}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#e0f2fe] text-[#0369a1] text-[10.5px] font-bold">
                            معتمد
                          </span>
                        </div>
                        <div className="space-y-1.5 text-[11.5px] border-t border-[#e2e8f0] pt-2.5">
                          <div className="flex justify-between">
                            <span className="text-[#64748b]">القيمة المعتمدة</span>
                            <span className="font-bold text-[#0f172a]">87,975.00 ر.س</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#64748b]">الكمية التعاقدية</span>
                            <span className="font-bold text-[#0f172a]">100 قطعة</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#64748b]">مركز التكلفة</span>
                            <span className="font-semibold text-[#475569]">
                              CC-102 اللوجستيات
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#e2e8f0] bg-[#ecfdf5] text-[#047857] rounded-lg py-1.5 px-2.5 text-[11px] font-bold flex items-center justify-center gap-1.5">
                        <FiLock className="w-3.5 h-3.5" />
                        <span>محجوز بالميزانية بالكامل</span>
                      </div>
                    </div>

                    {/* Pillar 2 */}
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3.5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[12px] font-extrabold text-[#334155]">
                            الركن الثاني: الاستلام الفعلي
                          </span>
                          <FiPackage className="w-4 h-4 text-[#0d658a]" />
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[14px] font-black text-[#0f172a]">
                            GRN-2024-889
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#e0f2fe] text-[#0369a1] text-[10.5px] font-bold">
                            استلام مكتمل
                          </span>
                        </div>
                        <div className="space-y-1.5 text-[11.5px] border-t border-[#e2e8f0] pt-2.5">
                          <div className="flex justify-between">
                            <span className="text-[#64748b]">الكمية المستلمة فعلياً</span>
                            <span className="font-bold text-[#0f172a]">100 قطعة</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#64748b]">تجزئة الشحنات</span>
                            <span className="font-semibold text-[#475569] text-[10.5px]">
                              60 قطعة (رئيسي) + 40 قطعة (إضافي)
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#64748b]">المستودع المستلم</span>
                            <span className="font-semibold text-[#475569]">
                              المستودع الرئيسي - الرياض
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#e2e8f0] bg-[#ecfdf5] text-[#047857] rounded-lg py-1.5 px-2.5 text-[11px] font-bold flex items-center justify-center gap-1.5">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        <span>فحص الجودة: سليم ومطابق 100%</span>
                      </div>
                    </div>

                    {/* Pillar 3 */}
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3.5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[12px] font-extrabold text-[#334155]">
                            الركن الثالث: مطالبة المورد
                          </span>
                          <FaReceipt className="w-4 h-4 text-[#0d658a]" />
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[14px] font-black text-[#0f172a]">
                            {values.invoiceNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#dcfce7] text-[#15803d] text-[10.5px] font-bold">
                            مطابق للتوريد
                          </span>
                        </div>
                        <div className="space-y-1.5 text-[11.5px] border-t border-[#e2e8f0] pt-2.5">
                          <div className="flex justify-between">
                            <span className="text-[#64748b]">إجمالي الفاتورة المطالب به</span>
                            <span className="font-bold text-[#0f172a]">87,975.00 ر.س</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#64748b]">الكمية المفوترة</span>
                            <span className="font-bold text-[#0f172a]">100 قطعة</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#64748b]">فارق السعر والكمية</span>
                            <span className="font-bold text-[#16a34a]">
                              0.00 ر.س (متطابق)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#e2e8f0] bg-[#ecfdf5] text-[#047857] rounded-lg py-1.5 px-2.5 text-[11px] font-bold flex items-center justify-center gap-1.5">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        <span>لا توجد فروقات محتسبة</span>
                      </div>
                    </div>
                  </div>

                  {/* Green Success Banner */}
                  <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0">
                        <FiCheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-extrabold text-[#065f46]">
                            مطابقة تامة — جاهزة للاعتماد التلقائي الفوري
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#059669] text-white text-[9.5px] font-bold">
                            Audit Passed
                          </span>
                        </div>
                        <p className="text-[11px] text-[#047857] mt-0.5">
                          تم التحقق آلياً: تطابق تام في الأسعار والكميات بين أمر الشراء{' '}
                          <span className="font-bold">PO-2024-231</span>، وإذن الاستلام الفعلي
                          بالمستودع <span className="font-bold">GRN-2024-889</span>، بدون أي تجاوز
                          مالي أو كمي.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-[#a7f3d0] rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-[11px] font-bold text-[#047857] shadow-2xs">
                      <FiZap className="w-3.5 h-3.5 text-[#10b981]" />
                      <span>الاعتماد يضمن قيد الاستحقاق آلياً</span>
                    </div>
                  </div>
                </div>

                {/* SECTION 4: تفاصيل بنود الفاتورة والمطابقة التفصيلية */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-2">
                      <FiList className="w-4 h-4 text-[#0d658a]" />
                      <h2 className="text-[14px] font-extrabold text-[#0f172a]">
                        تفاصيل بنود الفاتورة والمطابقة التفصيلية
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-[#e0f2fe] text-[#0369a1] text-[10.5px] font-bold">
                        بندين مسجلين
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue('items[0].invoicePrice', 850.0);
                          setFieldValue('items[1].invoicePrice', 624.37);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-[#475569] text-[11px] font-semibold hover:bg-[#f1f5f9]"
                      >
                        <FiRefreshCw className="w-3 h-3" />
                        <span>تصفير المقارنة</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] text-[#475569] text-[11px] font-semibold hover:bg-[#f1f5f9]"
                      >
                        <FiDownload className="w-3 h-3" />
                        <span>تصدير المقارنة</span>
                      </button>
                    </div>
                  </div>

                  <FieldArray name="items">
                    {() => (
                      <div className="overflow-x-auto border border-[#e2e8f0] rounded-xl">
                        <table className="w-full text-right border-collapse">
                          <thead>
                            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[11px] font-bold text-[#64748b]">
                              <th className="py-2.5 px-3 w-10 text-center">#</th>
                              <th className="py-2.5 px-3">البند والمواصفات الفنية</th>
                              <th className="py-2.5 px-3 text-center">
                                كمية أمر الشراء
                                <span className="block text-[9.5px] font-normal text-[#94a3b8]">
                                  (PO)
                                </span>
                              </th>
                              <th className="py-2.5 px-3 text-center">
                                المستلم الفعلي
                                <span className="block text-[9.5px] font-normal text-[#94a3b8]">
                                  (GRN)
                                </span>
                              </th>
                              <th className="py-2.5 px-3 text-center">كمية الفاتورة</th>
                              <th className="py-2.5 px-3 text-center">
                                السعر التعاقدي
                                <span className="block text-[9.5px] font-normal text-[#94a3b8]">
                                  (PO)
                                </span>
                              </th>
                              <th className="py-2.5 px-3 text-center">سعر الفاتورة</th>
                              <th className="py-2.5 px-3 text-center">حالة المطابقة</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#f1f5f9] text-[12px]">
                            {values.items.map((item, idx) => (
                              <tr key={item.id} className="hover:bg-[#fafcfd]">
                                <td className="py-3 px-3 text-center font-bold text-[#94a3b8]">
                                  {item.id}
                                </td>
                                <td className="py-3 px-3">
                                  <div className="font-bold text-[#0f172a]">{item.title}</div>
                                  <div className="text-[10.5px] text-[#94a3b8] mt-0.5">
                                    كود الصنف: {item.code} | {item.spec}
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-center font-semibold text-[#475569]">
                                  {item.poQty} وحدة
                                </td>
                                <td className="py-3 px-3 text-center">
                                  <div className="font-bold text-[#0d658a]">
                                    {item.grnQty} وحدة
                                  </div>
                                  <div className="text-[10px] text-[#94a3b8]">{item.grnSub}</div>
                                </td>
                                <td className="py-3 px-3 text-center font-bold text-[#0f172a]">
                                  {item.invoiceQty} وحدة
                                </td>
                                <td className="py-3 px-3 text-center font-semibold text-[#475569]">
                                  {formatCurrency(item.contractPrice)} ر.س
                                </td>
                                <td className="py-3 px-3 text-center">
                                  <div className="inline-flex items-center border border-[#cbd5e1] rounded-lg bg-white px-2 py-1">
                                    <Field
                                      name={`items[${idx}].invoicePrice`}
                                      type="number"
                                      step="0.01"
                                      className="w-16 text-center font-extrabold text-[#0f172a] text-[12px] focus:outline-none"
                                    />
                                    <span className="text-[10px] text-[#94a3b8] mr-1">ر.س</span>
                                  </div>
                                  <ErrorMessage
                                    name={`items[${idx}].invoicePrice`}
                                    component="div"
                                    className="text-[10px] text-[#dc2626] mt-0.5"
                                  />
                                </td>
                                <td className="py-3 px-3 text-center">
                                  {item.statusType === 'exact' ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-[11px] font-bold">
                                      <FiCheckCircle className="w-3 h-3" />
                                      <span>{item.status}</span>
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d1fae5] text-[#047857] text-[11px] font-bold">
                                      <FaHandSparkles className="w-3 h-3" />
                                      <span>{item.status}</span>
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </FieldArray>

                  <div className="mt-4 pt-3.5 border-t border-[#f1f5f9] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3 max-w-[520px] w-full">
                      <div className="text-[11.5px] font-extrabold text-[#334155] mb-1">
                        سجل المطابقة والأثر المحاسبي:
                      </div>
                      <p className="text-[11px] text-[#64748b] leading-relaxed">
                        سيتم إنشاء قيد استحقاق آلي لحساب المورد{' '}
                        <span className="font-bold text-[#0f172a]">
                          (شركة الخزائن المتقدمة)
                        </span>{' '}
                        مقابل حساب البضاعة الواردة غير المفوترة{' '}
                        <span className="font-semibold text-[#0d658a]">
                          (GR/IR Clearing Account)
                        </span>{' '}
                        برقم مرجعي تلقائي.
                      </p>
                    </div>

                    <div className="w-full md:w-[320px] space-y-1.5 text-[12px]">
                      <div className="flex justify-between text-[#64748b]">
                        <span>المجموع الفرعي (قبل الضريبة):</span>
                        <span className="font-bold text-[#1e293b]">75,978.26 ر.س</span>
                      </div>
                      <div className="flex justify-between text-[#64748b]">
                        <span>ضريبة القيمة المضافة (15%):</span>
                        <span className="font-bold text-[#1e293b]">11,396.74 ر.س</span>
                      </div>
                      <div className="pt-2 border-t border-[#e2e8f0] flex justify-between items-center">
                        <span className="text-[13px] font-extrabold text-[#0f172a]">
                          إجمالي الفاتورة النهائي المستحق:
                        </span>
                        <span className="text-[16px] font-black text-[#0d658a]">
                          87,975.00 <span className="text-[11px] font-bold">ر.س</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 5: ملاحظات الفاتورة والتوجيه المحاسبي الداخلي */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMessageSquare className="w-4 h-4 text-[#0d658a]" />
                    <label className="text-[13px] font-extrabold text-[#0f172a]">
                      ملاحظات الفاتورة والتوجيه المحاسبي الداخلي
                    </label>
                  </div>
                  <Field
                    as="textarea"
                    name="notes"
                    rows={2}
                    placeholder="أدخل أي ملاحظات توثيقية إضافية تخص المطابقة أو الدفع..."
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-[12px] text-[#1e293b] placeholder-[#94a3b8] focus:outline-none focus:border-[#0d658a]"
                  />
                  <ErrorMessage
                    name="notes"
                    component="div"
                    className="text-[11px] text-[#dc2626] mt-1"
                  />
                  <p className="text-[10.5px] text-[#94a3b8] mt-1.5">
                    تظهر هذه الملاحظات في كشف حساب المورد وتقرير مراجعة التدقيق الداخلي
                    (Audit Trail).
                  </p>
                </div>
              </div>

              {/* STICKY BOTTOM ACTION FOOTER */}
          <footer className="bg-white px-2 border-t border-[#e2e8f0] py-3 mt-4 sticky bottom-0 z-10 shadow-sm">
                <div className=" mx-auto flex flex-wrap items-center justify-between gap-3">
                  {/* Right Summary with Coins Icon Box */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f0f9ff] border border-[#e0f2fe] flex items-center justify-center text-[#0d658a] shrink-0">
                      <FaCoins className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10.5px] text-[#94a3b8] block leading-tight">
                        صافي القيمة المستحقة للدفع:
                      </span>
                      <div className="flex items-center gap-2.5 mt-0.5">
                        <span className="text-[17px] font-black text-[#0f172a] leading-none">
                          87,975.00 <span className="text-[11px] font-bold text-[#64748b]">ر.س</span>
                        </span>
                        <span className="h-3.5 w-[1px] bg-[#e2e8f0]" />
                        <span className="text-[11px] text-[#64748b] font-semibold">
                          المستحق للمورد:{' '}
                          <strong className="text-[#334155] font-extrabold">
                            شركة الخزائن المتقدمة
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Left Action Buttons */}
                  <div className="flex items-center gap-2.5">
                    <button
                    onClick={()=>{
                        router.back()
                    }}
                      type="button"
                      className="px-4 py-2 rounded-lg border border-[#cbd5e1] bg-white text-[#334155] text-[12px] font-bold hover:bg-[#f8fafc] inline-flex items-center justify-center"
                    >
                      <span>إلغاء والعودة</span>
                    </button>

                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg border border-[#cbd5e1] bg-white text-[#334155] text-[12px] font-bold hover:bg-[#f8fafc] inline-flex items-center gap-1.5"
                    >
                      <FiSave className="w-3.5 h-3.5 text-[#64748b]" />
                      <span>حفظ كمسودة</span>
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#095c7a] text-white text-[12.5px] font-bold hover:bg-[#074961] shadow-xs inline-flex items-center gap-2"
                    >
                      <FiCheckCircle className="w-4 h-4" />
                      <span>اعتماد وترحيل القيد المحاسبي</span>
                    </button>
                  </div>
                </div>
              </footer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddInvoice;