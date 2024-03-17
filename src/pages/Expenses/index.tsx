import { useRef, useState } from "react";
import dayjs from "dayjs";
import {
  Grid,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Button,
  Divider,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@/components/Card";
import DatePicker from "@/components/DatePicker";
import ExpenseList from "@/components/ExpenseList";
import { useForm, Controller } from "react-hook-form";
import { getDate, truncateMessage } from "@/utils";
import useIsMobile from "@/hooks/common/useIsMobile";

const GridBox = styled(Box)(({ theme }) => ({
  // backgroundColor: "bisque",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DatesContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
}));

const SummaryBox = ({
  isMobile,
  values,
  isCurrency = false,
}: {
  isMobile: boolean;
  values: Array<any>;
  isCurrency?: boolean;
}) => {
  let summaryValue = isCurrency
    ? `₹ ${values[1].toLocaleString("en-IN")}`
    : values[1].toLocaleString("en-IN");
  return (
    <Box>
      {/* Summary type */}
      <Typography
        color="text.secondary"
        variant={isMobile ? "body2" : "h5"}
        display="inline"
        sx={{ mr: 1, fontWeight: 600 }}
      >
        {values[0]}:
      </Typography>

      {/* Tooltip for summary value */}
      <Tooltip
        title={
          isMobile
            ? summaryValue.toString().length > 6
              ? summaryValue
              : ""
            : values[1].toString().length > 10
            ? summaryValue
            : ""
        }
      >
        {/* Summary value */}
        <Typography
          color="text.main"
          variant={isMobile ? "h6" : "h5"}
          display="inline"
        >
          {isMobile
            ? truncateMessage(summaryValue, 11)
            : truncateMessage(summaryValue, 15)}
        </Typography>
      </Tooltip>
    </Box>
  );
};

const Expenses = () => {
  const [fromDate, setFromDate] = useState(getDate(1, true));
  const [toDate, setToDate] = useState(getDate(1, true, true));
  const { isMobile } = useIsMobile();
  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    reset: resetForm,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: 10,
      from: dayjs(getDate(1)),
      to: dayjs(getDate(1, false, true)),
    },
  });
  const expenseList = useRef([
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "31/1/24",
    },
    {
      category:
        "UtilityUtilityUtilityUtilityUtilityUtilityUtilityUtilityUtilityUtilityUtilityUtilityUtility",
      message:
        "Spent 2000 on floor repairSpent 2000 on floor repairSpent 2000 on floor repairSpent 2000 on floor repair",
      expense: 2000,
      date: "29/1/24",
    },
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "27/1/24",
    },
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "25/1/24",
    },
    {
      category: "Utility",
      message: "Spent 2000 on floor repair",
      expense: 2000,
      date: "23/1/24",
    },
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "21/1/24",
    },
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "19/1/24",
    },
    {
      category: "Utility",
      message: "Spent 2000 on floor repair",
      expense: 2000,
      date: "17/1/24",
    },
    {
      category: "Utility",
      message: "Spent 1000 on bills",
      expense: 1000,
      date: "15/1/24",
    },
    {
      category: "Utility",
      message: "Spent 2000 on floor repair",
      expense: 2000,
      date: "13/1/24",
    },
  ]);

  const onSubmit = (userData: any) => {
    const { from, to } = userData;
    setFromDate(from.format("DD/MM/YYYY"));
    setToDate(to.format("DD/MM/YYYY"));
  };

  return (
    <Grid container spacing={5} sx={{ p: 2 }}>
      {/* Search Expenses Box */}
      <Grid item xs={12} sm={5}>
        <GridBox>
          <Card sx={{ borderRadius: 2 }}>
            <Typography color="text.main" variant="h5" sx={{ mb: 3 }}>
              Search
            </Typography>

            {/* Category Dropdown */}
            <FormControl sx={{ minWidth: "100%", mb: 2 }}>
              <InputLabel id="category-dropdown">Category</InputLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="category-dropdown"
                    id="category-dropdown"
                    label="category"
                    sx={{ textAlign: "start" }}
                    {...field}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            {/* From and to date container */}
            <DatesContainer>
              <Controller
                name="from"
                control={control}
                render={({ field }) => {
                  return <DatePicker label="From" {...field} />;
                }}
              />
              <Controller
                name="to"
                control={control}
                render={({ field }) => <DatePicker label="To" {...field} />}
              />
            </DatesContainer>

            {/* Filter button container */}
            <ButtonContainer>
              <Button
                variant="outlined"
                onClick={() => resetForm({}, { keepDefaultValues: true })}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{ ml: 2 }}
                onClick={handleSubmit(onSubmit)}
              >
                Search
              </Button>
            </ButtonContainer>
          </Card>
        </GridBox>
      </Grid>

      <Grid item xs={12} sm={7}>
        <GridBox>
          <Card sx={{ borderRadius: 2 }}>
            <Typography color="text.main" variant="h5" sx={{ mb: 3 }}>
              {`${fromDate} - ${toDate}`}
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <SummaryBox isMobile={isMobile} values={["Transactions", 23]} />
              <SummaryBox
                isMobile={isMobile}
                values={["Total", 23000000000]}
                isCurrency={true}
              />
            </Box>
            <Divider />

            <ExpenseList
              // loading={true}
              expenses={expenseList.current}
              // expenses={[]}
            />
            {/* )} */}
          </Card>
        </GridBox>
      </Grid>
    </Grid>
  );
};

export default Expenses;
