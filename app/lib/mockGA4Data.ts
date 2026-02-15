// Mock Google Analytics 4 Data Service

export interface GA4Metrics {
  users: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
  conversionRate: number;
}

export interface TimeSeriesData {
  date: string;
  users: number;
  sessions: number;
  pageViews: number;
}

export interface TopPage {
  path: string;
  views: number;
  uniqueUsers: number;
}

export interface TrafficSource {
  source: string;
  users: number;
  sessions: number;
  percentage: number;
}

export interface DeviceCategory {
  category: string;
  users: number;
  percentage: number;
}

export interface GA4DashboardData {
  metrics: GA4Metrics;
  timeSeriesData: TimeSeriesData[];
  topPages: TopPage[];
  trafficSources: TrafficSource[];
  deviceCategories: DeviceCategory[];
}

// Generate mock data for the last 30 days
function generateTimeSeriesData(): TimeSeriesData[] {
  const data: TimeSeriesData[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const baseUsers = 1000 + Math.random() * 500;
    const users = Math.floor(baseUsers + Math.sin(i / 5) * 200);
    const sessions = Math.floor(users * (1.2 + Math.random() * 0.3));
    const pageViews = Math.floor(sessions * (2.5 + Math.random() * 1));

    data.push({
      date: date.toISOString().split('T')[0],
      users,
      sessions,
      pageViews,
    });
  }

  return data;
}

// Get mock GA4 data
export function getMockGA4Data(): GA4DashboardData {
  const timeSeriesData = generateTimeSeriesData();

  // Calculate totals from time series
  const totalUsers = timeSeriesData.reduce((sum, day) => sum + day.users, 0);
  const totalSessions = timeSeriesData.reduce((sum, day) => sum + day.sessions, 0);
  const totalPageViews = timeSeriesData.reduce((sum, day) => sum + day.pageViews, 0);

  return {
    metrics: {
      users: totalUsers,
      newUsers: Math.floor(totalUsers * 0.65),
      sessions: totalSessions,
      pageViews: totalPageViews,
      bounceRate: 42.5,
      avgSessionDuration: 245,
      conversions: Math.floor(totalSessions * 0.03),
      conversionRate: 3.2,
    },
    timeSeriesData,
    topPages: [
      { path: '/', views: 12453, uniqueUsers: 8921 },
      { path: '/products', views: 8732, uniqueUsers: 6234 },
      { path: '/about', views: 5621, uniqueUsers: 4123 },
      { path: '/contact', views: 4321, uniqueUsers: 3456 },
      { path: '/blog', views: 3987, uniqueUsers: 2876 },
    ],
    trafficSources: [
      { source: 'Organic Search', users: 15234, sessions: 18921, percentage: 45 },
      { source: 'Direct', users: 10123, sessions: 12456, percentage: 30 },
      { source: 'Social Media', users: 5067, sessions: 6234, percentage: 15 },
      { source: 'Referral', users: 2533, sessions: 3117, percentage: 7.5 },
      { source: 'Email', users: 845, sessions: 1039, percentage: 2.5 },
    ],
    deviceCategories: [
      { category: 'Mobile', users: 20156, percentage: 60 },
      { category: 'Desktop', users: 10078, percentage: 30 },
      { category: 'Tablet', users: 3359, percentage: 10 },
    ],
  };
}

// Simulate async data fetching
export async function fetchGA4Data(): Promise<GA4DashboardData> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getMockGA4Data();
}
