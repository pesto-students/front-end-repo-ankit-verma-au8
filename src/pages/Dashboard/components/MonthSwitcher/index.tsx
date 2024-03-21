import { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getMonthYear, getDate } from "@/utils";

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

const MonthSwitcher = () => {
  const [date, setDate] = useState(getDate(1));

  const handlePrevClick = () => {
    if (date instanceof Date) {
      let newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      setDate(newDate);
    }
  };
  const handleNextClick = () => {
    if (date instanceof Date) {
      let newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
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
        variant="body1"
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
        onClick={handleNextClick}
      >
        <ChevronRight fontSize="small" />
      </IconButton>
    </Container>
  );
};

export default MonthSwitcher;
