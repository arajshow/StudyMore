const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");



exports.createSubSection = async (req, res) => {

    try{

        // fetch data
        // const {title, timeDuration, description, } = await req.body;
        const {title, timeDuration, description, sectionId} = await req.body;
        // const {sectionId} =  await req.params;

        // fetch video
        const videoFile = await req.files.videoFile;

        // validation
        if(!title || !timeDuration || !description || !videoFile || !sectionId){
            return res.status(404).json({
                success:false,
                message: `describe all properties`,
            })
        }

        // upload video to cloud
        const videoFileDescription = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME);

        // create subsection in db
        const newSubSection = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: videoFileDescription.secure_url,
        });

        // update subsection in section
        const updatedSectionDetails = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push:{
                    subSection: newSubSection._id,
                }
            },
            {new:true}
        ).populate("subSection").exec();

        // return response
        return res.status(200).json({
            success:true,
            message: "SubSection Created successfully",
            data: updatedSectionDetails,
            newSubSection
        });


    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "unable to create subSection, try again",
        });
    }
}

// to update section
exports.updateSubSection = async (req, res) => {

    try{

        // fetch data
        const {title="", description="", subSectionId, sectionId} = await req.body;
        // const {sectionId} =  await req.params;

        

        // fetch video
        const videoFile = await req.files.videoFile;

        // validation
        if(!subSectionId){
            return res.status(404).json({
                success:false,
                message: `describe all properties`,
            })
        }

        const subSection = await SubSection.findById(subSectionId)

        // upload video to cloud
        const videoFileDescription = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME);
        

        // update subSection
        if (title !== undefined) {
        subSection.title = title
        }
  
        if (description !== undefined) {
            subSection.description = description
        }

        subSection.videoUrl = videoFileDescription.secure_url;
        subSection.timeDuration = `${videoFileDescription.duration}`
        await subSection.save();
        
        const updatedSection = await Section.findById(sectionId).populate("subSection")

        // return response
        return res.status(200).json({
            success:true,
            message: "SubSection updated successfully",
            data: updatedSection,
        });

    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "unable to update subSection, try again",
        });
    }
}


// to delete section
exports.deleteSubSection = async (req, res) => {
    try{

        // fetch data
        const {subSectionId, sectionId} = req.body;

        // delete subSection from section DB
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
            $pull: {
                subSection: subSectionId,
            },
            }
        )

        // delete data from DB
        await SubSection.findByIdAndDelete(subSectionId);

        if (!SubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found" 
            })
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        // return response
        return res.status(200).json({
            success:true,
            message: "SubSection deleted successfully",
            data: updatedSection
        });

    }
    catch(error){
        return res.status(400).json({
            success:false,
            message: "unable to update subSection, try again",
        });
    }
}