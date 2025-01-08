import { Paper, Typography, Divider, Button, Grid, Card, Avatar, CardContent } from "@mui/material"
import { useEffect, useState } from "react"
import { fetchActivityHandler } from "../api-handlers/recentActivitiesHandler"
import { useCompanyStore } from "../store/companyDataStore"
import { IActivity } from "../types/activitiesInterface"
import { useNavigate } from "react-router-dom"

const RecentActivity = () => {
    const { companyData } = useCompanyStore()
    const [recentActivities, setRecentActivities] = useState<IActivity[]>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetchActivityHandler(companyData._id)
            setRecentActivities(response.activitiesData)
            console.log(response.activitiesData);
        }
        fetchActivities()
    },[])

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
    <Typography variant="h5" sx={{ mt: 1, mb: 3, fontWeight: 600 }}>
      Recent Campaign Activity
    </Typography>
    
    <Grid container spacing={3}>
      {recentActivities &&
        recentActivities.map((activity, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Avatar or Icon for activity type */}
                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, alignSelf: 'flex-start' }}>
                  {/* You can add an icon or initial of activityType here */}
                </Avatar>

                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Activity Type: {activity.activityType}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Campaign Title: {activity.campaignTitle}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Message: {activity.message}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>

    <Divider sx={{ my: 3 }} />
    
    {/* View all activities button */}
    <Button 
      variant="text" 
      sx={{ display: 'block', mx: 'auto', fontWeight: 600, color: 'primary.main' }}
      onClick={() => navigate("/recent-activities")}
    >
      View All Activities
    </Button>
  </Paper>
  );
}

export default RecentActivity