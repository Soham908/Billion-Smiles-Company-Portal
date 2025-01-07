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
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "../../store/companyDataStore";
import { useEffect, useState } from "react";
import { fetchAllCompaniesCampaignsHandler } from "../../api-handlers/campaignHandler";
import { ICampaign } from "../../types/campaignInterface";
import { formatToINR } from "../../utils/formatToInr";

const ManageCampaigns = () => {
  const navigate = useNavigate()
  const { companyData } = useCompanyStore()
  const [campaignData, setCampaignData] = useState<ICampaign[]>()
  useEffect(() => {
    const fetchCampaignData = async () => {
      const response = await fetchAllCompaniesCampaignsHandler(companyData._id)
      setCampaignData(response.campaignsData?.reverse())
    }
    fetchCampaignData()
  }, [])

  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [causeFilter, setCauseFilter] = useState<string>("All");

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value as string);
  };

  const handleCauseChange = (event: SelectChangeEvent<string>) => {
    setCauseFilter(event.target.value as string);
  };

  const filteredCampaignData = campaignData?.filter((campaign) => {
    let matches = true;
  
    if (statusFilter !== "All" && campaign.campaignStatus !== statusFilter) {
      matches = false;
    }
  
    if (causeFilter !== "All" && campaign.category !== causeFilter) {
      matches = false;
    }
    
    return matches;
  });
  


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
          <Select labelId="status-label" defaultValue="All" 
              value={statusFilter}
              onChange={handleStatusChange}
          label="Status">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="cause-label">Cause</InputLabel>
          <Select labelId="cause-label" defaultValue="All" 
              value={causeFilter}
              onChange={handleCauseChange}
              label="Cause">
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
        {filteredCampaignData && filteredCampaignData.map((campaign) =>{ return (
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
                    Target: Rs. {formatToINR(campaign.targetAmount)}
                  </Typography>
                  <Typography variant="body2">
                    Raised: Rs. {formatToINR(campaign.amountRaised)}
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
