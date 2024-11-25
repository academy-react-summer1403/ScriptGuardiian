import React from "react";
import { useParams } from "react-router-dom";
import DetailsBigImage from "../../images/NewsDetails/Rectangle 34.png";
import DetailsSmallImage from "../../images/NewsDetails/Rectangle 16.png";
import image from "../../images/NewsDetails/default_image.png";
import profile from "../../images/NewsDetails/profile.png";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddFavoriteNews,
  useDeleteFavoriteNews,
} from "../../core/services/api/DetailNews/handelNewsFavorite";
import { toast } from "react-toastify";
import { convertIsoToJalali } from "../../core/utils/dateUtils";
const TopDetails = ({
  title,
  currentImageAddress,
  miniDescribe,
  currentView,
  addUserFullName,
  id,
  isCurrentUserFavorite,
  currentUserFavoriteId,
  insertDate,
}) => {
  const queryClient = useQueryClient();

  const { mutate: AddFavorite } = useAddFavoriteNews();
  const { mutate: DeleteFavorite } = useDeleteFavoriteNews();

  const handelFavorite = () => {
    if (isCurrentUserFavorite === true) {
      DeleteFavorite(currentUserFavoriteId, {
        onSuccess: () => {
          toast.success("با موفقیت از  لیست علاقه مندی ها حذف شد");

          queryClient.invalidateQueries("DetailNews");
        },
      });
    } else {
      AddFavorite(id, {
        onSuccess: () => {
          toast.success("با موفقیت به  لیست علاقه مندی ها اضافه شد");

          queryClient.invalidateQueries("DetailNews");
        },
      });
    }
  };

  return (
    <div className="flex container lg:flex-row flex-col xl:w-[1280px]  lg:h-[340px]  mt-[56px]  mx-auto xl:gap-8 lg:gap-0 gap-8 lg:items-start items-center lg:justify-around  ">
      <div className="xl:w-[515px] lg:w-[54%]  w-[95%]  h-[340px] relative">
        <img
          src={currentImageAddress ? currentImageAddress : image}
          className="w-full h-full shadow-ّFirst-shadow rounded-2xl"
          alt=""
        />
        <div className="absolute sm:w-[78px] w-[58px] rounded-3xl justify-center items-center  h-[48px] bg-white dark:bg-gray-900 cursor-pointer flex sm:top-8 sm:right-8 top-4 right-4">
          <span
            className="sm:w-[24px] sm:h-[24px] w-[20px] h-[20px]"
            onClick={handelFavorite}
          >
            {" "}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.6901C2 5.6001 4.49 3.1001 7.56 3.1001C9.38 3.1001 10.99 3.9801 12 5.3401C13.01 3.9801 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.6001 22 8.6901C22 15.6901 15.52 19.8201 12.62 20.8101Z"
                className={` stroke-[#F44336]  dark:stroke-[#D32F2F] ${
                  isCurrentUserFavorite
                    ? "dark:fill-[#D32F2F] fill-[#F44336]"
                    : ""
                }`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="flex flex-col xl:w-[733px] lg:w-[40%]  w-[95%]">
        <h2 className="sm:text-[32px] lg:text-[24px] xl:text-[32px] text-lg sm:mr-0  font-[700] text-[#263238] dark:text-gray-200">
          {/* چگونه مطالعه موثر را برای شما آسانتر کنیم. */}
          {title}
        </h2>
        <p className="text-[#455A64] dark:text-gray-400 mt-3 sm:text-base text-xs sm:mr-0 mb-2">
          {/* همانطور که از عنوان مقاله مشخص است، صحبت ما روی آموزش یک موضوع خاص مثل
          آموزش از کتاب، ویدئو یا هر آنچه که برای آموزش است نخواهد بود و این
          مقاله به صورت جامع در مورد چگونگی آموزش دیدن و یادگیری است.همانطور که
          از عنوان مقاله مشخص است، صحبت ما روی آموزش یک موضوع خاص مثل آموزش از
          کتاب، ویدئو یا هر آنچه که همانطور که از عنوان مقاله مشخص است، صحبت ما
          روی آموزش دیدن و یادگیری است.همانطور که از عنوان مقاله. قبل از هر چیزی
          باید بدانیم که نمیشه یک روند یا روش خاصی رو برای همه افراد که ذهنیت
          های متفاوتی هم از هم دارند، در نظر گرفت. ولی خب هدف تمامی این افراد
          آموزش دیدن و رسیدن به درک عمیقی از اون مطلب است ولی آیا برای تمامی
          افراد آموزش دیدن به این جا ختم میشود و همه به درک عمیقی از اون مطلب
          میرسند؟ قطعا خیر. */}
          {miniDescribe}
        </p>
        <div className="flex  sm:justify-between sm:flex-row flex-col-reverse items-center md:mt-0 mt-3 ">
          <div className="min-w-[170px] flex text-[#2196F3] dark:text-[#1565C0] md:mt-4 sm:mt-0 mt-5 items-center   text-[14px] tracking-tighter ">
            <span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.08829 6.99995C9.08829 8.15495 8.15495 9.08829 6.99995 9.08829C5.84495 9.08829 4.91162 8.15495 4.91162 6.99995C4.91162 5.84495 5.84495 4.91162 6.99995 4.91162C8.15495 4.91162 9.08829 5.84495 9.08829 6.99995Z"
                  className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.99991 11.8241C9.05908 11.8241 10.9782 10.6108 12.3141 8.51075C12.8391 7.68825 12.8391 6.30575 12.3141 5.48325C10.9782 3.38325 9.05908 2.16992 6.99991 2.16992C4.94074 2.16992 3.02158 3.38325 1.68574 5.48325C1.16074 6.30575 1.16074 7.68825 1.68574 8.51075C3.02158 10.6108 4.94074 11.8241 6.99991 11.8241Z"
                  className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="mr-1">{currentView} بازدید</p>
            <span className="mr-4">
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="6"
                  height="6"
                  rx="3"
                  className="fill-[#2196F3] dark:fill-[#1565C0]"
                />
              </svg>
            </span>

            <span className="mr-4">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.66675 1.1665V2.9165"
                  className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.33325 1.1665V2.9165"
                  className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.04175 5.30273H11.9584"
                  className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.25 4.95817V9.9165C12.25 11.6665 11.375 12.8332 9.33333 12.8332H4.66667C2.625 12.8332 1.75 11.6665 1.75 9.9165V4.95817C1.75 3.20817 2.625 2.0415 4.66667 2.0415H9.33333C11.375 2.0415 12.25 3.20817 12.25 4.95817Z"
                  className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.99745 7.99186H7.00269"
                  className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.83827 7.99186H4.84351"
                  className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.83827 9.74186H4.84351"
                  className="stroke-[#2196F3] dark:stroke-[#1565C0]"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="mr-1">
              <strong>{insertDate && convertIsoToJalali(insertDate)}</strong>
            </p>
          </div>
          <div className="flex sm:w-[186px] w-[90%] h-[64px] items-center bg-white  shadow-2xl mt-5 sm:mt-0 dark:bg-gray-900 rounded-2xl">
            <div className="w-10 h-10 rounded-2xl">
              {" "}
              <img
                src={profile}
                alt=""
                className="mr-3 w-full h-full rounded-2xl"
              />
            </div>
            <p className="text-[#263238] dark:text-gray-200 mr-5">
              {addUserFullName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TopDetails };
