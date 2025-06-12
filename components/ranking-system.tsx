"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts"
import {
  Award,
  Users,
  Building,
  BookOpen,
  Briefcase,
  RotateCcw,
  Download,
  Share2,
  Info,
  Calculator,
  Target,
  Zap,
} from "lucide-react"

// Default weights for ranking factors
const DEFAULT_WEIGHTS = {
  academics: 25,
  placements: 20,
  infrastructure: 15,
  faculty: 15,
  research: 10,
  reputation: 8,
  diversity: 4,
  innovation: 3,
}

// Ranking factor definitions
const RANKING_FACTORS = {
  academics: {
    name: "Academic Excellence",
    description: "Course quality, curriculum, academic reputation",
    icon: BookOpen,
    color: "#3b82f6",
    metrics: ["courseQuality", "curriculumRelevance", "academicReputation", "accreditation"],
  },
  placements: {
    name: "Placement Success",
    description: "Placement rate, package, company quality",
    icon: Briefcase,
    color: "#10b981",
    metrics: ["placementRate", "averagePackage", "topCompanies", "industryDiversity"],
  },
  infrastructure: {
    name: "Infrastructure",
    description: "Campus facilities, labs, library, hostels",
    icon: Building,
    color: "#8b5cf6",
    metrics: ["campusSize", "facilities", "technology", "maintenance"],
  },
  faculty: {
    name: "Faculty Quality",
    description: "Faculty credentials, student ratio, teaching quality",
    icon: Users,
    color: "#f59e0b",
    metrics: ["qualifications", "experience", "studentRatio", "teachingQuality"],
  },
  research: {
    name: "Research Output",
    description: "Publications, patents, research funding",
    icon: Zap,
    color: "#ef4444",
    metrics: ["publications", "patents", "funding", "collaborations"],
  },
  reputation: {
    name: "Reputation",
    description: "Rankings, alumni success, brand value",
    icon: Award,
    color: "#06b6d4",
    metrics: ["rankings", "alumniSuccess", "brandValue", "mediaPresence"],
  },
  diversity: {
    name: "Diversity & Inclusion",
    description: "Student diversity, international exposure",
    icon: Users,
    color: "#84cc16",
    metrics: ["studentDiversity", "internationalStudents", "culturalPrograms", "inclusivity"],
  },
  innovation: {
    name: "Innovation",
    description: "Startups, innovation labs, entrepreneurship",
    icon: Target,
    color: "#f97316",
    metrics: ["startupIncubation", "innovationLabs", "entrepreneurship", "techTransfer"],
  },
}

// Preset weight configurations
const WEIGHT_PRESETS = {
  balanced: {
    name: "Balanced",
    description: "Equal emphasis on all factors",
    weights: DEFAULT_WEIGHTS,
  },
  placement_focused: {
    name: "Placement Focused",
    description: "Emphasis on career outcomes",
    weights: {
      academics: 20,
      placements: 35,
      infrastructure: 10,
      faculty: 15,
      research: 5,
      reputation: 10,
      diversity: 3,
      innovation: 2,
    },
  },
  research_focused: {
    name: "Research Focused",
    description: "Emphasis on research and academics",
    weights: {
      academics: 30,
      placements: 15,
      infrastructure: 10,
      faculty: 20,
      research: 20,
      reputation: 3,
      diversity: 1,
      innovation: 1,
    },
  },
  infrastructure_focused: {
    name: "Infrastructure Focused",
    description: "Emphasis on facilities and campus",
    weights: {
      academics: 20,
      placements: 15,
      infrastructure: 30,
      faculty: 15,
      research: 8,
      reputation: 7,
      diversity: 3,
      innovation: 2,
    },
  },
  reputation_focused: {
    name: "Reputation Focused",
    description: "Emphasis on brand and rankings",
    weights: {
      academics: 25,
      placements: 20,
      infrastructure: 10,
      faculty: 15,
      research: 10,
      reputation: 15,
      diversity: 3,
      innovation: 2,
    },
  },
}

interface RankingSystemProps {
  colleges?: any[]
  onRankingChange?: (rankedColleges: any[]) => void
  showCustomization?: boolean
}

