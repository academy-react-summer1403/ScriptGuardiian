import { FaSignInAlt } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";

import { LoginModal } from "../../Login/LoginModal";
import { LoginCodeVerification } from "../../Login/LoginCodeVerification";
import { RegisterModal } from "../../Login/RegisterModal";
import { RegisterCodeVerification } from "../../Login/RegisterCodeVerification";
import { RegisterFinish } from "../../Login/RegisterFinish";
import { getItem } from "../../../core/services/storage/storage.services";
import { useNavigate } from "react-router-dom";
import { ForGetPass } from "../../Login/ForGetPass";
import { ForGetPassStepTwo } from "../../Login/forGetPassStepTwo";
const LoginButton = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoginVerificationOpen, setIsLoginVerification] = useState(false);
  const [isForgetPassOpen, setIsForgetPass] = useState(false);
  const [isForgetPassOpenLastStep, setIsForgetPassLastStep] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRegisterVerificationOpen, setIsRegisterVerification] =
    useState(false);
  const [isRegisterFinishOpen, setIsRegisterFinishOpen] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const toggleLoginVerificationModal = () => {
    setIsLoginVerification(!isLoginVerificationOpen);
  };

  const toggleForGetPassModal = () => {
    setIsForgetPass(!isForgetPassOpen);
  };

  const toggleForGetPassModalStepLast = () => {
    setIsForgetPassLastStep(false);
  };
  const toggleRegisterModal = () => {
    setIsRegisterOpen(!isRegisterOpen);
  };

  const toggleRegisterVerificationModal = () => {
    setIsRegisterVerification(!isRegisterVerificationOpen);
  };
  const toggleRegisterFinishModal = () => {
    setIsRegisterFinishOpen(!isRegisterFinishOpen);
  };

  //Menu

  const [menuOpen, setMenuOpen] = useState(false);

  //handel Token

  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsToken(!!token);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("roles");
    setIsToken(false);
    setMenuOpen(false);
  };

  const goToStudentPanel = () => {
    console.log("Going to student panel...");
    setMenuOpen(false);
    navigate("/panel");
  };

  //handel forget pass
  const path = window.location.pathname;
  const id = path.startsWith("/") ? path.split("/").pop() : null;

  useEffect(() => {
    if (
      id &&
      id.length > 10 &&
      !path.includes("/Courses/") &&
      !path.includes("/News/")
    ) {
      setIsForgetPassLastStep(true);
    }
  }, []);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsLoginOpen(false);
        setIsForgetPass(false);
        setIsRegisterOpen(false);
      }
    };

    if (isLoginOpen || isForgetPassOpen || isRegisterOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isLoginOpen || isForgetPassOpen || isRegisterOpen]);
  return (
    <>
      {isToken ? (
        <>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:w-[48px] lg:w-[40px] sm:w-[36px] w-[30px] xl:h-[48px] lg:h-[40px] sm:h-[36px] h-[30px]  rounded-[100%] bg-white dark:bg-gray-900 flex justify-center items-center"
            >
              <span>👤</span>
            </button>

            {menuOpen && (
              <div className="absolute right-[-150px] mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <button
                  onClick={goToStudentPanel}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  رفتن به پنل دانشجو
                </button>
                <button
                  onClick={logOut}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  خروج از حساب کاربری
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={toggleLoginModal}
            className="bg-[#2196F3] dark:bg-[#1565C0]  hover:bg-[#1976D2] dark:hover:bg-[#0D47A1] xl:w-[133px] lg:w-[100px] sm:w-[36px] w-[30px] xl:h-[48px] lg:h-[40px] sm:h-[36px] h-[30px]  xl:rounded-[80px] lg:rounded-[80px] rounded-[100%] text-white transition duration-300 "
          >
            <p className="lg:block hidden xl:text-[14px] lg:text-[14px]">
              ورود به حساب
            </p>
            <div className="lg:hidden w-full h-full flex items-center justify-center">
              <FaSignInAlt className="text-white sm:text-[18px] text-[16px]" />
            </div>
          </button>

          <LoginModal
            isOpen={isLoginOpen}
            toggleModal={toggleLoginModal}
            openVerification={toggleLoginVerificationModal}
            openRegister={toggleRegisterModal}
            openForgetPass={toggleForGetPassModal}
            menuRef={menuRef}
          />
          <LoginCodeVerification
            isOpen={isLoginVerificationOpen}
            toggleModal={toggleLoginVerificationModal}
          />
          <RegisterModal
            isOpen={isRegisterOpen}
            toggleModal={toggleRegisterModal}
            openVerification={toggleRegisterVerificationModal}
            openLogin={toggleLoginModal}
            menuRef={menuRef}
          />
          <RegisterCodeVerification
            isOpen={isRegisterVerificationOpen}
            toggleModal={toggleRegisterVerificationModal}
            OpenRegisterFinish={toggleRegisterFinishModal}
          />
          <RegisterFinish
            isOpen={isRegisterFinishOpen}
            toggleModal={toggleRegisterFinishModal}
            openLogin={toggleLoginModal}
          />

          {isForgetPassOpen && (
            <>
              <ForGetPass
                toggleForGetPassModal={toggleForGetPassModal}
                setIsForgetPass={setIsForgetPass}
                menuRef={menuRef}
                openLogin={toggleLoginModal}
              />
            </>
          )}

          {/* ForgetPass */}
          {isForgetPassOpenLastStep && (
            <ForGetPassStepTwo
              setIsForgetPassLastStep={setIsForgetPassLastStep}
            />
          )}
        </>
      )}
    </>
  );
};

export { LoginButton };
