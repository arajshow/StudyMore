import React, { useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValue,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updateRequirementList = requirementList;
    updateRequirementList.splice(index, 1);
    setRequirementList(updateRequirementList);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-richblack-100" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-richblack-700 text-richblack-100"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 hover:text-sm hover:scale-105"
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default RequirementField;
