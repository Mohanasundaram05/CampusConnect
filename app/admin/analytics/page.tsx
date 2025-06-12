"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Download,
  Calendar,
  BarChart3,
  PieChartIcon,
  Activity,
} from "lucide-react";

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("users");

  const [userGrowthData] = useState([
    { date: "2024-01-01", users: 8500, colleges: 420, recommendations: 12000 },
    { date: "2024-01-08", users: 8920, colleges: 435, recommendations: 13200 },
    { date: "2024-01-15", users: 9350, colleges: 451, recommendations: 14100 },
    { date: "2024-01-22", users: 9780, colleges: 467, recommendations: 15300 },
    { date: "2024-01-29", users: 10200, colleges: 478, recommendations: 16500 },
    { date: "2024-02-05", users: 10650, colleges: 487, recommendations: 17800 },
    { date: "2024-02-12", users: 11100, colleges: 495, recommendations: 19200 },
    { date: "2024-02-19", users: 11580, colleges: 502, recommendations: 20600 },
    { date: "2024-02-26", users: 12000, colleges: 510, recommendations: 22100 },
    { date: "2024-03-05", users: 12450, colleges: 518, recommendations: 23700 },
    { date: "2024-03-12", users: 12920, colleges: 525, recommendations: 25400 },
    { date: "2024-03-19", users: 13400, colleges: 532, recommendations: 27200 },
  ]);

  const [deviceData] = useState([
    { name: "Desktop", value: 45, color: "#3B82F6" },
    { name: "Mobile", value: 40, color: "#10B981" },
    { name: "Tablet", value: 15, color: "#F59E0B" },
  ]);

  const [geographyData] = useState([
    { state: "Tamil Nadu", users: 3200, colleges: 120 },
    { state: "Karnataka", users: 2800, colleges: 95 },
    { state: "Andhra Pradesh", users: 2400, colleges: 85 },
    { state: "Telangana", users: 2100, colleges: 70 },
    { state: "Kerala", users: 1800, colleges: 60 },
    { state: "Maharashtra", users: 1600, colleges: 55 },
  ]);

  const [engagementData] = useState([
    { hour: "00", sessions: 120, pageViews: 450 },
    { hour: "03", sessions: 80, pageViews: 280 },
    { hour: "06", sessions: 200, pageViews: 720 },
    { hour: "09", sessions: 850, pageViews: 3200 },
    { hour: "12", sessions: 1200, pageViews: 4800 },
    { hour: "15", sessions: 950, pageViews: 3600 },
    { hour: "18", sessions: 1100, pageViews: 4200 },
    { hour: "21", sessions: 800, pageViews: 2900 },
  ]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Comprehensive insights into platform performance and user
                behavior
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Total Page Views
                    </p>
                    <p className="text-3xl font-bold">2.4M</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-blue-200 mr-1" />
                      <span className="text-blue-100 text-sm">
                        +12.5% from last month
                      </span>
                    </div>
                  </div>
                  <Activity className="h-12 w-12 text-blue-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">
                      Active Sessions
                    </p>
                    <p className="text-3xl font-bold">1,847</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-200 mr-1" />
                      <span className="text-green-100 text-sm">
                        +8.2% from last hour
                      </span>
                    </div>
                  </div>
                  <Users className="h-12 w-12 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">
                      Avg. Session Duration
                    </p>
                    <p className="text-3xl font-bold">8m 32s</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-purple-200 mr-1" />
                      <span className="text-purple-100 text-sm">
                        +15.3% from last week
                      </span>
                    </div>
                  </div>
                  <BarChart3 className="h-12 w-12 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">
                      Bounce Rate
                    </p>
                    <p className="text-3xl font-bold">24.3%</p>
                    <div className="flex items-center mt-2">
                      <TrendingDown className="h-4 w-4 text-orange-200 mr-1" />
                      <span className="text-orange-100 text-sm">
                        -5.1% from last month
                      </span>
                    </div>
                  </div>
                  <PieChartIcon className="h-12 w-12 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Growth Trends */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Growth Trends
                  </CardTitle>
                  <Select
                    value={selectedMetric}
                    onValueChange={setSelectedMetric}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">Users</SelectItem>
                      <SelectItem value="colleges">Colleges</SelectItem>
                      <SelectItem value="recommendations">
                        Recommendations
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Device Distribution */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Device Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Geographic Distribution and User Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Geographic Distribution */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={geographyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Engagement by Hour */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle>User Engagement by Hour</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sessions"
                      stroke="#3B82F6"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="pageViews"
                      stroke="#10B981"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Analytics */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    page: "/recommendations",
                    views: 45200,
                    bounce: "18.2%",
                    duration: "12m 34s",
                  },
                  {
                    page: "/college/iit-madras",
                    views: 38900,
                    bounce: "22.1%",
                    duration: "9m 45s",
                  },
                  {
                    page: "/comparison",
                    views: 32100,
                    bounce: "15.8%",
                    duration: "15m 12s",
                  },
                  {
                    page: "/cutoff-trends",
                    views: 28700,
                    bounce: "28.5%",
                    duration: "6m 23s",
                  },
                  {
                    page: "/courses",
                    views: 24300,
                    bounce: "31.2%",
                    duration: "5m 47s",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.page}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.views.toLocaleString()} views
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.bounce}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Bounce Rate
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.duration}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Avg. Duration
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
