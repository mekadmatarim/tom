'use client';

import { useEffect, useState } from 'react';
import { GA4DashboardData, fetchGA4Data } from './lib/mockGA4Data';

export default function Home() {
  const [data, setData] = useState<GA4DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const dashboardData = await fetchGA4Data();
        setData(dashboardData);
        setError(null);
      } catch (err) {
        console.error('Failed to load GA4 data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-red-600 text-xl mb-4">שגיאה בטעינת הנתונים</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-red-600">אין נתונים להצגה</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Google Analytics 4 Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            סקירת ביצועים - 30 ימים אחרונים
          </p>
        </header>

        {/* Simple Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Users */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">משתמשים</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.metrics.users.toLocaleString('he-IL')}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {data.metrics.newUsers.toLocaleString('he-IL')} משתמשים חדשים
            </p>
          </div>

          {/* Sessions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">סשנים</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.metrics.sessions.toLocaleString('he-IL')}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {(data.metrics.sessions / data.metrics.users).toFixed(2)} סשנים למשתמש
            </p>
          </div>

          {/* Page Views */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">צפיות בעמוד</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.metrics.pageViews.toLocaleString('he-IL')}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {(data.metrics.pageViews / data.metrics.sessions).toFixed(2)} עמודים לסשן
            </p>
          </div>

          {/* Bounce Rate */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">שיעור יציאה</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.metrics.bounceRate}%
            </p>
            <p className="text-sm text-gray-500 mt-2">
              משך סשן: {Math.floor(data.metrics.avgSessionDuration / 60)}:{(data.metrics.avgSessionDuration % 60).toString().padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            דפים מובילים
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    נתיב
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    צפיות
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                    משתמשים
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.topPages.map((page, index) => (
                  <tr key={index} className="border-t dark:border-gray-700">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {page.path}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {page.views.toLocaleString('he-IL')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {page.uniqueUsers.toLocaleString('he-IL')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            מקורות תעבורה
          </h2>
          <div className="space-y-4">
            {data.trafficSources.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{source.source}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {source.users.toLocaleString('he-IL')} משתמשים ({source.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            פילוח לפי מכשירים
          </h2>
          <div className="space-y-3">
            {data.deviceCategories.map((device, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">{device.category}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {device.users.toLocaleString('he-IL')} משתמשים
                  </span>
                  <span className="text-sm text-gray-500">
                    {device.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>נתוני GA4 לדוגמה - עודכנו: {new Date().toLocaleDateString('he-IL')}</p>
        </footer>
      </div>
    </div>
  );
}
