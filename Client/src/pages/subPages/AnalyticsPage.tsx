import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { BarChart2 } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  // Mock user data for Navbar (replace with actual auth context later)
  const mockUser = {
    name: 'Vikram Sharma',
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={mockUser} /> 
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center flex items-center justify-center">
              <BarChart2 className="h-10 w-10 mr-3" /> Analytics Dashboard
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
              Dive deep into your business performance metrics.
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl"> {/* Wider container for dashboards */}
            <div className="text-center bg-white p-12 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Analytics Dashboard Under Construction</h2>
              <p className="text-gray-600">
                The full analytics dashboard with detailed charts and reports will be available here soon.
              </p>
              {/* Placeholder for actual charts and data */} 
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AnalyticsPage; 