import { useForm, SubmitHandler } from "react-hook-form";
import { Box, TextField, Button, CssBaseline } from "@mui/material";
import { useSignUpMutation } from "../redux/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const textFieldStyles = {
  width: "100%"
};

function RegistrationPage() {
  const [signUp, { isError, isLoading, isSuccess }] = useSignUpMutation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => signUp(data);

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <div style={{ width: "100%", height: "100vh", border: "1px solid green" }}>
      <CssBaseline />
      <Box
        component={"form"}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          margin: "0 auto",
          width: "40%",
          height: "80%",
          border: "1px solid red"
        }}
      >
        <Box
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <TextField
            sx={textFieldStyles}
            required
            label="Name"
            placeholder="e.g. Mark Hamil"
            {...register("name")}
          />
          <TextField
            sx={textFieldStyles}
            required
            label="Email"
            type="email"
            placeholder="e.g. email.example.com"
            {...register("email")}
          />
          <TextField
            sx={textFieldStyles}
            required
            label="Password"
            type="password"
            {...register("password")}
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default RegistrationPage;
