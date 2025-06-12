"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  MapPin,
  DollarSign,
  TrendingUp,
  Search,
  Heart,
  Filter,
  Brain,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  Zap,
  BookOpen,
  Briefcase,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import BulkPDFGenerator from "@/components/bulk-pdf-generator"
import RankingSystem from "@/components/ranking-system"

const mockColleges = [
  {
    id: 1,
    name: "Indian Institute of Technology Madras",
    shortName: "IIT Madras",
    location: "Chennai",
    state: "Tamil Nadu",
    logo: "/cl2.png?height=80&width=80",
    rating: 4.8,
    predictedCutoff: 185,
    fees: "₹2.5L/year",
    placements: "₹25L avg",
    highestPackage: "₹1.2Cr",
    courses: ["Computer Science", "Electronics", "Mechanical", "Civil", "Chemical"],
    type: "Government",
    established: 1959,
    nirf: 1,
    accreditation: "NAAC A++",
    campus: "617 acres",
    faculty: "540+",
    students: "10,000+",
    facilities: ["Library", "Labs", "Sports", "Hostels", "Medical", "Research Centers"],
    admissionProcess: "JEE Advanced",
    applicationDeadline: "June 15, 2024",
    tags: ["Premier", "Research", "IIT"],
    strengths: ["Research Excellence", "Industry Connections", "Alumni Network"],
    weaknesses: ["High Competition", "Limited Seats"],
    placementRate: 95,
    researchRating: 5,
    infrastructureRating: 5,
    facultyRating: 5,
    industryConnections: 5,
    aiScore: 98,
    matchReasons: [
      "Excellent match for Computer Science",
      "Strong placement record in your preferred companies",
      "Research opportunities align with your interests",
    ],
  },
  {
    id: 2,
    name: "Anna University",
    shortName: "Anna University",
    location: "Chennai",
    state: "Tamil Nadu",
    logo: "/cl2.png?height=80&width=80",
    rating: 4.2,
    predictedCutoff: 165,
    fees: "₹1.2L/year",
    placements: "₹8L avg",
    highestPackage: "₹45L",
    courses: ["Computer Science", "Civil", "Electrical", "Mechanical", "ECE"],
    type: "Government",
    established: 1978,
    nirf: 15,
    accreditation: "NAAC A+",
    campus: "150 acres",
    faculty: "400+",
    students: "8,000+",
    facilities: ["Library", "Labs", "Sports", "Hostels"],
    admissionProcess: "TNEA",
    applicationDeadline: "July 10, 2024",
    tags: ["Government", "Affordable", "Established"],
    strengths: ["Affordable Fees", "Good Faculty", "Industry Recognition"],
    weaknesses: ["Limited Research", "Infrastructure"],
    placementRate: 78,
    researchRating: 3,
    infrastructureRating: 3,
    facultyRating: 4,
    industryConnections: 4,
    aiScore: 85,
    matchReasons: [
      "Affordable option with good ROI",
      "Strong in your preferred branch",
      "Good placement record for government college",
    ],
  },
  {
    id: 3,
    name: "SRM Institute of Science and Technology",
    shortName: "SRM Institute",
    location: "Chennai",
    state: "Tamil Nadu",
    logo: "/cl3.png?height=80&width=80",
    rating: 4.0,
    predictedCutoff: 145,
    fees: "₹3.5L/year",
    placements: "₹12L avg",
    highestPackage: "₹75L",
    courses: ["Computer Science", "Information Technology", "Aerospace", "Biotechnology"],
    type: "Private",
    established: 1985,
    nirf: 35,
    accreditation: "NAAC A+",
    campus: "250 acres",
    faculty: "600+",
    students: "15,000+",
    facilities: ["Library", "Labs", "Sports", "Hostels", "Medical", "Mall", "International Programs"],
    admissionProcess: "SRMJEEE",
    applicationDeadline: "May 30, 2024",
    tags: ["Private", "International", "Modern"],
    strengths: ["Modern Infrastructure", "International Exposure", "Industry Partnerships"],
    weaknesses: ["High Fees", "Large Student Body"],
    placementRate: 85,
    researchRating: 4,
    infrastructureRating: 5,
    facultyRating: 4,
    industryConnections: 4,
    aiScore: 82,
    matchReasons: [
      "Good balance of academics and placements",
      "Modern infrastructure and facilities",
      "Strong industry connections",
    ],
  },
  {
    id: 4,
    name: "Vellore Institute of Technology",
    shortName: "VIT University",
    location: "Chennai",
    state: "Tamil Nadu",
    logo: "/cl3.png?height=80&width=80",
    rating: 4.1,
    predictedCutoff: 155,
    fees: "₹4L/year",
    placements: "₹15L avg",
    highestPackage: "₹1Cr",
    courses: ["Computer Science", "Electronics", "Biotechnology", "Mechanical"],
    type: "Private",
    established: 1984,
    nirf: 28,
    accreditation: "NAAC A+",
    campus: "350 acres",
    faculty: "700+",
    students: "20,000+",
    facilities: ["Library", "Labs", "Sports", "Hostels", "Medical", "Innovation Centers"],
    admissionProcess: "VITEEE",
    applicationDeadline: "June 5, 2024",
    tags: ["Private", "Innovation", "Placements"],
    strengths: ["Excellent Placements", "Innovation Focus", "Industry Ready Curriculum"],
    weaknesses: ["High Fees", "Competitive Environment"],
    placementRate: 90,
    researchRating: 4,
    infrastructureRating: 5,
    facultyRating: 4,
    industryConnections: 5,
    aiScore: 88,
    matchReasons: [
      "Excellent placement opportunities",
      "Strong in emerging technologies",
      "Good match for your career goals",
    ],
  },
  {
    id: 5,
    name: "PSG College of Technology",
    shortName: "PSG Tech",
    location: "Coimbatore",
    state: "Tamil Nadu",
    logo: "/cl5.png?height=80&width=80",
    rating: 4.3,
    predictedCutoff: 170,
    fees: "₹1.8L/year",
    placements: "₹10L avg",
    highestPackage: "₹50L",
    courses: ["Computer Science", "Mechanical", "Civil", "ECE"],
    type: "Private",
    established: 1951,
    nirf: 42,
    accreditation: "NAAC A+",
    campus: "45 acres",
    faculty: "300+",
    students: "5,000+",
    facilities: ["Library", "Labs", "Sports", "Hostels", "Industry Partnerships"],
    admissionProcess: "TNEA",
    applicationDeadline: "July 10, 2024",
    tags: ["Heritage", "Industry", "Quality"],
    strengths: ["Industry Connections", "Quality Education", "Alumni Network"],
    weaknesses: ["Limited Campus Size", "Traditional Approach"],
    placementRate: 88,
    researchRating: 3,
    infrastructureRating: 4,
    facultyRating: 4,
    industryConnections: 5,
    aiScore: 86,
    matchReasons: ["Strong industry connections", "Good balance of fees and quality", "Excellent alumni network"],
  },
  {
    id: 6,
    name: "Thiagarajar College of Engineering",
    shortName: "TCE Madurai",
    location: "Madurai",
    state: "Tamil Nadu",
    logo: "/cl6.jpg?height=80&width=80",
    rating: 4.0,
    predictedCutoff: 160,
    fees: "₹1.5L/year",
    placements: "₹9L avg",
    highestPackage: "₹35L",
    courses: ["Computer Science", "Electronics", "Mechanical", "Civil"],
    type: "Private",
    established: 1957,
    nirf: 55,
    accreditation: "NAAC A",
    campus: "30 acres",
    faculty: "250+",
    students: "4,000+",
    facilities: ["Library", "Labs", "Sports", "Hostels"],
    admissionProcess: "TNEA",
    applicationDeadline: "July 10, 2024",
    tags: ["Affordable", "Quality", "Regional"],
    strengths: ["Affordable Fees", "Good Faculty", "Regional Opportunities"],
    weaknesses: ["Limited Exposure", "Smaller Campus"],
    placementRate: 75,
    researchRating: 3,
    infrastructureRating: 3,
    facultyRating: 4,
    industryConnections: 3,
    aiScore: 78,
    matchReasons: [
      "Affordable with decent placement record",
      "Good for regional opportunities",
      "Strong in core engineering",
    ],
  },
]

