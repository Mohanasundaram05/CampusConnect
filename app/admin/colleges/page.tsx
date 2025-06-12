"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Star,
  MapPin,
  Users,
  GraduationCap,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

export default function CollegeManagement() {
  const [colleges, setColleges] = useState([
    {
      id: 1,
      name: "Indian Institute of Technology Madras",
      location: "Chennai, Tamil Nadu",
      type: "Government",
      rating: 4.8,
      nirf: 1,
      students: 12000,
      courses: 45,
      status: "active",
      fees: "₹2.5L",
      established: 1959,
    },
    {
      id: 2,
      name: "Anna University",
      location: "Chennai, Tamil Nadu",
      type: "Government",
      rating: 4.2,
      nirf: 15,
      students: 45000,
      courses: 120,
      status: "active",
      fees: "₹1.2L",
      established: 1978,
    },
    {
      id: 3,
      name: "SRM Institute of Science and Technology",
      location: "Chennai, Tamil Nadu",
      type: "Private",
      rating: 4.0,
      nirf: 35,
      students: 38000,
      courses: 85,
      status: "active",
      fees: "₹3.5L",
      established: 1985,
    },
    {
      id: 4,
      name: "VIT University",
      location: "Vellore, Tamil Nadu",
      type: "Private",
      rating: 4.1,
      nirf: 28,
      students: 42000,
      courses: 95,
      status: "pending",
      fees: "₹4.2L",
      established: 1984,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [ratingRange, setRatingRange] = useState([0, 5]);

  const [newCollege, setNewCollege] = useState({
    name: "",
    location: "",
    type: "Government",
    rating: "",
    nirf: "",
    students: "",
    courses: "",
    fees: "",
    established: "",
    description: "",
  });

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch =
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" ||
      college.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus =
      filterStatus === "all" || college.status === filterStatus;
    const matchesDateRange =
      !dateRange?.from ||
      !dateRange?.to ||
      (college.established >= new Date(dateRange.from).getFullYear() &&
        college.established <= new Date(dateRange.to).getFullYear());
    const matchesRatingRange =
      college.rating >= ratingRange[0] && college.rating <= ratingRange[1];
    return (
      matchesSearch &&
      matchesType &&
      matchesStatus &&
      matchesDateRange &&
      matchesRatingRange
    );
  });

  const handleAddCollege = () => {
    if (!newCollege.name || !newCollege.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const college = {
      id: colleges.length + 1,
      ...newCollege,
      rating: Number.parseFloat(newCollege.rating) || 0,
      nirf: Number.parseInt(newCollege.nirf) || 0,
      students: Number.parseInt(newCollege.students) || 0,
      courses: Number.parseInt(newCollege.courses) || 0,
      established:
        Number.parseInt(newCollege.established) || new Date().getFullYear(),
      status: "pending",
    };

    setColleges([...colleges, college]);
    setNewCollege({
      name: "",
      location: "",
      type: "Government",
      rating: "",
      nirf: "",
      students: "",
      courses: "",
      fees: "",
      established: "",
      description: "",
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Success",
      description: "College added successfully!",
    });
  };

  const handleDeleteCollege = (id) => {
    setColleges(colleges.filter((college) => college.id !== id));
    toast({
      title: "Success",
      description: "College deleted successfully!",
    });
  };

  const handleBulkDelete = () => {
    if (selectedColleges.length === 0) {
      toast({
        title: "Error",
        description: "Please select colleges to delete.",
        variant: "destructive",
      });
      return;
    }

    setColleges(
      colleges.filter((college) => !selectedColleges.includes(college.id))
    );
    setSelectedColleges([]);
    toast({
      title: "Success",
      description: "Colleges deleted successfully!",
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setColleges(
      colleges.map((college) =>
        college.id === id ? { ...college, status: newStatus } : college
      )
    );
    toast({
      title: "Success",
      description: `College status updated to ${newStatus}!`,
    });
  };

  const handleBulkStatusChange = (newStatus) => {
    if (selectedColleges.length === 0) {
      toast({
        title: "Error",
        description: "Please select colleges to update status.",
        variant: "destructive",
      });
      return;
    }

    setColleges(
      colleges.map((college) =>
        selectedColleges.includes(college.id)
          ? { ...college, status: newStatus }
          : college
      )
    );
    setSelectedColleges([]);
    toast({
      title: "Success",
      description: `College statuses updated to ${newStatus}!`,
    });
  };

  const handleCollegeSelect = (id) => {
    setSelectedColleges((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((collegeId) => collegeId !== id)
        : [...prevSelected, id]
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
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
                College Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Manage college information, courses, and details
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add College
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New College</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new college to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="col-span-2">
                      <Label htmlFor="name">College Name *</Label>
                      <Input
                        id="name"
                        value={newCollege.name}
                        onChange={(e) =>
                          setNewCollege({ ...newCollege, name: e.target.value })
                        }
                        placeholder="Enter college name"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={newCollege.location}
                        onChange={(e) =>
                          setNewCollege({
                            ...newCollege,
                            location: e.target.value,
                          })
                        }
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newCollege.type}
                        onValueChange={(value) =>
                          setNewCollege({ ...newCollege, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Government">Government</SelectItem>
                          <SelectItem value="Private">Private</SelectItem>
                          <SelectItem value="Deemed">Deemed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="established">Established</Label>
                      <Input
                        id="established"
                        type="number"
                        value={newCollege.established}
                        onChange={(e) =>
                          setNewCollege({
                            ...newCollege,
                            established: e.target.value,
                          })
                        }
                        placeholder="Year"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rating">Rating</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        max="5"
                        value={newCollege.rating}
                        onChange={(e) =>
                          setNewCollege({
                            ...newCollege,
                            rating: e.target.value,
                          })
                        }
                        placeholder="0.0 - 5.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nirf">NIRF Ranking</Label>
                      <Input
                        id="nirf"
                        type="number"
                        value={newCollege.nirf}
                        onChange={(e) =>
                          setNewCollege({ ...newCollege, nirf: e.target.value })
                        }
                        placeholder="NIRF rank"
                      />
                    </div>
                    <div>
                      <Label htmlFor="students">Total Students</Label>
                      <Input
                        id="students"
                        type="number"
                        value={newCollege.students}
                        onChange={(e) =>
                          setNewCollege({
                            ...newCollege,
                            students: e.target.value,
                          })
                        }
                        placeholder="Number of students"
                      />
                    </div>
                    <div>
                      <Label htmlFor="courses">Total Courses</Label>
                      <Input
                        id="courses"
                        type="number"
                        value={newCollege.courses}
                        onChange={(e) =>
                          setNewCollege({
                            ...newCollege,
                            courses: e.target.value,
                          })
                        }
                        placeholder="Number of courses"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fees">Annual Fees</Label>
                      <Input
                        id="fees"
                        value={newCollege.fees}
                        onChange={(e) =>
                          setNewCollege({ ...newCollege, fees: e.target.value })
                        }
                        placeholder="₹2.5L"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newCollege.description}
                        onChange={(e) =>
                          setNewCollege({
                            ...newCollege,
                            description: e.target.value,
                          })
                        }
                        placeholder="Brief description about the college"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddCollege}>Add College</Button>
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
                    Total Colleges
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {colleges.length}
                  </p>
                </div>
                <GraduationCap className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Active Colleges
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {colleges.filter((c) => c.status === "active").length}
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
                    Pending Review
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {colleges.filter((c) => c.status === "pending").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Avg Rating
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {(
                      colleges.reduce((sum, c) => sum + c.rating, 0) /
                      colleges.length
                    ).toFixed(1)}
                  </p>
                </div>
                <Star className="h-12 w-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search colleges by name or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="deemed">Deemed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                          !dateRange?.from ? "text-muted-foreground" : undefined
                        )}
                      >
                        {dateRange?.from ? (
                          dateRange.to ? (
                            `${format(
                              dateRange.from,
                              "MMM dd, yyyy"
                            )} - ${format(dateRange.to, "MMM dd, yyyy")}`
                          ) : (
                            format(dateRange.from, "MMM dd, yyyy")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="center"
                      side="bottom"
                    >
                      <Calendar
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bulk Operations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Bulk Operations</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button variant="destructive" onClick={handleBulkDelete}>
                Delete Selected
              </Button>
              <Button onClick={() => handleBulkStatusChange("active")}>
                Approve Selected
              </Button>
              <Button onClick={() => handleBulkStatusChange("pending")}>
                Set Selected to Pending
              </Button>
              <Button onClick={() => handleBulkStatusChange("inactive")}>
                Set Selected to Inactive
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Colleges Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Colleges ({filteredColleges.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedColleges(
                                colleges.map((college) => college.id)
                              );
                            } else {
                              setSelectedColleges([]);
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>College</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>NIRF</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredColleges.map((college) => (
                      <TableRow key={college.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedColleges.includes(college.id)}
                            onChange={() => handleCollegeSelect(college.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{college.name}</div>
                            <div className="text-sm text-gray-500">
                              Est. {college.established}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                            {college.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{college.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {college.rating}
                          </div>
                        </TableCell>
                        <TableCell>#{college.nirf}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-gray-400 mr-1" />
                            {college.students.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(college.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCollege(college.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
