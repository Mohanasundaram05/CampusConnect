"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChartIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const cutoffData = [
  { year: "2019", CSE: 185, ECE: 175, MECH: 165, CIVIL: 155, EEE: 170 },
  { year: "2020", CSE: 190, ECE: 180, MECH: 170, CIVIL: 160, EEE: 175 },
  { year: "2021", CSE: 195, ECE: 185, MECH: 175, CIVIL: 165, EEE: 180 },
  { year: "2022", CSE: 200, ECE: 190, MECH: 180, CIVIL: 170, EEE: 185 },
  { year: "2023", CSE: 205, ECE: 195, MECH: 185, CIVIL: 175, EEE: 190 },
];

const collegeData = [
  { name: "IIT Madras", CSE: 210, ECE: 200, MECH: 190, CIVIL: 180 },
  { name: "Anna University", CSE: 180, ECE: 170, MECH: 160, CIVIL: 150 },
  { name: "SRM Institute", CSE: 160, ECE: 150, MECH: 140, CIVIL: 130 },
  { name: "VIT University", CSE: 170, ECE: 160, MECH: 150, CIVIL: 140 },
  { name: "PSG Tech", CSE: 185, ECE: 175, MECH: 165, CIVIL: 155 },
];

const categoryData = [
  { category: "OC", cutoff: 200 },
  { category: "BC", cutoff: 180 },
  { category: "MBC", cutoff: 160 },
  { category: "SC", cutoff: 140 },
  { category: "ST", cutoff: 120 },
];

export default function CutoffTrendsPage() {
  const [selectedCollege, setSelectedCollege] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("CSE");
  const [selectedCategory, setSelectedCategory] = useState("OC");
  const [chartType, setChartType] = useState("line");
  const { t } = useLanguage();

  const colleges = [
    "All Colleges",
    "IIT Madras",
    "Anna University",
    "SRM Institute",
    "VIT University",
    "PSG Tech",
  ];
  const courses = ["CSE", "ECE", "MECH", "CIVIL", "EEE"];
  const categories = ["OC", "BC", "MBC", "SC", "ST"];

  const getCurrentTrend = () => {
    const currentYear = cutoffData[cutoffData.length - 1][selectedCourse];
    const previousYear = cutoffData[cutoffData.length - 2][selectedCourse];
    return currentYear - previousYear;
  };

  const trend = getCurrentTrend();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {t("cutoff_trends.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Analyze historical cutoff data and predict future trends
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    College
                  </label>
                  <Select
                    value={selectedCollege}
                    onValueChange={setSelectedCollege}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem
                          key={college}
                          value={college.toLowerCase().replace(" ", "-")}
                        >
                          {college}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Course
                  </label>
                  <Select
                    value={selectedCourse}
                    onValueChange={setSelectedCourse}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Chart Type
                  </label>
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current Cutoff
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {cutoffData[cutoffData.length - 1][selectedCourse]}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Yearly Change
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      trend > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {trend > 0 ? "+" : ""}
                    {trend}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    trend > 0
                      ? "bg-red-100 dark:bg-red-900"
                      : "bg-green-100 dark:bg-green-900"
                  }`}
                >
                  {trend > 0 ? (
                    <TrendingUp className="h-6 w-6 text-red-600" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-green-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Predicted 2024
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {cutoffData[cutoffData.length - 1][selectedCourse] + trend}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <LineChartIcon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    5-Year Average
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(
                      cutoffData.reduce(
                        (sum, year) => sum + year[selectedCourse],
                        0
                      ) / cutoffData.length
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChartIcon className="h-5 w-5" />
                <span>Cutoff Trends Over Years</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "line" ? (
                    <LineChart data={cutoffData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey={selectedCourse}
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  ) : (
                    <BarChart data={cutoffData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={selectedCourse} fill="#3b82f6" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Branch-wise Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 mb-8"
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="/cot.png?height=500&width=600"
                alt="Cutoff data"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20" />
          </motion.div>

          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Category-wise Cutoffs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cutoff" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* College Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>College-wise Cutoff Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={collegeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="CSE" fill="#3b82f6" name="CSE" />
                    <Bar dataKey="ECE" fill="#8b5cf6" name="ECE" />
                    <Bar dataKey="MECH" fill="#10b981" name="MECH" />
                    <Bar dataKey="CIVIL" fill="#f59e0b" name="CIVIL" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
