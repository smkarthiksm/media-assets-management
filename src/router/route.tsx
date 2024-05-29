import { createBrowserRouter } from "react-router-dom";
import LoginComponent from "../components/login/login";

export const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginComponent/>,
    },
  ]);