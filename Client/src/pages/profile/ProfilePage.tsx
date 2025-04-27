import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { Shop } from '../../types';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Initial mock data (used if nothing in local storage)
  const initialShopData: Shop = {
    id: '1',
    name: 'Vikram\'s General Store',
    owner: 'Vikram Sharma',
    address: '123 Market Street, New Delhi, 110001',
    phone: '+91 98765 43210',
    email: 'sharma.store@example.com',
    businessType: 'Retail',
    establishedYear: 2005,
    description: 'A family-owned general store serving the local community with groceries, household items, and daily essentials.',
    gstNumber: 'GSTIN1234567890',
    averageMonthlyRevenue: 50000
  };

  // State to hold shop data, initialized from local storage or mock data
  const [shop, setShop] = useState<Shop>(() => {
    const savedShopData = localStorage.getItem('shopProfile');
    return savedShopData ? JSON.parse(savedShopData) : initialShopData;
  });

  // Effect to save initial data to local storage if it wasn't there
  useEffect(() => {
    if (!localStorage.getItem('shopProfile')) {
      localStorage.setItem('shopProfile', JSON.stringify(initialShopData));
    }
  }, []); 
  
  const handleSaveProfile = () => {
    // In a real app, this would call an API to update the profile
    // Save the updated shop data to local storage
    localStorage.setItem('shopProfile', JSON.stringify(shop));
    setIsEditing(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShop(prev => ({ ...prev, [name]: value }));
  };
  
 
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={{ name: shop.owner }} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Profile Card */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <Avatar 
                  size="xl" 
                  name={shop.name} 
                  className="mb-4 md:mb-0 md:mr-6" 
                />
                <div>
                  <CardTitle className="text-2xl">{shop.name}</CardTitle>
                  <p className="text-gray-600">{shop.businessType} • Est. {shop.establishedYear}</p>
                  <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="info">Verified</Badge>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                {isEditing ? (
                  <Button onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)} leftIcon={<Edit2 className="h-4 w-4" />}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    <input
                      type="text"
                      name="name"
                      value={shop.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                    <input
                      type="text"
                      name="owner"
                      value={shop.owner}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={shop.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shop.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    <input
                      type="text"
                      name="businessType"
                      value={shop.businessType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                    <input
                      type="number"
                      name="establishedYear"
                      value={shop.establishedYear}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={shop.gstNumber || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avg. Monthly Revenue (INR)</label>
                    <input
                      type="number"
                      name="averageMonthlyRevenue"
                      value={shop.averageMonthlyRevenue || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shop.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={shop.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Owner</p>
                        <p className="mt-1">{shop.owner}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="mt-1">{shop.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="mt-1">{shop.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        <p className="mt-1">{shop.address}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Business Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Business Type</p>
                        <p className="mt-1">{shop.businessType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Established</p>
                        <p className="mt-1">{shop.establishedYear}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">GST Number</p>
                        <p className="mt-1">{shop.gstNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Avg. Monthly Revenue</p>
                        <p className="mt-1">
                          {shop.averageMonthlyRevenue 
                            ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(shop.averageMonthlyRevenue) 
                            : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="mt-1">{shop.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;