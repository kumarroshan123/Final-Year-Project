import React, { useState } from 'react';
import { Mail, Phone, Send, MessageSquare, Briefcase, User } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess(true);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-emerald-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Get in Touch</h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
              Have questions about LedgerSense? Our team is here to help you transform your business with intelligent analytics.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">                
              {/* Contact Form */}
              <Card className="h-fit">
                <CardContent className="p-8">
                  {success ? (
                    <div className="text-center py-8">
                      <div className="rounded-full bg-green-100 p-3 mx-auto w-fit mb-4">
                        <Send className="h-6 w-6 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                      <p className="text-gray-600 mb-6">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setSuccess(false)}>Send Another Message</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                      
                      <Input
                        label="Full Name"
                        type="text"
                        name="name"
                        required
                        leftIcon={<User className="h-5 w-5" />}
                        value={formData.name}
                        onChange={handleChange}
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        required
                        leftIcon={<Mail className="h-5 w-5" />}
                        value={formData.email}
                        onChange={handleChange}
                      />

                      <Input
                        label="Company Name"
                        type="text"
                        name="company"
                        leftIcon={<Briefcase className="h-5 w-5" />}
                        value={formData.company}
                        onChange={handleChange}
                      />

                      <Input
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        leftIcon={<Phone className="h-5 w-5" />}
                        value={formData.phone}
                        onChange={handleChange}
                      />

                      <Input
                        label="Subject"
                        type="text"
                        name="subject"
                        required
                        leftIcon={<MessageSquare className="h-5 w-5" />}
                        value={formData.subject}
                        onChange={handleChange}
                      />

                      <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          className="block w-full rounded-md border border-gray-300 shadow-sm py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        isLoading={loading}
                      >
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;