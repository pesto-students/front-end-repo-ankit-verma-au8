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
import ErrorIcon from "@mui/icons-material/Error";
import { useState } from "react";
import { truncateMessage } from "@/utils";
import useIsMobile from "@/hooks/common/useIsMobile";

interface IExpenseItem {
  category: string;
  message: string;
  expense: number;
  date: string;
}

interface IExpenseList {
  expenses: IExpenseItem[];
  loading?: boolean;
}

const ExpenseList = ({ expenses, loading }: IExpenseList) => {
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

  // Showing a message if an empty array is supplied as data
  if (expenses.length === 0) {
    return (
      <Box>
        <ErrorIcon color="info" fontSize="large" sx={{ fontSize: 60, mb: 1 }} />
        <Typography>No data available</Typography>
      </Box>
    );
  }

  return (
    <List sx={{}}>
      {expenses.map(
        ({ category, message, date, expense }: IExpenseItem, idx) => (
          <div key={idx}>
            <ListItemButton onClick={() => handleClick(idx)} sx={{ pl: 0 }}>
              <ListItemAvatar>
                <Avatar>{category.charAt(0).toUpperCase()}</Avatar>
              </ListItemAvatar>

              {/* Category tooltip and name */}
              <Tooltip
                title={
                  isMobile
                    ? category.length > 10
                      ? category
                      : ""
                    : category.length > 35
                    ? category
                    : ""
                }
              >
                <ListItemText
                  primary={
                    isMobile
                      ? truncateMessage(category, 10)
                      : truncateMessage(category, 35)
                  }
                />
              </Tooltip>

              <Typography>₹ {expense}</Typography>
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
                      ? message.length > 15
                        ? message
                        : ""
                      : message.length > 35
                      ? message
                      : ""
                  }
                >
                  <ListItemText
                    secondary={
                      isMobile
                        ? truncateMessage(message, 15)
                        : truncateMessage(message, 35)
                    }
                    sx={{ ml: 5, textAlign: "left" }}
                  />
                </Tooltip>

                <ListItemText secondary={date} sx={{ textAlign: "right" }} />
              </Box>
            </Collapse>
          </div>
        )
      )}
    </List>
  );
};

export default ExpenseList;
