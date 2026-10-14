export type TCategory = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export const categories: TCategory[] = [
  {
    slug: "panel",
    title: "پنل خورشیدی",
    description: "پنل‌های مونو و پلی‌کریستال با راندمان بالا",
    image: "/pic/solar/panel.svg",
  },
  {
    slug: "inverter",
    title: "اینورتر",
    description: "اینورترهای هیبرید، آفگرید و متصل به شبکه",
    image: "/pic/solar/inverter.svg",
  },
  {
    slug: "battery",
    title: "باتری",
    description: "باتری‌های لیتیومی و ژل برای ذخیره انرژی",
    image: "/pic/solar/battery.svg",
  },
];

export const getCategoryTitle = (slug?: string) =>
  categories.find((item) => item.slug === slug)?.title;
