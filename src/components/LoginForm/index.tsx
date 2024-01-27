import { Stack, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useStore } from "react-redux";

type FormValues = {
  phoneNumber: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const state = useStore();

  const showState = (): void => {
    console.log("state", state.getState());
  };

  const onSubmit = (e: FormValues) => console.log(e);

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
          <Button variant="contained" type="submit" onClick={showState}>
            Login
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default LoginForm;
