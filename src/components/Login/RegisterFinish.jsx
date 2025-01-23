import React from "react";
import { Field, Form, Formik, useFormik } from "formik";
import { MdCheck } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { validationRegisterFinish } from "../../core/services/validation/validationSchema/Auth";
import { useRegisterFinish } from "../../core/services/api/Auth/Register/Register";
import { toast } from "react-toastify";
import { setItem } from "../../core/services/storage/storage.services";
import { CustomSpinner } from "../animation/CustomSpinner";
const RegisterFinish = ({ isOpen, toggleModal }) => {
  // if (isOpen === true) {
  //   console.log("true Register Finish Modal");
  // } else {
  //   console.log("false Register Finish Modal");

  const navigate = useNavigate();
  const {
    mutate: RegisterFinish,
    isError,
    data,
    isPending,
  } = useRegisterFinish();
  // }

  const formik = useFormik({
    initialValues: {
      gmail: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema: validationRegisterFinish,
    onSubmit(values) {
      RegisterFinish(values, {
        onSuccess: (data) => {
          if (data.success === true) {
            setItem("token", data.token);
            setItem("id", data.id);
            setItem("roles", data.roles);
            toast.success(data.message);
            toggleModal();
            navigate("/panel");
          } else {
            toast.error(data.message);
          }
        },
        // onError: (error) => {
        //   alert(error)
        //   console.log(error, "data on error");
        // },
      });
    },
  });
  return (
    <>
      {isOpen && (
        <div className="sm:w-[420px] sm:h-[528px] w-[90%]  absolute bg-white dark:bg-gray-900 rounded-[24px] top-[73px]  left-1/2 transform -translate-x-1/2 flex flex-col">
          <div className="flex justify-between ">
            <h2 className="mt-[30px] mr-[32px] text-[#263238] dark:text-gray-200 font-[700] text-[32px] tracking-tight">
              ورود به حساب
            </h2>
            <div className="w-[48px] h-[48px] bg-[#F1F7FF] dark:bg-[#2A3B54] rounded-[16px] flex justify-center items-center mt-8 ml-[32px] ">
              <span onClick={toggleModal}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.16992 14.8299L14.8299 9.16992"
                    className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.8299 14.8299L9.16992 9.16992"
                    className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <input
              className="sm:w-[365px] w-[80%] h-[56px] border-[#CFD8DC] dark:bg-gray-900 dark:border-gray-950 dark:placeholder:text-gray-200 border rounded-[50px] pr-5 mr-[32px] mt-[48px] mb-5 outline-none dark:text-gray-200 text-[#607D8B]"
              placeholder="ایمیل"
              name="gmail"
              {...formik.getFieldProps("gmail")}
            />

            {formik.errors.gmail && (
              <div className="dark:text-red-800 text-red-600 absolute top-[188px] right-[43px]">
                {formik.errors.gmail}
              </div>
            )}

            <input
              className="sm:w-[365px] w-[80%] h-[56px] border-[#CFD8DC] border  dark:bg-gray-900 dark:border-gray-950 dark:placeholder:text-gray-200 rounded-[50px] pr-5 mr-[32px] mt-[16px] outline-none mb-5 text-[#607D8B] dark:text-white"
              placeholder="رمز عبور"
              name="password"
              type="text"
              {...formik.getFieldProps("password")}
            />

            {formik.errors.password && (
              <div className="dark:text-red-800 text-red-600 absolute top-[278px] right-[43px]">
                {formik.errors.password}
              </div>
            )}

            <input
              className="sm:w-[365px] w-[80%] h-[56px] border-[#CFD8DC] border  dark:bg-gray-900 dark:border-gray-950 dark:placeholder:text-gray-200 rounded-[50px] pr-5 mr-[32px] mt-[16px] outline-none text-[#607D8B] dark:text-white"
              placeholder="تلفن همراه"
              name=""
              type="text"
              {...formik.getFieldProps("phoneNumber")}
            />

            {formik.errors.phoneNumber && (
              <div className="dark:text-red-800 text-red-600 absolute top-[378px] right-[43px]">
                {formik.errors.phoneNumber}
              </div>
            )}
            <div className="flex  mt-[24px] justify-between sm:text-[14px] text-[12px]">
              {/* <div className="flex items-center mr-[32px] gap-[8px] ">
                <input
                  type="checkbox"
                  name="accepted"
                  className="peer hidden"
                  id="accepted"
                />
                <label
                  htmlFor="accepted"
                  className="flex justify-center items-center w-[20px] h-[20px] border-[#2196F3] dark:border-[#1565C0] border rounded-lg peer-checked:bg-blue-500 dark:peer-checked:bg-[#1565C0] peer-checked:ease-in-out"
                >
                  <MdCheck className="text-white dark:text-gray-900" />
                </label>

                <p className="text-[#455A64] dark:text-gray-200 ">
                  من را به خاطر بسپار
                </p>
              </div> */}
            </div>

            <div className="flex justify-center mt-[48px]">
              {isPending ? (
                <button
                  type="submit"
                  className="rounded-[80px] text-white w-[208px] h-[56px] bg-[#2196F3] dark:bg-[#1565C0] hover:bg-[#1976D2] dark:hover:bg-[#0D47A1] transition-colors duration-300"
                >
                  <CustomSpinner color={"#FFF"} style={""} size={"30"} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-[80px] text-white w-[208px] h-[56px] bg-[#2196F3] dark:bg-[#1565C0] hover:bg-[#1976D2] dark:hover:bg-[#0D47A1] transition-colors duration-300"
                >
                  ثبت نام{" "}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export { RegisterFinish };
