import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import Chart from "@/components/Chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
// import "./App.css";

function App() {
  return (
    <>
      {/* <LoginForm /> */}
      {/* <SignupForm /> */}
      <Chart />
    </>
  );
}

export default App;
