"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Save,
  Database,
  Mail,
  Shield,
  Bell,
  Server,
  Key,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "CampusConnect",
    siteDescription: "AI-Powered College Recommendation Platform",
    adminEmail: "admin@campusconnect.com",
    supportEmail: "support@campusconnect.com",
    maintenanceMode: false,
    registrationEnabled: true,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    systemAlerts: true,

    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    ipWhitelist: "",

    // Database Settings
    backupFrequency: "daily",
    retentionPeriod: 30,
    autoBackup: true,
    backupLocation: "cloud",

    // API Settings
    rateLimit: 1000,
    apiTimeout: 30,
    cacheExpiry: 3600,
    logLevel: "info",

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",
    emailTemplate: "default",
  });

  const handleSave = (section) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const handleMaintenanceToggle = (enabled) => {
    setSettings({ ...settings, maintenanceMode: enabled });
    toast({
      title: enabled ? "Maintenance Mode Enabled" : "Maintenance Mode Disabled",
      description: enabled
        ? "The platform is now in maintenance mode. Users will see a maintenance page."
        : "The platform is now live and accessible to users.",
      variant: enabled ? "destructive" : "default",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                System Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Configure system-wide settings and preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {settings.maintenanceMode && (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Maintenance Mode Active
                </Badge>
              )}
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Export Config
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Save className="h-4 w-4 mr-2" />
                Save All
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) =>
                          setSettings({ ...settings, siteName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="adminEmail">Admin Email</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            adminEmail: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          siteDescription: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Platform Controls</h3>

                    <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div>
                        <h4 className="font-medium text-red-900 dark:text-red-100">
                          Maintenance Mode
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          Enable to temporarily disable access for maintenance
                        </p>
                      </div>
                      <Switch
                        checked={settings.maintenanceMode}
                        onCheckedChange={handleMaintenanceToggle}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium">User Registration</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Allow new users to register on the platform
                        </p>
                      </div>
                      <Switch
                        checked={settings.registrationEnabled}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            registrationEnabled: checked,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSave("General")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save General Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="sessionTimeout">
                        Session Timeout (minutes)
                      </Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            sessionTimeout: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="passwordExpiry">
                        Password Expiry (days)
                      </Label>
                      <Input
                        id="passwordExpiry"
                        type="number"
                        value={settings.passwordExpiry}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            passwordExpiry: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="maxLoginAttempts">
                        Max Login Attempts
                      </Label>
                      <Input
                        id="maxLoginAttempts"
                        type="number"
                        value={settings.maxLoginAttempts}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            maxLoginAttempts: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Require 2FA for admin accounts
                        </p>
                      </div>
                      <Switch
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, twoFactorAuth: checked })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="ipWhitelist">
                      IP Whitelist (comma-separated)
                    </Label>
                    <Textarea
                      id="ipWhitelist"
                      value={settings.ipWhitelist}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          ipWhitelist: e.target.value,
                        })
                      }
                      placeholder="192.168.1.1, 10.0.0.1"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSave("Security")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Notification Channels
                    </h3>

                    {[
                      {
                        key: "emailNotifications",
                        label: "Email Notifications",
                        description: "Send notifications via email",
                      },
                      {
                        key: "pushNotifications",
                        label: "Push Notifications",
                        description: "Browser and mobile push notifications",
                      },
                      {
                        key: "smsNotifications",
                        label: "SMS Notifications",
                        description: "Critical alerts via SMS",
                      },
                      {
                        key: "weeklyReports",
                        label: "Weekly Reports",
                        description: "Send weekly summary reports",
                      },
                      {
                        key: "systemAlerts",
                        label: "System Alerts",
                        description: "Critical system alerts and warnings",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{item.label}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                        <Switch
                          checked={settings[item.key]}
                          onCheckedChange={(checked) =>
                            setSettings({ ...settings, [item.key]: checked })
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSave("Notifications")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Database Settings */}
          <TabsContent value="database">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Database Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="backupFrequency">Backup Frequency</Label>
                      <Select
                        value={settings.backupFrequency}
                        onValueChange={(value) =>
                          setSettings({ ...settings, backupFrequency: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="retentionPeriod">
                        Retention Period (days)
                      </Label>
                      <Input
                        id="retentionPeriod"
                        type="number"
                        value={settings.retentionPeriod}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            retentionPeriod: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium">Auto Backup</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Automatically backup database
                        </p>
                      </div>
                      <Switch
                        checked={settings.autoBackup}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, autoBackup: checked })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="backupLocation">Backup Location</Label>
                      <Select
                        value={settings.backupLocation}
                        onValueChange={(value) =>
                          setSettings({ ...settings, backupLocation: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Storage</SelectItem>
                          <SelectItem value="cloud">Cloud Storage</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Backup Now
                    </Button>
                    <Button onClick={() => handleSave("Database")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Database Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={settings.smtpHost}
                        onChange={(e) =>
                          setSettings({ ...settings, smtpHost: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        value={settings.smtpPort}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            smtpPort: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="smtpUsername">SMTP Username</Label>
                      <Input
                        id="smtpUsername"
                        value={settings.smtpUsername}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            smtpUsername: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={settings.smtpPassword}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            smtpPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Test Email
                    </Button>
                    <Button onClick={() => handleSave("Email")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Email Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    API Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="rateLimit">
                        Rate Limit (requests/hour)
                      </Label>
                      <Input
                        id="rateLimit"
                        type="number"
                        value={settings.rateLimit}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            rateLimit: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="apiTimeout">API Timeout (seconds)</Label>
                      <Input
                        id="apiTimeout"
                        type="number"
                        value={settings.apiTimeout}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            apiTimeout: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="cacheExpiry">
                        Cache Expiry (seconds)
                      </Label>
                      <Input
                        id="cacheExpiry"
                        type="number"
                        value={settings.cacheExpiry}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            cacheExpiry: Number.parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="logLevel">Log Level</Label>
                      <Select
                        value={settings.logLevel}
                        onValueChange={(value) =>
                          setSettings({ ...settings, logLevel: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warn">Warning</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline">
                      <Key className="h-4 w-4 mr-2" />
                      Generate API Key
                    </Button>
                    <Button onClick={() => handleSave("API")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save API Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
