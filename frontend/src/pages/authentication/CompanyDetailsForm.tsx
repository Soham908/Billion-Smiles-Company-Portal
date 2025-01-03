import { ChangeEvent, useState } from "react";
import { TextField, Button, Typography, Box, Grid, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ISignupInput } from "./Signup";
import { signupCompanyHandler } from "../../api-handlers/authenticationHandler";
import { useCompanyStore } from "../../store/companyDataStore";

export interface IAdditionalCompanyDetails extends ISignupInput {
  managerName: string;
  managerEmail: string;
  companyAddress: string;
  managerPhoneNumber: string;
}

const CompanyDetailsForm = () => {
  const location = useLocation()
  const { companyEmail, companyName, password } = location.state as ISignupInput
  const [formData, setFormData] = useState<IAdditionalCompanyDetails>({
    managerName: "Demo",
    managerEmail: "demo@tata.com",
    companyAddress: "Mumbai",
    managerPhoneNumber: "9876543210",
    companyEmail: companyEmail,
    companyName: companyName,
    password: password
  });
  const navigate = useNavigate()
  const { setCompanyData } = useCompanyStore()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await signupCompanyHandler(formData)
    console.log(response.companyData)
    if (response.success && response.companyData) {
      setCompanyData(response.companyData)
      navigate("/")
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9f9f9",
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 4,
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Company Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Manager Name"
              name="managerName"
              value={formData.managerName}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Manager's Email"
              name="managerEmail"
              value={formData.managerEmail}
              onChange={handleInputChange}
              fullWidth
              type="email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Company Address"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Manager Phone Number"
              name="managerPhoneNumber"
              value={formData.managerPhoneNumber}
              onChange={handleInputChange}
              fullWidth
              type="tel"
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary" fullWidth>
              Submit Details
            </Button>
          </Grid>
          <Typography sx={{ fontSize: 12, mt: 3 }}>
          ** industryType, website, registeration, company logo (url or file) details to be taken later
          </Typography>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CompanyDetailsForm;
