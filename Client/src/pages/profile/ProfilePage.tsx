import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Edit2, 
  Bookmark, 
  Package, 
  BarChart2, 
  TrendingUp, 
  ChevronRight, 
  Download,
  Users,
  ShoppingBag
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { Shop, AnalyticsSummary, PredictionSummary } from '../../types';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data for shop profile
  const [shop, setShop] = useState<Shop>({
    id: '1',
    name: 'Sharma General Store',
    owner: 'Vikram Sharma',
    address: '123 Market Street, New Delhi, 110001',
    phone: '+91 98765 43210',
    email: 'sharma.store@example.com',
    businessType: 'Retail',
    establishedYear: 2005,
    description: 'A family-owned general store serving the local community with groceries, household items, and daily essentials.'
  });
  
  // Mock data for analytics summary
  const analyticsSummary: AnalyticsSummary = {
    totalSales: 125000,
    totalPurchases: 85000,
    totalProfit: 40000,
    customerCount: 350,
    topSellingItems: [
      { name: 'Rice (5kg)', quantity: 150, revenue: 15000 },
      { name: 'Cooking Oil (1L)', quantity: 120, revenue: 12000 },
      { name: 'Wheat Flour (10kg)', quantity: 100, revenue: 10000 }
    ],
    recentTransactions: [
      { id: 't1', date: '2023-03-15', amount: 1200, type: 'credit', description: 'Sales' },
      { id: 't2', date: '2023-03-14', amount: 500, type: 'debit', description: 'Purchase' },
      { id: 't3', date: '2023-03-12', amount: 800, type: 'credit', description: 'Sales' }
    ]
  };
  
  // Mock data for prediction summary
  const predictionSummary: PredictionSummary = {
    salesForecast: 135000,
    growthRate: 8,
    inventoryRecommendations: [
      { item: 'Rice (5kg)', currentStock: 50, recommendedStock: 75 },
      { item: 'Cooking Oil (1L)', currentStock: 30, recommendedStock: 45 },
      { item: 'Wheat Flour (10kg)', currentStock: 25, recommendedStock: 40 }
    ],
    potentialSavings: 12000,
    seasonalTrends: [
      { season: 'Summer', performance: 'high', projectedChange: 15 },
      { season: 'Monsoon', performance: 'medium', projectedChange: 5 },
      { season: 'Winter', performance: 'high', projectedChange: 12 }
    ]
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would call an API to update the profile
    setIsEditing(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShop(prev => ({ ...prev, [name]: value }));
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
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
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="mt-1">{shop.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analytics Overview */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-blue-800" />
                  Analytics Overview
                </CardTitle>
                <p className="text-gray-500 text-sm mt-1">Last 30 days performance</p>
              </div>
              <Link to="/analytics">
                <Button variant="outline" size="sm">
                View Detailed Analytics
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-800">Total Sales</p>
                    <ShoppingBag className="h-5 w-5 text-blue-800" />
                  </div>
                  <p className="text-2xl font-bold text-blue-900 mt-2">{formatCurrency(analyticsSummary.totalSales)}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-green-800">Total Profit</p>
                    <TrendingUp className="h-5 w-5 text-green-800" />
                  </div>
                  <p className="text-2xl font-bold text-green-900 mt-2">{formatCurrency(analyticsSummary.totalProfit)}</p>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-amber-800">Inventory Value</p>
                    <Package className="h-5 w-5 text-amber-800" />
                  </div>
                  <p className="text-2xl font-bold text-amber-900 mt-2">{formatCurrency(analyticsSummary.totalPurchases)}</p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-800">Active Customers</p>
                    <Users className="h-5 w-5 text-indigo-800" />
                  </div>
                  <p className="text-2xl font-bold text-indigo-900 mt-2">{analyticsSummary.customerCount}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Top Selling Items</h3>
                  <div className="space-y-4">
                    {analyticsSummary.topSellingItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.quantity} units sold</p>
                        </div>
                        <p className="font-medium">{formatCurrency(item.revenue)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Recent Transactions</h3>
                  <div className="space-y-4">
                    {analyticsSummary.recentTransactions.map(transaction => (
                      <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <p className={`font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 justify-between">
              <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                Export Report
              </Button>
              <p className="text-sm text-gray-500">Updated 3 hours ago</p>
            </CardFooter>
          </Card>

          {/* Predictive Analysis */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
                  Predictive Analysis
                </CardTitle>
                <p className="text-gray-500 text-sm mt-1">Next 30 days forecast</p>
              </div>
              <Link to="/predictions">
                <Button variant="outline" size="sm">
                View Predictive Analysis
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-emerald-800">Sales Forecast</p>
                    <TrendingUp className="h-5 w-5 text-emerald-800" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-900 mt-2">{formatCurrency(predictionSummary.salesForecast)}</p>
                  <p className="text-sm text-emerald-800 mt-1">
                    {predictionSummary.growthRate > 0 ? '+' : ''}{predictionSummary.growthRate}% from last month
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-800">Potential Savings</p>
                    <Bookmark className="h-5 w-5 text-blue-800" />
                  </div>
                  <p className="text-2xl font-bold text-blue-900 mt-2">{formatCurrency(predictionSummary.potentialSavings)}</p>
                  <p className="text-sm text-blue-800 mt-1">
                    With inventory optimization
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-purple-800">Best Performing Season</p>
                    <BarChart2 className="h-5 w-5 text-purple-800" />
                  </div>
                  <p className="text-2xl font-bold text-purple-900 mt-2">Summer</p>
                  <p className="text-sm text-purple-800 mt-1">
                    +15% projected growth
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Inventory Recommendations</h3>
                  <div className="space-y-4">
                    {predictionSummary.inventoryRecommendations.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{item.item}</p>
                          <p className="text-sm text-gray-500">Current: {item.currentStock} units</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Recommended: {item.recommendedStock}</p>
                          <p className="text-sm text-emerald-600">
                            +{item.recommendedStock - item.currentStock} units needed
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Seasonal Trends</h3>
                  <div className="space-y-4">
                    {predictionSummary.seasonalTrends.map((trend, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{trend.season}</p>
                          <div className="flex items-center">
                            <Badge 
                              variant={
                                trend.performance === 'high' ? 'success' : 
                                trend.performance === 'medium' ? 'warning' : 'error'
                              }
                              size="sm"
                            >
                              {trend.performance}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {trend.projectedChange > 0 ? '+' : ''}{trend.projectedChange}%
                          </p>
                          <p className="text-sm text-gray-500">Projected change</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <BarChart2 className="h-4 w-4 mr-1 text-blue-800" />
                Based on 3 years of historical data
              </div>
              <p className="text-sm text-gray-500">Last updated: Today</p>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;