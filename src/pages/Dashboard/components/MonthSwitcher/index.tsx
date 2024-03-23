import { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getMonthYear, getDate } from "@/utils";

interface MonthSwitcherProps {
  updateChartData: (month: number, year: number) => void;
}

const Container = styled(Box)(({}) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid black",
  borderRadius: "5px",
}));

// const DateContainer = styled(Box)(() => ({
//   width: "100%",
//   textAlign: "center",
// }));

const MonthSwitcher = ({ updateChartData }: MonthSwitcherProps) => {
  const [date, setDate] = useState(getDate(1));

  const handlePrevClick = () => {
    if (date instanceof Date) {
      let newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      updateChartData(newDate.getMonth() + 1, newDate.getFullYear());
      setDate(newDate);
    }
  };
  const handleNextClick = () => {
    if (date instanceof Date) {
      let newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      updateChartData(newDate.getMonth() + 1, newDate.getFullYear());
      setDate(newDate);
    }
  };

  return (
    <Container>
      <IconButton
        size="small"
        sx={{
          borderRadius: 1,
        }}
        onClick={handlePrevClick}
      >
        <ChevronLeft fontSize="small" />
      </IconButton>
      <Typography
        variant="h6"
        display="inline"
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        {getMonthYear(date as Date)}
      </Typography>
      <IconButton
        size="small"
        sx={{
          borderRadius: 1,
        }}
        disabled={
          date instanceof Date && date.getMonth() === new Date().getMonth()
        }
        onClick={handleNextClick}
      >
        <ChevronRight fontSize="small" />
      </IconButton>
    </Container>
  );
};

export default MonthSwitcher;
