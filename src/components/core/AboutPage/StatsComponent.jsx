import React from "react";
import { Stats } from "../../../data/stats";

const StatsComponent = () => {
  return (
    <section className=" bg-richblack-700">
      <div className=" flex flex-col w-11/12 max-w-maxContent mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {Stats.map((data, index) => (
            <div key={index} className="flex flex-col py-14">
              <h1 className=" text-richblack-5 text-2xl font-bold">
                {data.count}
              </h1>
              <h2 className=" text-richblack-500 text-[16px] font-semibold">
                {data.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsComponent;
