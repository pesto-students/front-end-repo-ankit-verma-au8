import dayjs from "dayjs";
import {
  Grid,
  Typography,
  Box,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@/components/Card";
import DatePicker from "@/components/DatePicker";
import { useForm, Controller } from "react-hook-form";
import { getDate } from "@/utils";

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
  // justifyContent: "space-between",
}));

const Expenses = () => {
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

  const onSubmit = (userData: any) => {
    console.log("VALUE FILTER", userData);
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
                Clear All
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
            <Typography color="text.main" variant="body1">
              Total Expenses(this month)
              <br /> ₹ 13123423
            </Typography>
          </Card>
        </GridBox>
      </Grid>
    </Grid>
  );
};

export default Expenses;
