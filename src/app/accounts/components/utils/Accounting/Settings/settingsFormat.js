export const sanitizeAmountDigits = (raw) => raw.replace(/[^\d]/g, "");

export const formatAmountDisplay = (digits) => {
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
};