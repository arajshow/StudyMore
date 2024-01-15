const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{

        // fetch data
        const {sectionName, courseId} = req.body;

        // validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message: "Misssing Properties",
            });
        }

        // create section in DB
        const newSection = await Section.create({sectionName});

        // update course with this new section
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                                courseId,
                                                                {
                                                                    $push: {
                                                                        courseContent:newSection._id,
                                                                    }
                                                                },
                                                                {new:true},
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // TODO:populate the section and sub-section of updated course

        // return response
        return res.status(200).json({
            success:true,
            message: "Section Created successfully",
            updatedCourseDetails,
        });


    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "unable to create section, try again",
        });
    }
}

exports.updateSection = async (req, res) => {

    try{

        // fetch data
        const {sectionName, sectionId} = await req.body;

        // validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message: "Misssing Properties",
            });
        }

        // update section in DB
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        // return response
        return res.status(200).json({
            success:true,
            message: "Section updated successfully",
            section
        });


    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "unable to update section, try again",
            error: error.message
        });
    }
}


exports.deleteSection = async (req, res) => {

    try{

        // fetch data
        const {sectionId, courseId} = await req.body;

        // validation
        if(!sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message: "Misssing Properties",
            });
        }

        // delete section in DB
        // const course = await Course.findByIdAndUpdate(courseId,
        //     {
        //         $pop:{
        //             courseContent : sectionId,
        //         }
        //     },
        //     {new: true});
        await Section.findByIdAndDelete(sectionId);


        // delete section refrence from course
        

        // return response
        return res.status(200).json({
            success:true,
            message: "Section deleted successfully",
            // course
        });


    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "unable to delete section, try again",
            error: error.message
        });
    }
}