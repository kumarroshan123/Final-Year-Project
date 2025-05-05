import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ScrollToTop from './components/utils/ScrollToTop';
import Chatbot from './components/chatbot/Chatbot';
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
import AnalyticsPage from './pages/AnalyticsPage';
import PredictionsPage from './pages/PredictionsPage';
import DashboardPage from './pages/DashboardPage';
import FileUploader from './components/file_upload/FileUploader';
import DemoPage from './pages/subPages/DemoPage';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-800 rounded-full animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} /> 
        <Route path="/contact" element={<ContactPage />} /> 
        <Route path="/pricing" element={<Pricing />} /> 
        <Route path='/demo' element={<DemoPage />} />
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
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/upload" 
          element={isAuthenticated ? <FileUploader /> : <Navigate to="/login" />} 
        />

        
        {/* For demo purposes, also allow direct access */}
        <Route path="/demo/profile" element={<ProfilePage />} />
        <Route path="/demo/analytics" element={<AnalyticsPage />} />
        <Route path="/demo/predictions" element={<PredictionsPage />} />
        <Route path="/demo/dashboard" element={<DashboardPage />} />
        <Route path="/demo/upload" element={<FileUploader />} />

        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;