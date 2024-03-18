/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Avatar, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchAllCategories } from "@/store/slices/budget";
import { RootState } from "@/store";

interface CategoryDropDownProps {
  readonly: boolean;
  value: "" | any;
  handleChange: (e: SelectChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error: boolean | undefined;
  errorText: string | false | undefined;
}

const CategoryDropDown: React.FunctionComponent<CategoryDropDownProps> = ({
  value,
  handleChange,
  handleBlur,
  error,
  errorText,
  readonly,
}) => {
  const {
    categories: { data },
  } = useSelector((state: RootState) => state.budget);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  React.useEffect(() => {
    if (data.length == 0) dispatch(fetchAllCategories());
  }, [dispatch, data]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Category"
          onChange={handleChange}
          onBlur={handleBlur}
          error={error}
          name="categoryId"
          readOnly={readonly}
        >
          {data.length != 0
            ? data.map((category) => (
                <MenuItem key={category.name} value={category.id}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{ mr: 1, bgcolor: red[900], width: 40, height: 40 }}
                    >
                      {category.name[0]}
                    </Avatar>
                    {category.name}
                  </Box>
                </MenuItem>
              ))
            : null}
        </Select>
        <Typography color="text.error" variant="subtitle1">
          {errorText && errorText}
        </Typography>
      </FormControl>
    </Box>
  );
};

export default CategoryDropDown;
