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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "/donation",
    element: <DonationRequest />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/funding",
    element: <Funding />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <UserHome />,
        loader:()=>fetch(`http://localhost:5000/mydonation`)
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'content-management',
        element: <ContentManagement />
      },
      {
        path: 'content-management/add-blog',
        element: <AddBlog />
      },
      {
        path: 'all-user',
        element: <AllUser />,
        loader:()=>fetch(`http://localhost:5000/all-user`)
      },
      
      {
        path: 'my-donation-requests',
        element: <MyDonationREquest />,
        loader:()=>fetch(`http://localhost:5000/mydonation`)
      },
      {
        path: 'all-blood-donation-request',
        element: <AllBloodDonationRequest />,
        loader:()=>fetch(`http://localhost:5000/mydonation`)
      },
      {
        path: 'create-donation-request',
        element: <CreateDonationRequest />
      },
      {
        path: 'update-donation-request/:id',
        element: <UpdateDonation />,
      },
      {
        path: 'details-donation-request/:id',
        element: <DonationRequstDetails />,
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
