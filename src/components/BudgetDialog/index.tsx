/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CategoryDropDown from "../CategoryDropDown";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createBudget, updateBudget } from "@/api/features/budget";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface BudgetDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  id?: string;
  categoryId?: string;
  categoryName?: string;
  amount?: string;
}

const budgetSchema = Yup.object().shape({
  categoryId: Yup.number().required("Required"),
  amount: Yup.number().required("Required"),
});

const BudgetDialog: React.FunctionComponent<BudgetDialogProps> = ({
  open,
  setOpen,
  id,
  categoryId,
  amount,
}) => {
  const [createBudgetError, setBudgetError] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      categoryId: categoryId,
      amount: amount,
    },
    validationSchema: budgetSchema,
    onSubmit: async (values) => {
      try {
        const budgetData = {
          amount: Number(values.amount),
          categoryId: Number(values.categoryId),
        };
        if (!id) {
          await createBudget({ ...budgetData, reminders: true });
        } else {
          await updateBudget(
            {
              ...budgetData,
            },
            id
          );
        }
        handleClose();
      } catch (err: any) {
        setBudgetError(err?.response?.data?.message);
      }
    },
  });
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Add budget
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <CategoryDropDown
              value={formik.values.categoryId}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              errorText={formik.touched.amount && formik.errors.amount}
              readonly={id ? true : false}
            />
            <FormControl fullWidth sx={{ mt: 3, width: "400px" }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Monthly limit
              </InputLabel>
              <OutlinedInput
                name="amount"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Monthly limit"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
              />
              <Typography color="text.error" variant="subtitle1">
                {formik.touched.amount && formik.errors.amount}
              </Typography>
              <Typography color="text.error" variant="subtitle1">
                {createBudgetError && createBudgetError}
              </Typography>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button disabled={!formik.isValid} type="submit" autoFocus>
              Save
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default BudgetDialog;
