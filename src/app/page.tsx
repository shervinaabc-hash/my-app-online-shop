import Container from "@/src/components/container";
import { categories } from "@/src/utils/categories";
import Link from "next/link";

const stats = [
  { value: "+۵۰۰", label: "پروژه نصب‌شده" },
  { value: "۲۵ سال", label: "گارانتی توان پنل" },
  { value: "۲۴/۷", label: "پشتیبانی فنی" },
];

const features = [
  { title: "مشاوره و طراحی رایگان", text: "ظرفیت مناسب نیروگاه را بر اساس مصرف برق شما محاسبه می‌کنیم." },
  { title: "نصب توسط تیم متخصص", text: "نصب، راه‌اندازی و تست کامل سیستم توسط مهندسان مجرب." },
  { title: "تجهیزات اصل با گارانتی", text: "پنل، اینورتر و باتری از برندهای معتبر با ضمانت اصالت." },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-600/20 blur-3xl" />

        <Container>
          <div className="relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
            <div>
              <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-sm text-amber-400">
                انرژی پاک، قبض برق کمتر
              </span>
              <h1 className="mt-6 text-4xl leading-tight font-black text-white md:text-5xl md:leading-tight">
                برق خانه و کسب‌وکارت را
                <span className="text-amber-400"> از خورشید </span>
                بگیر
              </h1>
              <p className="mt-6 max-w-lg leading-8 text-slate-400">
                آفتاب انرژی تأمین‌کننده‌ی پنل خورشیدی، اینورتر و باتری با کیفیت است و
                نیروگاه خورشیدی شما را از طراحی تا نصب همراهی می‌کند.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/Store"
                  className="rounded-xl bg-amber-500 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:bg-amber-400"
                >
                  مشاهده محصولات
                </Link>
                <a
                  href="#categories"
                  className="rounded-xl border border-white/15 px-6 py-3 font-medium text-white transition hover:border-amber-500 hover:text-amber-400"
                >
                  دسته‌بندی‌ها
                </a>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
                {stats.map((item) => (
                  <div key={item.label}>
                    <p className="text-2xl font-black text-white">{item.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <img src="/pic/solar/hero.svg" alt="خانه با پنل خورشیدی" className="w-full" />
          </div>
        </Container>
      </section>

      <section id="categories" className="scroll-mt-24 py-12">
        <Container>
          <h2 className="text-2xl font-bold text-white">دسته‌بندی محصولات</h2>
          <p className="mt-2 text-slate-400">هر آنچه برای یک نیروگاه خورشیدی کامل نیاز دارید.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={`/Store?category=${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition hover:-translate-y-1 hover:border-amber-500/50"
              >
                <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((item, index) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 font-bold text-amber-400">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
