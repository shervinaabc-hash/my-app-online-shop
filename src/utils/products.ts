// src/utils/products.ts

export type TProduct = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  price: number;
};

export const products: TProduct[] = [
  {
    id: "1",
    title: "پنل خورشیدی مونوکریستال ۵۵۰ وات",
    category: "panel",
    image: "/pic/solar/panel.svg",
    description: "با راندمان ۲۱٪، مناسب نیروگاه‌های خانگی و صنعتی (Half-Cut) پنل نیم‌سلولی.",
    price: 12500000
  },
  {
    id: "2",
    title: "پنل خورشیدی مونوکریستال ۴۵۰ وات",
    category: "panel",
    image: "/pic/solar/panel.svg",
    description: "پنل سبک و پربازده برای پشت‌بام‌های مسکونی، با ۲۵ سال گارانتی توان.",
    price: 9800000
  },
  {
    id: "3",
    title: "پنل خورشیدی پلی‌کریستال ۳۲۰ وات",
    category: "panel",
    image: "/pic/solar/panel.svg",
    description: "گزینه‌ای اقتصادی برای سیستم‌های کوچک و ویلایی با دوام بالا.",
    price: 6900000
  },
  {
    id: "4",
    title: "اینورتر هیبرید ۵ کیلووات",
    category: "inverter",
    image: "/pic/solar/inverter.svg",
    description: "داخلی، قابل اتصال به شبکه و باتری MPPT اینورتر هیبرید با شارژر.",
    price: 52000000
  },
  {
    id: "5",
    title: "اینورتر هیبرید ۳ کیلووات",
    category: "inverter",
    image: "/pic/solar/inverter.svg",
    description: "مناسب منازل و دفاتر کوچک، دارای نمایشگر و مانیتورینگ از طریق وای‌فای.",
    price: 38000000
  },
  {
    id: "6",
    title: "اینورتر متصل به شبکه ۱۰ کیلووات",
    category: "inverter",
    image: "/pic/solar/inverter.svg",
    description: "اینورتر سه‌فاز آنگرید برای نیروگاه‌های تجاری با راندمان ۹۸٪.",
    price: 95000000
  },
  {
    id: "7",
    title: "باتری LiFePO4 ۲۰۰ آمپر لیتیوم",
    category: "battery",
    image: "/pic/solar/battery.svg",
    description: "هوشمند BMS باتری لیتیوم آمپرسفات ۱۲ ولت با بیش از ۶۰۰۰ سیکل شارژ و...",
    price: 78000000
  },
  {
    id: "8",
    title: "باتری LiFePO4 ۱۰۰ آمپر لیتیوم",
    category: "battery",
    image: "/pic/solar/battery.svg",
    description: "سبک، بدون نیاز به نگهداری و مناسب ذخیره‌سازی انرژی خانگی.",
    price: 45000000
  },
  {
    id: "9",
    title: "باتری ژل ۱۲ ولت ۱۰۰ آمپر",
    category: "battery",
    image: "/pic/solar/battery.svg",
    description: "باتری ژل سیکل عمیق، گزینه‌ای مقرون‌به‌صرفه برای سیستم‌های آفگرید.",
    price: 14500000
  },
  {
    id: "nq9V7Jtcu4U",
    title: "sdsd",
    category: "inverter",
    image: "https://www.google.com/imgres?q=%D8%B9%D8%A3%D8%B3%D8%B3%D8%A7%D8%8C%D8%B3%D8%A7%D8%B3%D8%A7%D8%A7%D8%8C%D8%A7%D8%8C%D8%8C%D8%8C%D8%8C&imgurl=https%3A%2F%2F...",
    description: "افزودن محصول جدید",
    price: 1242
  }
];