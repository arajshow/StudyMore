import React, { useState } from "react";
import { useSelector } from "react-redux";

const CourseReviewModal = ({ setReviewModel }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  return <div>CourseReviewModal</div>;
};

export default CourseReviewModal;
