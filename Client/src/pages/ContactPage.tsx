import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Briefcase, User } from 'lucide-react';
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
        <section className="bg-gradient-to-r from-blue-800 to-emerald-600 text-white py-16">
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
              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="rounded-full bg-blue-100 p-3 mr-4">
                          <MapPin className="h-6 w-6 text-blue-800" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Visit Us</h3>
                          <p className="text-gray-600 mt-1">
                            27 Ballygunge Circular Road<br />
                            Ballygunge, Kolkata<br />
                            West Bengal 700019, India
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="rounded-full bg-emerald-100 p-3 mr-4">
                          <Phone className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Call Us</h3>
                          <p className="text-gray-600 mt-1">
                            <a href="tel:+1234567890" className="hover:text-blue-800">
                              +123 456 7890
                            </a>
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Mon-Fri from 9am to 6pm
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="rounded-full bg-blue-100 p-3 mr-4">
                          <Mail className="h-6 w-6 text-blue-800" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Email Us</h3>
                          <p className="text-gray-600 mt-1">
                            <a href="mailto:info@ledgersense.com" className="hover:text-blue-800">
                              info@ledgersense.com
                            </a>
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            We'll respond within 24 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        1. Submit your inquiry using the form
                      </p>
                      <p className="text-gray-600">
                        2. Receive a confirmation email immediately
                      </p>
                      <p className="text-gray-600">
                        3. Get a detailed response within 24 hours
                      </p>
                      <p className="text-gray-600">
                        4. Schedule a demo if needed
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

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

        {/* Office Location */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    title="Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.4750724447187!2d88.41474800000001!3d22.476386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDI4JzM1LjAiTiA4OMKwMjQnNTMuMSJF!5e0!3m2!1sen!2sin!4v1682147521234!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;