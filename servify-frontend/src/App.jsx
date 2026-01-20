import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import About from "./components/About";
import Contact from "./components/Contact";
import UserProfile from "./components/UserProfile";
import ServiceDetails from "./components/ServiceDetails";
import CategoryDetails from "./components/CategoryDetails";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import {
  EmployeeProtectedRoute,
  UserProtectedRoute,
  AuthenticatedRoute,
} from "./utils/ProtectedRoute";
import Employee from "./components/Employee";
import User from "./components/User";
import Unauthorized from "./components/Unauthorized";
import { useEffect, useState } from "react";
import useServiceCategory from "./hooks/useServiceCategory";
import useService from "./hooks/useService";
import PageNotFound from "./components/PageNotFound";
import LoadingScreen from "./components/LoadingScreen";
import EmployeeDashboard from "./components/EmployeeDashboard";
import TermsAndPrivacy from "./components/TermsAndPrivacy";
import TermsAndConditions from "./components/TermsAndConditions";
import OrderHistory from "./components/OrderHistory";
import EmployeeProfile from "./components/EmployeeProfile";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const appRouter = createBrowserRouter([
    {
      element: (
        <>
          <ScrollToTop />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/",
          element: <User />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              element: <AuthenticatedRoute />,
              children: [
                {
                  path: "/login",
                  element: <Login isEmployee={false} />,
                },
                {
                  path: "/signup",
                  element: <Signup isEmployee={false} />,
                },
              ],
            },
            {
              path: "/servicedetails",
              element: <ServiceDetails />,
            },
            {
              path: "/categorydetails",
              element: <CategoryDetails />,
            },
            {
              element: <UserProtectedRoute />,
              children: [
                {
                  path: "/cart",
                  element: <Cart />,
                },
                {
                  path: "/userprofile",
                  element: <UserProfile />,
                },
                {
                  path: "/orderhistory",
                  element: <OrderHistory />,
                },
              ],
            },
          ],
        },
        {
          path: "/employee",
          children: [
            {
              element: <AuthenticatedRoute />,
              children: [
                {
                  path: "login",
                  element: <Login isEmployee={true} />,
                },
                {
                  path: "signup",
                  element: <Signup isEmployee={true} />,
                },
              ],
            },
            {
              element: <EmployeeProtectedRoute />,
              children: [
                {
                  element: <Employee />,
                  children: [
                    {
                      path: "/employee/dashboard",
                      element: <EmployeeDashboard />,
                    },
                    {
                      path: "/employee/profile",
                      element: <EmployeeProfile />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: "/unauthorized",
          element: <Unauthorized />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
        {
          path: "/privacypolicy",
          element: <TermsAndPrivacy />,
        },
        {
          path: "/terms&conditions",
          element: <TermsAndConditions />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
  ]);

  useServiceCategory();
  useService();

  return (
    <div>
      <Toaster />
      <LoadingScreen isLoading={isLoading} />
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
