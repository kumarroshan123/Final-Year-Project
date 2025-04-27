import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LineChart, TrendingUp, BookOpen, BarChart, PieChart, Database } from 'lucide-react';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Transform Your Paper Records Into Business Insights
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  LedgerSense uses advanced OCR technology to extract data from your traditional khata books and turn it into powerful analytics that help grow your business.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/demo">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20">
                      Watch Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <img 
                  src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg" 
                  alt="Shopkeeper with ledger book" 
                  className="rounded-lg shadow-xl max-w-full h-auto object-cover transform rotate-2"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How LedgerSense Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our intelligent platform transforms your paper records into actionable business insights in three simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105">
                <div className="rounded-full bg-blue-100 p-4 inline-flex mb-6">
                  <BookOpen className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Upload Your Khata</h3>
                <p className="text-gray-600">
                  Take a photo of your khata books or upload existing images. Our system accepts multiple formats and pages.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105">
                <div className="rounded-full bg-blue-100 p-4 inline-flex mb-6">
                  <Database className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Automatic Data Extraction</h3>
                <p className="text-gray-600">
                  Our advanced OCR technology extracts and organizes all your transaction data with high accuracy.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105">
                <div className="rounded-full bg-blue-100 p-4 inline-flex mb-6">
                  <LineChart className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Gain Business Insights</h3>
                <p className="text-gray-600">
                  Access comprehensive analytics and predictive insights to make informed business decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features for Business Growth</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                LedgerSense provides comprehensive tools to help you understand your business performance and plan for the future.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <div className="mb-8">
                  <div className="flex items-center mb-3">
                    <div className="rounded-full bg-emerald-100 p-2 mr-3">
                      <BarChart className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Advanced Analytics</h3>
                  </div>
                  <p className="text-gray-600 ml-10">
                    Visualize your sales trends, inventory movements, customer payment patterns, and more with interactive dashboards.
                  </p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center mb-3">
                    <div className="rounded-full bg-emerald-100 p-2 mr-3">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Predictive Analysis</h3>
                  </div>
                  <p className="text-gray-600 ml-10">
                    Get AI-powered forecasts for sales, inventory needs, and business growth to make proactive decisions.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <div className="rounded-full bg-emerald-100 p-2 mr-3">
                      <PieChart className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Comprehensive Reports</h3>
                  </div>
                  <p className="text-gray-600 ml-10">
                    Generate detailed reports on profit margins, expenses, customer credits, and other key business metrics.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg" 
                  alt="Business analytics dashboard" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <img 
                    src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg" 
                    alt="Mobile app view" 
                    className="w-32 h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <img 
                  src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg" 
                  alt="OCR technology scanning ledger" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <img 
                    src="https://images.pexels.com/photos/8353802/pexels-photo-8353802.jpeg" 
                    alt="Data extraction" 
                    className="w-32 h-auto rounded-lg"
                  />
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="mb-8">
                  <div className="flex items-center mb-3">
                    <div className="rounded-full bg-blue-100 p-2 mr-3">
                      <BookOpen className="h-5 w-5 text-blue-800" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Smart OCR Technology</h3>
                  </div>
                  <p className="text-gray-600 ml-10">
                    Our OCR technology is specially designed to recognize handwritten entries in khata books with high accuracy.
                  </p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center mb-3">
                    <div className="rounded-full bg-blue-100 p-2 mr-3">
                      <Database className="h-5 w-5 text-blue-800" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Secure Cloud Storage</h3>
                  </div>
                  <p className="text-gray-600 ml-10">
                    All your business data is securely stored in the cloud, accessible anytime from any device.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <div className="rounded-full bg-blue-100 p-2 mr-3">
                      <LineChart className="h-5 w-5 text-blue-800" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">Real-time Updates</h3>
                  </div>
                  <p className="text-gray-600 ml-10">
                    Keep your digital records synchronized with your paper books for accurate and up-to-date insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Thousands of business owners are already transforming their operations with LedgerSense.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                      alt="Testimonial author" 
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Rajesh Kumar</h4>
                    <p className="text-gray-500">Grocery Store Owner</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "LedgerSense has transformed how I run my grocery store. I used to spend hours manually analyzing my sales data, but now I can see everything at a glance and make better ordering decisions."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" 
                      alt="Testimonial author" 
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Priya Sharma</h4>
                    <p className="text-gray-500">Boutique Owner</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The predictive analysis feature is incredible! It helped me anticipate seasonal trends and stock up on the right products at the right time. My revenue has increased by 30% in just three months."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
                      alt="Testimonial author" 
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Abdul Karim</h4>
                    <p className="text-gray-500">Hardware Store Owner</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "I was skeptical about uploading my khata books at first, but the OCR technology is amazing. It recognized even my messy handwriting, and now I have complete digital records without any manual data entry."
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* CTA */}
        <section id="cta-section" className="py-20 bg-gradient-to-r from-blue-800 to-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of business owners who are already using LedgerSense to gain valuable insights and grow their operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;