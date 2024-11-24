import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTechnologies } from "../../../core/services/api/handelFilters/CourseFilter";
const CategoryFilter = ({ setListTech }) => {
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const { data: Technologies } = useTechnologies();
  const [selectedIds, setSelectedIds] = useState([]);
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => {
      const updatedIds = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      setListTech(updatedIds);
      return updatedIds;
    });
  };

  return (
    <div className="w-full min-h-[25px] mt-[20px]  ">
      <div className="border-b dark:border-b-gray-950 text-[#263238] dark:text-gray-200 pb-2 flex flex-col items-center">
        <div className="xl:w-[248px] w-10/12  ">
          {" "}
          <button
            onClick={() => setIsOpenFirst(!isOpenFirst)}
            className="flex justify-between items-center w-full text-left focus:outline-none"
          >
            <span className="">تکنولوژی ها</span>
            <span className="ease-in-out ">
              {isOpenFirst ? <FaChevronDown /> : <FaChevronUp />}
            </span>
          </button>
        </div>
        {isOpenFirst && (
          <div className="flex flex-col xl:w-[248px] w-10/12">
            <div class="flex items-center mb-4  flex-wrap gap-x-2 gap-y-3 mt-5">
              {Technologies &&
                Technologies.map((item, index) => {
                  return (
                    <>
                      <div className="gap-x-2 flex">
                        <label
                          for={`default-checkbox-${item?.id}`}
                          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {item.techName}
                        </label>
                        <input
                          id={`default-checkbox-${item?.id}`}
                          type="checkbox"
                          value={item?.id}
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          key={index}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { CategoryFilter };
