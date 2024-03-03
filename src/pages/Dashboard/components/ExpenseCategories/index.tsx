import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PieChart from "@/components/PieChart";
import MonthSwitcher from "../MonthSwitcher";
import useCategoriesData from "@/hooks/dashboard/useCategoriesData";
import Card from "@/components/Card";

// interface ICategoriesProps {
//   categories: Array<string> | [];
//   data: Array<number> | [];
// }

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
}));

const ExpenseCategories = () => {
  const { data } = useCategoriesData();
  return (
    <Card>
      <HeaderContainer>
        <Typography variant="h5" display="inline">
          Top Categories
        </Typography>
        <MonthSwitcher />
      </HeaderContainer>
      <PieChart categories={data.categories} chartData={data.data} />
    </Card>
  );
};

export default ExpenseCategories;
