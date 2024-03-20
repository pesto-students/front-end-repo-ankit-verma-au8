import RootLayout from "@/components/RootLayout";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Budget from "@/pages/Budget";

const routes = [
  {
    path: "/",
    element: <Login />,
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
          {
            path: "budget",
            element: <Budget />,
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
