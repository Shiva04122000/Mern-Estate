import { createBrowserRouter } from "react-router-dom";
import PreLoginLayout from "./layout/PreLogin";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

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
