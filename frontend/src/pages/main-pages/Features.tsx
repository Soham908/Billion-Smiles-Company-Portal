import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InsightsIcon from "@mui/icons-material/Insights";
import { AttachMoney, Campaign, EmojiEvents, Loyalty, TrendingUp, WorkspacePremium } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const featuresData = [
  {
    icon: <VisibilityIcon fontSize="large" />,
    title: "Premium Campaign Visibility",
    description: "Enhance your campaign's visibility with priority placement across the platform.",
    cost: "₹100 per 1000 views",
    roi: "Best for increasing impressions and brand awareness",
    isSelected: false,
  },
  {
    icon: <InsightsIcon fontSize="large" />,
    title: "AI-Driven Recommendations",
    description: "Utilize AI to target the right audience for your campaigns.",
    cost: "₹500 per campaign",
    roi: "High ROI with increased conversions",
    isSelected: false,
  },
  {
    icon: <AttachMoney fontSize="large" />,
    title: "Exclusive Access to High-Impact Causes",
    description: "Get exclusive visibility for premium causes.",
    cost: "₹1000 per campaign",
    roi: "Great for targeting high-value audiences",
    isSelected: false,
  },
  {
    icon: <TrendingUp fontSize="large" />,
    title: "Detailed Analytics and Reports",
    description: "Access detailed analytics and reports to measure your campaign's success.",
    cost: "₹250 per report",
    roi: "Increases campaign effectiveness with actionable insights",
    isSelected: false,
  },
  {
    icon: <Loyalty fontSize="large" />,
    title: "Custom Reports and Analytics",
    description: "Get tailored reports and insights specific to your needs.",
    cost: "₹300 per report",
    roi: "Great for businesses looking for precise metrics",
    isSelected: false,
  },
  {
    icon: <Campaign fontSize="large" />,
    title: "Logo Popups and Visibility Marketing",
    description: "Showcase your brand with engaging popups and visibility strategies.",
    cost: "₹150 per 1000 impressions",
    roi: "Increases brand recall and engagement",
    isSelected: false,
  },
  {
    icon: <EmojiEvents fontSize="large" />,
    title: "Create Custom Premium Badges",
    description: "Design unique badges to reward users for campaign milestones.",
    cost: "₹200 per badge design",
    roi: "Boosts user participation and loyalty",
    isSelected: false,
  },
  {
    icon: <WorkspacePremium fontSize="large" />,
    title: "Badge for Milestone Achievements",
    description: "Award users with badges for achieving campaign milestones.",
    cost: "₹100 per milestone",
    roi: "Increases campaign completion rates",
    isSelected: false,
  },
];

const Features = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Application Features
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }} align="center" color="textSecondary" gutterBottom>
        Explore our features designed to help your company make an impact.
      </Typography>
      <Grid container spacing={4}>
        {featuresData.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3} sx={{ borderRadius: 4, height: "100%" }}>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={2}
                >
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 56,
                      height: 56,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                </Box>
                <Typography variant="h6" align="center" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                  gutterBottom
                >
                  {feature.description}
                </Typography>
                <Box mt={2}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    <strong>Cost:</strong> {feature.cost}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>ROI:</strong> {feature.roi}
                  </Typography>
                </Box>
                {/* <Box mt={3} textAlign="center">
                  <Button variant="contained" color="primary">
                    Learn More
                  </Button>
                </Box> */}
                <Link to="/create-campaign" style={{ fontSize: 13 }}>Use this feature</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
