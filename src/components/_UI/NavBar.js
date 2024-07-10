'use client'
import React, { useState } from "react";

const Navbar = () => {
          const [open, setOpen] = useState(false);

          return (
                    <header className={` w-full items-center fixed-top top-0 bg-white dark:bg-dark`}>
                              {/* <div className="container"> */}
                                        <div className="py-2 bg-white dark:bg-dark">
                                                  <div className="px-3">
                                                            <div className="w-full mb-8">
                                                                      <div className="px-4 py-4 bg-white border rounded-lg border-light dark:bg-dark-2 dark:border-dark-3 shadow-1 dark:shadow-card sm:px-6 md:px-8 md:py-5">
                                                                               
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                              {/* </div> */}
                    </header>
          );
};

export default Navbar;
