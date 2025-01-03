import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "../../store/companyDataStore";

const ManageCampaigns = () => {
  // Dummy campaign data
  const navigate = useNavigate()
  const { companyData } = useCompanyStore()
  console.log(companyData)
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Campaigns
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <FormControl sx={{ minWidth: 150, mr: 2 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select labelId="status-label" defaultValue="All" label="Status">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="cause-label">Cause</InputLabel>
          <Select labelId="cause-label" defaultValue="All" label="Cause">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
            <MenuItem value="Environment">Environment</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Search Campaigns" variant="outlined" sx={{ flex: 1, ml: 2 }} />
        <Button onClick={() => navigate("/create-campaign")} variant="contained" color="primary" sx={{ ml: 2 }}>
          + Create Campaign
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Campaign List */}
      <Grid container spacing={2}>
        {companyData.campaigns.reverse().map((campaign) =>{ return (
          <Grid item xs={12} key={campaign._id}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={campaign.imageUrl}
                    alt={campaign.campaignTitle}
                    style={{ width: 50, height: 50, marginRight: 16 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{campaign.campaignTitle}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {campaign.campaignDescription}
                    </Typography>
                  </Box>
                  <Chip
                    label={campaign.campaignStatus}
                    color={
                      campaign.campaignStatus === "Ongoing"
                        ? "success"
                        : campaign.campaignStatus === "Completed"
                        ? "primary"
                        : "warning"
                    }
                  />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">
                    Target: Rs. {campaign.targetAmount.toString()}
                  </Typography>
                  <Typography variant="body2">
                    Raised: Rs. {campaign.amountRaised.toString()}
                  </Typography>
                  <Typography variant="body2">Progress: {campaign.progress}%</Typography>
                  <Typography variant="body2">
                    Manager: {campaign.campaignManager}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )})}
      </Grid>
    </Box>
  );
};

export default ManageCampaigns;
