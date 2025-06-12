"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Download,
  FileText,
  CalendarIcon,
  Clock,
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  BarChart3,
  Users,
  GraduationCap,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function ReportsManagement() {
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Monthly User Activity Report",
      type: "user_activity",
      status: "completed",
      createdDate: "2024-01-15",
      completedDate: "2024-01-15",
      fileSize: "2.4 MB",
      downloadCount: 45,
      recipient: "admin@campusconnect.com",
    },
    {
      id: 2,
      name: "College Performance Analysis",
      type: "college_performance",
      status: "processing",
      createdDate: "2024-01-20",
      completedDate: null,
      fileSize: null,
      downloadCount: 0,
      recipient: "analytics@campusconnect.com",
    },
    {
      id: 3,
      name: "Weekly Recommendation Trends",
      type: "recommendations",
      status: "scheduled",
      createdDate: "2024-01-22",
      completedDate: null,
      fileSize: null,
      downloadCount: 0,
      recipient: "reports@campusconnect.com",
    },
    {
      id: 4,
      name: "System Health Report",
      type: "system_health",
      status: "failed",
      createdDate: "2024-01-18",
      completedDate: null,
      fileSize: null,
      downloadCount: 0,
      recipient: "tech@campusconnect.com",
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const [newReport, setNewReport] = useState({
    name: "",
    type: "user_activity",
    description: "",
    recipient: "",
    scheduled: false,
    scheduledDate: new Date(),
    format: "pdf",
    includeCharts: true,
    includeDetails: true,
  });

  const reportTemplates = [
    {
      type: "user_activity",
      name: "User Activity Report",
      description: "Comprehensive analysis of user engagement and behavior",
      icon: Users,
      fields: [
        "User registrations",
        "Session data",
        "Page views",
        "Feature usage",
      ],
    },
    {
      type: "college_performance",
      name: "College Performance Report",
      description: "College rankings, ratings, and performance metrics",
      icon: GraduationCap,
      fields: [
        "Rankings",
        "User reviews",
        "Application trends",
        "Success metrics",
      ],
    },
    {
      type: "recommendations",
      name: "Recommendation Analytics",
      description: "AI recommendation effectiveness and user satisfaction",
      icon: BarChart3,
      fields: [
        "Recommendation accuracy",
        "User feedback",
        "Click-through rates",
        "Conversion data",
      ],
    },
    {
      type: "system_health",
      name: "System Health Report",
      description: "Technical performance and system reliability metrics",
      icon: FileText,
      fields: [
        "Server performance",
        "Database metrics",
        "Error logs",
        "Uptime statistics",
      ],
    },
  ];

  const filteredReports = reports.filter((report) => {
    const matchesStatus =
      filterStatus === "all" || report.status === filterStatus;
    const matchesType = filterType === "all" || report.type === filterType;
    return matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case "scheduled":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
        );
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCreateReport = () => {
    const report = {
      id: reports.length + 1,
      name: newReport.name,
      type: newReport.type,
      status: newReport.scheduled ? "scheduled" : "processing",
      createdDate: new Date().toISOString().split("T")[0],
      completedDate: null,
      fileSize: null,
      downloadCount: 0,
      recipient: newReport.recipient,
    };

    setReports([...reports, report]);
    setNewReport({
      name: "",
      type: "user_activity",
      description: "",
      recipient: "",
      scheduled: false,
      scheduledDate: new Date(),
      format: "pdf",
      includeCharts: true,
      includeDetails: true,
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Success",
      description: "Report generation initiated successfully!",
    });
  };

  const handleDownloadReport = (reportId) => {
    toast({
      title: "Download Started",
      description: "Your report is being downloaded...",
    });
  };

  const handleDeleteReport = (reportId) => {
    setReports(reports.filter((report) => report.id !== reportId));
    toast({
      title: "Success",
      description: "Report deleted successfully!",
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
                Reports Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Generate, schedule, and manage comprehensive system reports
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Bulk Download
              </Button>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Generate New Report</DialogTitle>
                    <DialogDescription>
                      Create a custom report with specific parameters and
                      scheduling options.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    {/* Report Templates */}
                    <div>
                      <Label className="text-base font-semibold">
                        Choose Report Template
                      </Label>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        {reportTemplates.map((template) => (
                          <div
                            key={template.type}
                            onClick={() =>
                              setNewReport({
                                ...newReport,
                                type: template.type,
                                name: template.name,
                              })
                            }
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              newReport.type === template.type
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <template.icon className="h-8 w-8 text-blue-600" />
                              <div>
                                <h3 className="font-medium">{template.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {template.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Report Configuration */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reportName">Report Name</Label>
                        <Input
                          id="reportName"
                          value={newReport.name}
                          onChange={(e) =>
                            setNewReport({ ...newReport, name: e.target.value })
                          }
                          placeholder="Enter report name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="recipient">Email Recipient</Label>
                        <Input
                          id="recipient"
                          type="email"
                          value={newReport.recipient}
                          onChange={(e) =>
                            setNewReport({
                              ...newReport,
                              recipient: e.target.value,
                            })
                          }
                          placeholder="recipient@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="description"
                        value={newReport.description}
                        onChange={(e) =>
                          setNewReport({
                            ...newReport,
                            description: e.target.value,
                          })
                        }
                        placeholder="Brief description of the report purpose"
                        rows={3}
                      />
                    </div>

                    {/* Format and Options */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Format</Label>
                        <Select
                          value={newReport.format}
                          onValueChange={(value) =>
                            setNewReport({ ...newReport, format: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2 mt-6">
                        <input
                          type="checkbox"
                          id="includeCharts"
                          checked={newReport.includeCharts}
                          onChange={(e) =>
                            setNewReport({
                              ...newReport,
                              includeCharts: e.target.checked,
                            })
                          }
                        />
                        <Label htmlFor="includeCharts">Include Charts</Label>
                      </div>
                      <div className="flex items-center space-x-2 mt-6">
                        <input
                          type="checkbox"
                          id="includeDetails"
                          checked={newReport.includeDetails}
                          onChange={(e) =>
                            setNewReport({
                              ...newReport,
                              includeDetails: e.target.checked,
                            })
                          }
                        />
                        <Label htmlFor="includeDetails">Include Details</Label>
                      </div>
                    </div>

                    {/* Scheduling */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="scheduled"
                          checked={newReport.scheduled}
                          onChange={(e) =>
                            setNewReport({
                              ...newReport,
                              scheduled: e.target.checked,
                            })
                          }
                        />
                        <Label htmlFor="scheduled">Schedule for later</Label>
                      </div>
                      {newReport.scheduled && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-48">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {format(newReport.scheduledDate, "PPP")}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={newReport.scheduledDate}
                              onSelect={(date) =>
                                setNewReport({
                                  ...newReport,
                                  scheduledDate: date || new Date(),
                                })
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateReport}>
                      {newReport.scheduled ? "Schedule Report" : "Generate Now"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
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
                    Total Reports
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {reports.length}
                  </p>
                </div>
                <FileText className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {reports.filter((r) => r.status === "completed").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Processing
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {reports.filter((r) => r.status === "processing").length}
                  </p>
                </div>
                <Clock className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Downloads
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {reports.reduce((sum, r) => sum + r.downloadCount, 0)}
                  </p>
                </div>
                <Download className="h-12 w-12 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-400" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="user_activity">User Activity</SelectItem>
                    <SelectItem value="college_performance">
                      College Performance
                    </SelectItem>
                    <SelectItem value="recommendations">
                      Recommendations
                    </SelectItem>
                    <SelectItem value="system_health">System Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reports List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                Generated Reports ({filteredReports.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {report.name}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Created:{" "}
                            {new Date(report.createdDate).toLocaleDateString()}
                          </p>
                          {report.fileSize && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Size: {report.fileSize}
                            </p>
                          )}
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Downloads: {report.downloadCount}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(report.status)}
                      <div className="flex items-center space-x-2">
                        {report.status === "completed" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadReport(report.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteReport(report.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
