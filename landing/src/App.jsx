import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@reava/ui';
import Hero from './components/Hero';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateCampaign from './pages/marketer/CreateCampaign';
import MyCampaigns from './pages/marketer/MyCampaigns';
import CampaignDetails from './pages/marketer/CampaignDetails';
import BrowseCampaigns from './pages/promoter/BrowseCampaigns';
import MyLinks from './pages/promoter/MyLinks';
import Earnings from './pages/promoter/Earnings';
import Payouts from './pages/promoter/Payouts';
import Track from './pages/Track';
import RedirectPage from './pages/RedirectPage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/track/:shortCode" element={<Track />} />
        <Route path="/r/:shortCode" element={<RedirectPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketer/create-campaign"
          element={
            <ProtectedRoute roles={['marketer']}>
              <CreateCampaign />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketer/campaigns"
          element={
            <ProtectedRoute roles={['marketer']}>
              <MyCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketer/campaigns/:id"
          element={
            <ProtectedRoute roles={['marketer']}>
              <CampaignDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/promoter/campaigns"
          element={
            <ProtectedRoute roles={['promoter', 'marketer']}>
              <BrowseCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/promoter/links"
          element={
            <ProtectedRoute roles={['promoter']}>
              <MyLinks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/promoter/earnings"
          element={
            <ProtectedRoute roles={['promoter']}>
              <Earnings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/promoter/payouts"
          element={
            <ProtectedRoute roles={['promoter']}>
              <Payouts />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
