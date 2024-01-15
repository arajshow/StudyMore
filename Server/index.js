const express = require("express");
const app = express();


// intenciate other module
const database = require("./config/database");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");



require("dotenv").config();
const port = process.env.PORT || 4000;

// import middleware and connect all configrations
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000"   //helps to allow frontrnd hosted here to fetch
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

// cloudinary connect
cloudinaryConnect();
database.connect();


// import routes by it's path
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const userRoutes = require("./routes/User");




// mount all routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);



// default route
app.get("/", (req, res) => {

    return res.json({
        success: true,
        message: "your server is up and running"
    })
});

// litsen the port
app.listen(port, () => {
    console.log(`server is live at localhost//:${port}`)
})