export default function RankingSystem({
  colleges = [],
  onRankingChange,
  showCustomization = true,
}: RankingSystemProps) {
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS)
  const [rankedColleges, setRankedColleges] = useState([])
  const [selectedPreset, setSelectedPreset] = useState("balanced")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedCollege, setSelectedCollege] = useState(null)

  // Calculate individual factor scores for a college
  const calculateFactorScore = (college: any, factor: string): number => {
    switch (factor) {
      case "academics":
        return (
          (college.reviews?.categories?.academics || 4) * 20 +
          (college.accreditation?.length || 1) * 5 +
          (5 - (college.stats?.nirf || 50) / 10) * 10 +
          (college.academics?.courses?.length || 1) * 2
        )

      case "placements":
        return (
          (college.stats?.placementRate || 70) * 0.6 +
          Math.min((college.placements?.stats?.averagePackage || 5) * 2, 30) +
          (college.placements?.topRecruiters?.length || 5) * 0.5
        )

      case "infrastructure":
        return (
          (college.reviews?.categories?.infrastructure || 4) * 20 +
          (college.facilities ? Object.values(college.facilities).flat().length : 10) * 1.5 +
          (college.stats?.campusSize ? 15 : 10)
        )

      case "faculty":
        return (
          (college.reviews?.categories?.faculty || 4) * 20 +
          (college.stats?.faculty ? 15 : 10) +
          (college.stats?.studentFacultyRatio ? 20 - Number.parseInt(college.stats.studentFacultyRatio) : 10)
        )

      case "research":
        return (
          (college.research?.stats?.publications || 50) * 0.1 +
          (college.research?.stats?.patents || 5) * 2 +
          (college.research?.centers?.length || 3) * 5 +
          Math.min(college.research?.stats?.funding ? 20 : 10, 20)
        )

      case "reputation":
        return (
          (5 - (college.stats?.nirf || 50) / 10) * 15 +
          (college.stats?.rating || 4) * 15 +
          (college.alumni?.notable?.length || 2) * 3 +
          (college.rankings?.length || 1) * 5
        )

      case "diversity":
        return (
          (college.stats?.internationalStudents ? Number.parseFloat(college.stats.internationalStudents) * 2 : 10) +
          (college.campusLife?.clubs?.length || 5) * 2 +
          30 // Base diversity score
        )

      case "innovation":
        return (
          (college.research?.centers?.length || 2) * 8 +
          (college.about?.highlights?.some((h) => h.includes("startup") || h.includes("innovation")) ? 20 : 10) +
          (college.academics?.specializations?.some((s) => s.includes("AI") || s.includes("Data")) ? 15 : 5)
        )

      default:
        return 50
    }
  }

  // Calculate overall weighted score
  const calculateOverallScore = (college: any): number => {
    let totalScore = 0
    let totalWeight = 0

    Object.entries(weights).forEach(([factor, weight]) => {
      const factorScore = calculateFactorScore(college, factor)
      totalScore += factorScore * (weight / 100)
      totalWeight += weight
    })

    return Math.min(Math.round((totalScore / totalWeight) * 100), 100)
  }

  // Calculate detailed scores for a college
  const calculateDetailedScores = (college: any) => {
    const scores = {}
    Object.keys(weights).forEach((factor) => {
      scores[factor] = Math.min(calculateFactorScore(college, factor), 100)
    })
    return scores
  }

  // Rank colleges based on weighted scores
  const rankColleges = () => {
    if (!colleges || colleges.length === 0) {
      setRankedColleges([])
      onRankingChange?.([])
      return
    }

    const ranked = colleges
      .map((college) => ({
        ...college,
        overallScore: calculateOverallScore(college),
        detailedScores: calculateDetailedScores(college),
      }))
      .sort((a, b) => b.overallScore - a.overallScore)
      .map((college, index) => ({
        ...college,
        rank: index + 1,
      }))

    setRankedColleges(ranked)
    onRankingChange?.(ranked)
  }

  // Update weights
  const updateWeight = (factor: string, value: number) => {
    setWeights((prev) => ({
      ...prev,
      [factor]: value,
    }))
  }

  // Apply preset weights
  const applyPreset = (presetKey: string) => {
    setSelectedPreset(presetKey)
    setWeights(WEIGHT_PRESETS[presetKey].weights)
  }

  // Reset to default weights
  const resetWeights = () => {
    setWeights(DEFAULT_WEIGHTS)
    setSelectedPreset("balanced")
  }

  // Normalize weights to 100%
  const normalizeWeights = () => {
    const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0)
    if (total !== 100) {
      const normalized = {}
      Object.entries(weights).forEach(([factor, weight]) => {
        normalized[factor] = Math.round((weight / total) * 100)
      })
      setWeights(normalized)
    }
  }

  useEffect(() => {
    rankColleges()
  }, [weights, colleges])

  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Intelligent Ranking System</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Weighted scoring based on your priorities</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={totalWeight === 100 ? "default" : "destructive"}>Total: {totalWeight}%</Badge>
              <Button variant="outline" size="sm" onClick={normalizeWeights}>
                Normalize
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {colleges.length === 0 && (
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Calculator className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No Colleges Available</h3>
                <p className="text-muted-foreground">Add colleges to see intelligent rankings and analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="rankings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="weights">Customize Weights</TabsTrigger>
          <TabsTrigger value="analysis">Score Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Compare</TabsTrigger>
        </TabsList>

        {/* Rankings Tab */}
        <TabsContent value="rankings" className="space-y-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>College Rankings</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rankedColleges.slice(0, 10).map((college, index) => (
                      <motion.div
                        key={college.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex-shrink-0">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              college.rank === 1
                                ? "bg-yellow-500"
                                : college.rank === 2
                                  ? "bg-gray-400"
                                  : college.rank === 3
                                    ? "bg-amber-600"
                                    : "bg-blue-600"
                            }`}
                          >
                            {college.rank}
                          </div>
                        </div>

                        <img
                          src={college.logo || "/placeholder.svg"}
                          alt={college.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold">{college.shortName}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {college.location} • NIRF #{college.stats?.nirf}
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{college.overallScore}</div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Overall Score</p>
                        </div>

                        <div className="w-32">
                          <Progress value={college.overallScore} className="h-2" />
                        </div>

                        <Button variant="ghost" size="sm" onClick={() => setSelectedCollege(college)}>
                          <Info className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Quick Presets */}
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Presets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(WEIGHT_PRESETS).map(([key, preset]) => (
                      <Button
                        key={key}
                        variant={selectedPreset === key ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => applyPreset(key)}
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Weights */}
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Current Weights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(weights).map(([factor, weight]) => {
                      const factorInfo = RANKING_FACTORS[factor]
                      const IconComponent = factorInfo.icon
                      return (
                        <div key={factor} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4" style={{ color: factorInfo.color }} />
                            <span className="text-sm">{factorInfo.name}</span>
                          </div>
                          <Badge variant="outline">{weight}%</Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Weights Customization Tab */}
        <TabsContent value="weights" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Customize Weights</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={resetWeights}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                      <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} />
                      <Label>Advanced</Label>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(RANKING_FACTORS).map(([factor, info]) => {
                      const IconComponent = info.icon
                      return (
                        <div key={factor} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <IconComponent className="h-5 w-5" style={{ color: info.color }} />
                              <div>
                                <Label className="font-medium">{info.name}</Label>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{info.description}</p>
                              </div>
                            </div>
                            <Badge variant="outline">{weights[factor]}%</Badge>
                          </div>
                          <Slider
                            value={[weights[factor]]}
                            onValueChange={(value) => updateWeight(factor, value[0])}
                            max={50}
                            step={1}
                            className="w-full"
                          />
                          {showAdvanced && (
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              <p>Metrics: {info.metrics.join(", ")}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Weight Distribution Chart */}
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Weight Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={Object.entries(weights).map(([factor, weight]) => ({
                          factor: RANKING_FACTORS[factor].name,
                          weight,
                          color: RANKING_FACTORS[factor].color,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="factor" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="weight" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Preset Comparison */}
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Preset Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(WEIGHT_PRESETS).map(([key, preset]) => (
                      <div key={key} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{preset.name}</h4>
                          <Button variant="ghost" size="sm" onClick={() => applyPreset(key)}>
                            Apply
                          </Button>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{preset.description}</p>
                        <div className="grid grid-cols-4 gap-1">
                          {Object.entries(preset.weights).map(([factor, weight]) => (
                            <div key={factor} className="text-center">
                              <div className="text-xs font-medium">{weight}%</div>
                              <div className="text-xs text-gray-500">{RANKING_FACTORS[factor].name.split(" ")[0]}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Score Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Top Performers by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(RANKING_FACTORS).map(([factor, info]) => {
                    const topCollege = rankedColleges.reduce(
                      (best, college) =>
                        (college.detailedScores?.[factor] || 0) > (best.detailedScores?.[factor] || 0) ? college : best,
                      rankedColleges[0],
                    )

                    const IconComponent = info.icon
                    return (
                      <div key={factor} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5" style={{ color: info.color }} />
                          <div>
                            <h4 className="font-medium">{info.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{topCollege?.shortName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg" style={{ color: info.color }}>
                            {Math.round(topCollege?.detailedScores?.[factor] || 0)}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Score</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={rankedColleges.slice(0, 10).map((college, index) => ({
                        rank: index + 1,
                        score: college.overallScore,
                        name: college.shortName,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="rank" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Score Breakdown */}
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Detailed Score Breakdown - Top 5 Colleges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">College</th>
                      <th className="text-center p-2">Overall</th>
                      {Object.entries(RANKING_FACTORS).map(([factor, info]) => (
                        <th key={factor} className="text-center p-2">
                          {info.name.split(" ")[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rankedColleges.slice(0, 5).map((college) => (
                      <tr key={college.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <img
                              src={college.logo || "/placeholder.svg"}
                              alt={college.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <span className="font-medium">{college.shortName}</span>
                          </div>
                        </td>
                        <td className="text-center p-2">
                          <Badge variant="default">{college.overallScore}</Badge>
                        </td>
                        {Object.keys(RANKING_FACTORS).map((factor) => (
                          <td key={factor} className="text-center p-2">
                            <span className="text-sm">{Math.round(college.detailedScores?.[factor] || 0)}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>College Comparison - Radar Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      data={Object.entries(RANKING_FACTORS).map(([factor, info]) => ({
                        factor: info.name,
                        college1: rankedColleges[0]?.detailedScores?.[factor] || 0,
                        college2: rankedColleges[1]?.detailedScores?.[factor] || 0,
                        college3: rankedColleges[2]?.detailedScores?.[factor] || 0,
                      }))}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="factor" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name={rankedColleges[0]?.shortName}
                        dataKey="college1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.1}
                      />
                      <Radar
                        name={rankedColleges[1]?.shortName}
                        dataKey="college2"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.1}
                      />
                      <Radar
                        name={rankedColleges[2]?.shortName}
                        dataKey="college3"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        fillOpacity={0.1}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Top 3 Colleges Comparison</h3>
                  {rankedColleges.slice(0, 3).map((college, index) => (
                    <div key={college.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          index === 0 ? "bg-blue-500" : index === 1 ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                      <img
                        src={college.logo || "/placeholder.svg"}
                        alt={college.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{college.shortName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Rank #{college.rank} • Score: {college.overallScore}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selected College Details Modal */}
      {selectedCollege && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCollege(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selectedCollege.shortName} - Score Breakdown</h2>
              <Button variant="ghost" onClick={() => setSelectedCollege(null)}>
                ×
              </Button>
            </div>

            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{selectedCollege.overallScore}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Overall Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(RANKING_FACTORS).map(([factor, info]) => {
                  const score = selectedCollege.detailedScores?.[factor] || 0
                  const IconComponent = info.icon
                  return (
                    <div key={factor} className="p-3 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <IconComponent className="h-4 w-4" style={{ color: info.color }} />
                        <span className="font-medium text-sm">{info.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Progress value={score} className="flex-1 mr-2" />
                        <span className="font-bold" style={{ color: info.color }}>
                          {Math.round(score)}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
