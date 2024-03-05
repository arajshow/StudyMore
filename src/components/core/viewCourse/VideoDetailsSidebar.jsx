import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { IoIosArrowBack } from "react-icons/io";

const VideoDetailsSidebar = ({ setReviewModal }) => {
	const [activeSection, setActiveSection] = useState("");
	const [activeSubSection, setActiveSubSection] = useState("");
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { sectionId, subSectionId } = useParams();

	const {
		courseSectionData,
		courseEntireData,
		totalNoOfLectures,
		completedLectures,
	} = useSelector((state) => state.viewCourse);

	// console.log("data", completedLectures);

	useEffect(() => {
		(async () => {
			if (!courseSectionData.length) return;

			// const currentSectionIndx = courseSectionData.findIndex(
			//     (data) => data._id === sectionId
			// );

			// const currentSubSectionIndx = courseSectionData?.[
			//     currentSectionIndx
			// ]?.subSection.findIndex((data) => data._id === subSectionId);

			// const activeSubSectionId = courseSectionData[currentSectionIndx]?.subSection?.[
			//     currentSubSectionIndx
			// ]?._id;

			setActiveSection(sectionId);
			// setActiveSection(courseSectionData?.[currentSectionIndx]?._id);
			setActiveSubSection(subSectionId);
			// setActiveSubSection(activeSubSectionId);
		})();
	}, [courseEntireData, location.pathname, courseSectionData]);

	return (
		<>
			<div className="flex h-[calc(100vh -3.8rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
				{/* description */}
				<div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
					{/* back and review section */}
					<div className="flex w-full items-center justify-between">
						{/* back button */}
						<div
							onClick={() => setOpen(!open)}
							className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
							title="back"
						>
							<IoIosArrowBack size={30} />
						</div>

						{/* add review button */}
						<IconBtn
							text="Add Review"
							customClass={`ml-auto`}
							onclick={() => setReviewModal(true)}
						/>
					</div>

					{/* course name and lecture count */}
					<div className="flex flex-col">
						<p>{courseEntireData?.courseName}</p>
						<p className="text-sm font-semibold text-richblack-500">
							{completedLectures?.length} / {totalNoOfLectures}
						</p>
					</div>
				</div>

				{/* section area */}
				<div className="h-[calc(100vh - 5rem)] overflow-y-auto">
					{courseSectionData.map((sec, index) => (
						<div
							className="mt-2 cursor-pointer text-sm text-richblack-5"
							onClick={() => setActiveSection(sec._id)}
							key={index}
						>
							{/* section */}
							<div className="flex flex-col justify-between bg-richblack-600 px-5 py-4">
								{/* section name and up-down icon */}
								<div className="flex justify-between">
									<div className="w-[70%] font-semibold">
										{sec?.sectionName}
									</div>
									<div className="flex items-center ">
										<span className={`transition-all duration-500`}>
											{activeSection === sec?._id ? (
												<BsChevronDown />
											) : (
												<BsChevronUp />
											)}
										</span>
									</div>
								</div>

								{/* Sub Section */}
								{activeSection === sec?._id && (
									<div className="transition-[height] duration-500 ease-in-out">
										{sec.subSection.map((topic, i) => (
											<div
												className={`flex gap-3 px-5 py-2 transition-all duration-200 ${
													activeSubSection === topic._id
														? "bg-yellow-200 font-semibold text-richblack-800"
														: "hover:bg-richblack-900"
												}`}
												key={i}
												onClick={() => {
													navigate(
														`/view-course/${courseEntireData?._id}/section/${sec?._id}/sub-section/${topic?._id}`
													);
													setActiveSubSection(topic._id);
												}}
											>
												<input
													type="checkbox"
													checked={completedLectures.includes(topic?._id)}
													// onChange={}
												/>
												{topic.title}
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default VideoDetailsSidebar;