export default function RecommendationsPage() {
  const [colleges, setColleges] = useState(mockColleges)
  const [filteredColleges, setFilteredColleges] = useState(mockColleges)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    location: "all",
    type: "all",
    fees: [0, 500000],
    rating: [0, 5],
    nirf: [1, 100],
    course: "all",
  })
  const [sortBy, setSortBy] = useState("aiScore")
  const [viewMode, setViewMode] = useState("grid")
  const [favorites, setFavorites] = useState([])
  const [studentProfile, setStudentProfile] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    // Simulate loading and AI processing
    setIsLoading(true)
    setTimeout(() => {
      // Load student profile from localStorage
      const profile = localStorage.getItem("studentProfile")
      if (profile) {
        setStudentProfile(JSON.parse(profile))
      }
      setIsLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    let filtered = colleges

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.courses.some((course) => course.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Location filter
    if (filters.location !== "all") {
      filtered = filtered.filter((college) => college.location === filters.location)
    }

    // Type filter
    if (filters.type !== "all") {
      filtered = filtered.filter((college) => college.type === filters.type)
    }

    // Course filter
    if (filters.course !== "all") {
      filtered = filtered.filter((college) =>
        college.courses.some((course) => course.toLowerCase().includes(filters.course.toLowerCase())),
      )
    }

    // Fees filter
    const feesInNumber = (feesStr) => {
      return Number.parseFloat(feesStr.replace(/[₹L,]/g, "")) * 100000
    }
    filtered = filtered.filter((college) => {
      const fees = feesInNumber(college.fees)
      return fees >= filters.fees[0] && fees <= filters.fees[1]
    })

    // Rating filter
    filtered = filtered.filter((college) => college.rating >= filters.rating[0] && college.rating <= filters.rating[1])

    // NIRF filter
    filtered = filtered.filter((college) => college.nirf >= filters.nirf[0] && college.nirf <= filters.nirf[1])

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "aiScore":
          return b.aiScore - a.aiScore
        case "rating":
          return b.rating - a.rating
        case "cutoff":
          return a.predictedCutoff - b.predictedCutoff
        case "nirf":
          return a.nirf - b.nirf
        case "fees":
          return Number.parseFloat(a.fees.replace(/[₹L,]/g, "")) - Number.parseFloat(b.fees.replace(/[₹L,]/g, ""))
        case "placements":
          return (
            Number.parseFloat(b.placements.replace(/[₹L]/g, "")) - Number.parseFloat(a.placements.replace(/[₹L]/g, ""))
          )
        default:
          return 0
      }
    })

    setFilteredColleges(filtered)
  }, [searchTerm, filters, sortBy, colleges])

  const toggleFavorite = (collegeId) => {
    setFavorites((prev) => (prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId]))
  }

  const getMatchPercentage = (college) => {
    if (!studentProfile) return college.aiScore

    // AI-powered matching algorithm
    let score = 0

    // Cutoff match (30% weight)
    const cutoffScore = college.predictedCutoff <= 200 ? 100 : Math.max(0, 100 - (college.predictedCutoff - 200) * 2)
    score += cutoffScore * 0.3

    // Location preference (20% weight)
    const locationScore = studentProfile.locations?.includes(college.location) ? 100 : 70
    score += locationScore * 0.2

    // Course match (25% weight)
    const courseScore = college.courses.some((course) =>
      studentProfile.courses?.some((studentCourse) => studentCourse.toLowerCase().includes(course.toLowerCase())),
    )
      ? 100
      : 60
    score += courseScore * 0.25

    // Budget match (15% weight)
    const feesInNumber = Number.parseFloat(college.fees.replace(/[₹L,]/g, "")) * 100000
    const budgetScore = feesInNumber <= 300000 ? 100 : Math.max(0, 100 - (feesInNumber - 300000) / 10000)
    score += budgetScore * 0.15

    // College quality (10% weight)
    const qualityScore = (college.rating / 5) * 100
    score += qualityScore * 0.1

    return Math.round(Math.min(100, score))
  }

  const getMatchLevel = (score) => {
    if (score >= 90) return { level: "Excellent", color: "text-green-600", bg: "bg-green-100" }
    if (score >= 80) return { level: "Very Good", color: "text-blue-600", bg: "bg-blue-100" }
    if (score >= 70) return { level: "Good", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { level: "Fair", color: "text-gray-600", bg: "bg-gray-100" }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI is analyzing your profile...
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Finding the best college matches for you</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Recommendations
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {studentProfile
                  ? `Personalized recommendations for ${studentProfile.name}`
                  : "Smart college recommendations based on your preferences"}
              </p>
            </div>
          </div>

          {/* AI Insights */}
          {studentProfile && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="backdrop-blur-sm bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">AI Analysis Complete</h3>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Predicted Score:</span>
                          <span className="ml-2 font-semibold">
                            {Math.round(
                              (Number.parseInt(studentProfile.physics) +
                                Number.parseInt(studentProfile.chemistry) +
                                Number.parseInt(studentProfile.maths) * 2) /
                                4,
                            )}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Eligible Colleges:</span>
                          <span className="ml-2 font-semibold">{filteredColleges.length}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Best Match:</span>
                          <span className="ml-2 font-semibold">{filteredColleges[0]?.shortName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Search and Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search colleges, locations, or courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2">
                  <Select
                    value={filters.type}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aiScore">AI Match Score</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="cutoff">Cutoff</SelectItem>
                      <SelectItem value="nirf">NIRF Ranking</SelectItem>
                      <SelectItem value="fees">Fees</SelectItem>
                      <SelectItem value="placements">Placements</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Fees Range */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Annual Fees Range</Label>
                        <Slider
                          value={filters.fees}
                          onValueChange={(value) => setFilters((prev) => ({ ...prev, fees: value }))}
                          max={500000}
                          step={50000}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>₹{(filters.fees[0] / 100000).toFixed(1)}L</span>
                          <span>₹{(filters.fees[1] / 100000).toFixed(1)}L</span>
                        </div>
                      </div>

                      {/* Rating Range */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Minimum Rating</Label>
                        <Slider
                          value={filters.rating}
                          onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: value }))}
                          max={5}
                          step={0.1}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{filters.rating[0].toFixed(1)}</span>
                          <span>{filters.rating[1].toFixed(1)}</span>
                        </div>
                      </div>

                      {/* NIRF Ranking */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">NIRF Ranking Range</Label>
                        <Slider
                          value={filters.nirf}
                          onValueChange={(value) => setFilters((prev) => ({ ...prev, nirf: value }))}
                          min={1}
                          max={100}
                          step={1}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>#{filters.nirf[0]}</span>
                          <span>#{filters.nirf[1]}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300">
              Showing {filteredColleges.length} colleges • Sorted by {sortBy.replace(/([A-Z])/g, " $1").toLowerCase()}
            </p>
            <div className="flex items-center space-x-4">
              <BulkPDFGenerator colleges={filteredColleges} studentProfile={studentProfile} />
              <Tabs value={viewMode} onValueChange={setViewMode}>
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                  <TabsTrigger value="rankings">AI Rankings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </motion.div>

        {/* College Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Tabs value={viewMode}>
            <TabsContent value="grid">
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredColleges.map((college, index) => {
                  const matchScore = getMatchPercentage(college)
                  const matchLevel = getMatchLevel(matchScore)

                  return (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      <Card className="h-full backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={college.logo || "/placeholder.svg"}
                                alt={college.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                                  {college.shortName}
                                </CardTitle>
                                <div className="flex items-center space-x-2 mt-1">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-600 dark:text-gray-300">{college.location}</span>
                                </div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Award className="h-4 w-4 text-yellow-500" />
                                  <span className="text-sm text-gray-600 dark:text-gray-300">NIRF #{college.nirf}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleFavorite(college.id)}
                                className="p-2"
                              >
                                <Heart
                                  className={`h-5 w-5 ${
                                    favorites.includes(college.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                                  }`}
                                />
                              </Button>
                              <Badge className={`${matchLevel.bg} ${matchLevel.color} border-0`}>
                                {matchScore}% Match
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {matchLevel.level}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* AI Match Reasons */}
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <Brain className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                Why this matches you:
                              </span>
                            </div>
                            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                              {college.matchReasons.slice(0, 2).map((reason, idx) => (
                                <li key={idx} className="flex items-start space-x-1">
                                  <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Key Stats */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                              <div className="flex items-center space-x-2">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm font-medium">{college.rating}/5</span>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="h-4 w-4 text-blue-500" />
                                <span className="text-sm font-medium">{college.predictedCutoff}</span>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">Predicted Cutoff</p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4 text-green-500" />
                                <span className="text-sm font-medium">{college.fees}</span>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">Annual Fees</p>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                              <div className="flex items-center space-x-2">
                                <Briefcase className="h-4 w-4 text-purple-500" />
                                <span className="text-sm font-medium">{college.placements}</span>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">Avg Package</p>
                            </div>
                          </div>

                          {/* Quick Info */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Placement Rate:</span>
                              <span className="font-medium">{college.placementRate}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Application Deadline:</span>
                              <span className="font-medium text-red-600">{college.applicationDeadline}</span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {college.tags.slice(0, 3).map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2 pt-4">
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                              <Link href={`/college/${college.id}`}>
                                <BookOpen className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              asChild
                            >
                              <Link href="/comparison">
                                <Target className="mr-2 h-4 w-4" />
                                Compare
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="list">
              <div className="space-y-4">
                {filteredColleges.map((college, index) => {
                  const matchScore = getMatchPercentage(college)
                  const matchLevel = getMatchLevel(matchScore)

                  return (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={college.logo || "/placeholder.svg"}
                                alt={college.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <h3 className="font-bold text-lg">{college.shortName}</h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                                  <span className="flex items-center space-x-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{college.location}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <Star className="h-3 w-3 text-yellow-500" />
                                    <span>{college.rating}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <Award className="h-3 w-3 text-blue-500" />
                                    <span>NIRF #{college.nirf}</span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <Badge className={`${matchLevel.bg} ${matchLevel.color} border-0 mb-1`}>
                                  {matchScore}% Match
                                </Badge>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {college.fees} • {college.placements}
                                </p>
                              </div>

                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/college/${college.id}`}>View</Link>
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => toggleFavorite(college.id)}>
                                  <Heart
                                    className={`h-4 w-4 ${
                                      favorites.includes(college.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                                    }`}
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>
            <TabsContent value="rankings">
              <RankingSystem
                colleges={filteredColleges}
                onRankingChange={(rankedColleges) => setFilteredColleges(rankedColleges)}
              />
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Load More */}
        {filteredColleges.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              Load More Colleges
            </Button>
          </motion.div>
        )}

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Try adjusting your filters or search terms</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setFilters({
                  location: "all",
                  type: "all",
                  fees: [0, 500000],
                  rating: [0, 5],
                  nirf: [1, 100],
                  course: "all",
                })
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
