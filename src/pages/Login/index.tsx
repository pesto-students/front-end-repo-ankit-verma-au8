import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Box,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { loginUser, RootState } from "@/store";
import useIsMobile from "@/hooks/common/useIsMobile";

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
  const { isMobile } = useIsMobile();
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

  const handleGuestLogin = () => {
    dispatch(
      loginUser({
        phoneNumber: import.meta.env.VITE_GUEST_CRENDENTIALS_LOGIN_ID,
        password: import.meta.env.VITE_GUEST_CRENDENTIALS_PASSWORD,
        staySignedIn: false,
        role: "user",
      })
    );
  };

  useEffect(() => {
    resetForm();
    if (success) {
      navigate("/dashboard");
    }
  }, [success]);

  return (
    <Box
      sx={{
        mt: isMobile ? 6 : 8,
        mb: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Sign in
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1 }}
      >
        <TextField
          label="Phone Number"
          type="number"
          variant="outlined"
          maxLength="10"
          {...register("phoneNumber", {
            required: "WhatsApp phone number is required",
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
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password should be longer than 6 characters",
            },
          })}
          fullWidth
          error={!!errors.password}
          helperText={errors?.password?.message ?? " "}
        />
        <FormControlLabel
          control={<Checkbox {...register("staySignedIn")} />}
          label="Stay Signed In"
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{ my: 1 }}
        >
          {!loading ? "Login" : <CircularProgress color="inherit" size={20} />}
        </Button>
        <Box>
          <Link href="/signup" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Box>
        {error && (
          <Typography color="error" variant="subtitle2">
            {error}
          </Typography>
        )}
      </Box>
      <Divider sx={{ width: "100%", alignItems: "center", margin: "20px 0" }}>
        <Typography color="text.main" variant="h6">
          OR
        </Typography>
      </Divider>
      <Button
        fullWidth
        variant="outlined"
        type="submit"
        sx={{ my: 1 }}
        onClick={handleGuestLogin}
      >
        Login as Guest
      </Button>
    </Box>
  );
};

export default Login;
