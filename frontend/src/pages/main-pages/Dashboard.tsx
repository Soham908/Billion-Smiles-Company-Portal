import { Box, Button, Typography, Grid, Paper, Card, CardContent, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReportIcon from '@mui/icons-material/Report';
import { useCompanyStore } from '../../store/companyDataStore';
import { formatToINR } from '../../utils/formatToInr';

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData } = useCompanyStore()
  const activeCampaigns = companyData.campaigns.length
  const totalSpendingAmount = companyData.campaigns.reduce((total, campaign) => {
    return total + Number(campaign.targetAmount);
  }, 0);
  const totalRaiseAmount = companyData.campaigns.reduce((total, campaign) => {
    return total + Number(campaign.amountRaised)
  }, 0);
  
  const completedCampaigns = companyData.campaigns.filter((campaign) => campaign.campaignStatus === 'Completed')

  return (
    <Box sx={{ p: 1 }}>
      {/* Welcome Section */}
      <Typography variant="h5" gutterBottom>
        Welcome Back, {companyData.managerName}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Manage your campaigns, view reports, and explore all available features.
      </Typography>


      {/* Campaign Overview */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Campaign Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Active Campaigns
              </Typography>
              <Typography variant="h5" fontSize={28}>{activeCampaigns}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Amount Raised
              </Typography>
              <Typography variant="h5" fontSize={28}>Rs. {formatToINR(totalRaiseAmount)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Spending Target
              </Typography>
              <Typography variant="h5" fontSize={28}>Rs. {formatToINR(totalSpendingAmount)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Completed Campaigns
              </Typography>
              <Typography variant="h5" fontSize={28}>{completedCampaigns.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      
      {/* Quick Actions Section */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/create-campaign')}
            sx={{ py: 2 }}
          >
            <AddBoxIcon sx={{ mr: 1 }} />
            New Campaign
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate('/features')}
            sx={{ py: 2 }}
          >
            <TrendingUpIcon sx={{ mr: 1 }} />
            Explore Features
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => navigate('/reports')}
            sx={{ py: 2 }}
          >
            <ReportIcon sx={{ mr: 1 }} />
            View Reports
          </Button>
        </Grid>
      </Grid>


      {/* Recent Activity */}
      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
      <Typography variant="h5" sx={{ mt: 1, mb: 2 }}>
        Recent Campaign Activity
      </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Milestone 2 reached for Campaign X!
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          $500 donated to Campaign Y.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          New campaign "Green Earth" created.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="textSecondary">
          View all activities
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
