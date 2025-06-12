"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, X, Star, MapPin, Award, Heart, Download, Share2, BarChart3 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"

interface College {
  id: string
  name: string
  location: string
  type: string
  ranking: number
  rating: number
  tuitionFee: number
  acceptanceRate: number
  studentCount: number
  establishedYear: number
  image: string
  programs: string[]
  facilities: string[]
  placement: {
    percentage: number
    averagePackage: number
    topPackage: number
  }
  cutoffs: {
    general: number
    obc: number
    sc: number
    st: number
  }
  hostelFee: number
  campusSize: string
  facultyRatio: string
  researchRating: number
  alumniRating: number
}

const mockColleges: College[] = [
  {
    id: "1",
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    type: "Government",
    ranking: 1,
    rating: 4.8,
    tuitionFee: 200000,
    acceptanceRate: 2.5,
    studentCount: 8500,
    establishedYear: 1961,
    image: "/placeholder.svg?height=200&width=300",
    programs: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"],
    facilities: ["Library", "Labs", "Sports Complex", "Hostels", "Medical Center"],
    placement: {
      percentage: 95,
      averagePackage: 1800000,
      topPackage: 5000000,
    },
    cutoffs: {
      general: 150,
      obc: 140,
      sc: 120,
      st: 110,
    },
    hostelFee: 25000,
    campusSize: "320 acres",
    facultyRatio: "1:8",
    researchRating: 4.9,
    alumniRating: 4.7,
  },
  {
    id: "2",
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai, Maharashtra",
    type: "Government",
    ranking: 2,
    rating: 4.7,
    tuitionFee: 200000,
    acceptanceRate: 2.8,
    studentCount: 9200,
    establishedYear: 1958,
    image: "/placeholder.svg?height=200&width=300",
    programs: ["Computer Science", "Chemical Engineering", "Aerospace Engineering", "Biotechnology"],
    facilities: ["Library", "Labs", "Sports Complex", "Hostels", "Innovation Center"],
    placement: {
      percentage: 93,
      averagePackage: 1750000,
      topPackage: 4800000,
    },
    cutoffs: {
      general: 155,
      obc: 145,
      sc: 125,
      st: 115,
    },
    hostelFee: 28000,
    campusSize: "550 acres",
    facultyRatio: "1:9",
    researchRating: 4.8,
    alumniRating: 4.6,
  },
  {
    id: "3",
    name: "Indian Institute of Science Bangalore",
    location: "Bangalore, Karnataka",
    type: "Government",
    ranking: 3,
    rating: 4.9,
    tuitionFee: 180000,
    acceptanceRate: 1.8,
    studentCount: 3500,
    establishedYear: 1909,
    image: "/placeholder.svg?height=200&width=300",
    programs: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    facilities: ["Research Labs", "Library", "Hostels", "Auditorium", "Sports Facilities"],
    placement: {
      percentage: 98,
      averagePackage: 2200000,
      topPackage: 6000000,
    },
    cutoffs: {
      general: 140,
      obc: 130,
      sc: 110,
      st: 100,
    },
    hostelFee: 22000,
    campusSize: "371 acres",
    facultyRatio: "1:6",
    researchRating: 5.0,
    alumniRating: 4.8,
  },
]

