"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Shield,
  Lock,
  AlertTriangle,
  Ban,
  Clock,
  MapPin,
  Activity,
  Search,
  Download,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function SecurityManagement() {
  const [securityLogs, setSecurityLogs] = useState([
    {
      id: 1,
      timestamp: "2024-01-20 14:30:25",
      event: "Failed Login Attempt",
      user: "unknown",
      ip: "192.168.1.100",
      location: "Chennai, India",
      severity: "medium",
      status: "blocked",
    },
    {
      id: 2,
      timestamp: "2024-01-20 13:45:12",
      event: "Suspicious API Calls",
      user: "api_user_123",
      ip: "10.0.0.5",
      location: "Mumbai, India",
      severity: "high",
      status: "investigating",
    },
    {
      id: 3,
      timestamp: "2024-01-20 12:15:33",
      event: "Admin Access",
      user: "admin@campusconnect.com",
      ip: "192.168.1.1",
      location: "Bangalore, India",
      severity: "low",
      status: "allowed",
    },
    {
      id: 4,
      timestamp: "2024-01-20 11:22:45",
      event: "Password Change",
      user: "user@example.com",
      ip: "203.192.12.45",
      location: "Delhi, India",
      severity: "low",
      status: "completed",
    },
  ]);

  const [blockedIPs, setBlockedIPs] = useState([
    {
      ip: "192.168.1.100",
      reason: "Brute force attack",
      blockedAt: "2024-01-20 14:30:25",
      expiresAt: "2024-01-27 14:30:25",
    },
    {
      ip: "10.0.0.99",
      reason: "Suspicious activity",
      blockedAt: "2024-01-19 09:15:30",
      expiresAt: "Permanent",
    },
    {
      ip: "203.45.67.89",
      reason: "Malicious requests",
      blockedAt: "2024-01-18 16:45:12",
      expiresAt: "2024-01-25 16:45:12",
    },
  ]);

  const [filterSeverity, setFilterSeverity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isBlockIPDialogOpen, setIsBlockIPDialogOpen] = useState(false);
  const [newBlockedIP, setNewBlockedIP] = useState({
    ip: "",
    reason: "",
    duration: "7",
  });

  const filteredLogs = securityLogs.filter((log) => {
    const matchesSeverity =
      filterSeverity === "all" || log.severity === filterSeverity;
    const matchesSearch =
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm);
    return matchesSeverity && matchesSearch;
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "blocked":
        return <Badge className="bg-red-100 text-red-800">Blocked</Badge>;
      case "investigating":
        return (
          <Badge className="bg-orange-100 text-orange-800">Investigating</Badge>
        );
      case "allowed":
        return <Badge className="bg-green-100 text-green-800">Allowed</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleBlockIP = () => {
    if (!newBlockedIP.ip || !newBlockedIP.reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const blockedIP = {
      ip: newBlockedIP.ip,
      reason: newBlockedIP.reason,
      blockedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
      expiresAt:
        newBlockedIP.duration === "permanent"
          ? "Permanent"
          : new Date(
              Date.now() +
                Number.parseInt(newBlockedIP.duration) * 24 * 60 * 60 * 1000
            )
              .toISOString()
              .replace("T", " ")
              .substring(0, 19),
    };

    setBlockedIPs([...blockedIPs, blockedIP]);
    setNewBlockedIP({ ip: "", reason: "", duration: "7" });
    setIsBlockIPDialogOpen(false);

    toast({
      title: "Success",
      description: "IP address has been blocked successfully!",
    });
  };

  const handleUnblockIP = (ip) => {
    setBlockedIPs(blockedIPs.filter((blocked) => blocked.ip !== ip));
    toast({
      title: "Success",
      description: "IP address has been unblocked successfully!",
    });
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
                Security Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Monitor security events, manage access controls, and protect the
                platform
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
              <Dialog
                open={isBlockIPDialogOpen}
                onOpenChange={setIsBlockIPDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-red-600 to-red-700">
                    <Ban className="h-4 w-4 mr-2" />
                    Block IP
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Block IP Address</DialogTitle>
                    <DialogDescription>
                      Block an IP address from accessing the platform.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="ip">IP Address</Label>
                      <Input
                        id="ip"
                        value={newBlockedIP.ip}
                        onChange={(e) =>
                          setNewBlockedIP({
                            ...newBlockedIP,
                            ip: e.target.value,
                          })
                        }
                        placeholder="192.168.1.100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reason">Reason</Label>
                      <Input
                        id="reason"
                        value={newBlockedIP.reason}
                        onChange={(e) =>
                          setNewBlockedIP({
                            ...newBlockedIP,
                            reason: e.target.value,
                          })
                        }
                        placeholder="Suspicious activity"
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Block Duration</Label>
                      <Select
                        value={newBlockedIP.duration}
                        onValueChange={(value) =>
                          setNewBlockedIP({ ...newBlockedIP, duration: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Day</SelectItem>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="permanent">Permanent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsBlockIPDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleBlockIP}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Block IP
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        {/* Security Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Security Threats
                  </p>
                  <p className="text-3xl font-bold text-red-600">12</p>
                </div>
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Blocked IPs
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {blockedIPs.length}
                  </p>
                </div>
                <Ban className="h-12 w-12 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Failed Logins
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    45
                  </p>
                </div>
                <Lock className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Active Sessions
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    1,247
                  </p>
                </div>
                <Activity className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Events
                </CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={filterSeverity}
                    onValueChange={setFilterSeverity}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {log.event}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {log.user}
                            </p>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {log.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getSeverityBadge(log.severity)}
                        {getStatusBadge(log.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Blocked IPs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ban className="h-5 w-5" />
                  Blocked IP Addresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blockedIPs.map((blocked, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {blocked.ip}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {blocked.reason}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Blocked: {blocked.blockedAt}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Expires: {blocked.expiresAt}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnblockIP(blocked.ip)}
                        className="text-green-600 hover:text-green-700"
                      >
                        Unblock
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Security Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Security Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Require 2FA for all admin accounts
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Rate Limiting</h3>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Limit API requests per IP address
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">
                      Suspicious Activity Detection
                    </h3>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Monitor and alert on unusual patterns
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">IP Whitelisting</h3>
                    <Switch />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Only allow access from approved IPs
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Session Timeout</h3>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically logout inactive users
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Password Complexity</h3>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enforce strong password requirements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
