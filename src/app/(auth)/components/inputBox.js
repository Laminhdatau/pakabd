const InputBox = ({ type, placeholder, name }) => {
          return (
                    <div className="mb-6">
                              <input
                                        type={type}
                                        placeholder={placeholder}
                                        name={name}
                                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-[#5981c0] focus-visible:shadow-none dark:border-dark-3 dark:text-white"
                              />
                    </div>
          );
};


export default InputBox;