"use client";
import React from "react";
import logo from "@/public/images/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { useFetchDataPlans } from "@/Hooks/useFetch";

const Navbar = () => {
  const router = usePathname();
  const isAuthRoute = router.includes("/Auth");
  const apiUrl = "https://api.balldraft.com/api/v1/profile";
  const { data, isLoading, error } = useFetchDataPlans(apiUrl);
  console.log(data , isLoading, 'fuck')

  return (
    <>
      {!isAuthRoute && (
        <div
          className="navbar bg-white text-black fixed top-0 w-full z-[999]"
          style={{ zIndex: "999px" }}
        >
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">
              <img src={logo.src} alt="" srcset="" className=" w-[110px]" />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>What We Offer</a>
              </li>
              <li>
                <a>About us</a>
              </li>
              <li>
                <details>
                  <summary>Games Feature</summary>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>Blog</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end ">
            <a className="btn bg-[#012C51] rounded-[30px] ">Play now</a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
