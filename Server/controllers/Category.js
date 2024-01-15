const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCategory = async (req, res) => {
    try{

        // fetch data
        const {name, description} = req.body;

        // validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message: "All fields are required",
            })       
        }

        // create entry in DB
        const categoryDetails = await Category.create({
            name: name,
            description:description,
        });

        return res.status(500).json({
            success:true,
            message: "category created successfully",
        })

    }
    catch(error){
        console.log("error in category creation: ", error);
        return res.status(400).json({
            success:false,
            message: "category cretion failed, try again",
        }) 
    }
}

exports.showAllCategories = async (req, res) => {
    try{

        // fetch data
        const Allcategorys = await Category.find({}, {name:true, description:true});

        res.status(200).json({
            success:true,
            message:`all categorys returned successfully`,
            Allcategorys,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: message.error,
        }) 
    }
}

exports.categoryPageDetails = async (req, res) => {
    try{

        // get categoryId
        const {categoryId} = req.body;

        // get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
                                                                .populate("courses")
                                                                .exec();

        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message: "course not found for selected category",
            })             
        }

        // get course for different categories
        const differentCategories = await Category.find({_id: {$ne: categoryId}})
                                                    .populate("courses")
                                                    .exec();

        // get top 10 selling courses
        const getTopCourses = await Course.find({})
                                            .sort({studentsEnrolled: -1})  //-1 for "desc";  1 for "inc"
                                            .limit(10)
                                            .exec();

        // return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
                getTopCourses
            },
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message: message.error,
        }) 
    }
}