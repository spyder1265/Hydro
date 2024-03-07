"use client";
import { Fragment, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  UserGroupIcon,
  XMarkIcon,
  UserIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import SearchBar from "./Search";
import ThemeSelector from "./ThemeSelector";

const products = [
  {
    name: "Reviews",
    description: "Check out the rewiews of most of our customers",
    href: "/reviews",
    icon: UserGroupIcon,
  },
  {
    name: "Contact us",
    description: "Get in touch with us",
    href: "/contact",
    icon: PhoneIcon,
  },
  {
    name: "Admin",
    description: "Login as admin to add new vehicles",
    href: "/admin",
    icon: UserIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  contact?: boolean;
  onSearch?: (search: string) => void;
}

const Navbar: React.FC<Props> = ({ contact, onSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = usePathname();
  const router = useRouter();

  const handleSearch = (value: string) => {
    if (location !== "/vehicles") {
      router.push(`/vehicles?query=${encodeURIComponent(value)}`);
    }

    onSearch?.(value);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={` z-50 dark:bg-slate-950 w-full ${
        contact && "absolute  w-full top-0 left-0 right-0"
      }`}
    >
      <nav
        className='mx-auto flex w-7xl  items-center justify-between p-3 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 hover:bg-neutral-500 text-white hover:text-neutral-200'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3BottomLeftIcon
              className='h-6 hover: w-6'
              aria-hidden='true'
            />
          </button>
        </div>
        <div className='lg:hidden ml-5 pl-2 h-full my-auto flex flex-1 justify-center'>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className='flex items-center h-6 md:h-10 lg:flex-1'>
          <a
            href='/'
            className='bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-2xl'
          >
            Hydro
          </a>
        </div>

        <Popover.Group className='hidden lg:flex lg:gap-x-12'>
          <a
            href='/'
            className={`text-sm font-semibold leading-6 dark:text-neutral-200 ${
              location === "/" ? "underline" : "hover:opacity-75"
            } dark:hover:text-neutral-50`}
          >
            Home
          </a>
          <Popover className='relative'>
            <Popover.Button
              className={`flex items-center gap-x-1 text-sm font-semibold leading-6 outline-none dark:text-neutral-200 ${
                location === "/reviews" ||
                location === "/contact" ||
                location === "/admin"
                  ? "underline"
                  : "hover:opacity-75"
              } dark:hover:text-neutral-50`}
            >
              Product
              <ChevronDownIcon
                className='h-5 w-5 flex-none dark:text-neutral-200'
                aria-hidden='true'
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className='absolute -left-8 z-[100] top-full mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-black shadow-lg ring-1 ring-neutral-900/5'>
                <div className='p-4'>
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className='group relative flex items-center gap-x-6 rounded-xl overflow-hidden p-4 text-sm leading-6 hover:bg-neutral-900 dark:hover:bg-neutral-100 '
                    >
                      <div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg '>
                        <item.icon
                          className='h-6 w-6 dark:text-neutral-100 text-neutral-900 group-hover:text-white dark:group-hover:text-black'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='flex-auto'>
                        <a
                          href={item.href}
                          className='block font-semibold dark:text-neutral-100 text-neutral-900 group-hover:text-white dark:group-hover:text-black'
                        >
                          {item.name}
                          <span className='absolute inset-0' />
                        </a>
                        <p className='mt-1 dark:text-neutral-100 text-neutral-900 group-hover:text-white dark:group-hover:text-black'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <a
            href='/about'
            className={`text-sm font-semibold leading-6 dark:text-neutral-200 ${
              location === "/about" ? "underline" : "hover:opacity-75"
            } dark:hover:text-neutral-50 `}
          >
            About Us
          </a>
          <a
            href='/repairs'
            className={`text-sm font-semibold leading-6 dark:text-neutral-200 ${
              location === "/repairs" ? "underline" : "hover:opacity-75"
            } dark:hover:text-neutral-50 `}
          >
            Pricing
          </a>
        </Popover.Group>

        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <ThemeSelector />
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10'>
          <div className='flex items-center  justify-between'>
            <div className='-m-1.5 p-1.5'>
              <span className='sr-only'>Jaqis Carport</span>
              <img
                className='h-8 scale-150 rotate-12s w-auto'
                src='/img/logoblack.png'
                alt=''
              />
            </div>

            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-neutral-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon
                className='h-6 w-6 hover:text-white'
                aria-hidden='true'
              />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-neutral-500/10'>
              <div className='space-y-2 py-6'>
                <a
                  href='/'
                  aria-disabled={location === "/"}
                  className={`-mx-3 block rounded-lg ${
                    location === "/"
                      ? "bg-neutral-100 text-black"
                      : "hover:bg-neutral-50 hover:text-neutral-800 text-neutral-200"
                  } px-3 py-2 text-base font-semibold leading-7 hover:text-underline`}
                >
                  Home
                </a>
                <Disclosure as='div' className='-mx-3'>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 ${
                          location === "/reviews" ||
                          location === "/contact" ||
                          location === "/admin"
                            ? "bg-neutral-100 text-neutral-800"
                            : " text-neutral-200 hover:bg-neutral-50 hover:text-neutral-800"
                        }`}
                      >
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden='true'
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='mt-2 space-y-2'>
                        {[...products].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as='a'
                            href={item.href}
                            className={`block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 ${
                              location === item.href
                                ? "bg-neutral-300 text-neutral-600"
                                : "text-neutral-200 hover:bg-neutral-300 hover:text-neutral-600"
                            } `}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href='/vehicles'
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
                    location === "/vehicles" || location?.includes("/vehicles")
                      ? "bg-neutral-100 text-neutral-800"
                      : " text-neutral-200 hover:bg-neutral-50 hover:text-neutral-800"
                  } `}
                >
                  Vehicles
                </a>
                <a
                  href='about'
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
                    location === "/about"
                      ? "bg-neutral-100 text-neutral-800"
                      : " text-neutral-200 hover:bg-neutral-50 hover:text-neutral-800"
                  }`}
                >
                  About Us
                </a>
                <a
                  href='repairs'
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
                    location === "/repairs"
                      ? "bg-neutral-100 text-neutral-800"
                      : " text-neutral-200 hover:bg-neutral-50 hover:text-neutral-800"
                  }`}
                >
                  Repairs
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
