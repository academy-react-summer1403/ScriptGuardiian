import React, { useState } from "react";

import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { FilterTopics } from "./FilterTopics";
import { TimeRangeFilter } from "./TimeRangeFilter";
import { TeacherFilter } from "./TeacherFilter";
const Filters = () => {
  return (
    <>
      <div className="flex min-h-[779px] w-[296px] border rounded-[24px] bg-white dark:bg-gray-900 dark:border-gray-950 shadow-ّFirst-shadow flex-col items-center">
        {/* 1Com */}
        <div className="w-[272px] h-[48px] bg-[#ECEFF1] dark:bg-[#1C1C1C] rounded-[16px] mt-[12px] flex justify-between items-center">
          <div className="flex items-center mr-[16px] gap-[6px]">
            <span>
              {" "}
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.49998 0.75H13.5C14.4166 0.75 15.1666 1.5 15.1666 2.41667V4.25C15.1666 4.91667 14.75 5.75 14.3333 6.16667L10.75 9.33333C10.25 9.75 9.91665 10.5833 9.91665 11.25V14.8333C9.91665 15.3333 9.58331 16 9.16665 16.25L7.99998 17C6.91665 17.6667 5.41665 16.9167 5.41665 15.5833V11.1667C5.41665 10.5833 5.08331 9.83333 4.74998 9.41667L1.58331 6.08333C1.16665 5.66667 0.833313 4.91667 0.833313 4.41667V2.5C0.833313 1.5 1.58331 0.75 2.49998 0.75Z"
                  className="stroke-[#292D32] dark:stroke-white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p className="text-[#263238] dark:text-gray-400">فیلتر</p>
          </div>
          <div className="w-[32px] h-[32px] bg-[#F44336] hover:bg-[#D32F2F] dark:bg-[#B71C1C] dark:hover:bg-[#C62828] rounded-[12px] ml-[8px] flex justify-center items-center">
            <span>
              {" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 4.98356C14.725 4.70856 11.9333 4.56689 9.15 4.56689C7.5 4.56689 5.85 4.65023 4.2 4.81689L2.5 4.98356"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.08331 4.1415L7.26665 3.04984C7.39998 2.25817 7.49998 1.6665 8.90831 1.6665H11.0916C12.5 1.6665 12.6083 2.2915 12.7333 3.05817L12.9166 4.1415"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.7084 7.6167L15.1667 16.0084C15.075 17.3167 15 18.3334 12.675 18.3334H7.32502C5.00002 18.3334 4.92502 17.3167 4.83335 16.0084L4.29169 7.6167"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.60834 13.75H11.3833"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.91669 10.4165H12.0834"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* 2Com

        {/*  Accordion1 */}

        <CategoryFilter />

        {/* Accordion2 */}

        <PriceFilter />
        {/* Accordion3 */}

        <FilterTopics />

        {/* Accordion4 */}

        <TimeRangeFilter />
        {/* Accordion5 */}
        <TeacherFilter />
      </div>
    </>
  );
};

export { Filters };