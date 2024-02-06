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
} from "@mui/material";
import { useState } from "react";
import { truncateMessage } from "@/utils";

interface IExpenseItem {
  category: string;
  message: string;
  expense: number;
  date: string;
}

interface IExpenseList {
  expenses: IExpenseItem[];
}

const ExpenseList = ({ expenses }: IExpenseList) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const handleClick = (idx: number, date: string): void => {
    console.log("DATE", date);
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(idx)
        ? prevOpenItems.filter((id) => id !== idx)
        : [...prevOpenItems, idx]
    );
  };
  return (
    <List sx={{}}>
      {expenses.map(
        ({ category, message, date, expense }: IExpenseItem, idx) => (
          <div key={idx}>
            <ListItemButton
              onClick={() => handleClick(idx, date)}
              sx={{ pl: 0 }}
            >
              <ListItemAvatar>
                <Avatar>{category.charAt(0).toUpperCase()}</Avatar>
              </ListItemAvatar>

              <Tooltip title={category.length > 25 ? category : ""}>
                <ListItemText primary={truncateMessage(category, 25)} />
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
                <Tooltip title={message.length > 30 ? message : ""}>
                  <ListItemText
                    secondary={truncateMessage(message)}
                    sx={{ ml: 5 }}
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
