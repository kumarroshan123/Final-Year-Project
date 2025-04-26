import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, Mail } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Card, CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: 'General',
    question: 'What is LedgerSense?',
    answer: 'LedgerSense is a comprehensive business analytics platform that transforms traditional khata (ledger) books into digital insights using advanced OCR technology. It helps business owners make data-driven decisions by providing detailed analytics and predictions.'
  } as FaqItem,
  {
    category: 'Getting Started',
    question: 'How do I get started with LedgerSense?',
    answer: 'Getting started is easy! Simply sign up for an account, upload photos of your khata books or ledger pages, and our system will automatically extract and organize your data. Our smart OCR technology will process your records, and you will have access to insights within minutes.'
  } as FaqItem,
  {
    category: 'OCR Technology',
    question: 'How accurate is the OCR technology?',
    answer: 'Our OCR technology is specifically trained to recognize Indian handwriting and common accounting formats used in khata books. It typically achieves over 95% accuracy. Any unclear entries can be manually reviewed and corrected through our easy-to-use interface.'
  } as FaqItem,
  {
    category: 'Security',
    question: 'How secure is my business data?',
    answer: 'We take data security very seriously. All data is encrypted both in transit and at rest using industry-standard encryption protocols. We use secure cloud infrastructure and regularly perform security audits to ensure your business information remains protected.'
  } as FaqItem,
  {
    category: 'Features',
    question: 'What kind of analytics does LedgerSense provide?',
    answer: 'LedgerSense provides comprehensive analytics including sales trends, inventory movement, customer payment patterns, profit margins, and predictive insights. You can view detailed reports, interactive dashboards, and get AI-powered recommendations for business growth.'
  } as FaqItem,
  {
    category: 'Data Management',
    question: 'Can I export my data from LedgerSense?',
    answer: 'Yes, you can export your data in various formats including PDF, Excel, and CSV. This makes it easy to share reports with your accountant or use the data in other business applications.'
  } as FaqItem,
  {
    category: 'Support',
    question: 'What kind of support do you offer?',
    answer: 'We offer 24/7 customer support through email and chat. Our support team is well-versed in both technical aspects and business accounting practices. We also provide detailed documentation, video tutorials, and regular webinars for our users.'
  } as FaqItem,
  {
    category: 'Pricing',
    question: 'How much does LedgerSense cost?',
    answer: 'Our pricing plans will be revealed soon. We are re working on creating flexible options that work for businesses of all sizes. Sign up for our newsletter to be notified when pricing is available and to get access to early-bird specials.'
  } as FaqItem,
  
  
];

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-emerald-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-blue-100">
                Find answers to common questions about LedgerSense and how it can help transform your business
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* FAQ Items */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
                    <p className="text-gray-600">
                      We couldn't find any FAQs matching your search. Try different keywords or browse all questions below.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <Card key={index} className="overflow-hidden">
                      <button
                        className="w-full text-left p-6 focus:outline-none"
                        onClick={() => toggleItem(index)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                              {faq.category}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {faq.question}
                            </h3>
                          </div>
                          <span className="ml-4">
                            {openItems.includes(index) ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </span>
                        </div>
                      </button>
                      {openItems.includes(index) && (
                        <div className="px-6 pb-6">
                          <div className="pt-3 border-t">
                            <p className="text-gray-600">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-gray-600 mb-6">
                  Can't find the answer you're looking for? Please chat to our friendly team.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="mailto:support@ledgersense.com"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Email Support
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Contact Us
                  </a>
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

export default FAQPage;