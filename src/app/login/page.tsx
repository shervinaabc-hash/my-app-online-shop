"use client";
import Container from "@/src/components/container";
import { useState } from "react";
import Cookie from "js-cookie";
import { redirect } from "next/navigation";

// function Login() {
//   return (
//     <div className='flex justify-center items-center min-h-screen'>
//         <Container>
// <div className=' flex flex-col w-72 mx-auto border text-right rtl  '>
//     <input className='border px-2'  type="text" placeholder='نام کاربری' />
//     <input className='px-2  border ' type="password" placeholder='پسوورد' />
// <button className='bg-amber-700 rounded py-4 px-2 mt-2 '>ورود</button>

// </div>

//         </Container>
//     </div>
//   )
// }

// export default Login

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handelLogin = () => {
    const response = {
      token: "ndvbsd sdhfgvvsd sdhsd sdhjfgsdd fsdjhg",
      expire: 7,
    };
    Cookie.set("token", response.token, { expires: response.expire });
    redirect("/adminPanel");
  };

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-slate-950 px-4">
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-amber-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-orange-600/30 blur-3xl" />

      <Container>
        <div
          dir="rtl"
          className="relative mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-25 w-25 items-center justify-center rounded-2xl bg-amber-500 text-2xl font-black text-slate-950 shadow-lg shadow-amber-500/40">
              Solar Energy
            </div>
            <h1 className="text-2xl font-bold text-white">خوش آمدید</h1>
            <p className="mt-2 text-sm text-slate-400">
              برای ادامه وارد حساب کاربری خود شوید
            </p>
          </div>

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-sm text-slate-300">
                نام کاربری
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                id="username"
                value={userName}
                type="text"
                placeholder="نام کاربری خود را وارد کنید"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm text-slate-300">
                رمز عبور
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
                placeholder="--------"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-slate-400">
                <input type="checkbox" className="h-4 w-4 accent-amber-500" />
                مرا به خاطر بسپار
              </label>
              <a
                href="#"
                className="text-amber-400 transition hover:text-amber-300"
              >
                فراموشی رمز؟
              </a>
            </div>

            <button
              onClick={handelLogin}
              type="button"
              className="mt-2 rounded-xl bg-amber-500 py-3 font-bold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-amber-500/50 active:translate-y-0"
            >
              ورود
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            حساب کاربری ندارید؟{" "}
            <a
              href="#"
              className="font-medium text-amber-400 transition hover:text-amber-300"
            >
              ثبت‌نام کنید
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default Login;
