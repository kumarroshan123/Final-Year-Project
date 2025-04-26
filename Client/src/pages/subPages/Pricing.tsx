import React from 'react';
import { Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Pricing: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-emerald-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Simple, Transparent Pricing</h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
              Choose the perfect plan for your business needs. Our pricing is designed to grow with your business.
            </p>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-12 text-center">
                <div className="rounded-full bg-blue-100 p-4 inline-flex mb-6">
                  <Clock className="h-8 w-8 text-blue-800" />
                </div>
                <h2 className="text-3xl font-bold mb-6">
                  Pricing Will Be Revealed Soon
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  We're finalizing our pricing plans to ensure we offer the best value for your business. Stay tuned for our competitive pricing options.
                </p>
                <div className="flex flex-col items-center space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg inline-flex items-start text-left max-w-lg">
                    <AlertCircle className="h-6 w-6 text-blue-800 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">
                      Want to be notified when our pricing is live? Leave your email and we'll keep you updated on our launch and early-bird specials.
                    </p>
                  </div>
                  <Link to="/contact">
                    <Button size="lg" className="mt-6">
                      Contact Sales for Early Access
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Features Preview */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-center mb-12">
                What You'll Get with Any Plan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    title: 'OCR Technology',
                    description: 'Advanced data extraction from traditional khata books'
                  },
                  {
                    title: 'Business Analytics',
                    description: 'Comprehensive insights and reporting tools'
                  },
                  {
                    title: 'Cloud Storage',
                    description: 'Secure storage for all your business data'
                  }
                ].map((feature, index) => (
                  <Card key={index} className="transform transition-transform hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;