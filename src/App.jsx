import { Route, Routes, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// constants
import { ACCOUNT_TYPE } from './utils/constants'

// 404 page
import PageNotFound from './pages/PageNotFound'

// Navbar components
import Navbar from './components/common/Navbar'

import Home from './pages/Home'

// signup/login components
import OpenRoute from './components/core/auth/OpenRoute'
import Signup from './pages/Signup'
import Otp from './pages/Otp';
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

// to make routes protected
import PrivateRoute from './components/core/auth/PrivateRoute'

// common pages
import HerbDetails from './pages/HerbDetails'
import Herbs from './pages/Herbs'
import HeatMapWrapper from './components/core/herbInformation/HeatMapWrapper'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'

// dashboard pages
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/dashboard/MyProfile'
import Settings from './components/core/dashboard/Settings/Index'
import ManageHerbs from './components/core/dashboard/manageHerbs/ManageHerbs'
import AddHerb from './components/core/dashboard/addHerb/AddHerb'
import UserNotes from './components/core/dashboard/userNotes/Index'
import EditHerb from './components/core/dashboard/editHerb/Index'
import Bookmarks from './components/core/dashboard/Bookmarks'

// chatbot
import Chatbot from './components/common/Chatbot'

// Footer
import Footer from './components/common/Footer'


function App() {

  const {user} = useSelector((state) => state.profile);
  const {signupData} = useSelector((state) => state.auth);

  const location = useLocation();

  return (
    <div className='relative w-screen bg-[#F6F6F6] min-h-screen flex flex-col scroll-smooth'>

      {/* nav bar */}
      <Navbar/>

      {/* chat bot */}
      <div className='z-[999] fixed bottom-10 right-10'>
        <Chatbot/>
      </div>

      <Routes>
        {/* home */}
        <Route path='/' element={<Home/>}/>

        {/* only accessible if user not loggedin */}

        {/* signup */}
        <Route
          path='/signup'
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />

        {/* otp */}
        {
          // only allowed if signup form was filled 
          signupData && (
            <Route
              path="/signup/otp"
              element={
                <OpenRoute>
                  <Otp/>
                </OpenRoute>
              }
            />
          )
        }

        {/* login */}
        <Route
          path='/login'
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />

        {/* forgot password */}
        <Route
          path='/forgot-password'
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />

        {/* reset password */}
        <Route
          path='/reset-password/:token'
          element={
            <OpenRoute>
              <ResetPassword/>
            </OpenRoute>
          }
        />

        {/* normal routes */}

        {/* explore all herbs page */}
        <Route
          path='/herbs'
          element={<Herbs/>}
        />

        {/* one herb */}
        <Route
          path='/herbs/:herbId'
          element={<HerbDetails/>}
        />

        {/* herb heatmap */}
        <Route
          path='/herbs/heatmap/:herbId'
          element={<HeatMapWrapper/>}
        />

        {/* contact us */}
        <Route
          path='/contact'
          element={<ContactUs/>}
        />

        {/* about us */}
        <Route
          path='/about-us'
          element={<AboutUs/>}
        />

        {/* private routes */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }>
            <Route path='/dashboard/my-profile' element={<MyProfile/>}/>
            <Route path='/dashboard/settings' element={<Settings/>}/>

            {/* admin only routes for herbs */}
            {
              user?.accountType === ACCOUNT_TYPE.ADMIN && (
                <>
                  {/* all herbs for admin dashboard */}
                  <Route path='/dashboard/manage-herbs' element={<ManageHerbs/>}/>
                  {/* add herb */}
                  <Route path='/dashboard/add-herb' element={<AddHerb/>}/>
                  {/* edit herb */}
                  <Route path='/dashboard/manage-herbs/edit/:herbId' element={<EditHerb/>}/>
                </>
              )
            }

            {/* only normal users can have bookmarks route */}
            {
              user?.accountType === ACCOUNT_TYPE.USER && (
                <>
                  <Route path='/dashboard/bookmarks' element={<Bookmarks/>}/>
                  <Route path='/dashboard/notes' element={<UserNotes/>}/>
                </>
              )
            }

        </Route>

        {/* Page not found route */}
        <Route
          path='*'
          element={<PageNotFound/>}
        />

      </Routes>
      
      {/* footer */}
      {
        // don't display on home page and dashboard pages
        location.pathname !== '/' 
        && location.pathname.split('/').includes('dashboard') === false 
        && <Footer/>
      }
    </div>
  )
}

export default App
