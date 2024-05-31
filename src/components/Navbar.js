"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaUmbrellaBeach,
  FaCloudSunRain,
  FaListUl,
  FaMap,
  FaSlidersH,
} from "react-icons/fa";

function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="shadow-sm sticky top-4 bottom-4 z-50 bg-gray-200 rounded-2xl my-2 mx-4 flex flex-col justify-between h-[calc(100vh-7rem)] p-4 overflow-y-auto ml-12 -mr-10">
        <div className="flex flex-col items-center gap-8">
          <div className="mb-4">
            <FaUmbrellaBeach className="text-2xl mt-4 text-blue-300" />
          </div>
          <div className="space-y-8">
            <Link href="/" passHref>
              <div
                className={`cursor-pointer link-item flex flex-col items-center mt-2 ${
                  pathname === "/" ? "text-gray-900" : "text-gray-400"
                } hover:text-gray-500`}
              >
                <FaCloudSunRain className="text-xl mt-1" />
                <p className="text-xs font-bold mt-2">Weather</p>
              </div>
            </Link>
            <Link href="/cities" passHref>
              <div
                className={`cursor-pointer link-item flex flex-col items-center mt-6 ${
                  pathname === "/cities" ? "text-gray-900" : "text-gray-400"
                } hover:text-gray-500`}
              >
                <FaListUl className="text-xl mt-1" />
                <p className="text-xs font-bold mt-2">Cities</p>
              </div>
            </Link>
            <div className="flex flex-col items-center text-gray-400 ">
              <FaMap className="text-xl mt-1" />
              <p className="text-xs font-bold mt-2">Map</p>
            </div>
            <div className="flex flex-col items-center text-gray-400 ">
              <FaSlidersH className="text-xl mt-1" />
              <p className="text-xs font-bold mt-2">Settings</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
