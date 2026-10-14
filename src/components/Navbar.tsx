"use client";
import Link from "next/link";
import Container from "./container";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useShopingCartP } from "../context/ShopingCartItemPro";
import { categories } from "../utils/categories";

function CategoryBar() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";

  const items = [{ slug: "", title: "همه محصولات" }, ...categories];

  return (
    <div className="border-t border-white/5 bg-slate-900/95">
      <Container>
        <div className="flex gap-2 overflow-x-auto py-2">
          {items.map((item) => {
            const isActive = activeCategory === item.slug;
            return (
              <Link
                key={item.slug}
                href={item.slug ? `/Store?category=${item.slug}` : "/Store"}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition ${
                  isActive
                    ? "bg-amber-500 font-semibold text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-amber-400"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

function Navbar() {
const {getproudocttotaly}= useShopingCartP()
const pathname= usePathname()
const [isProductsHover, setIsProductsHover] = useState(false)

  const navLink = [
    {
      href: "/",

      title: "خانه",
    },

    {
      href: "/Store",

      title: "محصولات",
    },
     {
      href: "/adminPanel",

      title: "پنل ادمین",
    },
         {
      href: "/login",

      title: "ورود",
    },
  ];

  const isStorePage = pathname.startsWith("/Store")
  const showCategoryBar = isStorePage || isProductsHover

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur"
      onMouseLeave={() => setIsProductsHover(false)}
    >
      <nav>
        <Container>
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-y-1 py-2">
            <Link href="/" className="flex items-center gap-2 whitespace-nowrap text-lg font-black text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30">
                ☀
              </span>
              <span>
                <span className="text-amber-400">آفتاب</span> انرژی
              </span>
            </Link>

            <div className="order-last flex w-full items-center justify-center gap-1 sm:gap-2 md:order-none md:w-auto">
              {navLink.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setIsProductsHover(item.href === "/Store")}
                    className={`rounded-lg px-2 py-2 text-sm transition sm:px-3 ${
                      isActive ? "text-amber-400" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.title}
                  </Link>
                )
              })}
            </div>

            <Link
              href="/Cart"
              className="relative flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:border-amber-500 hover:text-amber-400"
            >
              <span>سبد خرید</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-slate-950">
                {getproudocttotaly}
              </span>
            </Link>
          </div>
        </Container>
      </nav>

      {showCategoryBar && (
        <Suspense>
          <CategoryBar />
        </Suspense>
      )}
    </header>
  );
}

export default Navbar;
