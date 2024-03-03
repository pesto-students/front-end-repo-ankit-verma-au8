import { Stack, TextField, Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { createUser, userActions, RootState } from "@/store";
import { useEffect } from "react";

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
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Signup Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack width={300} spacing={0.5}>
          {/* Names*/}
          <Stack spacing={2} direction="row">
            <TextField
              label="First Name"
              type="text"
              variant="outlined"
              size="small"
              {...register("firstName", {
                required: "Required",
              })}
              error={!!errors.firstName}
              helperText={errors?.firstName?.message ?? " "}
            />

            <TextField
              label="Last Name"
              type="text"
              variant="outlined"
              size="small"
              {...register("lastName", {
                required: "Required",
              })}
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
            size="small"
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
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message ?? " "}
          />

          {/* Password field*/}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            size="small"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be longer than 8 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors?.password?.message ?? " "}
          />

          {/* Confirm Password field*/}
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            size="small"
            {...register("confirmPassword", {
              required: true,
              validate: (value: string) => {
                if (watch("password") !== value) {
                  return "Passwords do no match";
                }
              },
            })}
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message ?? " "}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            {!loading ? (
              "Sign up"
            ) : (
              <CircularProgress color="inherit" size={20} />
            )}
          </Button>
          {error && <div>{error}</div>}
        </Stack>
      </form>
    </div>
  );
};

export default SignupForm;
