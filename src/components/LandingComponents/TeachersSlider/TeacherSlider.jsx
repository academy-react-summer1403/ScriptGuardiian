import React, { useState } from "react";
import ImageSLider from "../../../images/landing/TeachersSlider/BGIMAGE.jfif";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const TeacherSlider = () => {
  const [slides, setSlides] = useState([
    { id: 1, name: " سالار حیدری ", image: ImageSLider },
    { id: 2, name: "حیدر سالاری", image: ImageSLider },
    { id: 4, name: "تصویر 4", image: ImageSLider },
    { id: 5, name: "تصویر 5", image: ImageSLider },
    { id: 6, name: "تصویر 6", image: ImageSLider },
    { id: 7, name: "تصویر 6", image: ImageSLider },
    { id: 8, name: "تصویر 6", image: ImageSLider },
    { id: 9, name: "تصویر 6", image: ImageSLider },
    { id: 10, name: "تصویر 6", image: ImageSLider },
  ]);



  const PrevArrow = ({ className, style, onClick }) => {
    return (
      <div onClick={onClick} className="absolute top-[210px] left-0 z-[100]">
      <FaArrowLeft className="text-white "/>
    </div>
    );
  };

  // دکمه سفارشی برای پیمایش به جلو
  const NextArrow = ({ className, style, onClick }) => {
    return (
      <div onClick={onClick} className="absolute top-[210px] right-0">
        <FaArrowRight className="text-white"/>
      </div>

    );
  };



  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // استفاده از دکمه‌های سفارشی
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <div className="flex flex-col items-center z-[10]">
        <div className=" mt-[64px] flex justify-center">
          <h2 className="font-[900] text-[40px] text-[#263238] dark:text-gray-400 ">
            اساتید برتر
          </h2>
        </div>

        <Slider {...settings} className="xl:w-[1200px] w-[90%] ">
          {slides.map((item, index) => {
            return (
              <div
                className="xl:w-[296px] h-[382px]  flex flex-col mx-2 odd:mt-[64px]"
                key={item.id}
              >
                <div className="xl:w-[296px] h-[300px]  flex">
                  <img
                    src={ImageSLider}
                    className="w-full h-full rounded-[24px]"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-[#263238] dark:text-gray-400 mt-[16px] font-[700] text-[24px]">
                    ss
                  </h3>
                  <p className="text-[#455A64] dark:text-gray-200 mt-[4px]">
                    بکند, node js, .netcore, database
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export { TeacherSlider };

{
  /* <div className="text-center">
<img
  src={slides[currentIndex].image}
  alt={slides[currentIndex].name}
  className="w-full rounded-lg"
/>
<h3 className="mt-2 text-lg font-semibold">
  {slides[currentIndex].name}
</h3>
</div> */
}

{
  /* <div className="flex flex-wrap  justify-center w-full relative mt-[48px] h-[446px] ">
            {slides.slice(currentIndex, currentIndex + 4).map((slide) => (
              <div
                key={slide.id}
                className="w-[296px] h-[382px]  flex flex-col mx-2 odd:mt-[64px]"
              >
                <div className="w-[296px] h-[300px]  flex">
                  <img
                    src={slide.image}
                    className="w-full h-full rounded-[24px]"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-[#263238] dark:text-gray-400 mt-[16px] font-[700] text-[24px]">
                    {slide.name}
                  </h3>
                  <p className="text-[#455A64] dark:text-gray-200 mt-[4px]">
                    بکند, node js, .netcore, database
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={goToPrevSlide}
              className="bg-blue-500 text-white w-[48px] h-[48px] rounded-full  hover:bg-blue-700 transition border-white border-[4px] disabled:opacity-50 absolute top-[201px] right-0 flex justify-center items-center"
              disabled={currentIndex === 0}
            >
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.50003 3.39961L12.9334 8.83294C13.575 9.47461 13.575 10.5246 12.9334 11.1663L7.50003 16.5996"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <button
              onClick={goToNextSlide}
              className="bg-blue-500 text-white w-[48px] h-[48px] rounded-full ml-2 hover:bg-blue-700 transition disabled:opacity-50 absolute top-[201px] left-0 border-[4px] border-white flex items-center justify-center"
              disabled={currentIndex >= slides.length - 4}
            >
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 16.6004L7.0667 11.1671C6.42503 10.5254 6.42503 9.47539 7.0667 8.83372L12.5 3.40039"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div> */
}

{
  /* TODO */
}