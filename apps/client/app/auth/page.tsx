"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import Login from "../components/Form/Login";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@prisma/client";
import getCurrentUser from "../actions/GetCurrentUser";
import Button from "../components/Button";
import { FaArrowRightToBracket, FaHouseLock } from "react-icons/fa6";

type formType = "Login" | "Signup" | "Otp" | "forgotPassword" | "authenticated";

export default function Auth() {
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

  const Logout = () => {
    localStorage.removeItem("token");
    setForm("Login");
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
      getCurrentUser().then((user) => {
        if (user && user?.id?.length > 0) {
          setForm("authenticated");
          setUser([user!]);
          console.log(user);
        } else {
        }
        setIsLoading(false);
      });
    } else {
      setForm("Login");
      setIsLoading(false);
    }

    if (searchParams.get("form")) {
      formTpye(searchParams.get("form") ?? "").then((res) => setForm(res!));
    }
  }, []);

  return (
    <main className='flex h-screen w-full flex-col items-center'>
      <div className='flex h-full w-full flex-col md:flex-row items-center justify-center'>
        <div className='h-auto flex w-4/5 glass items-center shadow-xl rounded-xl shadow-white  md:h-full md:flex md:basis-1/3 md:shadow-none '>
          {form === "Login" && !isloading ? (
            <Login />
          ) : form === "authenticated" && !isloading ? (
            <div className='flex flex-col w-full items-center justify-center'>
              <h1 className='text-3xl font-bold'>
                Hello{" "}
                <span className='font-thin animate-pulse'>{user[0]?.name}</span>
              </h1>
              <div className='flex items-center gap-7 mt-11 justify-between'>
                <Button
                  onClick={() => Logout()}
                  type='button'
                  className='text-white gap-2'
                >
                  <FaArrowRightToBracket className='rotate-180 text-red-500' />
                  <span>Logout</span>
                </Button>

                <Button
                  onClick={() => {
                    router.push("/home");
                  }}
                  type='button'
                  className='text-white underline underline-offset-1 gap-2'
                >
                  <span>Home</span>
                  <FaHouseLock className='text-blue-500' />
                </Button>
              </div>
            </div>
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
