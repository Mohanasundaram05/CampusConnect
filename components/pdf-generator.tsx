"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Loader2, CheckCircle, Star, Award } from "lucide-react"
import { motion } from "framer-motion"

interface PDFGeneratorProps {
  college: any
  studentProfile?: any
}

export default function PDFGenerator({ college, studentProfile }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSections, setSelectedSections] = useState({
    overview: true,
    academics: true,
    admissions: true,
    placements: true,
    facilities: true,
    reviews: true,
    cutoffTrends: true,
    contactInfo: true,
  })
  const [reportFormat, setReportFormat] = useState("detailed")
  const [includeComparison, setIncludeComparison] = useState(false)

  const sections = [
    { key: "overview", label: "College Overview", description: "Basic information, mission, vision, highlights" },
    { key: "academics", label: "Academic Programs", description: "Courses, specializations, research areas" },
    { key: "admissions", label: "Admission Process", description: "Requirements, deadlines, process details" },
    { key: "placements", label: "Placement Statistics", description: "Salary data, top recruiters, trends" },
    { key: "facilities", label: "Campus Facilities", description: "Infrastructure, amenities, services" },
    { key: "reviews", label: "Student Reviews", description: "Ratings, feedback, testimonials" },
    { key: "cutoffTrends", label: "Cutoff Analysis", description: "Historical cutoff data and predictions" },
    { key: "contactInfo", label: "Contact Information", description: "Address, phone, email, website" },
  ]

  const handleSectionChange = (sectionKey: string, checked: boolean) => {
    setSelectedSections((prev) => ({
      ...prev,
      [sectionKey]: checked,
    }))
  }

  const generatePDFContent = () => {
    const selectedData = {
      college,
      studentProfile,
      sections: selectedSections,
      format: reportFormat,
      includeComparison,
      generatedAt: new Date().toISOString(),
    }

    return selectedData
  }

  const generatePDF = async () => {
    setIsGenerating(true)

    try {
      // Simulate PDF generation process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const pdfData = generatePDFContent()

      // Create a comprehensive HTML content for PDF
      const htmlContent = createPDFHTML(pdfData)

      // In a real implementation, you would use a library like jsPDF, Puppeteer, or a server-side PDF service
      // For this demo, we'll create a downloadable HTML file that can be printed as PDF
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${college.shortName}_College_Report_${new Date().toISOString().split("T")[0]}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
      setIsOpen(false)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const createPDFHTML = (data: any) => {
    const { college, studentProfile, sections, format } = data

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${college.name} - College Report</title>
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
            max-width: 800px;
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
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 1.8em;
            color: #667eea;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border-left: 4px solid #667eea;
        }
        
        .stat-value {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
        }
        
        .stat-label {
            color: #666;
            margin-top: 5px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .info-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
        }
        
        .info-label {
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
        }
        
        .course-card {
            background: #f8f9fa;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 8px;
            border-left: 4px solid #28a745;
        }
        
        .course-title {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .course-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 10px;
            margin-top: 10px;
        }
        
        .badge {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            margin: 2px;
        }
        
        .highlight-box {
            background: #e3f2fd;
            border: 1px solid #2196f3;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .facilities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .facility-category {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
        }
        
        .facility-title {
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .facility-list {
            list-style: none;
        }
        
        .facility-list li {
            padding: 2px 0;
            position: relative;
            padding-left: 15px;
        }
        
        .facility-list li:before {
            content: "✓";
            color: #28a745;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            color: #666;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        @media print {
            body {
                font-size: 12px;
            }
            .container {
                max-width: none;
                padding: 10px;
            }
            .header {
                background: #667eea !important;
                -webkit-print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>${college.name}</h1>
            <p>${college.location}, ${college.state} • Est. ${college.established}</p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        ${
          sections.overview
            ? `
        <!-- Overview Section -->
        <div class="section">
            <h2 class="section-title">College Overview</h2>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${college.stats.rating}</div>
                    <div class="stat-label">Overall Rating</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">#${college.stats.nirf}</div>
                    <div class="stat-label">NIRF Ranking</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${college.stats.placementRate}%</div>
                    <div class="stat-label">Placement Rate</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${college.stats.averagePackage}</div>
                    <div class="stat-label">Average Package</div>
                </div>
            </div>

            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Type</div>
                    <div>${college.type}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Campus Size</div>
                    <div>${college.stats.campusSize}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Total Students</div>
                    <div>${college.stats.totalStudents}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Faculty</div>
                    <div>${college.stats.faculty}</div>
                </div>
            </div>

            <div class="highlight-box">
                <h3>About ${college.shortName}</h3>
                <p>${college.about.overview}</p>
            </div>

            <div>
                <h3>Key Highlights</h3>
                <ul>
                    ${college.about.highlights.map((highlight: string) => `<li>${highlight}</li>`).join("")}
                </ul>
            </div>
        </div>
        `
            : ""
        }

        ${
          sections.academics
            ? `
        <div class="section page-break">
            <h2 class="section-title">Academic Programs</h2>
            
            ${college.academics.courses
              .map(
                (course: any) => `
                <div class="course-card">
                    <div class="course-title">${course.name}</div>
                    <p>${course.description}</p>
                    <div class="course-details">
                        <div><strong>Duration:</strong> ${course.duration}</div>
                        <div><strong>Seats:</strong> ${course.seats}</div>
                        <div><strong>Cutoff:</strong> ${course.cutoff}</div>
                        <div><strong>Fees:</strong> ${course.fees}</div>
                    </div>
                </div>
            `,
              )
              .join("")}

            <div style="margin-top: 30px;">
                <h3>Specializations</h3>
                <div>
                    ${college.academics.specializations.map((spec: string) => `<span class="badge">${spec}</span>`).join("")}
                </div>
            </div>

            <div style="margin-top: 20px;">
                <h3>Research Areas</h3>
                <div>
                    ${college.academics.researchAreas.map((area: string) => `<span class="badge">${area}</span>`).join("")}
                </div>
            </div>
        </div>
        `
            : ""
        }

        ${
          sections.admissions
            ? `
        <div class="section">
            <h2 class="section-title">Admission Process</h2>
            
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Entrance Exam</div>
                    <div>${college.admissions.process}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Eligibility</div>
                    <div>${college.admissions.eligibility}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Application Deadline</div>
                    <div>${college.admissions.applicationDeadline}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Exam Date</div>
                    <div>${college.admissions.examDate}</div>
                </div>
            </div>

            <div style="margin-top: 30px;">
                <h3>Required Documents</h3>
                <ul class="facility-list">
                    ${college.admissions.documentsRequired.map((doc: string) => `<li>${doc}</li>`).join("")}
                </ul>
            </div>

            <div style="margin-top: 30px;">
                <h3>Important Dates</h3>
                <div class="info-grid">
                    ${college.admissions.importantDates
                      .map(
                        (item: any) => `
                        <div class="info-item">
                            <div class="info-label">${item.event}</div>
                            <div>${item.date}</div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        </div>
        `
            : ""
        }

        ${
          sections.placements
            ? `
        <div class="section page-break">
            <h2 class="section-title">Placement Statistics</h2>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${college.placements.stats.placementRate}%</div>
                    <div class="stat-label">Placement Rate</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">₹${college.placements.stats.averagePackage}L</div>
                    <div class="stat-label">Average Package</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">₹${college.placements.stats.highestPackage}L</div>
                    <div class="stat-label">Highest Package</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${college.placements.stats.companies}+</div>
                    <div class="stat-label">Companies</div>
                </div>
            </div>

            <div style="margin-top: 30px;">
                <h3>Top Recruiters</h3>
                <div>
                    ${college.placements.topRecruiters.map((company: string) => `<span class="badge">${company}</span>`).join("")}
                </div>
            </div>

            <div style="margin-top: 30px;">
                <h3>Sector-wise Distribution</h3>
                <div class="info-grid">
                    ${college.placements.sectorWise
                      .map(
                        (sector: any) => `
                        <div class="info-item">
                            <div class="info-label">${sector.sector}</div>
                            <div>${sector.percentage}%</div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        </div>
        `
            : ""
        }

        ${
          sections.facilities
            ? `
        <div class="section">
            <h2 class="section-title">Campus Facilities</h2>
            
            <div class="facilities-grid">
                ${Object.entries(college.facilities)
                  .map(
                    ([category, items]: [string, any]) => `
                    <div class="facility-category">
                        <div class="facility-title">${category.charAt(0).toUpperCase() + category.slice(1)} Facilities</div>
                        <ul class="facility-list">
                            ${items.map((item: string) => `<li>${item}</li>`).join("")}
                        </ul>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
        `
            : ""
        }

        ${
          sections.reviews
            ? `
        <div class="section">
            <h2 class="section-title">Student Reviews & Ratings</h2>
            
            <div class="highlight-box">
                <h3>Overall Rating: ${college.reviews.overall}/5</h3>
                <div class="info-grid" style="margin-top: 20px;">
                    ${Object.entries(college.reviews.categories)
                      .map(
                        ([category, rating]: [string, any]) => `
                        <div class="info-item">
                            <div class="info-label">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
                            <div>${rating}/5</div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>

            <div style="margin-top: 30px;">
                <h3>Student Testimonials</h3>
                ${college.reviews.studentReviews
                  .map(
                    (review: any) => `
                    <div class="course-card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <div>
                                <strong>${review.name}</strong>
                                <div style="color: #666; font-size: 0.9em;">${review.course} • Batch ${review.batch}</div>
                            </div>
                            <div style="color: #ffc107;">★★★★★</div>
                        </div>
                        <p>"${review.review}"</p>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
        `
            : ""
        }

        ${
          sections.contactInfo
            ? `
        <div class="section">
            <h2 class="section-title">Contact Information</h2>
            
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Address</div>
                    <div>${college.contact.address}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Phone</div>
                    <div>${college.contact.phone}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Email</div>
                    <div>${college.contact.email}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Website</div>
                    <div>${college.contact.website}</div>
                </div>
            </div>
        </div>
        `
            : ""
        }

        <!-- Footer -->
        <div class="footer">
            <p>This report was generated by CampusConnect AI on ${new Date().toLocaleDateString()}</p>
            <p>For the most up-to-date information, please visit the college's official website</p>
            ${studentProfile ? `<p>Report customized for: ${studentProfile.name}</p>` : ""}
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
          <Download className="h-4 w-4" />
          <span>Download Report</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Generate College Report</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Preview */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={college.logo || "/placeholder.svg"}
                  alt={college.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">{college.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {college.location}, {college.state}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{college.stats.rating}</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Award className="h-3 w-3" />
                      <span>NIRF #{college.stats.nirf}</span>
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Format */}
          <div>
            <Label className="text-base font-medium mb-3 block">Report Format</Label>
            <Select value={reportFormat} onValueChange={setReportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="detailed">Detailed Report (All Information)</SelectItem>
                <SelectItem value="summary">Summary Report (Key Information)</SelectItem>
                <SelectItem value="comparison">Comparison Ready (For Multiple Colleges)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Section Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Include Sections</Label>
            <div className="grid grid-cols-1 gap-3">
              {sections.map((section) => (
                <div key={section.key} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={section.key}
                    checked={selectedSections[section.key as keyof typeof selectedSections]}
                    onCheckedChange={(checked) => handleSectionChange(section.key, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={section.key} className="font-medium cursor-pointer">
                      {section.label}
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="includeComparison" checked={includeComparison} onCheckedChange={setIncludeComparison} />
              <Label htmlFor="includeComparison">Include comparison with similar colleges</Label>
            </div>

            {studentProfile && (
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <Label>Personalized for {studentProfile.name}</Label>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={generatePDF}
              disabled={isGenerating || Object.values(selectedSections).every((v) => !v)}
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
                  Generate Report
                </>
              )}
            </Button>
          </div>

          {/* Progress Indicator */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <div>
                  <p className="font-medium">Generating your college report...</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This may take a few moments. Please don't close this window.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
