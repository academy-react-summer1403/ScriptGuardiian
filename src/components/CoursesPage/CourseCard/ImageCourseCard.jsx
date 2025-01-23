import React from "react";
import ReactIcon from "../../../images/landing/OurCourses/Rectangle 124.png";
import image from "../../../images/NewsDetails/default_image.png";
const ImageCourseCard = ({ tumbImageAddress }) => {
  return (
    <>
      {/* <div className="flex justify-center ">
        <img
          src={ReactIcon}
          alt=""
          className="block  pt-[16px] w-[264px] h-[180px] "
        />
      </div> */}

      <div className="flex justify-center  h-[200px] items-center ">
        <img
          src={
            tumbImageAddress &&
            tumbImageAddress !== "null" &&
            tumbImageAddress != "Not-set"
              ? tumbImageAddress
              : image
          }
          alt=""
          className="block   w-[264px] h-[180px] rounded-2xl "
        />
      </div>
    </>
  );
};

export { ImageCourseCard };
