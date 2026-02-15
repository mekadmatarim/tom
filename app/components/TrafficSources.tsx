'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrafficSource } from '../lib/mockGA4Data';

interface TrafficSourcesProps {
  sources: TrafficSource[];
}

export default function TrafficSources({ sources }: TrafficSourcesProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        מקורות תעבורה
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sources}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="source"
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value: number) => value.toLocaleString('he-IL')} />
          <Legend />
          <Bar dataKey="users" fill="#8b5cf6" name="משתמשים" />
          <Bar dataKey="sessions" fill="#3b82f6" name="סשנים" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {sources.map((source, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">{source.source}</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${source.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-left">
                {source.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
