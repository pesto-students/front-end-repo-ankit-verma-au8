import {
  Avatar,
  Box,
  FormControlLabel,
  IconButton,
  Snackbar,
  Switch,
  Typography,
  alpha,
} from "@mui/material";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { FC, useState } from "react";
import { updateBudget } from "@/api/features/budget";
import BudgetDialog from "../BudgetDialog";
import BorderLinearProgress from "@/components/BorderLinearProgress";
import { getPercentageColor } from "@/utils";
import useMediaQuery from "@mui/material/useMediaQuery";

const RedSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[800],
    "&:hover": {
      backgroundColor: alpha(green[800], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[800],
  },
}));

interface BudgetCardProps {
  id: string;
  categoryName: string;
  categoryId?: string;
  amount: string;
  startDate: string;
  endDate: string;
  totalExpense: string;
  reminders: boolean;
}

const BudgetCard: FC<BudgetCardProps> = ({
  id,
  categoryName,
  amount,
  startDate,
  endDate,
  totalExpense,
  reminders,
  categoryId,
}) => {
  const expensePercentage = (Number(totalExpense) / Number(amount)) * 100;
  const [remindersState, setRemindersState] = useState(reminders);
  const small = useMediaQuery("(max-width:650px)");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleChangeReminder = async () => {
    try {
      const updatedVal: boolean = !remindersState;
      setRemindersState(updatedVal);
      await updateBudget({ reminders: updatedVal }, id);
      setErrorMessage(`Reminders updated for ${categoryName} budget`);
    } catch (err) {
      setErrorMessage("Error while updating budget. Pls try again.");
      setRemindersState((val) => !val);
    }
  };
  const cardWidth = small ? "100%" : "30%";
  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <Card
      sx={{
        width: cardWidth,
        height: "200px",
        padding: "15px",
        marginBottom: "15px",
      }}
    >
      <BudgetDialog
        id={id}
        categoryId={categoryId}
        amount={amount}
        open={open}
        setOpen={setOpen}
      />
      <Typography color="text.main" variant="h5" sx={{ textAlign: "center" }}>
        {categoryName}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
        <Avatar sx={{ bgcolor: red[900], width: 50, height: 50 }}>
          {categoryName[0]}
        </Avatar>
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.main" variant="h6">
              Rs.{totalExpense}
            </Typography>
            <Typography color="text.main" variant="h6">
              Rs.{amount}
            </Typography>
          </Box>
          <Box sx={{ padding: "2px 0" }}>
            <BorderLinearProgress
              variant="determinate"
              value={expensePercentage > 100 ? 100 : expensePercentage}
              customcolor={getPercentageColor(
                Number(totalExpense),
                Number(amount)
              )}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color="text.main" variant="h6">
              {new Date(startDate).toLocaleDateString()}
            </Typography>
            <Typography color="text.main" variant="h6">
              {new Date(endDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography sx={{ marginTop: "12px" }} color="text.main" variant="h6">
        Residue amount: Rs.{Number(amount) - Number(totalExpense)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
        }}
      >
        <FormControlLabel
          control={
            <RedSwitch
              onChange={handleChangeReminder}
              checked={remindersState}
            />
          }
          label="Whatsapp reminders"
        />
        <Box>
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
            aria-label="update"
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={5000}
        onClose={handleClose}
        message={errorMessage}
      />
    </Card>
  );
};

export default BudgetCard;
