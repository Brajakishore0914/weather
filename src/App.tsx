import React, { useState } from 'react';
import { LineChart, BarChart, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';

// Mock data for demonstration
const mockTemperatureData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  temp: Math.round(20 + Math.sin(i / 3) * 5 + Math.random() * 2),
}));

const mockPrecipitationData = Array.from({ length: 7 }, (_, i) => ({
  day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
  chance: Math.round(Math.random() * 100),
}));

function App() {
  const [selectedLocation, setSelectedLocation] = useState('INDIA');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather Prediction Model</h1>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>NEW DELHI</option>
              <option>MUMBAI</option>
              <option>BHUBANESWAR</option>
              <option>HYDERABAD</option>
            </select>
            <span className="text-gray-600">Last updated: {new Date().toLocaleString()}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Thermometer className="w-6 h-6 text-red-500" />}
            title="Temperature"
            value="19°C"
            trend="+2.3°C"
            trendUp={true}
          />
          <MetricCard
            icon={<Droplets className="w-6 h-6 text-blue-500" />}
            title="Humidity"
            value="65%"
            trend="-5%"
            trendUp={false}
          />
          <MetricCard
            icon={<Wind className="w-6 h-6 text-gray-500" />}
            title="Wind Speed"
            value="12 km/h"
            trend="+3 km/h"
            trendUp={true}
          />
          <MetricCard
            icon={<CloudRain className="w-6 h-6 text-indigo-500" />}
            title="Precipitation"
            value="30%"
            trend="+5%"
            trendUp={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="24-Hour Temperature Forecast"
            icon={<LineChart className="w-5 h-5" />}
          >
            <div className="h-64 flex items-end space-x-2">
              {mockTemperatureData.map((data, i) => (
                <div
                  key={i}
                  className="flex-1 bg-blue-500 rounded-t"
                  style={{ height: `${(data.temp - 15) * 5}%` }}
                  title={`${data.temp}°C at ${data.hour}:00`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:00</span>
            </div>
          </ChartCard>

          <ChartCard
            title="7-Day Precipitation Forecast"
            icon={<BarChart className="w-5 h-5" />}
          >
            <div className="h-64 flex items-end justify-between">
              {mockPrecipitationData.map((data, i) => (
                <div key={i} className="flex flex-col items-center w-16">
                  <div
                    className="w-full bg-indigo-500 rounded-t"
                    style={{ height: `${data.chance}%` }}
                    title={`${data.chance}% chance on ${data.day}`}
                  />
                  <span className="mt-2 text-sm text-gray-600">{data.day}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, title, value, trend, trendUp }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className={`text-sm font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

function ChartCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        {icon}
        <h3 className="text-gray-800 font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default App;