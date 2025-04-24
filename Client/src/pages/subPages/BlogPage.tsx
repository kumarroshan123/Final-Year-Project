import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const BlogPage: React.FC = () => {
  // Placeholder for blog posts (replace with actual data fetching later)
  const blogPosts = [
    // {
    //   id: 1,
    //   title: 'Example Blog Post 1',
    //   excerpt: 'This is a short preview of the first blog post...',
    //   date: 'October 26, 2023',
    //   slug: 'example-blog-post-1'
    // },
    // {
    //   id: 2,
    //   title: 'Another Interesting Article',
    //   excerpt: 'Dive deep into another topic relevant to our users...',
    //   date: 'October 20, 2023',
    //   slug: 'another-interesting-article'
    // },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow "> {/* Use gray bg for contrast */} 
         <section className="bg-gradient-to-r from-blue-800 to-emerald-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Blog</h1>
            
          </div>
        </section>
        <div className="container mx-auto px-4 max-w-4xl py-12"> {/* Add py-12 here */} 
       
          
          {blogPosts.length > 0 ? (
            <div className="space-y-8">
              {/* Blog post listing will go here - map over blogPosts */}
              
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Coming Soon!</h2>
              <p className="text-gray-600">
                We're working on bringing you insightful articles. Check back later!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage; 