'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimeSeriesData } from '../lib/mockGA4Data';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

export default function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        מגמות לאורך זמן (30 ימים אחרונים)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            labelFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('he-IL');
            }}
            formatter={(value: number) => value.toLocaleString('he-IL')}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#8b5cf6"
            name="משתמשים"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="#3b82f6"
            name="סשנים"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="pageViews"
            stroke="#10b981"
            name="צפיות בעמוד"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
