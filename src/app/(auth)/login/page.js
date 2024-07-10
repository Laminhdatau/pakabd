import React from "react";
import InputBox from "../components/inputBox";
import Partikel from "../components/_partikel";
import Link from "next/link";
// import Link from "next/link";

const LoginPage = () => {
          return (
                    <section className=" py-20 dark:bg-dark lg:py-[120px] ">
                              <div className="container mx-auto">
                                        <div className="-mx-4 flex flex-wrap ">
                                                  <div className="w-full px-4 ">
                                                            <div className=" shadow-chat-box relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
                                                                      <div className="mb-10 text-4xl text-center md:mb-16 flex justify-center font-bold text-[#5981c0]" >
                                                                                SILAHKAN LOGIN
                                                                      </div>
                                                                      <form>
                                                                                <InputBox type="email" name="email" placeholder="Email" />
                                                                                <InputBox
                                                                                          type="password"
                                                                                          name="password"
                                                                                          placeholder="Password"
                                                                                />
                                                                                <div className="mb-10">
                                                                                          <Link href={'/dashboard'} >
                                                                                                    <button

                                                                                                              type="submit"
                                                                                                              value="Sign In"
                                                                                                              className="w-full cursor-pointer rounded-md border border-[#5981c0] bg-[#5981c0] px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                                                                                                    >Login</button>
                                                                                          </Link>
                                                                                </div>
                                                                      </form>




                                                                      <Partikel />
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                    </section>
          );
};

export default LoginPage;

