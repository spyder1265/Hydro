"use client";
import Image from "next/image";
import { Suspense, useLayoutEffect, useState } from "react";
import Login from "../../components/Form/Login";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@prisma/client";
import getCurrentUser from "../actions/GetCurrentUser";
import Button from "../../components/Button";
import { FaArrowRightToBracket, FaHouseLock } from "react-icons/fa6";
import AuthUserByJWT from "../actions/AuthUser";
import HasAuth from "@/components/Form/HasAuth";
import { useTheme } from "../contexts/ThemeContext";
import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import ThemeSelector from "@/components/Navbar/ThemeSelector";
import { FormNav } from "@/components/Navbar/Navbar";

type formType = "Login" | "Signup" | "Otp" | "forgotPassword" | "authenticated";

function Auth() {
  const { theme } = useTheme();
  const [form, setForm] = useState<formType>("Login");
  const [isloading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const formTpye = async (param: string) => {
    switch (param) {
      case "Login" || "":
        return "Login";
      case "Signup":
        return "Signup";
      case "Otp":
        return "Otp";
      case "forgotPassword":
        return "forgotPassword";
    }
  };

  useLayoutEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (
      token &&
      token !== "undefined" &&
      token !== "null" &&
      token !== undefined
    ) {
      AuthUserByJWT(token).then((user) => {
        if (user && user.id.length > 0) {
          getCurrentUser().then((user) => {
            if (user && user?.id?.length > 0) {
              setForm("authenticated");
              setUser([user!]);
            } else {
            }
            setIsLoading(false);
          });
        }
      });
    } else {
      setForm("Login");
      if (theme) {
        setIsLoading(false);
      }
    }

    if (searchParams.get("form")) {
      formTpye(searchParams.get("form") ?? "").then((res) => setForm(res!));
    }
  }, []);

  const goBack = () => {
    router.back();
  };

  if (!isloading)
    return (
      <main className='flex h-screen gradient-bg w-full flex-col items-center text-neutral-900 dark:text-neutral-100'>
        <div className='w-full flex md:hidden py-8'>
          <FormNav />
        </div>
        <div className='flex h-full w-full flex-col md:flex-row items-center justify-center'>
          <div className='h-auto dark:bg-neutral-900 flex flex-col w-4/5 glass items-center justify-around md:h-full md:flex md:basis-1/3 md:shadow-none '>
            <div className='w-full hidden md:flex'>
              <FormNav />
            </div>
            {form === "Login" && !isloading ? (
              <Login />
            ) : form === "authenticated" && !isloading ? (
              <HasAuth user={user[0]} />
            ) : (
              <></>
            )}
          </div>
          <div className='h-full hidden md:flex basis-2/3'>
            <Image
              src='/bg.jpeg'
              alt='hero'
              width={500}
              height={500}
              className='object-cover w-full h-full'
              priority
            />
          </div>
        </div>
      </main>
    );
}

export default function Page() {
  return (
    <Suspense>
      <Auth />
    </Suspense>
  );
}
