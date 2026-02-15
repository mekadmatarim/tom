'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DeviceCategory } from '../lib/mockGA4Data';

interface DeviceBreakdownProps {
  devices: DeviceCategory[];
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981'];

export default function DeviceBreakdown({ devices }: DeviceBreakdownProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        פילוח לפי מכשירים
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={devices}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ category, percentage }) => `${category}: ${percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="users"
          >
            {devices.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => value.toLocaleString('he-IL')} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-3">
        {devices.map((device, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{device.category}</span>
            </div>
            <div className="text-left">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {device.users.toLocaleString('he-IL')}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">משתמשים</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
