"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
  X,
  ArrowRight,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import BulkPDFGenerator from "@/components/bulk-pdf-generator"
import RankingSystem from "@/components/ranking-system"
import { College } from "@/lib/types"

const mockColleges: College[] = [
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
    type: "Government",
    established: 1951,
    nirf: 40,
    accreditation: "NAAC A+",
    campus: "45 acres",
    faculty: "300+",
    students: "5,000+",
    facilities: ["Library", "Labs", "Sports", "Hostels"],
    admissionProcess: "TNEA",
    applicationDeadline: "July 12, 2024",
    tags: ["Established", "Industry-Oriented", "Government-Aided"],
    strengths: ["Strong Industry Links", "Experienced Faculty", "Good Placements"],
    weaknesses: ["Older Infrastructure", "Limited Campus Size"],
    placementRate: 88,
    researchRating: 4,
    infrastructureRating: 3,
    facultyRating: 4,
    industryConnections: 5,
    aiScore: 86,
    matchReasons: [
      "Strong in Mechanical and Civil Engineering",
      "Good industry connections in Coimbatore",
      "Affordable fees with good ROI",
    ],
  },
  {
    id: 6,
    name: "Amrita Vishwa Vidyapeetham",
    shortName: "Amrita",
    location: "Coimbatore",
    state: "Tamil Nadu",
    logo: "/cl4.png?height=80&width=80",
    rating: 4.5,
    predictedCutoff: 160,
    fees: "₹3.2L/year",
    placements: "₹14L avg",
    highestPackage: "₹80L",
    courses: ["Computer Science", "AI & Data Science", "Robotics", "Wireless Networks"],
    type: "Private",
    established: 1994,
    nirf: 7,
    accreditation: "NAAC A++",
    campus: "400 acres",
    faculty: "500+",
    students: "12,000+",
    facilities: ["Library", "Labs", "Sports", "Hostels", "Medical", "Spiritual Centers"],
    admissionProcess: "AEEE",
    applicationDeadline: "May 25, 2024",
    tags: ["Research", "Spiritual", "Multi-disciplinary"],
    strengths: ["Research Focus", "Holistic Development", "Modern Curriculum"],
    weaknesses: ["Strict Campus Rules", "Remote Location"],
    placementRate: 92,
    researchRating: 5,
    infrastructureRating: 4,
    facultyRating: 5,
    industryConnections: 4,
    aiScore: 90,
    matchReasons: [
      "Good for research-focused students",
      "Vibrant campus life with many clubs",
      "Located in a major tech hub",
    ],
  },
]

const FiltersSidebar = ({
  t,
  searchQuery,
  setSearchQuery,
  selectedState,
  setSelectedState,
  states,
  selectedType,
  setSelectedType,
  collegeTypes,
  feeRange,
  setFeeRange,
  rating,
  setRating,
}: {
  t: (key: string) => string
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedState: string
  setSelectedState: (value: string) => void
  states: string[]
  selectedType: string
  setSelectedType: (value: string) => void
  collegeTypes: string[]
  feeRange: number[]
  setFeeRange: (value: number[]) => void
  rating: number[]
  setRating: (value: number[]) => void
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Filter className="h-5 w-5" />
        {t("recommendations.filters.title")}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {/* Search by Name */}
      <div className="space-y-2">
        <Label htmlFor="search-name">{t("recommendations.filters.search_by_name")}</Label>
        <div className="relative">
          <Input
            id="search-name"
            type="text"
            placeholder="e.g., IIT Madras"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Filter by State */}
      <div className="space-y-2">
        <Label htmlFor="state-filter">{t("recommendations.filters.filter_by_state")}</Label>
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger id="state-filter">
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filter by Type */}
      <div className="space-y-2">
        <Label htmlFor="type-filter">{t("recommendations.filters.filter_by_type")}</Label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger id="type-filter">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {collegeTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filter by Fees */}
      <div className="space-y-2">
        <Label htmlFor="fees-filter">{t("recommendations.filters.max_fees")} (₹{feeRange[0]}L/year)</Label>
        <Slider
          id="fees-filter"
          min={0}
          max={10}
          step={0.5}
          value={feeRange}
          onValueChange={setFeeRange}
        />
      </div>

      {/* Filter by Rating */}
      <div className="space-y-2">
        <Label htmlFor="rating-filter">{t("recommendations.filters.min_rating")} ({rating[0]} stars)</Label>
        <Slider
          id="rating-filter"
          min={0}
          max={5}
          step={0.1}
          value={rating}
          onValueChange={setRating}
        />
      </div>
    </CardContent>
  </Card>
)


