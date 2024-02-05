import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PieChart from "@/components/PieChart";
import MonthSwitcher from "../MonthSwitcher";

interface ICategoriesProps {
  categories: Array<string> | [];
  data: Array<number> | [];
}

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "bisque",
  ...theme.typography.body2,
  padding: `${theme.spacing(2)}}`,
  color: theme.palette.text.secondary,
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
}));

const ExpenseCategories = ({ categories, data }: ICategoriesProps) => {
  return (
    <Container>
      <HeaderContainer>
        <Typography display="inline">Top Categories</Typography>
        <MonthSwitcher />
      </HeaderContainer>
      <PieChart categories={categories} chartData={data} />
    </Container>
  );
};

export default ExpenseCategories;
