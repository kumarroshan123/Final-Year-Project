import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { TrendingUp, PackageCheck, Users, BarChart, Lightbulb, BadgeIndianRupee } from 'lucide-react';
import Badge from '../components/ui/Badge';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


// Define types for the prediction data
type SalesForecast = { period: string; forecastValue: number; confidence: number };
type InventoryRecommendation = { item: string; currentStock: number; recommendedStock: number; potentialSaving: number };
type CustomerChurnPrediction = { segment: string; predictedChurnRate: number; recommendedAction: string };
type MarketTrend = { trend: string; impact: 'Positive' | 'Negative' | 'Neutral'; description: string };

// Mock data
const salesForecastData: SalesForecast[] = [
  { period: 'Next Month', forecastValue: 135000, confidence: 90 },
  { period: 'Next Quarter', forecastValue: 410000, confidence: 85 },
  { period: 'Next 6 Months', forecastValue: 780000, confidence: 80 },
];

const inventoryRecommendationsData: InventoryRecommendation[] = [
  { item: 'Rice (5kg)', currentStock: 50, recommendedStock: 75, potentialSaving: 3000 },
  { item: 'Cooking Oil (1L)', currentStock: 30, recommendedStock: 45, potentialSaving: 2500 },
  { item: 'Wheat Flour (10kg)', currentStock: 25, recommendedStock: 40, potentialSaving: 1500 },
  { item: 'Lentils (1kg)', currentStock: 60, recommendedStock: 80, potentialSaving: 1800 },
];

const customerChurnData: CustomerChurnPrediction[] = [
  { segment: 'Low Spend - Infrequent', predictedChurnRate: 15, recommendedAction: 'Targeted promotion' },
  { segment: 'High Spend - Frequent', predictedChurnRate: 2, recommendedAction: 'Loyalty rewards' },
  { segment: 'New Customers', predictedChurnRate: 8, recommendedAction: 'Onboarding campaign' },
];

const marketTrendsData: MarketTrend[] = [
  { trend: 'Increased demand for organic products', impact: 'Positive', description: 'Opportunity to expand organic range.' },
  { trend: 'Rising fuel costs affecting delivery', impact: 'Negative', description: 'Explore alternative delivery partners or optimize routes.' },
  { trend: 'Competitor opening nearby store', impact: 'Neutral', description: 'Monitor competitor pricing and promotions.' },
];

const PredictionsPage: React.FC = () => {


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  const salesChartData = {
    labels: salesForecastData.map(d => d.period),
    datasets: [
      {
        label: 'Forecasted Sales',
        data: salesForecastData.map(d => d.forecastValue),
        borderColor: 'rgba(34,197,94,1)',
        backgroundColor: 'rgba(34,197,94,0.2)',
        tension: 0.4,
      },
    ],
  };

  const salesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-emerald-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center flex items-center justify-center">
              Predictions Dashboard
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-indigo-100">
              Explore forecasts and recommendations for your business growth.
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="py-12">
          <div className="container mx-auto px-4 space-y-8">

            {/* Sales Forecast Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                  Sales Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg h-60 md:h-72 lg:h-80 mb-6">
                  <Line data={salesChartData} options={salesChartOptions} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {salesForecastData.map(forecast => (
                    <div key={forecast.period} className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-100">
                      <p className="font-semibold text-green-800">{forecast.period}</p>
                      <p className="text-2xl font-bold text-green-900 mt-1">{formatCurrency(forecast.forecastValue)}</p>
                      <p className="text-xs text-gray-500 mt-1">Confidence: {forecast.confidence}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inventory Optimization Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <PackageCheck className="h-6 w-6 mr-2 text-blue-700" />
                  Inventory Optimization
                </CardTitle>
                <p className="text-sm text-gray-500">Recommendations based on predicted demand.</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Saving</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {inventoryRecommendationsData.map((rec) => (
                        <tr key={rec.item}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rec.item}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rec.currentStock} units</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 font-medium">{rec.recommendedStock} units</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium flex items-center">
                            <BadgeIndianRupee className="h-4 w-4 mr-1" /> {formatCurrency(rec.potentialSaving)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-4 text-right font-semibold">Total Potential Savings: {formatCurrency(inventoryRecommendationsData.reduce((sum, rec) => sum + rec.potentialSaving, 0))}</p>
              </CardContent>
            </Card>

            {/* Customer Behavior Predictions Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Users className="h-6 w-6 mr-2 text-purple-700" />
                  Customer Churn Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {customerChurnData.map(churn => (
                    <div key={churn.segment} className="border p-4 rounded-lg bg-purple-50 shadow-sm">
                      <p className="font-semibold text-purple-900">{churn.segment}</p>
                      <p className="text-lg font-bold text-red-600 mt-2">{churn.predictedChurnRate}%</p>
                      <p className="text-sm text-gray-600 mb-2">Predicted Churn Rate</p>
                      <div className="flex items-start mt-2">
                        <Lightbulb className="h-4 w-4 mr-1 text-yellow-600 flex-shrink-0 mt-1" />
                        <p className="text-xs text-purple-800"><span className="font-medium">Action:</span> {churn.recommendedAction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Trend Analysis Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BarChart className="h-6 w-6 mr-2 text-amber-700" />
                  Market Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketTrendsData.map((trend, index) => (
                  <div key={index} className="flex items-start p-4 border rounded-lg bg-amber-50">
                    <div className="flex-shrink-0 mr-3">
                      <Badge
                        variant={trend.impact === 'Positive' ? 'success' : trend.impact === 'Negative' ? 'error' : 'info'}
                        className="capitalize"
                      >
                        {trend.impact}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium text-amber-900">{trend.trend}</p>
                      <p className="text-sm text-gray-600">{trend.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PredictionsPage; 