import Link from "next/link";
import Container from "./container";
import { categories } from "../utils/categories";

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950">
      <Container>
        <div className="grid gap-8 py-10 sm:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">
              <span className="text-amber-400">آفتاب</span> انرژی
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              تأمین و نصب تجهیزات نیروگاه خورشیدی برای خانه و کسب‌وکار.
            </p>
          </div>
          <div>
            <p className="mb-3 font-semibold text-white">محصولات</p>
            <ul className="space-y-2 text-sm text-slate-400">
              {categories.map((item) => (
                <li key={item.slug}>
                  <Link className="transition hover:text-amber-400" href={`/Store?category=${item.slug}`}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold text-white">تماس با ما</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>تهران، خیابان آفتاب، پلاک ۱۲</li>
              <li dir="ltr" className="text-right">021-1234 5678</li>
              <li>info@aftab-energy.ir</li>
            </ul>
          </div>
        </div>
        <p className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
          این وب‌سایت یک نمونه‌کار آموزشی است.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
