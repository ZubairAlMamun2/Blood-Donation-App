import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../components/ErrorPage";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../components/Login";
import Register from "../components/Register";
import DonationRequest from "../components/DonationRequest";
import Blogs from "../components/Blogs";
import Funding from "../components/Funding";
import Dashboard from "../components/Dashboard";
import MyDonationREquest from "../components/MyDonationREquest";
import CreateDonationRequest from "../components/CreateDonationRequest";
import ProfilePage from "../components/UserProfile";
import UpdateDonation from "../components/UpdateDonation";
import DonationRequstDetails from "../components/DonationRequstDetails";
import AllBloodDonationRequest from "../components/AllBloodDonationRequest";
import AllUser from "../components/AllUser";
import ContentManagement from "../components/ContentManagement";
import AddBlog from "../components/AddBlog";
import UserHome from "../components/UserHome";
import SearchDonor from "../components/SearchDonor";
import PendingDonationRequest from "../components/PendingDonationRequest";
import PrivetRoute from "./PrivetRoute";
import SecureForvolAndAdmin from "./SecureForvolAndAdmin";
import SecureForAdmin from "./SecureForAdmin";
import BlogDetails from "../components/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/donation",
    element: <PendingDonationRequest />
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/blogdetails/:id",
    element: <BlogDetails />,
  },
  {
    path: "/funding",
    element: <PrivetRoute><Funding /></PrivetRoute>,
  },
  {
    path: "/searchdonor",
    element: <SearchDonor />,
  },
  {
    path: "/dashboard",
    element: <PrivetRoute><Dashboard /></PrivetRoute>,
  },
  {
    path: 'details-donation-request/:id',
    element: <PrivetRoute><DonationRequstDetails /></PrivetRoute>,
  },
  {
    path: "/auth",
    element:<AuthLayouts />,
    children:[
      {
          path: "/auth/login",
          element: <Login />, 
      },
      {
          path: "/auth/register",
          element: <Register />, 
      },
     
    ]
  },
  {
    path: "dashboard",
    element: <PrivetRoute><Dashboard /></PrivetRoute>,
    children: [
      {
        path: '',
        element: <UserHome />
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'content-management',
        element:<SecureForvolAndAdmin> <ContentManagement /></SecureForvolAndAdmin>
      },
      {
        path: 'content-management/add-blog',
        element: <AddBlog />
      },
      {
        path: 'all-user',
        element:<SecureForAdmin> <AllUser /></SecureForAdmin>
      },
      
      {
        path: 'my-donation-requests',
        element: <MyDonationREquest />
      },
      {
        path: 'all-blood-donation-request',
        element: <AllBloodDonationRequest />
      },
      {
        path: 'create-donation-request',
        element: <CreateDonationRequest />
      },
      {
        path: 'update-donation-request/:id',
        element: <UpdateDonation />,
      },

    ]
  },
  // {
  //   path: 'dashboard',
  //   element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
  //   children: [
  //     // normal user routes
  //     {
  //       path: 'userHome',
  //       element: <UserHome></UserHome>
  //     },
  //     {
  //       path: 'cart',
  //       element: <Cart></Cart>
  //     },
  //     {
  //       path: 'payment',
  //       element: <Payment></Payment>
  //     },
  //     {
  //       path: 'paymentHistory',
  //       element: <PaymentHistory></PaymentHistory>
  //     },

  //     // admin only routes
  //     {
  //       path: 'adminHome',
  //       element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
  //     },
  //     {
  //       path: 'addItems',
  //       element: <AdminRoute><AddItems></AddItems></AdminRoute>
  //     },
  //     {
  //       path: 'manageItems',
  //       element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
  //     },
  //     {
  //       path: 'updateItem/:id',
  //       element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
  //       loader: ({params}) => fetch(`https://bistro-boss-server-seven-sage.vercel.app/menu/${params.id}`)
  //     },
  //     {
  //       path: 'users',
  //       element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
  //     }

  //   ]
  // }
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
