'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { MdOutlineLibraryBooks } from "react-icons/md";
const SideBar = ({ isOpen, closeSidebar }) => {

          const pathname = usePathname();
          const isActive = (pathname, href) => {
                    return pathname === href ? "bg-slate-600" : "";
          };
          return (
                    <div
                              className={`p-2 bg-black shadow-xl h-screen transition-all duration-500 transform ${isOpen ? "translate-x-0" : "-translate-x-full hidden"
                                        } lg:w-96 lg:block lg:static lg:translate-x-0 lg:overflow-y-auto`}
                              style={{ width: "250px", transitionProperty: "width" }}
                    >
                              <div className="h-full">
                                        <div className="p-6 flex justify-center items-center">
                                                  <MdOutlineLibraryBooks className="w-12 h-12 text-white" />
                                                  <span className="ml-2 text-white text-xl font-bold">STOK BARANG</span>
                                        </div>

                                        <ul>
                                                  <li
                                                            className={`hover:bg-slate-600 rounded-md ${isActive(
                                                                      pathname,
                                                                      "/dashboard"
                                                            )}`}
                                                  >
                                                            <Link
                                                                      href="/dashboard"
                                                                      className={`rounded-lg py-3 text-sm font-medium items-center justify-between text-white `}
                                                            >
                                                                      <span
                                                                                className={`flex items-center  p-3 rounded-lg  group text-lg mb-1  hover:text-white transition-transform duration-300 transform hover:translate-x-1`}
                                                                      >
                                                                                <MdOutlineLibraryBooks className={`h-6 w-6  group-hover:text-white   mr-3`} />

                                                                                Dashboard
                                                                      </span>
                                                            </Link>
                                                  </li>
                                                  <li
                                                            className={`hover:bg-slate-600 rounded-md ${isActive(
                                                                      pathname,
                                                                      "/data-barang"
                                                            )}`}
                                                  >
                                                            <Link
                                                                      href="/data-barang"
                                                                      className={`rounded-lg py-3 text-sm font-medium items-center justify-between text-white `}
                                                            >
                                                                      <span
                                                                                className={`flex items-center  p-3 rounded-lg  group text-lg mb-1  hover:text-white transition-transform duration-300 transform hover:translate-x-1`}
                                                                      >
                                                                                <MdOutlineLibraryBooks className={`h-6 w-6  group-hover:text-white   mr-3`} />
                                                                                Data Brang
                                                                      </span>
                                                            </Link>
                                                  </li>
                                        </ul>
                              </div>
                    </div>
          )
}

export default SideBar;
