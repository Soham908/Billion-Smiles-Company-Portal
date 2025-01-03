import { TextField, Button, Typography, Link, Box, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ISignupInput {
  companyName: string,
  companyEmail: string,
  password: string
}

const SignupPage = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState<string>("Tata motors")
  const [companyEmail, setCompanyEmail] = useState<string>("tata5@gmail.com")
  const [password, setPassword] = useState<string>("pass")

  const handleSignup = async () => {
    const data = { companyName, companyEmail, password }    
    navigate("/company-details", {state: data})
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          border: "1px solid #ddd",
          borderRadius: "8px",
          bgcolor: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Signup
        </Typography>
        <Typography sx={{ fontSize: 15, mb: 2 }}>
          The companies official details should be filled in
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Company name"
            type="text"
            fullWidth
            required
            variant="outlined"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />
          <TextField
            label="Company email"
            type="email"
            fullWidth
            required
            variant="outlined"
            value={companyEmail}
            onChange={(event) => setCompanyEmail(event.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button onClick={handleSignup} type="submit" variant="contained" color="primary" fullWidth>
            Next {">"}
          </Button>
        </Stack>
        <Typography textAlign="center" variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupPage;
