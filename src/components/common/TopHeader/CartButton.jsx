import React from "react";

const CartButton = () => {
  return (
    <div className="xl:w-[48px] lg:w-[40px] sm:w-[36px] w-[30px] xl:h-[48px] lg:h-[40px] sm:h-[36px] h-[30px]  rounded-[100%] bg-white dark:bg-gray-900 flex justify-center items-center">
      <span className="xl:w-[24px] lg:w-[20px] sm:w-[18px] w-[15px] xl:h-[24px] lg:h-[20px] sm:h-[18px]  h-[15px] ">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.4"
            d="M16.49 22H7.50996C3.99996 22 3.23997 19.99 3.52997 17.53L4.42996 10.03C4.65996 8.09 4.99996 6.5 8.39996 6.5H15.6C19 6.5 19.34 8.09 19.57 10.03L20.32 16.28L20.47 17.53C20.48 17.61 20.49 17.69 20.5 17.77C20.71 20.12 19.89 22 16.49 22Z"
            className="fill-[#2196F3] dark:fill-[#BBDEFB]"
          />
          <path
            d="M16 8.75C15.59 8.75 15.25 8.41 15.25 8V4.5C15.25 3.42 14.58 2.75 13.5 2.75H10.5C9.42 2.75 8.75 3.42 8.75 4.5V8C8.75 8.41 8.41 8.75 8 8.75C7.59 8.75 7.25 8.41 7.25 8V4.5C7.25 2.59 8.59 1.25 10.5 1.25H13.5C15.41 1.25 16.75 2.59 16.75 4.5V8C16.75 8.41 16.41 8.75 16 8.75Z"
            className="fill-[#2196F3] dark:fill-[#BBDEFB]"
          />
          <path
            d="M20.5 17.7698C20.47 17.7798 20.44 17.7798 20.41 17.7798H8C7.59 17.7798 7.25 17.4398 7.25 17.0298C7.25 16.6098 7.59 16.2798 8 16.2798H20.32L20.47 17.5298C20.48 17.6098 20.49 17.6898 20.5 17.7698Z"
            className="fill-[#2196F3] dark:fill-[#BBDEFB]"
          />
        </svg>
      </span>
    </div>
  );
};

export { CartButton };
