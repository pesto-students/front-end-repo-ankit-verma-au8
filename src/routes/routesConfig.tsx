import RootLayout from "@/components/RootLayout";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "*",
        element: <>404</>,
      },
    ],
  },
  {
    path: "*",
    element: <>404</>,
  },
];

export default routes;
