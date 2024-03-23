import {
  Stack,
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { createUser, userActions, RootState } from "@/store";
import { useEffect } from "react";
import useIsMobile from "@/hooks/common/useIsMobile";

type FormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.user
  );
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {
    register,
    handleSubmit,
    watch,
    reset: resetForm,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (userData: FormValues) => {
    const { confirmPassword, ...data } = userData;
    dispatch(createUser({ ...data }));
  };

  useEffect(() => {
    resetForm();
    if (success) {
      navigate("/login");
      dispatch(userActions.reset());
    }
  }, [success]);

  return (
    <Box
      sx={{
        mt: isMobile ? 6 : 8,
        // mb: 2,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Signup
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1 }}
      >
        {/* Names*/}
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <TextField
            label="First Name"
            type="text"
            variant="outlined"
            {...register("firstName", {
              required: "Required",
            })}
            fullWidth
            error={!!errors.firstName}
            helperText={errors?.firstName?.message ?? " "}
          />

          <TextField
            label="Last Name"
            type="text"
            variant="outlined"
            {...register("lastName", {
              required: "Required",
            })}
            fullWidth
            error={!!errors.lastName}
            helperText={errors?.lastName?.message ?? " "}
          />
        </Stack>

        {/* Phone number field*/}
        <TextField
          label="Phone Number"
          type="number"
          variant="outlined"
          maxLength="10"
          {...register("phoneNumber", {
            required: "WhatsApp phone number is required",
            pattern: {
              value: /^[1-9]\d*(\d+)?$/i,
              message: "Please enter numbers only",
            },
            minLength: {
              value: 10,
              message: "Phone number should be at least 10 digits long",
            },
          })}
          sx={{ mb: 2 }}
          fullWidth
          error={!!errors.phoneNumber}
          helperText={errors?.phoneNumber?.message ?? " "}
        />

        {/* Password field*/}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be longer than 8 characters",
            },
          })}
          sx={{ mb: 2 }}
          fullWidth
          error={!!errors.password}
          helperText={errors?.password?.message ?? " "}
        />

        {/* Confirm Password field*/}
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          {...register("confirmPassword", {
            required: true,
            validate: (value: string) => {
              if (watch("password") !== value) {
                return "Passwords do no match";
              }
            },
          })}
          sx={{ mb: 1 }}
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message ?? " "}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          fullWidth
          sx={{ mb: 1 }}
        >
          {!loading ? (
            "Sign up"
          ) : (
            <CircularProgress color="inherit" size={20} />
          )}
        </Button>
        <Box>
          <Link
            href="/login"
            variant="body2"
            // onClick={() => navigate("/signup")}
          >
            Already have an account? Sign in
          </Link>
        </Box>
        {error && (
          <Typography color="error" variant="subtitle2">
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SignupForm;
