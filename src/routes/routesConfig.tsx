import RootLayout from "@/components/RootLayout";
import Home from "@/pages/Home";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      //   {
      //     path: "login",
      //     element: <Login />,
      //   },
      {
        path: "*",
        element: <>404</>,
      },
    ],
  },
];

export default routes;
