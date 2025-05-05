import React, { useState, useEffect } from 'react';
import { Edit2 } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import * as authApi from '../../utils/authApi';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const { user, refreshUser } = useAuth();

  // Profile form state, always initialized from user data
  const [profile, setProfile] = useState({
    owner: '',
    storeName: '',
    email: '',
    phone: '',
    businessType: '',
    establishedYear: new Date().getFullYear(),
    description: '',
    address: '',
    gstNumber: '',
    averageMonthlyRevenue: '',
  });

  const [initialProfile, setInitialProfile] = useState(profile);

  // Sync form state with user data from backend
  useEffect(() => {
    if (user) {
      const newProfile = {
        owner: user.name || '',
        storeName: user.storeName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        businessType: user.businessType || '',
        establishedYear: user.establishedYear || new Date().getFullYear(),
        description: user.description || '',
        address: user.address || '',
        gstNumber: user.gstNumber || '',
        averageMonthlyRevenue: user.avgMonthlyRevenue ? String(user.avgMonthlyRevenue) : '',
      };
      setProfile(newProfile);
      setInitialProfile(newProfile);
    }
  }, [user]);
  
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Update handleInputChange to work with new profile state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Update handleSaveProfile to send correct fields
  const handleSaveProfile = async () => {
    setUpdateLoading(true);
    setUpdateError(null);
    try {
      const payload = {
        name: profile.owner,
        storeName: profile.storeName,
        email: profile.email,
        phoneNumber: profile.phone,
        businessType: profile.businessType,
        establishedYear: profile.establishedYear,
        description: profile.description,
        address: profile.address,
        gstNumber: profile.gstNumber,
        avgMonthlyRevenue: profile.averageMonthlyRevenue ? Number(profile.averageMonthlyRevenue) : undefined,
      };
      await authApi.updateMe(payload);
      await refreshUser();
      setIsEditing(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setUpdateError(err.message);
      } else {
        setUpdateError('Failed to update profile');
      }
    } finally {
      setUpdateLoading(false);
    }
  };
  
  if (!profile && !user) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center text-gray-500">No profile details found. Please update your profile.</div>
        </main>
        <Footer />
      </div>
    );
  }
 
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Profile Card */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <Avatar 
                  size="xl" 
                  name={profile?.owner} 
                  className="mb-4 md:mb-0 md:mr-6" 
                />
                <div>
                  <CardTitle className="text-2xl md:text-2xl font-bold">{profile?.owner}</CardTitle>
                  {profile?.storeName && (
                    <div className="text-lg text-gray-700 font-medium mt-1">{profile.storeName}</div>
                  )}
                  <p className="text-gray-600">{profile?.businessType} • Est. {profile?.establishedYear}</p>
                  <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="info">Verified</Badge>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile} isLoading={updateLoading}>
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => { setIsEditing(false); setUpdateError(null); setProfile(initialProfile); }}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)} leftIcon={<Edit2 className="h-4 w-4" />}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditing && updateError && (
                <div className="mb-4 bg-red-50 text-red-800 p-2 rounded-md">{updateError}</div>
              )}
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="owner"
                      value={profile?.owner}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    <input
                      type="text"
                      name="storeName"
                      value={profile?.storeName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profile?.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile?.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    <input
                      type="text"
                      name="businessType"
                      value={profile?.businessType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                    <input
                      type="number"
                      name="establishedYear"
                      value={profile?.establishedYear}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={profile?.gstNumber || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avg. Monthly Revenue (INR)</label>
                    <input
                      type="number"
                      name="averageMonthlyRevenue"
                      value={profile?.averageMonthlyRevenue || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profile?.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={profile?.description}
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
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="mt-1">{profile?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="mt-1">{profile?.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        <p className="mt-1">{profile?.address}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Business Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Business Type</p>
                        <p className="mt-1">{profile?.businessType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Established</p>
                        <p className="mt-1">{profile?.establishedYear}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">GST Number</p>
                        <p className="mt-1">{profile?.gstNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Avg. Monthly Revenue</p>
                        <p className="mt-1">
                          {profile?.averageMonthlyRevenue 
                            ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(profile?.averageMonthlyRevenue)) 
                            : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="mt-1">{profile?.description}</p>
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