export default function RecommendationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [feeRange, setFeeRange] = useState([10])
  const [rating, setRating] = useState([0])
  const [sortBy, setSortBy] = useState("aiScore")
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  const [states] = useState(["Tamil Nadu", "Kerala", "Andhra Pradesh", "Karnataka", "Telangana"])
  const [collegeTypes] = useState(["Government", "Private"])

  const [selectedCollege, setSelectedCollege] = useState<College | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Fee conversion utility
  const feesInNumber = (feesStr: string) => {
    if (!feesStr) return 0
    const match = feesStr.match(/₹([\d.]+)/)
    return match ? parseFloat(match[1]) : 0
  }

  // Filter and sort colleges
  const filteredColleges = useMemo(() => {
    let currentColleges: College[] = [...mockColleges]

    // Search query filter
    if (searchQuery) {
      currentColleges = currentColleges.filter(
        (college) =>
          college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          college.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          college.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // State filter
    if (selectedState !== "all") {
      currentColleges = currentColleges.filter((c) => c.state === selectedState)
    }
    
    // Type filter
    if (selectedType !== "all") {
      currentColleges = currentColleges.filter((c) => c.type === selectedType)
    }

    // Fee range filter
    currentColleges = currentColleges.filter(
      (c) => feesInNumber(c.fees) <= feeRange[0]
    )

    // Rating filter
    currentColleges = currentColleges.filter((c) => c.rating >= rating[0])

    if (showFavorites) {
      currentColleges = currentColleges.filter(c => favorites.includes(c.id))
    }

    // Sorting logic
    currentColleges.sort((a, b) => {
      switch (sortBy) {
        case "aiScore":
          return b.aiScore - a.aiScore
        case "rating":
          return b.rating - a.rating
        case "fees_asc":
          return feesInNumber(a.fees) - feesInNumber(b.fees)
        case "fees_desc":
          return feesInNumber(b.fees) - feesInNumber(a.fees)
        case "placements":
          return feesInNumber(b.placements) - feesInNumber(a.placements)
        default:
          return 0
      }
    })

    return currentColleges
  }, [searchQuery, selectedState, selectedType, feeRange, rating, sortBy, showFavorites, favorites])

  const toggleFavorite = (collegeId: number) => {
    setFavorites((prev) =>
      prev.includes(collegeId)
        ? prev.filter((id) => id !== collegeId)
        : [...prev, collegeId]
    )
  }

  const getMatchPercentage = (college: College) => {
    // This is a placeholder for a more complex matching algorithm
    const score = college.aiScore || 0
    return Math.min(Math.round((score / 100) * 100), 100)
  }

  const getMatchLevel = (score: number) => {
    if (score > 90) return { text: "Excellent Match", color: "bg-green-500" }
    if (score > 80) return { text: "Good Match", color: "bg-blue-500" }
    if (score > 70) return { text: "Fair Match", color: "bg-yellow-500" }
    return { text: "Considerable", color: "bg-gray-500" }
  }

  // Handle college selection for modal
  const handleSelectCollege = (college: College) => {
    setSelectedCollege(college)
  }

  // Card component for individual colleges
  const CollegeCard = ({
    college,
    isFavorite,
    onToggleFavorite,
    onSelect,
  }: {
    college: College
    isFavorite: boolean
    onToggleFavorite: (id: number) => void
    onSelect: () => void
  }) => {
    const matchPercent = getMatchPercentage(college)
    const matchLevel = getMatchLevel(matchPercent)

    return (
      <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        <CardHeader className="p-0 relative">
          <img
            src={`/c${college.id}.jpg`}
            alt={college.name}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="sm"
              className={`p-2 rounded-full ${
                isFavorite ? "bg-red-500/80 text-white" : "bg-white/80"
              }`}
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite(college.id)
              }}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          <div
            className={`absolute top-2 left-2 px-3 py-1 text-xs font-bold text-white rounded-full ${matchLevel.color}`}
          >
            {matchLevel.text}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex items-start gap-4">
            <img
              src={college.logo}
              alt={`${college.shortName} logo`}
              className="w-12 h-12 rounded-lg object-contain border"
            />
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {college.name}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {college.location}, {college.state}
              </p>
            </div>
          </div>

          <div className="flex-1 mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Rating:</span>
              <span className="font-bold flex items-center gap-1">
                {college.rating} <Star className="h-4 w-4 text-yellow-400" />
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Cutoff:</span>
              <span className="font-bold flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> ~{college.predictedCutoff}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Avg. Fees:</span>
              <span className="font-bold flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> {college.fees}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <Button className="w-full" onClick={onSelect}>
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-t-blue-600 border-gray-200"
            />
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Finding your perfect match...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t("recommendations.title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("recommendations.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Filters Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <FiltersSidebar
                t={t}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                states={states}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                collegeTypes={collegeTypes}
                feeRange={feeRange}
                setFeeRange={setFeeRange}
                rating={rating}
                setRating={setRating}
              />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    {t("recommendations.filters.title")}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{t("recommendations.filters.title")}</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                  <FiltersSidebar
                    t={t}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    states={states}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    collegeTypes={collegeTypes}
                    feeRange={feeRange}
                    setFeeRange={setFeeRange}
                    rating={rating}
                    setRating={setRating}
                  />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            <Tabs defaultValue="recommended" className="w-full">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="recommended">
                    <Brain className="mr-2 h-4 w-4" /> {t("recommendations.tabs.recommended")}
                  </TabsTrigger>
                  <TabsTrigger value="all">
                    <Award className="mr-2 h-4 w-4" /> {t("recommendations.tabs.all_colleges")}
                  </TabsTrigger>
                  <TabsTrigger value="favorites" onClick={() => setShowFavorites(!showFavorites)} className="relative">
                    <Heart className="mr-2 h-4 w-4" /> {t("recommendations.tabs.favorites")}
                    {favorites.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                        {favorites.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aiScore">{t("recommendations.sort.ai_score")}</SelectItem>
                      <SelectItem value="rating">{t("recommendations.sort.rating")}</SelectItem>
                      <SelectItem value="fees_asc">{t("recommendations.sort.fees_asc")}</SelectItem>
                      <SelectItem value="fees_desc">{t("recommendations.sort.fees_desc")}</SelectItem>
                      <SelectItem value="placements">{t("recommendations.sort.placements")}</SelectItem>
                    </SelectContent>
                  </Select>
                  
                </div>
              </div>

              <TabsContent value="recommended">
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredColleges.slice(0, 6).map((college, index) => (
                    <motion.div
                      key={college.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CollegeCard
                        college={college}
                        isFavorite={favorites.includes(college.id)}
                        onToggleFavorite={toggleFavorite}
                        onSelect={() => handleSelectCollege(college)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="all">
                <AnimatePresence>
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {filteredColleges.map((college, index) => (
                      <motion.div
                        key={college.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <CollegeCard
                          college={college}
                          isFavorite={favorites.includes(college.id)}
                          onToggleFavorite={toggleFavorite}
                          onSelect={() => handleSelectCollege(college)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
               <TabsContent value="favorites">
                <AnimatePresence>
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {filteredColleges.filter(c => favorites.includes(c.id)).map((college, index) => (
                      <motion.div
                        key={college.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <CollegeCard
                          college={college}
                          isFavorite={favorites.includes(college.id)}
                          onToggleFavorite={toggleFavorite}
                          onSelect={() => handleSelectCollege(college)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* College Details Modal */}
      <AnimatePresence>
        {selectedCollege && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedCollege(null)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <CardHeader className="flex flex-row items-start justify-between p-6 border-b dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <img src={selectedCollege.logo} alt={`${selectedCollege.name} logo`} className="w-16 h-16 rounded-lg object-contain" />
                  <div>
                    <CardTitle className="text-2xl font-bold">{selectedCollege.name}</CardTitle>
                    <p className="text-gray-500 dark:text-gray-400">{selectedCollege.location}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCollege(null)} className="p-2 rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-6 flex-1 overflow-y-auto">
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="placements">Placements</TabsTrigger>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-bold text-lg mb-2">Details</h3>
                        <div className="space-y-2 text-sm">
                          <p><strong>Established:</strong> {selectedCollege.established}</p>
                          <p><strong>Type:</strong> {selectedCollege.type}</p>
                          <p><strong>NIRF Ranking:</strong> {selectedCollege.nirf}</p>
                          <p><strong>Accreditation:</strong> {selectedCollege.accreditation}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Ratings</h3>
                        <div className="space-y-2 text-sm">
                          <p><strong>Overall:</strong> {selectedCollege.rating} <Star className="h-4 w-4 inline text-yellow-400" /></p>
                          <p><strong>Research:</strong> {selectedCollege.researchRating}/5</p>
                          <p><strong>Infrastructure:</strong> {selectedCollege.infrastructureRating}/5</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="placements" className="mt-4">
                     <p><strong>Average Package:</strong> {selectedCollege.placements}</p>
                     <p><strong>Highest Package:</strong> {selectedCollege.highestPackage}</p>
                     <p><strong>Placement Rate:</strong> {selectedCollege.placementRate}%</p>
                  </TabsContent>
                  <TabsContent value="courses" className="mt-4">
                    <ul className="list-disc list-inside">
                      {selectedCollege.courses.map(c => <li key={c}>{c}</li>)}
                    </ul>
                  </TabsContent>
                   <TabsContent value="reviews" className="mt-4">
                      <p>Reviews coming soon!</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
