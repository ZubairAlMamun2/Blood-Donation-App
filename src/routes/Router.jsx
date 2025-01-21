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
import UserHome from "../components/UserHome";
import Profile from "../components/Profile";
import MyDonationREquest from "../components/MyDonationREquest";
import CreateDonationRequest from "../components/CreateDonationRequest";

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
        element: <UserHome />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      
      {
        path: 'my-donation-requests',
        element: <MyDonationREquest />
      },
      {
        path: 'create-donation-request',
        element: <CreateDonationRequest />
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
