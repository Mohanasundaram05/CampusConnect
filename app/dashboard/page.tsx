"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import ProtectedRoute from "@/components/protected-route";
import {
  User,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Shield,
  Users,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const getDashboardContent = () => {
    switch (user?.role) {
      case "admin":
        return {
          title: "Admin Dashboard",
          description: "Manage the CampusConnect platform",
          cards: [
            {
              title: "Total Users",
              value: "12,543",
              icon: Users,
              href: "/admin/users",
            },
            {
              title: "Total Colleges",
              value: "1,247",
              icon: GraduationCap,
              href: "/admin/colleges",
            },
            {
              title: "Analytics",
              value: "View Reports",
              icon: BarChart3,
              href: "/admin/analytics",
            },
            {
              title: "System Settings",
              value: "Configure",
              icon: Settings,
              href: "/admin/settings",
            },
          ],
        };
      case "counselor":
        return {
          title: "Counselor Dashboard",
          description: "Help students find their perfect college match",
          cards: [
            {
              title: "My Students",
              value: "45",
              icon: Users,
              href: "/counselor/students",
            },
            {
              title: "Recommendations",
              value: "Create New",
              icon: TrendingUp,
              href: "/recommendations",
            },
            {
              title: "College Database",
              value: "Browse",
              icon: GraduationCap,
              href: "/colleges",
            },
            {
              title: "Reports",
              value: "Generate",
              icon: BarChart3,
              href: "/reports",
            },
          ],
        };
      default:
        return {
          title: "Student Dashboard",
          description: "Your personalized college recommendation journey",
          cards: [
            {
              title: "My Profile",
              value: "Complete",
              icon: User,
              href: "/profile",
            },
            {
              title: "Recommendations",
              value: "Get Started",
              icon: TrendingUp,
              href: "/recommendations",
            },
            {
              title: "Compare Colleges",
              value: "Explore",
              icon: BookOpen,
              href: "/comparison",
            },
            {
              title: "AI Chat",
              value: "Ask Questions",
              icon: Bell,
              href: "/chatbot",
            },
          ],
        };
    }
  };

  const dashboardContent = getDashboardContent();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {dashboardContent.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {dashboardContent.description}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="flex items-center gap-2">
                  {user?.role === "admin" && <Shield className="h-4 w-4" />}
                  {user?.role === "counselor" && <Users className="h-4 w-4" />}
                  {user?.role === "student" && <User className="h-4 w-4" />}
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                </Badge>
                <Button variant="outline" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      Welcome back, {user?.firstName}!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {user?.email}
                    </p>
                    {!user?.isVerified && (
                      <Badge variant="destructive" className="mt-2">
                        Email not verified
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardContent.cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link href={card.href}>
                  <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{card.title}</CardTitle>
                        <card.icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {card.value}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="outline">
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/recommendations">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Get Recommendations
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/comparison">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Compare Colleges
                    </Link>
                  </Button>
                  {user?.role === "admin" && (
                    <Button asChild variant="outline">
                      <Link href="/admin">
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
