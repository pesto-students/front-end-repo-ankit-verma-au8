import { useState } from "react";
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
  Stack,
  Pagination,
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
import useCategoriesData from "@/hooks/expenses/useCategoriesData";
import useExpenseListData from "@/hooks/common/useExpenseListData";

const GridBox = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DatesContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}));

const ButtonContainer = styled("div")(() => ({
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
    ? `₹ ${values[1]?.toLocaleString("en-IN")}`
    : values[1]?.toLocaleString("en-IN");
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
            ? summaryValue?.toString().length > 6
              ? summaryValue
              : ""
            : values[1]?.toString().length > 10
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
  const [currPagPage, setCurrPagPage] = useState(1);
  const { isMobile } = useIsMobile();
  const { data: categoriesList } = useCategoriesData();
  const { data: expenseData, error, loading, fetchData } = useExpenseListData();
  const {
    // register,
    control,
    handleSubmit,
    // watch,
    getValues,
    reset: resetForm,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      from: dayjs(getDate(1)),
      to: dayjs(getDate(1, false, true)),
    },
  });

  const onSubmit = (userData: any) => {
    const { from, to } = userData;
    const { category } = getValues();
    setFromDate(from.format("DD/MM/YYYY"));
    setToDate(to.format("DD/MM/YYYY"));
    setCurrPagPage(1);
    fetchData(
      1,
      from.format("MM/DD/YYYY"),
      to.format("MM/DD/YYYY"),
      category === "" ? null : category
    );
  };

  const handlePaginationPageChange = (newPage: number) => {
    const { from, to, category } = getValues();
    fetchData(
      newPage,
      from.format("MM/DD/YYYY"),
      to.format("MM/DD/YYYY"),
      category === "" ? null : category
    );
    setCurrPagPage(newPage);
  };

  return (
    <Grid container spacing={5} sx={{ pt: 2 }}>
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
                    {categoriesList?.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
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
          <Card sx={{ borderRadius: 2, minHeight: "105px" }}>
            <Typography color="text.main" variant="h5" sx={{ mb: 3 }}>
              {`${fromDate} - ${toDate}`}
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <SummaryBox
                isMobile={isMobile}
                values={["Transactions", expenseData?.totalCount]}
              />
              <SummaryBox
                isMobile={isMobile}
                values={["Total", 23000000000]}
                isCurrency={true}
              />
            </Box>
            <Divider />

            <ExpenseList
              loading={loading}
              expenses={expenseData?.data}
              error={error}
              // expenses={[]}
              sx={{ mb: 2 }}
            />
            {expenseData?.data && expenseData?.data?.length !== 0 && (
              <Stack spacing={2} sx={{ alignItems: "center" }}>
                <Pagination
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                  count={50}
                  page={currPagPage}
                  onChange={(_, newPage) => handlePaginationPageChange(newPage)}
                  siblingCount={isMobile ? 0 : 1}
                />
              </Stack>
            )}
          </Card>
        </GridBox>
      </Grid>
    </Grid>
  );
};

export default Expenses;
