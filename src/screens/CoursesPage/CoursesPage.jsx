import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { HereSectionCourses } from "../../components/CoursesPage/HeroSectionCourses/HereSectionCourses";
import { Filters } from "../../components/CoursesPage/FilterComponents/Filters";
import { SearchAndThemeCourses } from "../../components/CoursesPage/SearchAndThemeCourses/SearchAndThemeCourses";
// import { LandingCourses } from "../../components/LandingComponents/OurCourses/LandingCourses";
import { CoursesCard } from "../../components/CoursesPage/CourseCard/CourseCard";
import { Course } from "../../components/LandingComponents/OurCourses/Course";
import { useCourses } from "../../core/services/api/CoursesPage/GetAllCourses";
import { CustomSpinner } from "../../components/animation/CustomSpinner";

const CoursesPage = () => {
  //API

  const [searchQuery, setSearchQuery] = useState(undefined);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(undefined);

  //
  const [rest, setRest] = useState(false);
  const [costDown, setCostDown] = useState(undefined); //main
  const [costUp, setCostUp] = useState(undefined); //main
  const [price, setPrice] = useState([1000, 10000000]); //filter
  const [listTech, setListTech] = useState([]); //main
  const [selectedIds, setSelectedIds] = useState([]); //filter
  const [listCourseType, setListCourseType] = useState(undefined); //main
  const [statusCourseType, setStatusCourseType] = useState(null); //filter

  const [currentTeacher, setCurrentTeacher] = useState([]); //main
  const [selectedTeacherId, setSelectedTeacherId] = useState(null); //filter

  const [sortingCol, setSortingCol] = useState(undefined);
  const [CourseLevelId, setCourseLevelId] = useState(undefined); //main
  const [courseLevelChecked, setCourseLevelChecked] = useState(null); //filter

  const resetFilters = () => {
    setCurrentTeacher(undefined);
    setSelectedTeacherId(undefined);
    setCourseLevelId(undefined);
    setCourseLevelChecked(undefined);
    setListCourseType(undefined);
    setStatusCourseType(undefined);
    setCostDown(undefined);
    setCostUp(undefined);
    setPrice([1000, 10000000]);
    setListTech([]);
    setSelectedIds([]);
  };

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  console.log(listTech, "this list teach");

  const { data: DatacourseFilterDtos } = useCourses({
    SearchQuery: debouncedSearchQuery,
    CostDown: costDown,
    CostUp: costUp,
    RowsOfPage: itemsPerPage,
    PageNumber: currentPage + 1,
    ListTech: listTech,
    TeacherId: currentTeacher,
    SortingCol: sortingCol,
    CourseTypeId: listCourseType,
    courseLevelId: CourseLevelId,
  });

  const data = DatacourseFilterDtos?.courseFilterDtos;
  const Total = DatacourseFilterDtos?.totalCount;
  console.log(data, "CoursesPage");

  //Search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  // handle cost

  //Page Iniate

  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(Total / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setCurrentPage(event.selected);
    setItemOffset(newOffset);
  };

  //Filter in md

  const [showMenu, setShowContent] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowContent(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMenu]);

  const handleClick = () => {
    setShowContent(!showMenu);
  };

  const style =
    "w-[296px] h-[389px] flex flex-col bg-white dark:bg-gray-900 rounded-[24px] shadow-ّFirst-shadow text-[#263238] dark:text-white last:mb-5 ";

  const loaderStyle = "flex justify-center items-center mx-auto";
  return (
    <>
      {/* TODO */}
      <HereSectionCourses />
      <div className="mt-10 flex xl:w-[1280px]   container lg:justify-start   sm:mx-auto lg:gap-8  justify-center">
        <Filters
          showMenu={showMenu}
          handleClick={handleClick}
          setCostDown={setCostDown}
          setCostUp={setCostUp}
          data={data}
          setListTech={setListTech}
          listTech={listTech}
          setCurrentTeacher={setCurrentTeacher}
          setListCourseType={setListCourseType}
          menuRef={menuRef}
          setCourseLevelId={setCourseLevelId}
          setRest={setRest}
          rest={rest}
          //filters

          //1
          setSelectedIds={setSelectedIds}
          selectedIds={selectedIds}
          //2
          setPrice={setPrice}
          price={price}
          //3
          setStatusCourseType={setStatusCourseType}
          statusCourseType={statusCourseType}
          //4
          setCourseLevelChecked={setCourseLevelChecked}
          courseLevelChecked={courseLevelChecked}
          //5
          setSelectedTeacherId={setSelectedTeacherId}
          selectedTeacherId={selectedTeacherId}
          //delete filters
          resetFilters={resetFilters}
        />
        <div className="flex flex-col sm:items-start items-center sm:w-auto w-full sm:justify-start justify-center  ">
          {/* Top */}
          <SearchAndThemeCourses
            handleClick={handleClick}
            handleSearchChange={handleSearchChange}
            searchQuery={searchQuery}
            setSortingCol={setSortingCol}
          />
          <div className="xl:w-[952px] lg:w-[722px] md:w-full md:mr-0 lg:mr-3 sm:w-auto     min-h-[231px] mt-[32px] flex flex-wrap xl:gap-8 lg:gap-10 md:gap-x-12 sm:gap-x-[18px] gap-x-[5%]  gap-y-8 sm:mr-3  w-full lg:justify-start md:justify-center sm:justify-start justify-center ">
            {!currentItems ? (
              <CustomSpinner style={loaderStyle} color={"#2196F3"} />
            ) : currentItems.length === 0 ? (
              <p className="text-center text-gray-700 dark:text-gray-200 mx-auto mt-[150px]">
                داده‌ای یافت نشد
              </p>
            ) : (
              <>
                {currentItems?.map((course, index) => (
                  <Course
                    style={style}
                    key={index}
                    courseId={course?.courseId}
                    teacherName={course?.teacherName}
                    cost={course?.cost}
                    likeCount={course?.likeCount}
                    dissLikeCount={course?.dissLikeCount}
                    userIsLiked={course?.userIsLiked}
                    title={course?.title}
                    describe={course?.describe}
                    isUserFavorite={course?.userFavorite}
                    userLikeId={course?.userLikedId}
                    userIsDissLiked={course?.currentUserDissLike}
                    userFavoriteId={course?.userFavoriteId}
                    tumbImageAddress={course?.tumbImageAddress}
                    lastUpdate={course?.lastUpdate}
                  />
                ))}
              </>
            )}
          </div>
          {/* Pagination Controls */}
          <div className="flex w-full justify-center">
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
              className="flex gap-5 mt-[48px] justify-center items-center text-[#263238] dark:text-gray-300 flex-wrap sm:w-auto w-[90%] "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { CoursesPage };
