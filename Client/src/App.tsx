import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/utils/ScrollToTop';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProfilePage from './pages/profile/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Pricing from './pages/subPages/Pricing';
import FAQPage from './pages/subPages/Faqs';
import PrivacyPolicyPage from './pages/subPages/PrivacyPolicyPage';
import BlogPage from './pages/subPages/BlogPage';
import AnalyticsPage from './pages/subPages/AnalyticsPage';
import PredictionsPage from './pages/subPages/PredictionsPage';

function App() {
  // This would typically come from your authentication context
  const isAuthenticated = false;

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} /> 
        <Route path="/contact" element={<ContactPage />} /> 
        <Route path="/pricing" element={<Pricing />} /> 
        <Route path='/faq' element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/blog" element={<BlogPage />} />
        
        {/* Authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Protected routes */}
        <Route 
          path="/profile" 
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/analytics" 
          element={isAuthenticated ? <AnalyticsPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/predictions" 
          element={isAuthenticated ? <PredictionsPage /> : <Navigate to="/login" />} 
        />
        
        {/* For demo purposes, also allow direct access */}
        <Route path="/demo/profile" element={<ProfilePage />} />
        <Route path="/demo/analytics" element={<AnalyticsPage />} />
        <Route path="/demo/predictions" element={<PredictionsPage />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;