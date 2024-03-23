import RootLayout from "@/components/RootLayout";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import Dashboard from "@/pages/Dashboard";
import Expenses from "@/pages/Expenses";
import Budget from "@/pages/Budget";
import LandingPage from "@/components/LandingPage";
import { Navigate } from "react-router";

const routes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "login",
    element: <LandingPage />,
  },
  {
    path: "signup",
    element: <LandingPage />,
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
            path: "expenses",
            element: <Expenses />,
          },
          {
            path: "budgets",
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
