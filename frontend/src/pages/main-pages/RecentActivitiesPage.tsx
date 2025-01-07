import { useEffect, useState } from 'react';
import { Paper, Typography, Divider, Button, Grid, Card, Avatar, Box, List, ListItem, Stack } from "@mui/material";
import { Campaign, Star, CheckCircle } from "@mui/icons-material";
import { useCompanyStore } from '../../store/companyDataStore';
import { IActivity } from '../../types/activitiesInterface';
import { fetchActivityHandler } from '../../api-handlers/recentActivitiesHandler';

// Helper function to get activity icons based on activity type
const getActivityIcon = (type: string) => {
  switch (type) {
    case 'Milestone':
      return <Star color="primary" />;
    case 'Campaign Created':
      return <Campaign color="secondary" />;
    case 'Supporter Joined':
      return <CheckCircle color="success" />;
    default:
      return <Campaign />;
  }
};

const RecentActivitiesPage = () => {
  const { companyData } = useCompanyStore();
  const [recentActivities, setRecentActivities] = useState<IActivity[] | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      // Call API handler to fetch activities by companyId
      const response = await fetchActivityHandler(companyData._id); 
      if (response.activitiesData) setRecentActivities(response.activitiesData);
    };
    fetchActivities();
  }, [companyData._id]);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
      <Typography variant="h5" sx={{ mt: 1, mb: 3, fontWeight: 600 }}>
        Recent Activities
      </Typography>

      <Grid container spacing={3}>
        {recentActivities && (
          <Grid item xs={12}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <List>
                {recentActivities.map((activity, index) => (
                  <Box key={activity._id}>
                    <ListItem sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      {/* Avatar with Activity Type Icon */}
                      <Avatar
                        sx={{
                          bgcolor: "primary.light",
                          width: 40,
                          height: 40,
                          mr: 2,
                        }}
                      >
                        {getActivityIcon(activity.activityType)}
                      </Avatar>

                      <Stack>
                        {/* Activity Type */}
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {activity.activityType}
                        </Typography>

                        {/* Campaign Title */}
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          Campaign Title: {activity.campaignTitle}
                        </Typography>

                        {/* Activity Message */}
                        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                          {activity.message}
                        </Typography>

                        {/* Timestamp */}
                        <Typography variant="caption" sx={{ color: "text.disabled", mt: 0.5 }}>
                          {new Date(activity.timestamp).toLocaleString()}
                        </Typography>
                      </Stack>
                    </ListItem>

                    {/* Divider between activities */}
                    {index < recentActivities.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* View all activities button */}
      {/* <Divider sx={{ my: 3 }} /> */}
      {/* <Button
        variant="text"
        sx={{ display: "block", mx: "auto", fontWeight: 600, color: "primary.main" }}
        onClick={() => {
          // Logic to navigate to full activity page (optional)
        }}
      >
        View All Activities
      </Button> */}
    </Paper>
  );
};

export default RecentActivitiesPage;
