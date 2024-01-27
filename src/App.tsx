import LoginForm from "./components/LoginForm";
import { Provider } from "react-redux";
import store from "@/store";

function App() {
  return (
    <Provider store={store}>
      <>
        DEV
        <LoginForm />
      </>
    </Provider>
  );
}

export default App;
