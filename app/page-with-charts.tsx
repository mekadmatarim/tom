'use client';

import { useEffect, useState } from 'react';
import MetricCard from './components/MetricCard';
import TimeSeriesChart from './components/TimeSeriesChart';
import TopPagesTable from './components/TopPagesTable';
import TrafficSources from './components/TrafficSources';
import DeviceBreakdown from './components/DeviceBreakdown';
import { GA4DashboardData, fetchGA4Data } from './lib/mockGA4Data';

export default function Home() {
  const [data, setData] = useState<GA4DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const dashboardData = await fetchGA4Data();
        setData(dashboardData);
      } catch (error) {
        console.error('Failed to load GA4 data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-red-600">שגיאה בטעינת הנתונים</p>
      </div>
    );
  }

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Google Analytics 4 Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                סקירת ביצועים - 30 ימים אחרונים
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>נתונים מעודכנים</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="משתמשים"
            value={data.metrics.users}
            subtitle={`${data.metrics.newUsers.toLocaleString('he-IL')} משתמשים חדשים`}
            trend={{ value: 12.5, isPositive: true }}
            icon="👥"
          />
          <MetricCard
            title="סשנים"
            value={data.metrics.sessions}
            subtitle={`${(data.metrics.sessions / data.metrics.users).toFixed(2)} סשנים למשתמש`}
            trend={{ value: 8.3, isPositive: true }}
            icon="📊"
          />
          <MetricCard
            title="צפיות בעמוד"
            value={data.metrics.pageViews}
            subtitle={`${(data.metrics.pageViews / data.metrics.sessions).toFixed(2)} עמודים לסשן`}
            trend={{ value: 5.7, isPositive: true }}
            icon="📄"
          />
          <MetricCard
            title="שיעור יציאה"
            value={`${data.metrics.bounceRate}%`}
            subtitle={`משך סשן ממוצע: ${formatDuration(data.metrics.avgSessionDuration)}`}
            trend={{ value: 2.1, isPositive: false }}
            icon="⏱️"
          />
        </div>

        {/* Conversions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <MetricCard
            title="המרות"
            value={data.metrics.conversions}
            subtitle="מטרות שהושגו"
            trend={{ value: 15.2, isPositive: true }}
            icon="🎯"
          />
          <MetricCard
            title="שיעור המרה"
            value={`${data.metrics.conversionRate}%`}
            subtitle="מהסשנים הכוללים"
            trend={{ value: 3.4, isPositive: true }}
            icon="💰"
          />
        </div>

        {/* Time Series Chart */}
        <div className="mb-8">
          <TimeSeriesChart data={data.timeSeriesData} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TrafficSources sources={data.trafficSources} />
          <DeviceBreakdown devices={data.deviceCategories} />
        </div>

        {/* Top Pages Table */}
        <div className="mb-8">
          <TopPagesTable pages={data.topPages} />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>נתוני GA4 לדוגמה - עודכנו לאחרונה: {new Date().toLocaleDateString('he-IL')}</p>
        </footer>
      </main>
    </div>
  );
}
