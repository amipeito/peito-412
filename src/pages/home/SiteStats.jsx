import React, { useEffect, useState } from 'react';
import { FaCalendarDay, FaCalendarWeek, FaChartBar } from 'react-icons/fa';

const API_URL = 'http://localhost:3000/api/visit';

const SiteStats = () => {
  const [stats, setStats] = useState({ today: 0, week: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ثبت بازدید
    fetch(`${API_URL}/register`, { method: 'POST' });
    // دریافت آمار
    fetch(`${API_URL}/stats`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 my-6 justify-center items-center">
      <StatCard icon={<FaCalendarDay size={28} />} label="بازدید امروز" value={stats.today} loading={loading} />
      <StatCard icon={<FaCalendarWeek size={28} />} label="بازدید این هفته" value={stats.week} loading={loading} />
      <StatCard icon={<FaChartBar size={28} />} label="بازدید کل" value={stats.total} loading={loading} />
    </div>
  );
};

const StatCard = ({ icon, label, value, loading }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg px-6 py-4 flex flex-col items-center w-56">
    <div className="text-blue-500 mb-2">{icon}</div>
    <div className="text-lg font-bold mb-1 text-gray-800 dark:text-gray-100">{label}</div>
    <div className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
      {loading ? '...' : value}
    </div>
  </div>
);

export default SiteStats; 