'use client';

import { ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Loader2 } from 'lucide-react';

interface ChartProps {
  title: string;
  description: string;
  type: 'area' | 'pie';
  data: any[];
  isLoading: boolean;
  dataKey?: string;
  color?: string;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export default function ChartContainer({ title, description, type, data, isLoading, dataKey = 'value', color = '#3b82f6' }: ChartProps) {
  
  const hasData = data && data.length > 0;

  if (isLoading) {
    return (
      <div className="h-full w-full min-h-[350px] bg-[#161b22] border border-gray-800 rounded-xl flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="h-full w-full min-h-[350px] bg-[#161b22] border border-gray-800 rounded-xl p-6 flex items-center justify-center text-center">
        <div>
          <p className="text-gray-400 text-sm">No chart data available yet.</p>
          <p className="text-gray-500 text-xs mt-2">Either the GitHub API response is empty or the repository has no recent commits.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full min-h-[350px] bg-[#161b22] border border-gray-800 rounded-xl p-6 flex flex-col">
      <div className="mb-6">
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-gray-500 text-xs">{description}</p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
              <XAxis dataKey="name" stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                fill={`url(#gradient-${dataKey})`} 
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#fff' }} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}