export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Shop {
  id: string;
  name: string;
  owner: string;
  storeName: string; // Store/Business name
  address: string;
  phone: string;
  email: string;
  businessType: string;
  establishedYear: number;
  description: string;
  logo?: string;
  gstNumber?: string;
  averageMonthlyRevenue?: number;
}

export interface AnalyticsSummary {
  totalSales: number;
  totalPurchases: number;
  totalProfit: number;
  customerCount: number;
  topSellingItems: {
    name: string;
    quantity: number;
    revenue: number;
  }[];
  recentTransactions: {
    id: string;
    date: string;
    amount: number;
    type: 'credit' | 'debit';
    description: string;
  }[];
}

export interface PredictionSummary {
  salesForecast: number;
  growthRate: number;
  inventoryRecommendations: {
    item: string;
    currentStock: number;
    recommendedStock: number;
  }[];
  potentialSavings: number;
  seasonalTrends: {
    season: string;
    performance: 'high' | 'medium' | 'low';
    projectedChange: number;
  }[];
}