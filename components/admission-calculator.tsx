"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, TrendingUp, CheckCircle, Target } from "lucide-react"
import { motion } from "framer-motion"

interface AdmissionCalculatorProps {
  college: any
}

export default function AdmissionCalculator({ college }: AdmissionCalculatorProps) {
  const [formData, setFormData] = useState({
    examScore: "",
    class12Percentage: "",
    category: "",
    state: "",
    gender: "",
    physicallyHandicapped: false,
  })
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateAdmissionChances = async () => {
    setIsCalculating(true)

    // Simulate calculation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock calculation logic
    const examScore = Number.parseInt(formData.examScore)
    const class12 = Number.parseFloat(formData.class12Percentage)

    let baseScore = 0
    if (examScore >= 180) baseScore = 90
    else if (examScore >= 160) baseScore = 75
    else if (examScore >= 140) baseScore = 60
    else if (examScore >= 120) baseScore = 45
    else baseScore = 30

    // Category adjustments
    let categoryBonus = 0
    if (formData.category === "sc" || formData.category === "st") categoryBonus = 15
    else if (formData.category === "obc") categoryBonus = 10
    else if (formData.category === "ews") categoryBonus = 8

    // Class 12 bonus
    let academicBonus = 0
    if (class12 >= 90) academicBonus = 5
    else if (class12 >= 80) academicBonus = 3
    else if (class12 >= 70) academicBonus = 1

    const finalScore = Math.min(95, baseScore + categoryBonus + academicBonus)

    const calculationResult = {
      admissionChance: finalScore,
      rank: Math.floor(Math.random() * 5000) + 1000,
      cutoffComparison: {
        required: college.academics.courses[0].cutoff,
        predicted: examScore,
        difference: examScore - college.academics.courses[0].cutoff,
      },
      recommendations: [],
      alternativeCourses: [],
    }

    // Generate recommendations
    if (finalScore >= 80) {
      calculationResult.recommendations = [
        "Excellent chances! You're likely to get admission.",
        "Consider applying for merit scholarships.",
        "Prepare for counseling rounds.",
      ]
    } else if (finalScore >= 60) {
      calculationResult.recommendations = [
        "Good chances in later rounds.",
        "Keep backup options ready.",
        "Consider improvement in other criteria.",
      ]
    } else {
      calculationResult.recommendations = [
        "Consider alternative colleges.",
        "Look into management quota options.",
        "Prepare for next year if needed.",
      ]
    }

    // Alternative courses
    calculationResult.alternativeCourses = college.academics.courses
      .filter((course) => course.cutoff <= examScore + 10)
      .slice(0, 3)

    setResult(calculationResult)
    setIsCalculating(false)
  }

  const getChanceColor = (chance: number) => {
    if (chance >= 80) return "text-green-600"
    if (chance >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getChanceBadge = (chance: number) => {
    if (chance >= 80) return { text: "High", variant: "default" as const, color: "bg-green-600" }
    if (chance >= 60) return { text: "Moderate", variant: "secondary" as const, color: "bg-yellow-600" }
    return { text: "Low", variant: "destructive" as const, color: "bg-red-600" }
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5" />
          <span>Admission Probability Calculator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!result ? (
          <div className="space-y-4">
            {/* Exam Score */}
            <div>
              <Label htmlFor="examScore">JEE Advanced Score</Label>
              <Input
                id="examScore"
                type="number"
                placeholder="Enter your score"
                value={formData.examScore}
                onChange={(e) => handleInputChange("examScore", e.target.value)}
              />
            </div>

            {/* Class 12 Percentage */}
            <div>
              <Label htmlFor="class12">Class 12 Percentage</Label>
              <Input
                id="class12"
                type="number"
                placeholder="Enter percentage"
                value={formData.class12Percentage}
                onChange={(e) => handleInputChange("class12Percentage", e.target.value)}
              />
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="obc">OBC</SelectItem>
                  <SelectItem value="sc">SC</SelectItem>
                  <SelectItem value="st">ST</SelectItem>
                  <SelectItem value="ews">EWS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* State */}
            <div>
              <Label>Home State</Label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="other">Other State</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={calculateAdmissionChances}
              disabled={!formData.examScore || !formData.class12Percentage || isCalculating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {isCalculating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Admission Chances
                </>
              )}
            </Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Main Result */}
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <div className={`text-4xl font-bold mb-2 ${getChanceColor(result.admissionChance)}`}>
                {result.admissionChance}%
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Admission Probability</p>
              <Badge className={getChanceBadge(result.admissionChance).color}>
                {getChanceBadge(result.admissionChance).text} Chance
              </Badge>
            </div>

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Analysis</span>
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Predicted Rank:</span>
                    <span className="font-medium">{result.rank.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Cutoff:</span>
                    <span className="font-medium">{result.cutoffComparison.required}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Your Score:</span>
                    <span className="font-medium">{result.cutoffComparison.predicted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difference:</span>
                    <span
                      className={`font-medium ${result.cutoffComparison.difference >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {result.cutoffComparison.difference >= 0 ? "+" : ""}
                      {result.cutoffComparison.difference}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Probability Breakdown</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Exam Score</span>
                      <span>70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Academic Record</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Category Benefit</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Recommendations</span>
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternative Courses */}
            {result.alternativeCourses.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Alternative Courses</h4>
                <div className="space-y-2">
                  {result.alternativeCourses.map((course, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">{course.name}</span>
                      <Badge variant="outline">Cutoff: {course.cutoff}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2">
              <Button onClick={() => setResult(null)} variant="outline" className="flex-1">
                Recalculate
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">Apply Now</Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
