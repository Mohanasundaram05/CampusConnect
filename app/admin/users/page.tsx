"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, UserPlus, Edit, Trash2, Eye, Mail, Phone, Calendar, Users, UserCheck, Download } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 9876543210",
      role: "student",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-20",
      profileComplete: 95,
      recommendationsGenerated: 12,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul.kumar@email.com",
      phone: "+91 9876543211",
      role: "student",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-19",
      profileComplete: 87,
      recommendationsGenerated: 8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Dr. Anita Patel",
      email: "anita.patel@email.com",
      phone: "+91 9876543212",
      role: "counselor",
      status: "active",
      joinDate: "2023-12-01",
      lastLogin: "2024-01-20",
      profileComplete: 100,
      recommendationsGenerated: 45,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Admin User",
      email: "admin@campusconnect.com",
      phone: "+91 9876543213",
      role: "admin",
      status: "active",
      joinDate: "2023-01-01",
      lastLogin: "2024-01-20",
      profileComplete: 100,
      recommendationsGenerated: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Inactive User",
      email: "inactive@email.com",
      phone: "+91 9876543214",
      role: "student",
      status: "inactive",
      joinDate: "2023-11-15",
      lastLogin: "2023-12-01",
      profileComplete: 45,
      recommendationsGenerated: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedUser, setSelectedUser] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([]) // For bulk operations

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
    toast({
      title: "Success",
      description: "User deleted successfully!",
    })
  }

  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: newStatus } : user)))
    toast({
      title: "Success",
      description: `User status updated to ${newStatus}!`,
    })
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setIsViewDialogOpen(true)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>
      case "suspended":
        return <Badge className="bg-yellow-100 text-yellow-800">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
      case "counselor":
        return <Badge className="bg-blue-100 text-blue-800">Counselor</Badge>
      case "student":
        return <Badge className="bg-gray-100 text-gray-800">Student</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    students: users.filter((u) => u.role === "student").length,
    counselors: users.filter((u) => u.role === "counselor").length,
    admins: users.filter((u) => u.role === "admin").length,
  }

  // Bulk Operations Handlers
  const handleBulkActivate = () => {
    // Implement bulk activate logic here
    console.log("Bulk Activate", selectedUsers)
    toast({ title: "Bulk Activate", description: `Activated ${selectedUsers.length} users.` })
  }

  const handleBulkDeactivate = () => {
    // Implement bulk deactivate logic here
    console.log("Bulk Deactivate", selectedUsers)
    toast({ title: "Bulk Deactivate", description: `Deactivated ${selectedUsers.length} users.` })
  }

  const handleBulkRoleChange = (newRole) => {
    // Implement bulk role change logic here
    console.log("Bulk Role Change to", newRole, selectedUsers)
    toast({ title: "Bulk Role Change", description: `Changed role for ${selectedUsers.length} users to ${newRole}.` })
  }

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId) ? prevSelected.filter((id) => id !== userId) : [...prevSelected, userId],
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Manage user accounts, roles, and permissions</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{userStats.total}</p>
                </div>
                <Users className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{userStats.active}</p>
                </div>
                <UserCheck className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Students</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{userStats.students}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Counselors</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{userStats.counselors}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{userStats.admins}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="counselor">Counselors</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bulk Operations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card>
            <CardContent className="p-6">
              <CardTitle>Bulk Operations</CardTitle>
              <div className="flex space-x-4">
                <Button onClick={handleBulkActivate} disabled={selectedUsers.length === 0}>
                  Activate Selected
                </Button>
                <Button onClick={handleBulkDeactivate} disabled={selectedUsers.length === 0}>
                  Deactivate Selected
                </Button>
                <Select
                  onValueChange={(newRole) => handleBulkRoleChange(newRole)}
                  disabled={selectedUsers.length === 0}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Change Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="counselor">Counselor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Users Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
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
                              setSelectedUsers(filteredUsers.map((user) => user.id))
                            } else {
                              setSelectedUsers([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Profile</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleCheckboxChange(user.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">ID: {user.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 text-gray-400 mr-1" />
                              {user.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 text-gray-400 mr-1" />
                              {user.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                            {new Date(user.joinDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{new Date(user.lastLogin).toLocaleDateString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${user.profileComplete}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{user.profileComplete}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
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

        {/* User Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>Detailed information about the selected user.</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {selectedUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      {getRoleBadge(selectedUser.role)}
                      {getStatusBadge(selectedUser.status)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-sm">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Join Date</label>
                    <p className="text-sm">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Login</label>
                    <p className="text-sm">{new Date(selectedUser.lastLogin).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Profile Completion</label>
                    <p className="text-sm">{selectedUser.profileComplete}%</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Recommendations Generated</label>
                    <p className="text-sm">{selectedUser.recommendationsGenerated}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button>Edit User</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
