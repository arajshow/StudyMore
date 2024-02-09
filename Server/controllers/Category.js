const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

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
        const Allcategorys = await Category.find({}, {name:true, description:true, courses:true});

        res.status(200).json({
            success:true,
            message:`all categorys returned successfully`,
            data: Allcategorys,
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
                                                                .populate({
                                                                    path: "courses",
                                                                    match: {status : "Published"},
                                                                    populate: "ratingAndReviews",
                                                                })
                                                                .exec();

        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message: "course not found for selected category",
            })             
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(404).json({
            success: false,
            message: "No courses found for the selected category.",
            })
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId }, //querie to finad all where _id is $ne (not_equal to ) categoryId
        })

        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
            ._id
        )
        .populate({
            path: "courses",
            match: { status: "Published" },
        })
        .exec()


      // Get top-selling courses across all categories
        const allCategories = await Category.find()
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate: {
                path: "instructor",
            },
        })
        .exec()

        // top 10 selling courses
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)

        // return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Internal server error",
            error:  error.message,
        }) 
    }
}