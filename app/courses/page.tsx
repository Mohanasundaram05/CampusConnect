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
import {
  Search,
  Clock,
  Users,
  TrendingUp,
  BookOpen,
  Cpu,
  Zap,
  Wrench,
  Building,
  Atom,
  Car,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

const courses = [
  {
    id: 1,
    name: "Computer Science Engineering",
    icon: Cpu,
    duration: "4 years",
    description:
      "Study algorithms, programming, software development, and emerging technologies like AI and machine learning.",
    avgSalary: "₹12-25L",
    jobOpportunities:
      "Software Engineer, Data Scientist, AI Engineer, Product Manager",
    topColleges: ["IIT Madras", "Anna University", "SRM Institute"],
    difficulty: "High",
    popularity: 95,
    category: "Engineering",
    skills: ["Programming", "Problem Solving", "Mathematics", "Logic"],
    careerPaths: [
      "Software Development",
      "Data Science",
      "Cybersecurity",
      "AI/ML",
    ],
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    name: "Electronics and Communication",
    icon: Zap,
    duration: "4 years",
    description:
      "Focus on electronic devices, communication systems, signal processing, and telecommunications.",
    avgSalary: "₹8-18L",
    jobOpportunities:
      "Electronics Engineer, Telecom Engineer, VLSI Designer, Network Engineer",
    topColleges: ["IIT Madras", "PSG Tech", "VIT University"],
    difficulty: "High",
    popularity: 85,
    category: "Engineering",
    skills: ["Circuit Design", "Signal Processing", "Mathematics", "Physics"],
    careerPaths: [
      "Telecommunications",
      "VLSI Design",
      "Embedded Systems",
      "IoT",
    ],
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    icon: Wrench,
    duration: "4 years",
    description:
      "Design, develop, and manufacture mechanical systems, machines, and thermal devices.",
    avgSalary: "₹6-15L",
    jobOpportunities:
      "Mechanical Engineer, Design Engineer, Production Manager, R&D Engineer",
    topColleges: ["IIT Madras", "Anna University", "PSG Tech"],
    difficulty: "Medium",
    popularity: 80,
    category: "Engineering",
    skills: [
      "CAD Design",
      "Thermodynamics",
      "Materials Science",
      "Manufacturing",
    ],
    careerPaths: ["Automotive", "Aerospace", "Manufacturing", "Energy"],
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: 4,
    name: "Civil Engineering",
    icon: Building,
    duration: "4 years",
    description:
      "Plan, design, and construct infrastructure projects like buildings, roads, and bridges.",
    avgSalary: "₹5-12L",
    jobOpportunities:
      "Civil Engineer, Project Manager, Structural Engineer, Urban Planner",
    topColleges: ["Anna University", "PSG Tech", "Thiagarajar College"],
    difficulty: "Medium",
    popularity: 70,
    category: "Engineering",
    skills: [
      "Structural Analysis",
      "Project Management",
      "AutoCAD",
      "Construction",
    ],
    careerPaths: [
      "Construction",
      "Infrastructure",
      "Urban Planning",
      "Environmental",
    ],
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 5,
    name: "Chemical Engineering",
    icon: Atom,
    duration: "4 years",
    description:
      "Apply chemistry, physics, and mathematics to solve problems involving chemical processes.",
    avgSalary: "₹7-16L",
    jobOpportunities:
      "Chemical Engineer, Process Engineer, Research Scientist, Plant Manager",
    topColleges: ["IIT Madras", "Anna University", "SRM Institute"],
    difficulty: "High",
    popularity: 65,
    category: "Engineering",
    skills: ["Chemistry", "Process Design", "Safety", "Mathematics"],
    careerPaths: [
      "Petrochemicals",
      "Pharmaceuticals",
      "Food Processing",
      "Environmental",
    ],
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 6,
    name: "Automobile Engineering",
    icon: Car,
    duration: "4 years",
    description:
      "Design, develop, and manufacture automobiles and automotive systems.",
    avgSalary: "₹6-14L",
    jobOpportunities:
      "Automobile Engineer, Design Engineer, Quality Engineer, R&D Engineer",
    topColleges: ["SRM Institute", "VIT University", "PSG Tech"],
    difficulty: "Medium",
    popularity: 75,
    category: "Engineering",
    skills: ["Vehicle Design", "Engine Technology", "CAD", "Testing"],
    careerPaths: [
      "Automotive Industry",
      "Racing",
      "Electric Vehicles",
      "Research",
    ],
    gradient: "from-red-500 to-orange-600",
  },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const { t } = useLanguage();

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || course.category === categoryFilter;
      const matchesDifficulty =
        difficultyFilter === "all" || course.difficulty === difficultyFilter;
      return matchesSearch && matchesCategory && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "name":
          return a.name.localeCompare(b.name);
        case "difficulty":
          const difficultyOrder = { Low: 1, Medium: 2, High: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {t("courses.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore engineering courses and find your perfect career path
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={difficultyFilter}
                  onValueChange={setDifficultyFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="difficulty">Difficulty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredCourses.length} courses
          </p>
        </motion.div>

        {/* Course Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
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
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${course.gradient} flex items-center justify-center`}
                      >
                        <course.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                          {course.name}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {course.duration}
                            </span>
                          </div>
                          <Badge
                            variant={
                              course.difficulty === "High"
                                ? "destructive"
                                : course.difficulty === "Medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {course.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">
                          {course.popularity}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Popularity</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Average Salary
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        {course.avgSalary}
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        Top Colleges
                      </p>
                      <p className="text-sm text-green-600">
                        {course.topColleges.length}+ options
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-sm font-medium mb-2">Key Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Career Paths */}
                  <div>
                    <p className="text-sm font-medium mb-2">Career Paths:</p>
                    <div className="flex flex-wrap gap-2">
                      {course.careerPaths.map((path, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {path}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Job Opportunities */}
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Job Opportunities:
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {course.jobOpportunities}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <Link href={`/course/${course.id}`}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Learn More
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className={`flex-1 bg-gradient-to-r ${course.gradient} hover:opacity-90`}
                      asChild
                    >
                      <Link href="/recommendations">
                        <Users className="mr-2 h-4 w-4" />
                        Find Colleges
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {filteredCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" className="px-8">
              Explore More Courses
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
