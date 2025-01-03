import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Box, CssBaseline } from '@mui/material';
import Dashboard from './pages/main-pages/Dashboard';
import Reports from './pages/main-pages/Reports';
import Features from './pages/main-pages/Features';
import ManageCampaigns from './pages/campaignPages/ManageCampaigns';
import LoginPage from './pages/authentication/Login';
import SignupPage from './pages/authentication/Signup';
import CompanyDetailsForm from './pages/authentication/CompanyDetailsForm';
import CreateCampaign from './pages/campaignPages/CreateCampaign';

const App = () => {
  return (
    <Router>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<MainLayout> <Dashboard /> </MainLayout>} />
            <Route path="/create-campaign" element={<MainLayout> <CreateCampaign /> </MainLayout> } />
            <Route path="/reports" element={<MainLayout> <Reports /> </MainLayout> } />
            <Route path="/features" element={<MainLayout> <Features /> </MainLayout> } />
            <Route path="/manage-campaigns" element={<MainLayout> <ManageCampaigns /> </MainLayout> } />
            <Route path="/login" element={<AuthLayout> <LoginPage /> </AuthLayout> } />
            <Route path="/signup" element={<AuthLayout> <SignupPage /> </AuthLayout>} />
            <Route path="/company-details" element={<AuthLayout> <CompanyDetailsForm /> </AuthLayout>} />
          </Routes>
        </Box>
    </Router>
  );
};

export default App;

const AuthLayout = ({ children }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1}}>
      {children}
    </Box>
  );
};

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1}}>
        {children}
      </Box>
    </Box>
  );
};