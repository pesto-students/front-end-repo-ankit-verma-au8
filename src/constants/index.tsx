import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpenseIcon from "@mui/icons-material/FormatListBulleted";
import BudgetIcon from "@mui/icons-material/RequestQuote";
import LogoutIcon from "@mui/icons-material/Logout";

interface SideNavTypes {
  title: string;
  icon: any;
  value: string;
}

export const SIDENAVOPTIONS: SideNavTypes[] = [
  { title: "Overview", value: "dashboard", icon: <DashboardIcon /> },
  { title: "Expenses", value: "expenses", icon: <ExpenseIcon /> },
  { title: "Budgets", value: "budgets", icon: <BudgetIcon /> },
  { title: "Logout", value: "", icon: <LogoutIcon /> },
];
