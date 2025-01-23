import React from "react";
import Image from "../../../images/NewsDetails/default_image.png";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDeleteFavoriteNews } from "../../../core/services/api/DetailNews/handelNewsFavorite";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { convertEnToPe } from "persian-number";

const ListFavoriteNews = ({
  currentImageAddressTumb,
  title,
  currentView,
  currentRate,
  newsId,
  favoriteId,
  currentLikeCount,
}) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  //API

  const { mutate: DeleteNews } = useDeleteFavoriteNews();

  const handelDeleteNews = (favoriteId) => {
    DeleteNews(favoriteId, {
      onSuccess: () => {
        toast.success("با موفقیت از لیست علاقه مندی ها حذف شد");
        queryClient.invalidateQueries("MyFavoriteNews");
      },
      onError: (error) => {
        toast.error("خطا در حذف از لیست علاقه مندی ها");
        queryClient.invalidateQueries("MyFavoriteNews");
      },
    });
  };
  return (
    <>
      <div className="flex items-center text-white h-[50px] bg-[#8cc9fa] dark:bg-[#1e3e57]  w-full rounded-xl mb-2 sm:text-base md:text-base  text-[10px] md:justify-start justify-around">
        <div className="lg:mr-[1%] sm:w-[6%] lg:w-[15%] md:w-[12%] md:mr-[6%] max-w-[60px] h-full    items-center md:flex  hidden">
          <img
            src={currentImageAddressTumb ? currentImageAddressTumb : Image}
            alt=""
            className="w-full object-cover h-[80%] rounded block"
          />
        </div>

        <div className="lg:mr-[12%] md:mr-[6%]   lg:w-[10%] md:w-[10%]  xl:w-[13%] ">
          {title && title?.length > 33 ? title.slice(0, 33) : title}
        </div>
        <div className="lg:mr-[5.3%] md:mr-[5%]  lg:w-[12%] md:w-[15%] b">
          {currentView && convertEnToPe(currentView)}
        </div>
        <div className="lg:mr-[6.5%] md:mr-[4%]  lg:w-[10%] md:w-[11.3%]  ">
          {" "}
          {currentRate % 1 === 0
            ? convertEnToPe(currentRate.toFixed(0))
            : convertEnToPe(currentRate.toFixed(2))}
        </div>
        <div className="lg:mr-[8.3%] md:mr-[5%]  lg:w-[13%] md:w-[13%] ">
          {currentLikeCount % 1 === 0
            ? convertEnToPe(currentLikeCount.toFixed(0))
            : convertEnToPe(currentLikeCount.toFixed(2))}
        </div>
        <div className="flex items-center gap-x-1 sm:mr-[6%]">
          <FaEye
            className="cursor-pointer"
            onClick={() => {
              navigate(`/News/${newsId ? newsId : "no ID"}`);
            }}
          />
          <FaTrash
            className="text-red-600"
            onClick={() => handelDeleteNews(favoriteId)}
          />
        </div>
      </div>
    </>
  );
};

export { ListFavoriteNews };
