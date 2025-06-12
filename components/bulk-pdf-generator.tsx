"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Download, FileText, Loader2, Package } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface BulkPDFGeneratorProps {
  colleges: any[]
  studentProfile?: any
}

export default function BulkPDFGenerator({ colleges, studentProfile }: BulkPDFGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColleges, setSelectedColleges] = useState<number[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentCollege, setCurrentCollege] = useState("")

  const handleCollegeSelection = (collegeId: number, checked: boolean) => {
    setSelectedColleges((prev) => (checked ? [...prev, collegeId] : prev.filter((id) => id !== collegeId)))
  }

  const selectAll = () => {
    setSelectedColleges(colleges.map((college) => college.id))
  }

  const clearAll = () => {
    setSelectedColleges([])
  }

  const generateBulkPDF = async () => {
    setIsGenerating(true)
    setProgress(0)

    const selectedCollegeData = colleges.filter((college) => selectedColleges.includes(college.id))

    for (let i = 0; i < selectedCollegeData.length; i++) {
      const college = selectedCollegeData[i]
      setCurrentCollege(college.shortName)
      setProgress(((i + 1) / selectedCollegeData.length) * 100)

      // Simulate PDF generation for each college
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    // Create a combined report
    const combinedHTML = createCombinedPDFHTML(selectedCollegeData, studentProfile)
    const blob = new Blob([combinedHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `College_Comparison_Report_${new Date().toISOString().split("T")[0]}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
    setIsGenerating(false)
    setProgress(0)
    setCurrentCollege("")
    setIsOpen(false)
  }

  const createCombinedPDFHTML = (colleges: any[], studentProfile: any) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>College Comparison Report</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 10px;
        }
        
        .comparison-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .comparison-table th,
        .comparison-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        .comparison-table th {
            background: #667eea;
            color: white;
            font-weight: bold;
        }
        
        .comparison-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        .college-section {
            margin-bottom: 60px;
            page-break-inside: avoid;
        }
        
        .college-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            border-left: 4px solid #667eea;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        @media print {
            body { font-size: 12px; }
            .container { max-width: none; padding: 10px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>College Comparison Report</h1>
            <p>Comparing ${colleges.length} Engineering Colleges</p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            ${studentProfile ? `<p>Customized for: ${studentProfile.name}</p>` : ""}
        </div>

        <!-- Quick Comparison Table -->
        <h2 style="color: #667eea; margin-bottom: 20px;">Quick Comparison</h2>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>College</th>
                    <th>Rating</th>
                    <th>NIRF Rank</th>
                    <th>Placement Rate</th>
                    <th>Average Package</th>
                    <th>Fees</th>
                </tr>
            </thead>
            <tbody>
                ${colleges
                  .map(
                    (college) => `
                    <tr>
                        <td><strong>${college.shortName}</strong><br><small>${college.location}</small></td>
                        <td>${college.rating != null ? college.rating + "/5" : "N/A"}</td>
                        <td>${college.nirf ? "#" + college.nirf : "N/A"}</td>
                        <td>${college.placementRate != null ? college.placementRate + "%" : "N/A"}</td>
                        <td>${college.placements || "N/A"}</td>
                        <td>${college.fees || "N/A"}</td>
                    </tr>
                `,
                  )
                  .join("")}
            </tbody>
        </table>

        <!-- Detailed College Information -->
        ${colleges
          .map(
            (college, index) => `
            <div class="college-section ${index > 0 ? "page-break" : ""}">
                <div class="college-header">
                    <h2>${college.name}</h2>
                    <p>${college.location}, ${college.state} • Est. ${college.established}</p>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div style="font-size: 1.5em; font-weight: bold; color: #667eea;">${college.rating}</div>
                        <div>Overall Rating</div>
                    </div>
                    <div class="stat-card">
                        <div style="font-size: 1.5em; font-weight: bold; color: #667eea;">#${college.nirf}</div>
                        <div>NIRF Ranking</div>
                    </div>
                    <div class="stat-card">
                        <div style="font-size: 1.5em; font-weight: bold; color: #667eea;">${college.placementRate}%</div>
                        <div>Placement Rate</div>
                    </div>
                    <div class="stat-card">
                        <div style="font-size: 1.5em; font-weight: bold; color: #667eea;">${college.placements}</div>
                        <div>Average Package</div>
                    </div>
                </div>

                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="color: #667eea; margin-bottom: 10px;">About</h3>
                    <p>${college.about.overview}</p>
                </div>

                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #667eea; margin-bottom: 10px;">Key Programs</h3>
                    ${college.academics.courses
                      .slice(0, 3)
                      .map(
                        (course: any) => `
                        <div style="margin-bottom: 10px; padding: 10px; background: white; border-radius: 5px;">
                            <strong>${course.name}</strong> - ${course.fees}
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        `,
          )
          .join("")}

        <div style="text-align: center; margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <p>This report was generated by CampusConnect AI</p>
            <p>For the most up-to-date information, please visit the respective college websites</p>
        </div>
    </div>
</body>
</html>
    `
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Package className="h-4 w-4" />
          <span>Bulk Download</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Generate Bulk College Reports</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selection Controls */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select colleges to include in your comparison report
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            </div>
          </div>

          {/* College Selection */}
          <div className="grid gap-3 max-h-96 overflow-y-auto">
            {colleges.map((college) => (
              <Card key={college.id} className="p-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`college-${college.id}`}
                    checked={selectedColleges.includes(college.id)}
                    onCheckedChange={(checked) => handleCollegeSelection(college.id, checked as boolean)}
                  />
                  <img
                    src={college.logo || "/placeholder.svg"}
                    alt={college.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <Label htmlFor={`college-${college.id}`} className="font-medium cursor-pointer">
                      {college.shortName}
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {college.location} • NIRF #{college.nirf}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{college.rating}/5</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Selected Summary */}
          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Selected Colleges: {selectedColleges.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Will generate a comprehensive comparison report
                  </p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={generateBulkPDF}
              disabled={isGenerating || selectedColleges.length === 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Generate Reports ({selectedColleges.length})
                </>
              )}
            </Button>
          </div>

          {/* Progress Indicator */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Generating college reports...</p>
                    <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  {currentCollege && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Currently processing: {currentCollege}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
