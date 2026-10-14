"use client";
import Link from "next/link";
import Container from "./container";
import { usePathname } from "next/navigation";
import { useShopingCartP } from "../context/ShopingCartItemPro";

function Navbar() {
const {getproudocttotaly}= useShopingCartP()
const pathname= usePathname()

  const navLink = [
    {
      href: "/",

      title: "خانه ",
    },

    {
      href: "/Store",

      title:  " محصولات ",
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
  return (
    <nav className="shadow p-4">
      <Container>
      <div className="flex flex-row-reverse justify-between ">
         <div >
        
         {navLink.map((item)=> (
          <Link className={`mr-4 ${pathname === item.href ? "text-amber-400":""}`} key={item.href} href={item.href}>
            {item.title}
          </Link>
        ))}

      </div>

        <div>
          <span className="bg-red-800 rounded text-white py-.5 px-0.5 mr-1 ">{getproudocttotaly}</span>
         <Link href="/Cart"><span>سبد خرید</span></Link>
          
          </div>
       </div>
      </Container>
    </nav>
  );
}

export default Navbar;
