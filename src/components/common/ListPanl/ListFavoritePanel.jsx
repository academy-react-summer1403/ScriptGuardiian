import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Image from "../../../images/NewsDetails/default_image.png";
import { useDeleteFavoriteCourses } from "../../../core/services/api/CoursesPage/handelCoursesFavorite";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { convertIsoToJalali } from "../../../core/utils/dateUtils";
const ListFavoritePanel = ({
  tumbImageAddress,
  courseTitle,
  typeName,
  levelName,
  courseId,
  favoriteId,
  lastUpdate,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //API

  const { mutate: DeleteFavorite } = useDeleteFavoriteCourses();

  const handelDeleteFavorite = () => {
    const formData = new FormData();
    formData.append("CourseFavoriteId", favoriteId);
    DeleteFavorite(formData, {
      onSuccess: () => {
        toast.success("با موفقیت از  لیست علاقه مندی ها حذف شد");

        queryClient.invalidateQueries("MyFavoriteCourses");
      },
    });
  };

  return (
    <div className="flex items-center text-white h-[50px] bg-[#8cc9fa] dark:bg-[#1e3e57]  w-full rounded-xl mb-2 sm:text-base md:text-base  text-[10px] md:justify-start justify-around">
      <div className="lg:mr-[1%] sm:w-[6%] lg:w-[15%] md:w-[12%] md:mr-[6%] max-w-[60px] h-full    items-center md:flex  hidden">
        <img
          src={
            tumbImageAddress && tumbImageAddress != "null"
              ? tumbImageAddress
              : Image
          }
          alt=""
          className="w-full object-cover h-[80%] rounded block"
        />
      </div>
      <div className="lg:mr-[12%] md:mr-[6%]   lg:w-[10%] md:w-[10%]   ">
        {courseTitle
          ? courseTitle.length > 11
            ? courseTitle.slice(0, 11) + "..."
            : courseTitle
          : ""}
      </div>
      <div className="lg:mr-[9%] md:mr-[5%]  lg:w-[12%] md:w-[15%] sm:block hidden">
        {typeName ? typeName : ""}
      </div>
      <div className="lg:mr-[5.5%] md:mr-[4%]  lg:w-[10%] md:w-[11.3%]  ">
        {" "}
        <strong>{lastUpdate && convertIsoToJalali(lastUpdate)}</strong>
      </div>
      <div className="lg:mr-[10%] md:mr-[5%]  lg:w-[13%] md:w-[13%] ">
        {levelName ? levelName : ""}
      </div>
      <div className="flex items-center gap-x-1 sm:mr-[6%]">
        <FaEye
          className="cursor-pointer"
          onClick={() => {
            navigate(`/courses/${courseId ? courseId : "no ID"}`);
          }}
        />
        <FaTrash className="text-red-600" onClick={handelDeleteFavorite} />
      </div>
    </div>
  );
};

export { ListFavoritePanel };
