import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaBell,
  FaBookOpen,
  FaCloudscale,
  FaComment,
  FaHamburger,
  FaHome,
  FaLock,
  FaMinus,
  FaMoon,
  FaShoppingCart,
  FaSignOutAlt,
  FaSun,
  FaUserCircle,
} from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { HiX } from "react-icons/hi";
import { MdDashboard, MdShoppingCart } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import userProfile from "../../.././images/StudentPanel/NavStudent/images.png";
import { useGetStudentProfile } from "../../../core/services/api/Panel/GetProfile";
import { useFormik } from "formik";
import { useEditProfile } from "../../../core/services/api/Panel/editProfile";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { HandelProfile } from "../../../components/panel/HandelProfile/HandelProfile";

import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian"; // برای تقویم شمسی
import persian_fa from "react-date-object/locales/persian_fa"; // برای زبان فارسی
const StudentProfile = () => {
  const queryClient = useQueryClient();

  //API GET PROFILE INFO
  const { data, isPending } = useGetStudentProfile();

  console.log(data, "Student profile data data");

  //Handel Put Api
  const { mutate: EditProfile } = useEditProfile();

  // use Formik

  const formik = useFormik({
    initialValues: {
      LName: data?.lName ? data?.lName : "",
      FName: data?.fName ? data?.fName : "",
      UserAbout: data?.userAbout ? data?.userAbout : "",
      LinkdinProfile: data?.linkdinProfile ? data?.linkdinProfile : "",
      TelegramLink: data?.telegramLink ? data?.telegramLink : "",
      ReceiveMessageEvent: data?.receiveMessageEvent ?? false,
      HomeAdderess: data?.homeAdderess ? data?.homeAdderess : "",
      NationalCode: data?.nationalCode ? data?.nationalCode : "",
      Gender: data?.gender ?? true,

      // BirthDay:
      //   data?.birthDay && data?.birthDay !== "0001-01-01T00:00:00"
      //     ? data?.birthDay
      //     : "",

      birthDay:
        data?.birthDay && data?.birthDay !== "0001-01-01T00:00:00"
          ? new DateObject(data?.birthDay)
              .convert("gregorian")
              .format("YYYY-MM-DD")
          : "", // مقدار پیش‌فرض خالی یا تاریخ اشتباه
      // Latitude: data?.latitude ? data?.latitude : "",
      Latitude: "51.3890",
      // Longitude: data?.longitude ? data?.longitude : "",
      Longitude: "35.6892",
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      // const formData = new FormData();
      // for (const key in data) {
      //   formData.append(key, data[key]);
      // }

      const formData = new FormData();

      // تبدیل تاریخ شمسی به میلادی (ISO)
      const birthDayInGregorian = data.birthDay
        ? new DateObject(data.birthDay)
            .convert("gregorian")
            .format("YYYY-MM-DD")
        : "";

      // اضافه کردن تاریخ میلادی به formData
      formData.append("birthDay", birthDayInGregorian);

      // اضافه کردن سایر فیلدهای فرم به formData
      for (const key in data) {
        if (key !== "birthDay") {
          // تاریخ میلادی را قبلاً اضافه کرده‌ایم
          formData.append(key, data[key]);
        }
      }

      EditProfile(formData, {
        onSuccess: (data) => {
          if (data.success === true) {
            toast.success(data.message);
            queryClient.invalidateQueries("GetStudentProfile");
          }
        },
      });
    },
  });

  //handel menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // وضعیت اولیه دارک مود بر اساس localStorage
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // مدیریت تغییر کلاس بر روی body و ذخیره‌سازی حالت در localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // تغییر حالت دارک مود هنگام کلیک
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isPending === true) {
    return (
      <>
        <p>درحال بررسی</p>
      </>
    );
  }
  return (
    <>
      {/* hamburger */}
      <div
        className={`absolute top-0 right-0 sm:w-[40%] w-full  bg-white shadow-md  transition-transform duration-300 ${
          isMenuOpen
            ? " translate-x-0 flex"
            : " translate-x-[100%] opacity-0 hidden"
        }`}
      >
        <div className="flex flex-col h-[100vh]  w-full  bg-[#7665E7]   ">
          <div className="flex justify-between">
            {" "}
            <Link to="/">
              {" "}
              <FaHome className="text-white mr-2 mt-2 text-xl " />
            </Link>
            <HiX
              className="text-white ml-2 mt-2 text-xl"
              onClick={toggleMenu}
            />
          </div>

          <div className="flex flex-col  justify-center items-center ">
            <div className="flex w-[100px] h-[100px]  rounded-full">
              <img
                src={userProfile}
                alt=""
                className="w-full h-full rounded-full "
              />
            </div>
            <h3 className="mt-2 text-white">نام کاربر</h3>
          </div>

          <div className="flex flex-col border-t-[1px] mt-1 w-[90%] mx-auto ">
            <div className="flex items-center gap-x-2 text-white mt-3 py-2  w-full">
              <MdDashboard className="text-xl" />
              <NavLink to="/panel">داشبورد</NavLink>
            </div>

            <div className="flex items-center gap-x-2 text-white mt-1 py-2  w-full">
              <FaUserCircle className="text-xl" />
              <NavLink to="/panel/MyProfile">پروفایل</NavLink>
            </div>

            <div className="flex items-center gap-x-2 text-white mt-1 py-2  w-full">
              <FaBookOpen className="text-xl" />
              <NavLink to="/panel/MyCourses">دوره های من</NavLink>
            </div>

            <div className="flex items-center gap-x-2 text-white mt-1 py-2  w-full">
              <FaLock className="text-xl" />
              <NavLink to="/panel/ChangePassword">تغییر رمز عبور</NavLink>
            </div>

            <div className="flex items-center gap-x-2 text-white mt-1 py-2  w-full">
              <FaSignOutAlt className="text-xl" />
              <NavLink to="/panel/LogOut">خروج از حساب</NavLink>
            </div>

            <div className="flex items-center gap-x-2 text-white mt-1 py-2  w-full">
              <FaComment className="text-xl" />
              <NavLink to="/panel/MyComments">نظرات ثبت شده</NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center ">
        <div className="h-[50px] border-b border-white dark:border-gray-950 w-[95%] flex justify-between items-center ">
          <div className="flex items-center">
            {/* OpenMenu */}
            <div className="xl:hidden flex">
              {/* open-btn*/}
              <button onClick={toggleMenu} className="text-gray-500">
                <FaBars />
              </button>
            </div>
            <FaMinus className="text-purple-600 dark:text-purple-900 sm:mr-0 mr-1 text-xl" />
            <h2 className="text-[20px] mr-2 text-[#263238] dark:text-white">
              {" "}
              ویرایش پروفایل
            </h2>
          </div>

          <div className="flex items-center gap-x-4 text-gray-500 dark:text-gray-200">
            {isDarkMode ? (
              <FaMoon
                className="text-gray-800"
                size={20}
                onClick={toggleDarkMode}
              />
            ) : (
              <FaSun
                className="text-yellow-500"
                size={20}
                onClick={toggleDarkMode}
              />
            )}
            <FaBell className="text-xl" />
            <FaShoppingCart className="text-xl" />
          </div>
        </div>
        {/* HAndel */}
        <HandelProfile data={data} />

        <form onSubmit={formik?.handleSubmit}>
          <div className="flex flex-wrap sm:w-[95%] w-full gap-x-5 justify-center gap-y-7 mt-3">
            <div className="w-[30%]">
              <label
                htmlFor="FName"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                نام
              </label>
              <input
                type="text"
                id="FName"
                name="FName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="نام خود را وارد کنید"
                {...formik?.getFieldProps("FName")}
              />
            </div>
            <div className="w-[30%]">
              <label
                htmlFor="LName"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                نام خانوادگی
              </label>
              <input
                type="text"
                id="LName"
                name="LName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="نام خانوادگی خود را وارد کنید"
                {...formik?.getFieldProps("LName")}
              />
            </div>
            <div className="w-[30%]">
              <label
                htmlFor="UserAbout"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                درباره شما
              </label>
              <input
                type="text"
                id="UserAbout"
                name="UserAbout"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="درباره خود بنویسید"
                {...formik?.getFieldProps("UserAbout")}
              />
            </div>
            <div className="w-[30%]">
              <label
                htmlFor="LinkdinProfile"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                لینک پروفایل لینک دین
              </label>
              <input
                type="text"
                id="LinkdinProfile"
                name="LinkdinProfile"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="لینک پروفایل لینکدین"
                {...formik?.getFieldProps("LinkdinProfile")}
              />
            </div>
            <div className="w-[30%]">
              <label
                htmlFor="TelegramLink"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                لینک تلگرام
              </label>
              <input
                type="text"
                id="TelegramLink"
                name="TelegramLink"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="لینک تلگرام"
                {...formik?.getFieldProps("TelegramLink")}
              />
            </div>
            <div className="w-[30%]">
              <label
                htmlFor="ReceiveMessageEvent"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                رویداد دریافت پیام
              </label>

              <select {...formik?.getFieldProps("ReceiveMessageEvent")}>
                <option value="true">موافق</option>
                <option value="false">مخالف</option>
              </select>
            </div>
            <div className="w-[30%]">
              <label
                htmlFor="HomeAdderess"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                ادرس خانه{" "}
              </label>
              <input
                type="text"
                id="HomeAdderess"
                name="HomeAdderess"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="ادرس خانه را وارد کنید"
                {...formik?.getFieldProps("HomeAdderess")}
              />
            </div>

            <div className="w-[30%]">
              <label
                htmlFor="NationalCode"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                کد ملی{" "}
              </label>
              <input
                type="text"
                id="NationalCode"
                name="NationalCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="کد ملی خود را وارد کنید"
                {...formik?.getFieldProps("NationalCode")}
              />
            </div>

            <div className="w-[30%]">
              <label
                htmlFor="Gender"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                جنسیت{" "}
              </label>
              {/* <input
                type="text"
                id="Gender"
                name="Gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="جنسیت خود را وارد کنید"
                {...formik?.getFieldProps("Gender")}
              /> */}
              <div>
                <select {...formik?.getFieldProps("Gender")}>
                  <option value="true">مرد</option>
                  <option value="false">زن</option>
                </select>
              </div>
            </div>

            <div className="w-[30%]">
              <label
                htmlFor="BirthDay"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                روز تولد{" "}
              </label>
              {/* <input
                type="text"
                id="BirthDay"
                name="BirthDay"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="روز تولد خود را وارد کنید"
                {...formik?.getFieldProps("BirthDay")}
              /> */}

              <DatePicker
                value={formik.values.birthDay}
                onChange={(date) => formik.setFieldValue("birthDay", date)}
                calendar={persian} // تقویم شمسی
              />
            </div>

            {/* <div className="w-[30%]">
              <label
                htmlFor="Latitude"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                عرض جغرافیایی{" "}
              </label>
              <input
                type="text"
                id="Latitude"
                name="Latitude"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="عرض جغرافیایی"
                {...formik?.getFieldProps("Latitude")}
              />
            </div>

            <div className="w-[30%]">
              <label
                htmlFor="Longitude"
                className="block mb-2   text-[#455A64] dark:text-white"
              >
                طول جغرافیایی{" "}
              </label>
              <input
                type="text"
                id="Longitude"
                name="Longitude"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="طول جغرافیایی"
                {...formik?.getFieldProps("Longitude")}
              />
            </div> */}
          </div>

          <div className="flex sm:justify-between justify-center w-[95%] mt-12 mb-5">
            <button className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 text-white font-bold py-3  xl:mr-8 px-8 rounded">
              ثبت اطلاعات
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export { StudentProfile };
