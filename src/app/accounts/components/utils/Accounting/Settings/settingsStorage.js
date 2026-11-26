export const ACCOUNTING_SETTINGS_KEY = "erp-accounting-settings-v1";

export const activityPresets = {
  retail: {
    activityTemplate: "retail",
    moduleEnabled: {
      entries: true,
      "simple-entries": true,
      coa: true,
      "opening-balances": true,
      "fixed-assets": true,
      audit: true,
    },
    coaTemplate: "retail",
    depreciationMethod: "straight-line",
    auditThreshold: "50000",
    attachInvoiceImage: true,
  },
  services: {
    activityTemplate: "services",
    moduleEnabled: {
      entries: true,
      "simple-entries": true,
      coa: true,
      "opening-balances": true,
      "fixed-assets": false,
      audit: true,
    },
    coaTemplate: "services",
    depreciationMethod: "straight-line",
    auditThreshold: "75000",
    attachInvoiceImage: false,
  },
  manufacturing: {
    activityTemplate: "manufacturing",
    moduleEnabled: {
      entries: true,
      "simple-entries": false,
      coa: true,
      "opening-balances": true,
      "fixed-assets": true,
      audit: true,
    },
    coaTemplate: "manufacturing",
    depreciationMethod: "units",
    auditThreshold: "150000",
  },
  nonprofit: {
    activityTemplate: "nonprofit",
    moduleEnabled: {
      entries: true,
      "simple-entries": true,
      coa: true,
      "opening-balances": true,
      "fixed-assets": false,
      audit: true,
    },
    coaTemplate: "general-commercial",
    auditThreshold: "25000",
    auditRetention: "7",
  },
};

export const readyImportPackages = [
  {
    id: "retail",
    title: "قالب تجارة التجزئة",
    description: "أصول ثابتة مفعّلة، إهلاك خطي، حد تدقيق 50,000 ر.س",
  },
  {
    id: "services",
    title: "قالب الخدمات المهنية",
    description: "قيود سهلة، بدون أصول ثابتة، دليل خدمات",
  },
  {
    id: "manufacturing",
    title: "قالب التصنيع",
    description: "إهلاك وحدات إنتاج، أصول مفعّلة، تدقيق 150,000 ر.س",
  },
  {
    id: "nonprofit",
    title: "قالب المنظمات غير الربحية",
    description: "احتفاظ 7 سنوات، حد تدقيق منخفض",
  },
];

export function readAccountingSettings() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ACCOUNTING_SETTINGS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeAccountingSettings(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    ACCOUNTING_SETTINGS_KEY,
    JSON.stringify({ ...data, updatedAt: Date.now() }),
  );
}

export function clearAccountingSettings() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCOUNTING_SETTINGS_KEY);
}