import React from 'react';
import { Mail, BarChart2, Shield, Users, BookOpen, Database } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent } from '../components/ui/Card';

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-emerald-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">About LedgerSense</h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
              LedgerSense is a comprehensive business analytics platform designed to help you transform traditional bookkeeping into powerful insights for growth.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
                <p className="text-lg text-gray-600 text-center">
                  Our mission is to empower businesses to take control of their financial future by providing intelligent analytics and insights. We believe that understanding your business data is the first step towards achieving sustainable growth and success.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="transform transition-transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-blue-100 p-4 inline-flex mb-4">
                    <BookOpen className="h-8 w-8 text-blue-800" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">OCR Technology</h3>
                  <p className="text-gray-600">Advanced data extraction from traditional khata books with high accuracy</p>
                </CardContent>
              </Card>

              <Card className="transform transition-transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-emerald-100 p-4 inline-flex mb-4">
                    <BarChart2 className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
                  <p className="text-gray-600">Comprehensive financial reporting and business intelligence tools</p>
                </CardContent>
              </Card>

              <Card className="transform transition-transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="rounded-full bg-blue-100 p-4 inline-flex mb-4">
                    <Database className="h-8 w-8 text-blue-800" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Secure Storage</h3>
                  <p className="text-gray-600">Enterprise-grade security for your sensitive business data</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <Users className="h-6 w-6 text-blue-800" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                  <p className="text-gray-600">We prioritize our customers' success and build solutions that address real business needs.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-emerald-100 p-3 mr-4">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Data Security</h3>
                  <p className="text-gray-600">We maintain the highest standards of security to protect your sensitive business information.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <div className="rounded-full bg-blue-100 p-4 inline-flex mb-6">
                  <Mail className="h-8 w-8 text-blue-800" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Have questions or feedback? We'd love to hear from you.
                </p>
                <p className="text-xl">
                  <a href="mailto:support@ledgersense.com" className="text-blue-800 hover:text-blue-900 transition-colors">
                    support@ledgersense.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
