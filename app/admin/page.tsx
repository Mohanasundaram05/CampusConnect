"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  School,
  UserCheck,
  FileText,
  Settings,
  BarChart3,
  Calendar,
  Shield,
  Bell,
  Server,
  Database,
  Network,
  Download,
  Power,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Link from "next/link";

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

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 12543,
    totalColleges: 487,
    activeRecommendations: 8921,
    systemHealth: 98.5,
    newUsersToday: 156,
    newCollegesToday: 3,
    reportsGenerated: 2341,
    avgResponseTime: 245,
  });

  const [userGrowthData] = useState([
    { month: "Jan", users: 8500, colleges: 420 },
    { month: "Feb", users: 9200, colleges: 435 },
    { month: "Mar", users: 10100, colleges: 451 },
    { month: "Apr", users: 10800, colleges: 467 },
    { month: "May", users: 11600, colleges: 478 },
    { month: "Jun", users: 12543, colleges: 487 },
    { month: "Jul", users: 13200, colleges: 495 },
    { month: "Aug", users: 14000, colleges: 505 },
  ]);

  const [categoryData] = useState([
    { name: "Engineering", value: 65, color: "#3B82F6" },
    { name: "Medical", value: 20, color: "#10B981" },
    { name: "Management", value: 10, color: "#F59E0B" },
    { name: "Arts & Science", value: 5, color: "#EF4444" },
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      type: "user_registration",
      message: "New user registered: Priya Sharma",
      time: "2 minutes ago",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "college_added",
      message: "New college added: IIT Madras",
      time: "15 minutes ago",
      icon: School,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "report_generated",
      message: "PDF report generated for Anna University",
      time: "1 hour ago",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "system_alert",
      message: "High server load detected",
      time: "2 hours ago",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      id: 5,
      type: "bulk_operation",
      message: "Bulk user deletion initiated",
      time: "3 hours ago",
      icon: Users,
      color: "text-red-600",
    },
  ]);

  const quickActions = [
    {
      title: "Manage Colleges",
      description: "Add, edit, or remove college information",
      icon: School,
      href: "/admin/colleges",
      color: "bg-blue-500",
    },
    {
      title: "User Management",
      description: "View and manage user accounts",
      icon: Users,
      href: "/admin/users",
      color: "bg-green-500",
    },
    {
      title: "Analytics",
      description: "View detailed system analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "bg-purple-500",
    },
    {
      title: "System Settings",
      description: "Configure system parameters",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-orange-500",
    },
    {
      title: "Reports",
      description: "Generate and view reports",
      icon: FileText,
      href: "/admin/reports",
      color: "bg-pink-500",
    },
    {
      title: "Security",
      description: "Manage security and permissions",
      icon: Shield,
      href: "/admin/security",
      color: "bg-red-500",
    },
  ];

  const bulkOperations = [
    {
      title: "Delete Users",
      description: "Mass delete user accounts",
      icon: Users,
      color: "bg-red-500",
      action: () => alert("Delete Users action"),
    },
    {
      title: "Send Notifications",
      description: "Send bulk notifications to users",
      icon: Bell,
      color: "bg-blue-500",
      action: () => alert("Send Notifications action"),
    },
    {
      title: "Generate Reports",
      description: "Generate reports for all colleges",
      icon: FileText,
      color: "bg-purple-500",
      action: () => alert("Generate Reports action"),
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      message: "High CPU usage on server 1",
      severity: "critical",
    },
    {
      id: 2,
      message: "Database connection errors",
      severity: "warning",
    },
    {
      id: 3,
      message: "API response time exceeding threshold",
      severity: "medium",
    },
  ];

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New user registered", time: "2 minutes ago" },
    { id: 2, message: "College data updated", time: "15 minutes ago" },
  ]);

  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleExportData = () => {
    alert("Exporting dashboard data...");
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
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Welcome back! Here's what's happening with CampusConnect today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                System Online
              </Badge>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
              <Button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                variant="outline"
              >
                <Power className="h-4 w-4 mr-2" />
                {maintenanceMode
                  ? "Disable Maintenance Mode"
                  : "Enable Maintenance Mode"}
              </Button>
              <Button onClick={handleExportData} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <div className="relative">
                <Button variant="outline">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {notifications.length}
                  </span>
                </Button>
                {notifications.length > 0 && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      {notifications.map((notification) => (
                        <a
                          key={notification.id}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          {notification.message} - {notification.time}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* System Alerts Panel */}
        {systemAlerts.length > 0 && (
          <motion.div variants={fadeInUp} className="mb-8">
            <Card className="bg-red-100 border-red-200 dark:bg-red-900 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-800 dark:text-red-200 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {systemAlerts.map((alert) => (
                    <li key={alert.id} className="py-2">
                      <span className="font-medium text-red-700 dark:text-red-300">
                        {alert.message}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {" "}
                        - {alert.severity}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stats Grid */}
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
                      Total Users
                    </p>
                    <div className="flex items-center">
                      <p className="text-3xl font-bold">
                        {stats.totalUsers.toLocaleString()}
                      </p>
                      <TrendingUp className="h-5 w-5 ml-2 text-green-300" />
                      <span className="text-green-300 text-sm ml-1">(5%)</span>
                    </div>
                    <p className="text-blue-100 text-sm">
                      +{stats.newUsersToday} today
                    </p>
                  </div>
                  <Users className="h-12 w-12 text-blue-200" />
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
                      Total Colleges
                    </p>
                    <div className="flex items-center">
                      <p className="text-3xl font-bold">
                        {stats.totalColleges}
                      </p>
                      <TrendingUp className="h-5 w-5 ml-2 text-green-300" />
                      <span className="text-green-300 text-sm ml-1">(2%)</span>
                    </div>
                    <p className="text-green-100 text-sm">
                      +{stats.newCollegesToday} today
                    </p>
                  </div>
                  <GraduationCap className="h-12 w-12 text-green-200" />
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
                      Active Recommendations
                    </p>
                    <div className="flex items-center">
                      <p className="text-3xl font-bold">
                        {stats.activeRecommendations.toLocaleString()}
                      </p>
                      <TrendingUp className="h-5 w-5 ml-2 text-green-300" />
                      <span className="text-green-300 text-sm ml-1">(8%)</span>
                    </div>
                    <p className="text-purple-100 text-sm">This month</p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-purple-200" />
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
                      System Health
                    </p>
                    <div className="flex items-center">
                      <p className="text-3xl font-bold">
                        {stats.systemHealth}%
                      </p>
                      <TrendingUp className="h-5 w-5 ml-2 text-green-300" />
                      <span className="text-green-300 text-sm ml-1">(1%)</span>
                    </div>
                    <p className="text-orange-100 text-sm">
                      {stats.avgResponseTime}ms avg response
                    </p>
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-4 border-orange-200 flex items-center justify-center">
                      <div className="w-6 h-6 bg-orange-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* System Monitoring Widgets */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Server Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  Online
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Server 1
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  98%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Optimal
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                API Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  250ms
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Average Response Time
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Growth Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#3B82F6"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="colleges"
                      stroke="#10B981"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Distribution */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  College Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
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

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                          >
                            <action.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${activity.color}`}
                      >
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Activities
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Bulk Operations */}
        <motion.div variants={fadeInUp} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Bulk Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bulkOperations.map((operation, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    onClick={operation.action}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${operation.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <operation.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {operation.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {operation.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Status */}
        <motion.div variants={fadeInUp} className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Database Performance
                    </span>
                    <span className="text-sm text-green-600">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      API Response Time
                    </span>
                    <span className="text-sm text-green-600">Good</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Server Load</span>
                    <span className="text-sm text-yellow-600">Moderate</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
