import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import { ForgetPassword } from "./pages/ForgetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import VerifyEmail from "./pages/VerifyEmail";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings";
import Error from "./pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import { useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catlog";


const App = () => {

  const {user} = useSelector( (state) => state.profile) 

    return (
      <div className="w-screen min-h-screen bg-richblue-900 flex flex-col font-inter">
        <Navbar />
        <Routes>
          <Route path="/" element = {<Home/>} />

          <Route path="/signup" element = {
            //openRoute ensures that pre-logged in used doesn't go to login/signup pages
            <OpenRoute> 
              <Signup/>
            </OpenRoute>
          } />

          <Route path="/login" element = {
            <OpenRoute>
              <Login/>
            </OpenRoute>
          } />

          <Route path="/forget-password" element = {
            <OpenRoute>
              <ForgetPassword/>
            </OpenRoute>
          } />

          <Route path="/update-password/:id" element = {
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          } />

          <Route path="/verify-email" element = {
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          } />

          <Route path="/about" element = {
            <About/>
          } />

          <Route path="/contact" element = {
            <Contact/>
          } />

          <Route path="/catalog/:catalogName" element= { <Catalog /> } />
          {/* <Route path="courses/:courseId" */}

          <Route element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
            {/* The following route implicitly matches any path starting with "/dashboard".
    So, when the URL is "/dashboard" or "/dashboard/some-other-path",
    the <Dashboard /> component will be rendered. */}
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            <Route path="/dashboard/settings" element={<Settings />} />

            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="/dashboard/cart" element={<Cart />} />
                  <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                </>
              )
            }

            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="/dashboard/add-course" element={<AddCourse />} />
                  <Route path="/dashboard/my-courses" element={<MyCourses />} />
                  <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
                </>
              )
            }
          </Route>

          <Route path="*" element={<Error />} />

        </Routes>
        
      </div>
    )
}

export default App;