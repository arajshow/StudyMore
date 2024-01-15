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

const App = () => {
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
            <Route path="/dashboard/enrolled-courses" element={<Error />} />
          </Route>

        </Routes>
        
      </div>
    )
}

export default App;