export default function CollegeComparison() {
  const { language } = useLanguage()
  const { theme } = useTheme()
  const [selectedColleges, setSelectedColleges] = useState<College[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const filteredColleges = mockColleges.filter(
    (college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedColleges.find((selected) => selected.id === college.id),
  )

  const addCollege = (college: College) => {
    if (selectedColleges.length < 4) {
      setSelectedColleges([...selectedColleges, college])
      setSearchTerm("")
      setShowSearch(false)
    }
  }

  const removeCollege = (collegeId: string) => {
    setSelectedColleges(selectedColleges.filter((college) => college.id !== collegeId))
  }

  const exportComparison = () => {
    const data = selectedColleges.map((college) => ({
      Name: college.name,
      Location: college.location,
      Ranking: college.ranking,
      Rating: college.rating,
      "Tuition Fee": `₹${college.tuitionFee.toLocaleString()}`,
      "Acceptance Rate": `${college.acceptanceRate}%`,
      "Student Count": college.studentCount.toLocaleString(),
      "Placement Rate": `${college.placement.percentage}%`,
      "Average Package": `₹${college.placement.averagePackage.toLocaleString()}`,
    }))

    const csvContent = [Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "college-comparison.csv"
    a.click()
  }

  const shareComparison = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "College Comparison - CampusConnect",
        text: `Comparing ${selectedColleges.map((c) => c.name).join(", ")}`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            College Comparison
          </h1>
          <p className="text-muted-foreground mt-2">Compare colleges side by side to make informed decisions</p>
        </div>

        <div className="flex gap-2">
          {selectedColleges.length > 0 && (
            <>
              <Button variant="outline" onClick={exportComparison} className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" onClick={shareComparison} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Add College Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search colleges to compare..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setShowSearch(e.target.value.length > 0)
                  }}
                  className="pl-10"
                />
              </div>

              {/* Search Results */}
              <AnimatePresence>
                {showSearch && searchTerm && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  >
                    {filteredColleges.length > 0 ? (
                      filteredColleges.map((college) => (
                        <div
                          key={college.id}
                          className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                          onClick={() => addCollege(college)}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={college.image || "/placeholder.svg"}
                              alt={college.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-medium">{college.name}</h4>
                              <p className="text-sm text-muted-foreground">{college.location}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">No colleges found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-sm text-muted-foreground">{selectedColleges.length}/4 colleges selected</div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Colleges */}
      {selectedColleges.length > 0 && (
        <div className="space-y-4">
          {/* College Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {selectedColleges.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => removeCollege(college.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <CardContent className="p-4">
                    <img
                      src={college.image || "/placeholder.svg"}
                      alt={college.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />

                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{college.name}</h3>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-muted-foreground">{college.location}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        <span>Rank #{college.ranking}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{college.rating}/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Detailed Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="academics">Academics</TabsTrigger>
                  <TabsTrigger value="placement">Placement</TabsTrigger>
                  <TabsTrigger value="fees">Fees</TabsTrigger>
                  <TabsTrigger value="facilities">Facilities</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Metric</th>
                          {selectedColleges.map((college) => (
                            <th key={college.id} className="text-center p-3 font-medium min-w-[200px]">
                              {college.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Location</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              {college.location}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Type</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              <Badge variant="secondary">{college.type}</Badge>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Ranking</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              <Badge variant="outline">#{college.ranking}</Badge>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Rating</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{college.rating}/5</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Established</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              {college.establishedYear}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Student Count</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              {college.studentCount.toLocaleString()}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="academics" className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Metric</th>
                          {selectedColleges.map((college) => (
                            <th key={college.id} className="text-center p-3 font-medium min-w-[200px]">
                              {college.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Acceptance Rate</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              <div className="space-y-2">
                                <div>{college.acceptanceRate}%</div>
                                <Progress value={college.acceptanceRate} className="h-2" />
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Faculty Ratio</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              {college.facultyRatio}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Research Rating</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Star className="h-4 w-4 fill-blue-400 text-blue-400" />
                                <span>{college.researchRating}/5</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Programs</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3">
                              <div className="flex flex-wrap gap-1 justify-center">
                                {college.programs.slice(0, 3).map((program, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {program}
                                  </Badge>
                                ))}
                                {college.programs.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{college.programs.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="placement" className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Metric</th>
                          {selectedColleges.map((college) => (
                            <th key={college.id} className="text-center p-3 font-medium min-w-[200px]">
                              {college.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Placement Rate</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              <div className="space-y-2">
                                <div className="font-semibold text-green-600">{college.placement.percentage}%</div>
                                <Progress value={college.placement.percentage} className="h-2" />
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Average Package</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center font-semibold">
                              ₹{(college.placement.averagePackage / 100000).toFixed(1)}L
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Highest Package</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center font-semibold text-green-600">
                              ₹{(college.placement.topPackage / 100000).toFixed(1)}L
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Alumni Rating</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                                <span>{college.alumniRating}/5</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="fees" className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Fee Type</th>
                          {selectedColleges.map((college) => (
                            <th key={college.id} className="text-center p-3 font-medium min-w-[200px]">
                              {college.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Tuition Fee (Annual)</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center font-semibold">
                              ₹{college.tuitionFee.toLocaleString()}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Hostel Fee (Annual)</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              ₹{college.hostelFee.toLocaleString()}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Total Cost (4 Years)</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center font-semibold text-blue-600">
                              ₹{((college.tuitionFee + college.hostelFee) * 4).toLocaleString()}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="facilities" className="mt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Aspect</th>
                          {selectedColleges.map((college) => (
                            <th key={college.id} className="text-center p-3 font-medium min-w-[200px]">
                              {college.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Campus Size</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3 text-center">
                              {college.campusSize}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-3 font-medium">Facilities</td>
                          {selectedColleges.map((college) => (
                            <td key={college.id} className="p-3">
                              <div className="flex flex-wrap gap-1 justify-center">
                                {college.facilities.map((facility, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {facility}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {selectedColleges.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No Colleges Selected</h3>
                <p className="text-muted-foreground">Search and select colleges above to start comparing them</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
