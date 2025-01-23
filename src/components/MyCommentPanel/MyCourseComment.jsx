import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaBell,
  FaBookOpen,
  FaCloudscale,
  FaComment,
  FaEye,
  FaHamburger,
  FaHome,
  FaLock,
  FaMinus,
  FaMoon,
  FaShoppingCart,
  FaSignOutAlt,
  FaSun,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useDeleteMyReservedCourses,
  useMyReservedCourses,
} from "../../core/services/api/Panel/handelMyCourses";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import {
  useDeleteMyCommentInCourses,
  useMyCommentInCourses,
} from "../../core/services/api/MyCommentPanel/handelMyComment";
import { toast } from "react-toastify";
import { CustomSpinner } from "../../components/animation/CustomSpinner";

//styles
const MyCourseComment = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  //dropdown

  const [pageSize, setPageSize] = useState(6);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setItemOffset(0);
    console.log("Page Size:", event.target.value);
  };

  //API
  const { data, isPending } = useMyCommentInCourses();
  console.log(data, "this data of course is pending now now");

  // page data

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  React.useEffect(() => {
    const endOffset = itemOffset + pageSize;
    setCurrentItems(data && data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.length / pageSize));
  }, [itemOffset, pageSize, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageSize) % data?.length;
    setItemOffset(newOffset);
  };

  const loaderStyle = "flex justify-center items-center mx-auto mt-[100px]";

  return (
    <>
      <div className="flex flex-col w-[95%]  dark:bg-gray-900 h-[400px] mt-5 overflow-hidden">
        <div className="flex  items-center text-white h-[50px] bg-[#69E5B8] dark:bg-[#145540]  w-full rounded-xl mb-2 md:text-base sm:text-sm text-xs justify-between ">
          <h2 className="mr-5">عنوان کامنت</h2>
          <h2 className=" sm:block hidden">توضیحات کامنت</h2>
          <h2 className="">وضعیت</h2>
          <h2 className="ml-5">اقدامات</h2>
        </div>

        {/* {currentItems &&
          currentItems?.map((item, index) => {
            return (
              <>
                <div
                  className="flex items-center text-white h-[50px] bg-[#8cc9fa] dark:bg-[#1e3e57] w-full rounded-xl mb-2 sm:text-base md:text-base  text-[10px] justify-between"
                  key={index}
                >
                  <div
                    className="mr-5 w-[150px] text-wrap md:text-base text-xs"
                    title={item?.title}
                  >
                    {item?.title?.length > 15
                      ? item.title.slice(0, 15) + "..."
                      : item.title}
                  </div>
                  <div
                    className=" min-w-[150px] md:text-base sm:text-xs sm:block hidden"
                    title={item?.describe}
                  >
                    {item?.describe?.length > 20
                      ? item.describe.slice(0, 20) + "..."
                      : item.describe}
                  </div>

                  <div className=" w-[150px] sm:mr-0 mr-[4%] md:text-base text-xs ">
                    {item?.accept ? (
                      <span className="text-green-500 bg-green-700 py-1 px-1">
                        پذیرفته شده
                      </span>
                    ) : (
                      <span className="text-red-500 bg-red-700 p-1">
                        پذیرفته نشده
                      </span>
                    )}
                  </div>

                  <div className="ml-8 gap-1 flex items-center">
                    <FaEye
                      className="cursor-pointer text-lg"
                      onClick={() => {
                        navigate(
                          `/courses/${item?.courseId ? item.courseId : "no id"}`
                        );
                      }}
                    />
                  </div>
                </div>
              </>
            );
          })} */}

        {!currentItems ? (
          <CustomSpinner style={loaderStyle} />
        ) : currentItems.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-200 mx-auto mt-[150px]">
            کامنتی در دوره وجود نداره{" "}
          </p>
        ) : (
          currentItems &&
          currentItems?.map((item, index) => {
            return (
              <>
                <div
                  className="flex items-center text-white h-[50px] bg-[#8cc9fa] dark:bg-[#1e3e57] w-full rounded-xl mb-2 sm:text-base md:text-base  text-[10px] justify-between"
                  key={index}
                >
                  <div
                    className="mr-5 w-[150px] text-wrap md:text-base text-xs"
                    title={item?.title}
                  >
                    {item?.title?.length > 15
                      ? item.title.slice(0, 15) + "..."
                      : item.title}
                  </div>
                  <div
                    className=" w-[150px] md:text-base sm:text-xs sm:block hidden"
                    title={item?.describe}
                  >
                    {item?.describe?.length > 20
                      ? item.describe.slice(0, 20) + "..."
                      : item.describe}
                  </div>

                  <div className=" w-[150px] sm:mr-0 mr-[4%] md:text-base text-xs ">
                    {item?.accept ? (
                      <span className="py-1 px-1 text-green-700 dark:text-green-500">
                        پذیرفته شده
                      </span>
                    ) : (
                      <span className=" py-1 px-1 dark:text-red-500 text-red-700">
                        پذیرفته نشده
                      </span>
                    )}
                  </div>

                  <div className="ml-8 gap-1 flex items-center">
                    <FaEye
                      className="cursor-pointer text-lg"
                      onClick={() => {
                        navigate(
                          `/courses/${item?.courseId ? item.courseId : "no id"}`
                        );
                      }}
                    />
                    {/* <FaTrash
                      className="text-red-600"
                      onClick={() => handelDelete(item?.commentId)}
                    /> */}
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>

      <div className="flex justify-center mb-5">
        <ReactPaginate
          breakLabel="..."
          nextLabel=<div className="w-[32px] h-[32px] bg-[#ECEFF1] dark:bg-[#37474F] rounded-full flex items-center justify-center ">
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0333 13.2802L5.68667 8.93355C5.17333 8.42021 5.17333 7.58022 5.68667 7.06688L10.0333 2.72021"
                  className="stroke-[#263238] dark:stroke-[#ECEFF1]"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel=<div className="w-[32px] h-[32px] bg-[#2196F3] dark:bg-[#1565C0]  rounded-full flex items-center justify-center">
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.96666 2.71978L10.3133 7.06645C10.8267 7.57978 10.8267 8.41978 10.3133 8.93312L5.96666 13.2798"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          activeClassName={
            "w-[32px] h-[32px] bg-[#2196F3] dark:bg-[#1565C0] rounded-full flex items-center justify-center text-white "
          }
          className="flex gap-5 mt-[48px] justify-center items-center text-[#263238] dark:text-gray-300"
        />
      </div>
    </>
  );
};

export default MyCourseComment;
