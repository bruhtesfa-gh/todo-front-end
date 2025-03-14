"use client";
import { useState } from "react";
import { Box, Button, Link, TextField, Typography, Alert } from "@mui/material";
import NextLink from "next/link";
import { useRegisterMutation, useLoginMutation } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const [register, { isLoading: isRegistering, error: registerError }] =
    useRegisterMutation();
  const [login, { isLoading: isLoggingIn, error: loginError }] =
    useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await (isLogin ? login : register)({
        email: username,
        password: password,
      }).unwrap();
      dispatch(setCredentials(result));
      router.push("/todos"); // Redirect to todos page after successful auth
    } catch (err) {
      console.error("Failed to authenticate:", err);
    }
  };

  const error: any = registerError || loginError;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        my: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.paper",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        component="img"
        src="/todo-icon.png"
        alt="Todo Icon"
        sx={{ width: 48, height: 48, mb: 2 }}
      />
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, color: "text.primary" }}
      >
        TODO
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
          {("data" in error! ? error.data?.message : error.message) ||
            "Authentication failed"}
        </Alert>
      )}

      <TextField
        fullWidth
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            bgcolor: "background.default",
            "&:hover": {
              "& > fieldset": {
                borderColor: "primary.main",
              },
            },
          },
        }}
      />
      <TextField
        fullWidth
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            bgcolor: "background.default",
            "&:hover": {
              "& > fieldset": {
                borderColor: "primary.main",
              },
            },
          },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={isRegistering || isLoggingIn}
        sx={{
          mb: 2,
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        {isRegistering || isLoggingIn
          ? "Loading..."
          : isLogin
          ? "Login"
          : "Register"}
      </Button>
      <Link
        component="button"
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        sx={{
          color: "primary.main",
          "&:hover": {
            color: "primary.dark",
          },
        }}
      >
        {isLogin
          ? "Need an account? Register"
          : "Already have an account? Login"}
      </Link>
    </Box>
  );
};

export default Auth;
