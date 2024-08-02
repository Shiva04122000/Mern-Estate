import { createBrowserRouter } from "react-router-dom";
import PreLoginLayout from "./layout/PreLogin";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import ProtectedRoute from "./services/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <PreLoginLayout />,
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <About />,
        path: "/about",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Profile />,
            path: "/profile",
          },
          {
            element: <CreateListing />,
            path: "/create-listing",
          },
        ],
      },
      {
        element: <SignUp />,
        path: "/sign-up",
      },
      {
        element: <SignIn />,
        path: "/sign-in",
      },
    ],
  },
]);

export default router;
