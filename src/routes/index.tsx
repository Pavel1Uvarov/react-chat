import IsAuthUser from "@/helpers/IsAuthUser";
import RequireAuth from "@/helpers/RequireAuth";
import { ROUTES } from "@/constants/routes.ts";
import MainLayout from "@/layouts/MainLayout/MainLayout.tsx";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout.tsx";
import SignIn from "@/pages/Auth/SignIn/SignIn.tsx";
import SignUp from "@/pages/Auth/SignUp/SignUp.tsx";
import Home from "@/pages/Home/Home.tsx";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: (
      <RequireAuth>
        <MainLayout/>
      </RequireAuth>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: <Home/>,
      },
    ],
  },
  {
    path: ROUTES.AUTH,
    element: (
      <IsAuthUser>
        <AuthLayout/>
      </IsAuthUser>
    ),
    children: [
      {
        path: ROUTES.SIGN_IN,
        element: <SignIn/>,
      },
      {
        path: ROUTES.SIGN_UP,
        element: <SignUp/>,
      },
    ],
  },
];

export default routes;
