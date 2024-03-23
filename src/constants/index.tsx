import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpenseIcon from "@mui/icons-material/FormatListBulleted";
import BudgetIcon from "@mui/icons-material/RequestQuote";
import LogoutIcon from "@mui/icons-material/Logout";

interface SideNavTypes {
  title: string;
  icon: any;
  value: string;
}

interface AppInstructionTypes {
  label: string;
  description: string;
}

export const SIDENAVOPTIONS: SideNavTypes[] = [
  { title: "Overview", value: "dashboard", icon: <DashboardIcon /> },
  { title: "Expenses", value: "expenses", icon: <ExpenseIcon /> },
  { title: "Budgets", value: "budgets", icon: <BudgetIcon /> },
  { title: "Logout", value: "", icon: <LogoutIcon /> },
];

export const APP_INSTRUCTIONS: AppInstructionTypes[] = [
  {
    label: "Create Your Account",
    description: "Sign up for our app with a few quick steps",
  },
  {
    label: "Get Your Dedicated Bot",
    description:
      "We'll send you a text message with a unique phone number for your expense tracking",
  },
  {
    label: "Start Tracking",
    description:
      "Simply message your expenses to that number and we'll handle the rest!",
  },
];
