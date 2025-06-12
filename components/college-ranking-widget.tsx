"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Award, Target, Zap } from "lucide-react"

interface CollegeRankingWidgetProps {
  colleges: any[]
  compact?: boolean
  showTop?: number
}

export default function CollegeRankingWidget({ colleges, compact = false, showTop = 5 }: CollegeRankingWidgetProps) {
  const [rankingType, setRankingType] = useState("overall")
  const [rankedColleges, setRankedColleges] = useState([])

  const rankingTypes = {
    overall: { name: "Overall Score", icon: Award },
    placements: { name: "Placement Rate", icon: TrendingUp },
    academics: { name: "Academic Excellence", icon: Target },
    research: { name: "Research Output", icon: Zap },
  }

  useEffect(() => {
    // Simple ranking logic for the widget
    const ranked = colleges
      .map((college) => {
        let score = 0
        switch (rankingType) {
          case "overall":
            score = college.aiScore || college.rating * 20
            break
          case "placements":
            score = college.placementRate || 70
            break
          case "academics":
            score = (college.reviews?.categories?.academics || 4) * 20
            break
          case "research":
            score = college.researchRating ? college.researchRating * 20 : 60
            break
        }
        return { ...college, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, showTop)

    setRankedColleges(ranked)
  }, [colleges, rankingType, showTop])

  if (compact) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Top Colleges</CardTitle>
            <Select value={rankingType} onValueChange={setRankingType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(rankingTypes).map(([key, type]) => (
                  <SelectItem key={key} value={key}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rankedColleges.map((college, index) => (
              <div key={college.id} className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                        ? "bg-gray-400"
                        : index === 2
                          ? "bg-amber-600"
                          : "bg-blue-600"
                  }`}
                >
                  {index + 1}
                </div>
                <img
                  src={college.logo || "/placeholder.svg"}
                  alt={college.name}
                  className="w-8 h-8 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{college.shortName}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{college.location}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {Math.round(college.score)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>College Rankings</span>
          </CardTitle>
          <Select value={rankingType} onValueChange={setRankingType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(rankingTypes).map(([key, type]) => {
                const IconComponent = type.icon
                return (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4" />
                      <span>{type.name}</span>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rankedColleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0
                    ? "bg-yellow-500"
                    : index === 1
                      ? "bg-gray-400"
                      : index === 2
                        ? "bg-amber-600"
                        : "bg-blue-600"
                }`}
              >
                {index + 1}
              </div>

              <img
                src={college.logo || "/placeholder.svg"}
                alt={college.name}
                className="w-12 h-12 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{college.shortName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {college.location} • NIRF #{college.nirf}
                </p>
              </div>

              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{Math.round(college.score)}</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Score</p>
              </div>

              <div className="w-24">
                <Progress value={college.score} className="h-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
