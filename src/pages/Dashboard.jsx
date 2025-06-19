import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CSVLink } from 'react-csv';

const COLORS = ['#6366F1', '#22C55E', '#F59E0B', '#EF4444', '#0EA5E9', '#EC4899', '#8B5CF6'];

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [tags, setTags] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const projects = JSON.parse(localStorage.getItem('freelancerProjects')) || [];
    const timers = JSON.parse(localStorage.getItem('freelancerTimers')) || {};
    const projectTags = JSON.parse(localStorage.getItem('freelancerTags')) || {};

    const data = projects.map((proj) => {
      const rawTag = projectTags[proj] || 'General';
      return {
        name: proj,
        seconds: timers[proj] || 0,
        value: timers[proj] || 0,
        tag: rawTag,
      };
    });

    setChartData(data);
    setTags(projectTags);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Project Summary', 14, 16);
    const tableColumn = ['Project', 'Time Spent', 'Tags'];
    const tableRows = chartData.map((proj) => [
      proj.name,
      formatTime(proj.seconds),
      proj.tag,
    ]);
    autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: 'bold' },
    bodyStyles: { fillColor: [245, 245, 245] },
    theme: 'striped',
  });

    doc.save('project_summary.pdf');
  };

  const csvData = chartData.map((proj) => ({
    Project: proj.name,
    'Time Spent': formatTime(proj.seconds),
    Tags: proj.tag,
  }));

  return (
    <div className="p-8 space-y-10 bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700">📊 Time Tracking Dashboard</h2>

      <div className="flex justify-center gap-4 mb-6">
        <CSVLink data={csvData} filename={'project_summary.csv'} className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition">
          Export CSV
        </CSVLink>
        <button onClick={downloadPDF} className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition">
          Export PDF
        </button>
      </div>

      <div className="grid xl:grid-cols-4 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 col-span-2">
          <h3 className="text-lg font-bold mb-4 text-indigo-600">📶 Time per Project</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="seconds" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 col-span-1">
          <h3 className="text-lg font-bold mb-4 text-indigo-600">🧩 Time Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 col-span-1">
          <h3 className="text-lg font-bold mb-4 text-indigo-600">📈 Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="seconds" stroke="#22C55E" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4 text-indigo-600">🕸️ Distribution Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius={120} data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <Radar dataKey="seconds" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <h3 className="text-lg font-bold mb-4 text-indigo-600">📋 Project Summary</h3>
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="px-4 py-2">Project</th>
              <th className="px-4 py-2">Time Spent</th>
              <th className="px-4 py-2">Tags</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((proj, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-4 py-2 font-semibold">{proj.name}</td>
                <td className="px-4 py-2">{formatTime(proj.seconds)}</td>
                <td className="px-4 py-2">{proj.tag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
