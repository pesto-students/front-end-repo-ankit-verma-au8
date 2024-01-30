import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "@/routes/routesConfig";
import { Provider } from "react-redux";
import store from "@/store";

const router = createBrowserRouter(routes);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
