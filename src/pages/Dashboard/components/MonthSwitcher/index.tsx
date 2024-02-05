import { useState } from "react";
import { IconButton, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getMonthYear } from "@/utils";

const Container = styled(Box)(({}) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid black",
  borderRadius: "5px",
}));

const DateContainer = styled(Box)(() => ({
  width: "100%",
}));

const MonthSwitcher = () => {
  const [date, setDate] = useState(() => {
    let tempDate = new Date();
    return new Date(tempDate.getFullYear(), tempDate.getMonth(), 1);
  });

  const handlePrevClick = () => {
    let newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(newDate);
  };
  const handleNextClick = () => {
    let newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(newDate);
  };

  return (
    <Container>
      <IconButton
        size="small"
        sx={{
          borderRadius: 1,
          alignSelf: "flex-start",
        }}
        onClick={handlePrevClick}
      >
        <ChevronLeft fontSize="small" />
      </IconButton>
      <DateContainer>{getMonthYear(date)}</DateContainer>
      <IconButton
        size="small"
        sx={{
          borderRadius: 1,
          alignSelf: "flex-end",
        }}
        onClick={handleNextClick}
      >
        <ChevronRight fontSize="small" />
      </IconButton>
    </Container>
  );
};

export default MonthSwitcher;
