import { useState } from "react";
import {
  List,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  ListItemButton,
  Collapse,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { truncateMessage } from "@/utils";
import useIsMobile from "@/hooks/common/useIsMobile";
import StatusCard from "@/components/StatusCard";

interface IExpenseItem {
  categoryName: string;
  textMessage: string;
  amount: number;
  createdAt: string;
}

interface IExpenseList {
  expenses: IExpenseItem[] | null;
  loading?: boolean;
  sx?: object;
  error?: boolean;
}

const StyledList = styled(List)(() => ({
  overflowY: "auto",
  maxHeight: "600px",
}));

const ExpenseList = ({ expenses, error, loading, sx }: IExpenseList) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { isMobile } = useIsMobile();
  const handleClick = (idx: number): void => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(idx)
        ? prevOpenItems.filter((id) => id !== idx)
        : [...prevOpenItems, idx]
    );
  };

  // Showing loader if data is still loading
  if (loading) {
    return <CircularProgress />;
  }

  // Showing error status card if any error in fetching data
  if (error) {
    return (
      <StatusCard
        primary="There was a problem while fetching data"
        type="error"
        primaryStyle={{ textAlign: "center" }}
        secondaryStyle={{ height: "105px" }}
      />
    );
  }

  // Showing no data status card if no data available
  if (
    !(error || loading) &&
    (expenses?.length === 0 || expenses === undefined)
  ) {
    return (
      <StatusCard
        primary="No data available for the selected period"
        type="info"
        primaryStyle={{ textAlign: "center" }}
        secondaryStyle={{ height: "105px" }}
      />
    );
  }

  return (
    <StyledList sx={{ ...sx }}>
      {expenses?.map(
        (
          {
            categoryName: category,
            textMessage: message,
            createdAt,
            amount,
          }: IExpenseItem,
          idx
        ) => (
          <div key={idx}>
            <ListItemButton onClick={() => handleClick(idx)} sx={{ pl: 0 }}>
              <ListItemAvatar>
                <Avatar>
                  <Typography variant="h6">
                    {category?.charAt(0).toUpperCase()}
                  </Typography>
                </Avatar>
              </ListItemAvatar>

              {/* Category tooltip and name */}
              <Tooltip
                title={
                  isMobile
                    ? category?.length > 10
                      ? category
                      : ""
                    : category?.length > 35
                    ? category
                    : ""
                }
              >
                <ListItemText
                  primaryTypographyProps={{
                    variant: "h6",
                  }}
                  primary={
                    isMobile
                      ? truncateMessage(category, 10)
                      : truncateMessage(category, 35)
                  }
                />
              </Tooltip>

              <Typography variant="h6">₹ {amount}</Typography>
            </ListItemButton>
            <Collapse
              in={openItems.includes(idx)}
              timeout="auto"
              unmountOnExit
              sx={{ px: 2 }}
            >
              <Box sx={{ display: "flex" }}>
                {/* Expense message tooltip and name */}
                <Tooltip
                  title={
                    isMobile
                      ? message?.length > 15
                        ? message
                        : ""
                      : message?.length > 35
                      ? message
                      : ""
                  }
                >
                  <ListItemText
                    secondaryTypographyProps={{
                      variant: "body1",
                    }}
                    secondary={
                      isMobile
                        ? truncateMessage(message, 15)
                        : truncateMessage(message, 35)
                    }
                    sx={{ ml: 5, textAlign: "left" }}
                  />
                </Tooltip>

                <ListItemText
                  secondaryTypographyProps={{
                    variant: "body1",
                  }}
                  secondary={createdAt}
                  sx={{ textAlign: "right" }}
                />
              </Box>
            </Collapse>
          </div>
        )
      )}
    </StyledList>
  );
};

export default ExpenseList;
