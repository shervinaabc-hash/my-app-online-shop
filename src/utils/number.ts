/**
 * @file utils/formatPrice.ts
 * تابع کمکی برای جداسازی سه‌رقمی قیمت‌ها در فروشگاه‌های اینترنتی
 */

export interface FormatPriceOptions {
  /** واحد پول (پیش‌فرض: 'تومان' - اگر false بدهید فقط عدد برمی‌گردد) */
  currency?: string | false;
  /** موقعیت واحد پول نسبت به عدد */
  currencyPosition?: 'after' | 'before';
  /** تبدیل ارقام به فارسی (۰۱۲۳۴۵۶۷۸۹) - پیش‌فرض: false */
  persianDigits?: boolean;
  /** علامت جداکننده ارقام - پیش‌فرض: ',' */
  separator?: string;
  /** تعداد ارقام اعشار - پیش‌فرض: 0 */
  decimals?: number;
  /** نمایش متن 'رایگان' برای عدد 0 - پیش‌فرض: false */
  showFreeForZero?: boolean;
  /** متن سفارشی در صورت صفر بودن قیمت */
  freeText?: string;
  /** مقدار خروجی در صورت نامعتبر بودن مقدار (null, undefined, NaN) */
  fallback?: string;
}

/** تبدیل ارقام انگلیسی به فارسی */
export function toPersianDigits(value: string | number): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (digit) => persianNumbers[parseInt(digit, 10)]);
}

/** تبدیل ارقام فارسی و عربی به انگلیسی (مناسب ورودی‌های فرم) */
export function toEnglishDigits(value: string): string {
  if (!value) return '';
  const map: Record<string, string> = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
    '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  };
  return value.replace(/[۰-۹٠-٩]/g, (match) => map[match] || match);
}

/**
 * تابع فرمت‌بندی ارقام قیمت
 *
 * @param price عدد یا رشته قیمت (number | string | null | undefined)
 * @param options تنظیمات سفارشی
 *
 * @example formatPrice(1500000) => "1,500,000 تومان"
 * @example formatPrice(1500000, { persianDigits: true }) => "۱,۵۰۰,۰۰۰ تومان"
 * @example formatPrice(1500000, { currency: false }) => "1,500,000"
 * @example formatPrice(0, { showFreeForZero: true }) => "رایگان"
 */
export function formatPrice(
  price: number | string | null | undefined,
  options: FormatPriceOptions = {}
): string {
  const {
    currency = 'تومان',
    currencyPosition = 'after',
    persianDigits = false,
    separator = ',',
    decimals = 0,
    showFreeForZero = false,
    freeText = 'رایگان',
    fallback = '۰',
  } = options;

  if (price === null || price === undefined || price === '') {
    return fallback;
  }

  // تمیزکاری ورودی در صورت رشته بودن
  let cleanedNumber: number;
  if (typeof price === 'string') {
    const rawStr = toEnglishDigits(price).replace(/[^0-9.-]/g, '');
    cleanedNumber = Number(rawStr);
  } else {
    cleanedNumber = price;
  }

  if (isNaN(cleanedNumber)) return fallback;
  if (cleanedNumber === 0 && showFreeForZero) return freeText;

  const isNegative = cleanedNumber < 0;
  const absValue = Math.abs(cleanedNumber);

  let formattedNumberStr: string;
  if (decimals > 0) {
    const fixed = absValue.toFixed(decimals);
    const [intPart, decimalPart] = fixed.split('.');
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    formattedNumberStr = `${formattedInt}.${decimalPart}`;
  } else {
    const roundedInt = Math.round(absValue).toString();
    formattedNumberStr = roundedInt.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  }

  if (isNegative) formattedNumberStr = `-${formattedNumberStr}`;
  if (persianDigits) formattedNumberStr = toPersianDigits(formattedNumberStr);

  if (!currency) return formattedNumberStr;

  return currencyPosition === 'after'
    ? `${formattedNumberStr} ${currency}`
    : `${currency} ${formattedNumberStr}`;
}

/** تبدیل رشته فرمت‌شده به عدد خام (جهت ارسال به دیتابیس) */
export function parsePrice(val: string | number | null | undefined): number {
  if (val === null || val === undefined) return 0;
  if (typeof val === 'number') return val;
  const english = toEnglishDigits(val).replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(english);
  return isNaN(parsed) ? 0 : parsed;
}

/** کمکی برای رویداد onChange در اینپوت‌های قیمت فرم برای جداسازی حین تایپ */
export function formatPriceInput(value: string | number): string {
  const parsed = parsePrice(value);
  if (!parsed && parsed !== 0) return '';
  if (parsed === 0 && String(value).trim() === '') return '';
  return parsed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}