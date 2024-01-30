import {
  Stack,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { loginUser, RootState } from "@/store";

type FormValues = {
  phoneNumber: string;
  password: string;
  staySignedIn: boolean;
};

const Login = () => {
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      password: "",
      staySignedIn: false,
    },
  });

  const onSubmit = (userData: FormValues) => {
    dispatch(loginUser({ ...userData, role: "user" }));
  };

  useEffect(() => {
    resetForm();
    if (success) {
      navigate("/dashboard");
    }
  }, [success]);

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <h1>Login Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack width={300} spacing={0.5}>
          <TextField
            label="Phone Number"
            type="number"
            variant="outlined"
            maxLength="10"
            size="small"
            {...register("phoneNumber", {
              required: "WhatsApp phone number is required",
              minLength: {
                value: 10,
                message: "Phone number should be at least 10 digits long",
              },
            })}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message ?? " "}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            size="small"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be longer than 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors?.password?.message ?? " "}
          />
          <FormControlLabel
            control={
              <Checkbox {...register("staySignedIn")} sx={{ pl: 0, ml: 0 }} />
            }
            label="Stay Signed In"
          />
          <Button variant="contained" type="submit" disabled={loading}>
            {!loading ? (
              "Login"
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

export default Login;
