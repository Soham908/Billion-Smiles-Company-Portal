import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ICampaign } from "../../types/campaignInterface";
import { createCampaignHandler } from "../../api-handlers/campaignHandler";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "../../store/companyDataStore";
import { featuresData } from "../main-pages/Features";

const causesDummyData = [
  { id: "1", title: "Environmental Cleanup", location: "Mumbai", ngo: "EcoCare" },
  { id: "2", title: "Health Awareness Drive", location: "Andheri", ngo: "HealthFirst" },
  { id: "3", title: "Educational Campaign", location: "Maharashtra", ngo: "Learn&Groww" },
  { id: "4", title: "Fighting Hunger", location: "Mumbai", ngo: "FeedIndia" },
];

const CreateCampaign = () => {
  const [imageFile, setImageFile] = useState<File>()
  const [disableSumbitBtn, setDisableSumbitBtn] = useState<boolean>(true)
  const navigate = useNavigate()
  const { companyData, setCompanyData } = useCompanyStore()
  const { managerName, companyName, _id, managerEmail, companyAddress } = companyData
  const [campaignData, setCampaignData] = useState<ICampaign>({
    campaignTitle: "",
    causeName: "",
    startDate: "",
    endDate: "",
    campaignDescription: "desc",
    hashtags: [""],
    targetAmount: 5000,
    imageUrl: "",
    campaignManager: managerName,
    companyName: companyName,
    companyRef: _id,
    contactEmail: managerEmail,
    location: companyAddress, // this will come from the ngo side
    selectedFeatures: [],
    amountRaised: 0, campaignCause: "", campaignStatus: "Ongoing",ngoName: "",ngoReference: "",progress: 0, targetLikes: 0
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCampaignData({ ...campaignData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      setCampaignData({ ...campaignData, imageUrl: e.target.files[0].name });
      setImageFile(e.target.files[0])
      setDisableSumbitBtn(false)
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableSumbitBtn(true)
    console.log(campaignData);
    if(imageFile) {
      const response = await createCampaignHandler(imageFile, campaignData)
      if(response.success && response.companyData) {
        setCompanyData(response.companyData)
        console.log(response.companyData)
        navigate("/manage-campaigns", { replace: true })
      }
    }
    setDisableSumbitBtn(false)
  };

  const handleFeatureChange = (feature: string) => {
    const updatedFeatures = campaignData.selectedFeatures.includes(feature)
      ? campaignData.selectedFeatures.filter((f) => f !== feature)
      : [...campaignData.selectedFeatures, feature];
    const targetLikes = campaignData.targetAmount / 10000
    setCampaignData({ ...campaignData, selectedFeatures: updatedFeatures, targetLikes: targetLikes });
  };

  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Create a New Campaign
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }} elevation={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Campaign Title */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Campaign Title"
                variant="outlined"
                fullWidth
                name="campaignTitle"
                value={campaignData.campaignTitle}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Campaign Cause */}
            <Grid item xs={12} md={6}>
              <TextField
                label="causeName"
                select
                variant="outlined"
                fullWidth
                name="causeName"
                value={campaignData.causeName}
                onChange={handleInputChange}
                required
              >
                {causesDummyData.map((cause) => (
                  <MenuItem key={cause.id} value={cause.id}>
                    {cause.title} - {cause.ngo}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} md={6}>
              <Stack>
                <Typography variant="subtitle1">Start Date</Typography>
                <input
                  type="date"
                  name="startDate"
                  value={campaignData.startDate}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  required
                />
              </Stack>
            </Grid>

            {/* End Date */}
            <Grid item xs={12} md={6}>
              <Stack>
                <Typography variant="subtitle1">End Date</Typography>
                <input
                  type="date"
                  name="endDate"
                  value={campaignData.endDate}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  required
                />
              </Stack>
            </Grid>

            {/* Target Amount */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Target Amount (Rs.)"
                variant="outlined"
                fullWidth
                name="targetAmount"
                type="number"
                value={campaignData.targetAmount}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Hashtags */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Hashtags (Comma Separated)"
                variant="outlined"
                fullWidth
                name="hashtags"
                value={campaignData.hashtags}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Campaign Description */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Campaign Description"
                variant="outlined"
                fullWidth
                name="campaignDescription"
                multiline
                rows={9}
                value={campaignData.campaignDescription}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* picking the features, checkbox */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Select Features for Your Campaign
              </Typography>
              {featuresData.slice(0, 5).map((feature) => (
                <FormControlLabel
                  key={feature.title}
                  control={
                    <Checkbox
                      checked={campaignData.selectedFeatures.includes(feature.title)}
                      onChange={() => handleFeatureChange(feature.title)}
                    />
                  }
                  label={
                    <Box sx={{ mr:3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {feature.title}
                      </Typography>
                      {/* <Typography variant="body2" color="textSecondary" sx={{ flex: 1, textAlign: 'right' }}>
                        {feature.description}
                      </Typography> */}
                    </Box>
                  }
                />
              ))}
            </Grid>


            {/* Upload Image */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography>Upload Campaign Image:</Typography>
                <Button variant="contained" component="label">
                  Upload File
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {campaignData.imageUrl && (
                  <Typography variant="caption">{campaignData.imageUrl}</Typography>
                )}
              </Stack>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" disabled={disableSumbitBtn} color="primary" fullWidth>
                Create Campaign
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateCampaign;
