import { TextField, Button, Typography, Link, Box, Stack } from "@mui/material";
import { useState } from "react";
import { loginCompanyManagerHandler } from "../../api-handlers/authenticationHandler";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "../../store/companyDataStore";

const LoginPage = () => {
  const [managerEmail, setManagerEmail] = useState<string>("demoasd@tata.com")
  const [password, setPassword] = useState<string>("pass")
  const [loginError, setLoginError] = useState<boolean>(false)
  const navigate = useNavigate()
  const { setCompanyData } = useCompanyStore()

  const handleLogin = async () => {
    const response = await loginCompanyManagerHandler({ managerEmail: managerEmail, password: password })
    console.log(response)
    if(response.success && response.companyData) {
      setCompanyData(response.companyData)
      navigate("/")
    }
    else setLoginError(true)
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
          Login
        </Typography>
        {
          loginError &&
            <Typography sx={{ my: 2 }}>
              Wrong credentials
            </Typography>
        }
        <Stack spacing={2}>
          <TextField
            label="Manager Email"
            type="email"
            fullWidth
            required
            variant="outlined"
            value={managerEmail}
            onChange={(event) => setManagerEmail(event.target.value)}
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
          <Button onClick={handleLogin} type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Stack>
        <Typography textAlign="center" variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link href="/signup" underline="hover">
            Singup
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
