import React from "react";

import { useNavigate } from "react-router-dom";
import { ImageCourseCard } from "./ImageCourseCard";
import { CourseCardInfo } from "./CourseCardInfo";
import { CourseCardInstructor } from "./CourseCardInstructor";
import { PriceAndFavoritesCard } from "./PriceAndFavoritesCard";

const CoursesCard = ({
  courseId,
  tumbImageAddress,
  title,
  teacherName,
  handleClickTitle,
  likeCount,
  cost,
  dissLikeCount,
  isUserFavorite,
  userIsLiked,
  userLikeId,
  userIsDissLiked,
  userFavoriteId,
  lastUpdate,
}) => {
  const navigate = useNavigate();
  const navigateDetails = () => {
    navigate(`/Courses/${courseId}`);
  };
  return (
    <div
      className="w-[296px] h-[389px] flex flex-col bg-white dark:bg-gray-900 rounded-[24px] shadow-ّFirst-shadow text-[#263238] dark:text-white last:mb-5  cursor-pointer sm:mx-0 mx-auto"
      onClick={navigateDetails}
      style={{ direction: "rtl" }}
    >
      {/* Image */}
      <ImageCourseCard tumbImageAddress={tumbImageAddress} />
      {/* Content */}

      {/* TopicCourses */}
      <h3 className="font-[700] mt-[16px] mr-[16px] ">
        {title && title.length > 20 ? title.slice(0, 20) : title}{" "}
      </h3>
      <CourseCardInfo lastUpdate={lastUpdate} />
      <CourseCardInstructor teacherName={teacherName} />
      <PriceAndFavoritesCard
        handleClickTitle={handleClickTitle}
        likeCount={likeCount}
        cost={cost}
        dissLikeCount={dissLikeCount}
        isUserFavorite={isUserFavorite}
        courseId={courseId}
        userIsLiked={userIsLiked}
        userLikeId={userLikeId}
        userIsDissLiked={userIsDissLiked}
        userFavoriteId={userFavoriteId}
      />
    </div>
  );
};

export { CoursesCard };
