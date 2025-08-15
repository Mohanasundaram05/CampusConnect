"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  MapPin,
  Calendar,
  Users,
  Award,
  Building,
  BookOpen,
  Briefcase,
  TrendingUp,
  Heart,
  Share2,
  Download,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  GraduationCap,
  Zap,
  Camera,
  Play,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import AdmissionCalculator from "@/components/admission-calculator";
import LiveChatWidget from "@/components/live-chat-widget";
import VirtualTour from "@/components/virtual-tour";

const collegeData = {
  1: {
    id: 1,
    name: "Indian Institute of Technology Madras",
    shortName: "IIT Madras",
    logo: "/cl1.png?height=120&width=120",
    coverImage: "/c1.jpg?height=400&width=800",
    gallery: [
      "/c1.jpg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    location: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    established: 1959,
    type: "Government",
    affiliation: "Autonomous",
    accreditation: ["NAAC A++", "NBA", "NIRF #1"],

    // Contact Information
    contact: {
      address: "Sardar Patel Road, Adyar, Chennai, Tamil Nadu 600036",
      phone: "+91-44-2257-4802",
      email: "admissions@iitm.ac.in",
      website: "https://www.iitm.ac.in",
      admissionsEmail: "admissions@iitm.ac.in",
    },

    // Basic Stats
    stats: {
      rating: 4.8,
      nirf: 1,
      campusSize: "617 acres",
      totalStudents: "10,000+",
      faculty: "540+",
      studentFacultyRatio: "8:1",
      placementRate: 95,
      averagePackage: "₹25L",
      highestPackage: "₹1.2Cr",
      internationalStudents: "15%",
    },

    // Detailed Information
    about: {
      overview:
        "Indian Institute of Technology Madras (IIT Madras) is a premier engineering institution in India, consistently ranked as the top engineering college in the country. Established in 1959, it has been at the forefront of engineering education and research.",
      mission:
        "To create an ambience for the students and faculty to excel in education, research, innovation, entrepreneurship and technology development.",
      vision:
        "To be a global leader in engineering education, research and innovation.",
      highlights: [
        "First IIT to be established outside of North India",
        "Home to India's first indigenous satellite",
        "Leading research in AI, IoT, and sustainable technologies",
        "Strong industry partnerships with global companies",
        "Vibrant startup ecosystem with 300+ companies incubated",
      ],
    },

    // Academic Information
    academics: {
      courses: [
        {
          name: "Computer Science and Engineering",
          duration: "4 years",
          seats: 120,
          cutoff: 185,
          fees: "₹2.5L/year",
          description:
            "Comprehensive program covering algorithms, software engineering, AI, and emerging technologies.",
        },
        {
          name: "Electronics and Communication Engineering",
          duration: "4 years",
          seats: 90,
          cutoff: 180,
          fees: "₹2.5L/year",
          description:
            "Focus on electronic devices, communication systems, and signal processing.",
        },
        {
          name: "Mechanical Engineering",
          duration: "4 years",
          seats: 100,
          cutoff: 175,
          fees: "₹2.5L/year",
          description:
            "Traditional mechanical engineering with modern manufacturing and design technologies.",
        },
        {
          name: "Civil Engineering",
          duration: "4 years",
          seats: 80,
          cutoff: 170,
          fees: "₹2.5L/year",
          description:
            "Infrastructure development, structural engineering, and sustainable construction.",
        },
      ],
      specializations: [
        "Artificial Intelligence",
        "Data Science",
        "Robotics",
        "Sustainable Engineering",
        "Biomedical Engineering",
      ],
      researchAreas: [
        "AI & Machine Learning",
        "Renewable Energy",
        "Biotechnology",
        "Aerospace",
        "Materials Science",
      ],
    },

    // Admissions
    admissions: {
      process: "JEE Advanced",
      eligibility: "75% in 12th grade (65% for SC/ST)",
      applicationDeadline: "June 15, 2024",
      examDate: "May 26, 2024",
      counselingDates: "June 20-30, 2024",
      documentsRequired: [
        "JEE Advanced Scorecard",
        "Class 12 Mark Sheet",
        "Class 10 Mark Sheet",
        "Category Certificate (if applicable)",
        "Medical Certificate",
        "Character Certificate",
      ],
      importantDates: [
        { event: "Application Opens", date: "April 1, 2024" },
        { event: "Application Deadline", date: "June 15, 2024" },
        { event: "JEE Advanced", date: "May 26, 2024" },
        { event: "Results", date: "June 18, 2024" },
        { event: "Counseling", date: "June 20-30, 2024" },
      ],
    },

    // Placements
    placements: {
      overview:
        "IIT Madras has one of the best placement records in India with top companies recruiting students.",
      stats: {
        placementRate: 95,
        averagePackage: 25,
        medianPackage: 18,
        highestPackage: 120,
        totalOffers: 1200,
        companies: 400,
      },
      topRecruiters: [
        "Google",
        "Microsoft",
        "Amazon",
        "Apple",
        "Meta",
        "Goldman Sachs",
        "McKinsey",
        "BCG",
        "Flipkart",
        "Uber",
      ],
      sectorWise: [
        { sector: "Technology", percentage: 45, color: "#3b82f6" },
        { sector: "Consulting", percentage: 20, color: "#8b5cf6" },
        { sector: "Finance", percentage: 15, color: "#10b981" },
        { sector: "Core Engineering", percentage: 12, color: "#f59e0b" },
        { sector: "Others", percentage: 8, color: "#ef4444" },
      ],
      yearWiseData: [
        { year: "2020", average: 20, highest: 80, placed: 92 },
        { year: "2021", average: 22, highest: 100, placed: 94 },
        { year: "2022", average: 24, highest: 110, placed: 95 },
        { year: "2023", average: 25, highest: 120, placed: 95 },
      ],
    },

    // Facilities
    facilities: {
      academic: [
        "Central Library with 500,000+ books",
        "Advanced Computing Labs",
        "Research Centers",
        "Lecture Halls with modern AV systems",
        "Laboratories for all departments",
      ],
      residential: [
        "16 Hostels for students",
        "Faculty quarters",
        "Guest house facilities",
        "Mess and dining facilities",
        "24/7 security",
      ],
      recreational: [
        "Sports Complex",
        "Swimming Pool",
        "Gymnasium",
        "Cricket Ground",
        "Tennis Courts",
        "Cultural Center",
      ],
      other: [
        "Medical Center",
        "Bank and ATM",
        "Post Office",
        "Shopping Complex",
        "Transportation",
        "Wi-Fi Campus",
      ],
    },

    // Rankings and Recognition
    rankings: [
      { organization: "NIRF", rank: 1, category: "Engineering", year: 2023 },
      {
        organization: "QS World",
        rank: 250,
        category: "Engineering",
        year: 2023,
      },
      {
        organization: "Times Higher Education",
        rank: 401,
        category: "World University",
        year: 2023,
      },
    ],

    // Reviews and Ratings
    reviews: {
      overall: 4.8,
      categories: {
        academics: 4.9,
        placements: 4.8,
        infrastructure: 4.7,
        faculty: 4.8,
        campusLife: 4.6,
      },
      studentReviews: [
        {
          name: "Arjun Kumar",
          batch: "2023",
          course: "CSE",
          rating: 5,
          review:
            "Excellent faculty, world-class infrastructure, and amazing placement opportunities. The research culture is outstanding.",
        },
        {
          name: "Priya Sharma",
          batch: "2022",
          course: "ECE",
          rating: 5,
          review:
            "Best decision of my life. The exposure and opportunities here are unmatched. Great peer group and learning environment.",
        },
      ],
    },

    // Cutoff Trends
    cutoffTrends: [
      { year: "2020", general: 180, obc: 165, sc: 140, st: 120 },
      { year: "2021", general: 182, obc: 167, sc: 142, st: 122 },
      { year: "2022", general: 184, obc: 169, sc: 144, st: 124 },
      { year: "2023", general: 185, obc: 170, sc: 145, st: 125 },
    ],
    campusLife: {
      clubs: [
        "Technical Club",
        "Cultural Society",
        "Sports Club",
        "Literary Society",
        "Photography Club",
        "Music Club",
      ],
      events: [
        {
          event: "Admission Open Day",
          date: "March 15, 2024",
          type: "Admissions",
        },
        {
          event: "Research Symposium",
          date: "March 20, 2024",
          type: "Academic",
        },
        { event: "Cultural Night", date: "March 25, 2024", type: "Cultural" },
        { event: "Industry Connect", date: "April 2, 2024", type: "Placement" },
      ],
      hostelLife: {
        hostels: 16,
        capacity: 8000,
        facilities: ["Wi-Fi", "Gym", "Common Room", "Laundry", "24/7 Security"],
      },
    },

    research: {
      centers: [
        {
          name: "AI & Machine Learning Lab",
          focus: "Deep Learning, NLP, Computer Vision",
          funding: "₹2.5Cr",
        },
        {
          name: "Renewable Energy Center",
          focus: "Solar, Wind, Energy Storage",
          funding: "₹1.8Cr",
        },
        {
          name: "Biomedical Engineering Lab",
          focus: "Medical Devices, Biomaterials",
          funding: "₹1.2Cr",
        },
      ],
      publications: [
        {
          title: "Advanced Neural Networks for Image Recognition",
          journal: "IEEE Transactions",
          year: "2024",
        },
        {
          title: "Sustainable Energy Solutions for Smart Cities",
          journal: "Nature Energy",
          year: "2024",
        },
        {
          title: "Biocompatible Materials in Medical Implants",
          journal: "Biomaterials",
          year: "2023",
        },
      ],
      stats: {
        publications: 450,
        patents: 25,
        funding: "₹15Cr",
        hIndex: 8.5,
      },
    },

    financialAid: {
      scholarships: [
        {
          name: "Merit Scholarship",
          amount: "₹50,000/year",
          criteria: "Top 10% in entrance exam",
          deadline: "June 30, 2024",
        },
        {
          name: "Need-based Aid",
          amount: "₹75,000/year",
          criteria: "Family income < ₹5L",
          deadline: "July 15, 2024",
        },
        {
          name: "Sports Scholarship",
          amount: "₹40,000/year",
          criteria: "State/National level sports",
          deadline: "August 1, 2024",
        },
      ],
      feeStructure: [
        { category: "Tuition Fee", amount: "₹2,50,000/year" },
        { category: "Hostel Fee", amount: "₹80,000/year" },
        { category: "Mess Fee", amount: "₹45,000/year" },
        { category: "Other Charges", amount: "₹25,000/year" },
      ],
      loans: [
        { bank: "SBI", rate: "8.5% p.a.", amount: "Up to ₹30L" },
        { bank: "HDFC Bank", rate: "9.0% p.a.", amount: "Up to ₹25L" },
        { bank: "ICICI Bank", rate: "8.8% p.a.", amount: "Up to ₹20L" },
      ],
    },
  },
  2: {
    id: 2,
    name: "Anna University",
    shortName: "Anna University",
    logo: "/cl2.png?height=120&width=120",
    coverImage: "/c2.jpg?height=400&width=800",
    gallery: [
      "/cl2.png?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    location: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    established: 1978,
    type: "Government",
    affiliation: "UGC, AICTE",
    accreditation: ["NAAC A+", "NBA", "NIRF Top 20"],

    // Contact Information
    contact: {
      address: "Sardar Patel Road, Guindy, Chennai, Tamil Nadu 600025",
      phone: "+91-44-2257-4802",
      email: "registrar@annauniv.edu",
      website: "https://www.annauniv.edu",
      admissionsEmail: "admissions@annauniv.edu",
    },

    // Basic Stats
    stats: {
      rating: 4.5,
      nirf: 18,
      campusSize: "185 acres",
      totalStudents: "15,000+",
      faculty: "800+",
      studentFacultyRatio: "19:1",
      placementRate: 85,
      averagePackage: "₹6L",
      highestPackage: "₹1.2Cr",
      internationalStudents: "5%",
    },

    // Detailed Information
    about: {
      overview:
        "Anna University is a prestigious state technical university located in Chennai, Tamil Nadu. Established in 1978, it has grown into one of India’s leading institutions for engineering and technology education, known for its academic excellence and large network of affiliated colleges.",
      mission:
        "To provide quality education in engineering, technology and allied sciences and promote research, innovation, and sustainable development.",
      vision:
        "To be a globally recognized institution fostering academic excellence, research, and industry collaboration.",
      highlights: [
        "Largest technical university in Tamil Nadu with 500+ affiliated colleges",
        "Renowned for strong academic rigor and competitive admissions",
        "Centralized counselling through TNEA for Tamil Nadu engineering admissions",
        "Extensive research in Civil, Mechanical, Electrical, and IT domains",
        "Strong placement support and industry collaboration across sectors",
      ],
    },

    // Academic Information
    academics: {
      courses: [
        {
          name: "Computer Science and Engineering",
          duration: "4 years",
          seats: 180,
          cutoff: 198,
          fees: "₹60K/year",
          description:
            "Program focused on programming, data structures, algorithms, artificial intelligence, and system design.",
        },
        {
          name: "Electronics and Communication Engineering",
          duration: "4 years",
          seats: 150,
          cutoff: 196,
          fees: "₹60K/year",
          description:
            "Specializes in electronic devices, embedded systems, VLSI, communication networks, and digital signal processing.",
        },
        {
          name: "Mechanical Engineering",
          duration: "4 years",
          seats: 120,
          cutoff: 194,
          fees: "₹60K/year",
          description:
            "Covers core mechanical systems, thermodynamics, manufacturing technology, and design automation.",
        },
        {
          name: "Civil Engineering",
          duration: "4 years",
          seats: 100,
          cutoff: 192,
          fees: "₹60K/year",
          description:
            "Focuses on structural analysis, transportation, geotechnical engineering, and sustainable infrastructure.",
        },
      ],

      specializations: [
        "Cyber Security",
        "Data Analytics",
        "VLSI Design",
        "Structural Engineering",
        "Power Systems",
      ],

      researchAreas: [
        "Civil Infrastructure & Smart Cities",
        "Electrical Power Engineering",
        "Artificial Intelligence & Machine Learning",
        "Water Resources & Environmental Engineering",
        "Nano Technology & Material Science",
      ],
    },

    // Admissions
    admissions: {
      process: "TNEA (Tamil Nadu Engineering Admissions)",
      eligibility:
        "Minimum 45% in 12th grade with Physics, Chemistry, and Mathematics (40% for reserved categories)",
      applicationDeadline: "June 10, 2024",
      counselingDates: "July 1-20, 2024",
      documentsRequired: [
        "Class 12 Mark Sheet",
        "Class 10 Mark Sheet",
        "Community Certificate (if applicable)",
        "Nativity Certificate (if applicable)",
        "Income Certificate (for fee concession)",
        "Counseling Call Letter",
        "Passport Size Photos",
      ],
      importantDates: [
        { event: "TNEA Application Opens", date: "May 4, 2024" },
        { event: "Application Deadline", date: "June 10, 2024" },
        { event: "Random Number Allocation", date: "June 15, 2024" },
        { event: "Rank List Release", date: "June 20, 2024" },
        { event: "Counseling Starts", date: "July 1, 2024" },
      ],
    },

    // Placements
    placements: {
      overview:
        "Anna University, particularly the College of Engineering Guindy (CEG), has a strong placement record with consistent recruiter participation across IT, core, and public sectors.",
      stats: {
        placementRate: 85,
        averagePackage: 6,
        medianPackage: 5.5,
        highestPackage: 36,
        totalOffers: 1200,
        companies: 250,
      },
      topRecruiters: [
        "TCS",
        "Infosys",
        "Accenture",
        "Caterpillar",
        "Zoho",
        "HCL",
        "L&T",
        "Qualcomm",
        "Wipro",
        "Freshworks",
      ],
      sectorWise: [
        { sector: "IT Services", percentage: 50, color: "#3b82f6" },
        { sector: "Core Engineering", percentage: 25, color: "#f59e0b" },
        { sector: "Product/Startup", percentage: 10, color: "#10b981" },
        { sector: "Consulting", percentage: 10, color: "#8b5cf6" },
        { sector: "Others", percentage: 5, color: "#ef4444" },
      ],
      yearWiseData: [
        { year: "2020", average: 4.5, highest: 15, placed: 80 },
        { year: "2021", average: 5.2, highest: 22, placed: 82 },
        { year: "2022", average: 5.8, highest: 30, placed: 84 },
        { year: "2023", average: 6, highest: 36, placed: 85 },
      ],
    },

    // Facilities
    facilities: {
      academic: [
        "University Library with 1+ lakh volumes",
        "Department-wise specialized labs",
        "Digital Learning Platforms",
        "Research and Innovation Centers",
        "Smart Classrooms and Auditoriums",
      ],
      residential: [
        "Separate Hostels for Boys and Girls",
        "On-campus Faculty Housing",
        "Guest House and Alumni Block",
        "Multiple Messes with hygienic food",
        "24/7 Security Surveillance",
      ],
      recreational: [
        "Anna Stadium and Athletic Track",
        "Indoor Sports Complex",
        "Fully-equipped Gym",
        "Open Air Theatre for cultural events",
        "Student Clubs and Fests",
      ],
      other: [
        "Health Centre with ambulance service",
        "SBI and Indian Bank branches with ATMs",
        "Post Office on campus",
        "Cafeterias and Canteens",
        "Wi-Fi Enabled Zones",
        "Bus and Shuttle Services",
      ],
    },

    // Rankings and Recognition
    rankings: [
      { organization: "NIRF", rank: 18, category: "Engineering", year: 2023 },
      {
        organization: "QS Asia",
        rank: 251,
        category: "Asian University",
        year: 2023,
      },
      {
        organization: "Times Higher Education",
        rank: 801,
        category: "World University",
        year: 2023,
      },
    ],

    // Reviews and Ratings
    reviews: {
      overall: 4.4,
      categories: {
        academics: 4.5,
        placements: 4.3,
        infrastructure: 4.2,
        faculty: 4.4,
        campusLife: 4.5,
      },
      studentReviews: [
        {
          name: "Karthik M",
          batch: "2023",
          course: "Mechanical Engineering",
          rating: 4.5,
          review:
            "CEG provides a great blend of academics and extracurriculars. The campus life is vibrant and the faculty are very supportive.",
        },
        {
          name: "Divya S",
          batch: "2022",
          course: "Computer Science and Engineering",
          rating: 4.6,
          review:
            "The college has excellent academic support and a strong alumni network. Placement training is very effective, especially for IT roles.",
        },
      ],
    },

    // Cutoff Trends
    cutoffTrends: [
      { year: "2020", general: 198, obc: 195, sc: 190, st: 185 },
      { year: "2021", general: 199, obc: 196, sc: 191, st: 186 },
      { year: "2022", general: 199.25, obc: 196.5, sc: 192, st: 187 },
      { year: "2023", general: 199.5, obc: 197, sc: 193, st: 188 },
    ],

    campusLife: {
      clubs: [
        "Technical Club",
        "Cultural Society",
        "Sports Club",
        "Literary Society",
        "Photography Club",
        "Music Club",
      ],
      events: [
        {
          event: "Admission Open Day",
          date: "March 15, 2024",
          type: "Admissions",
        },
        {
          event: "Research Symposium",
          date: "March 20, 2024",
          type: "Academic",
        },
        { event: "Cultural Night", date: "March 25, 2024", type: "Cultural" },
        { event: "Industry Connect", date: "April 2, 2024", type: "Placement" },
      ],
      hostelLife: {
        hostels: 16,
        capacity: 8000,
        facilities: ["Wi-Fi", "Gym", "Common Room", "Laundry", "24/7 Security"],
      },
    },

    research: {
      centers: [
        {
          name: "AI & Machine Learning Lab",
          focus: "Deep Learning, NLP, Computer Vision",
          funding: "₹2.5Cr",
        },
        {
          name: "Renewable Energy Center",
          focus: "Solar, Wind, Energy Storage",
          funding: "₹1.8Cr",
        },
        {
          name: "Biomedical Engineering Lab",
          focus: "Medical Devices, Biomaterials",
          funding: "₹1.2Cr",
        },
      ],
      publications: [
        {
          title: "Advanced Neural Networks for Image Recognition",
          journal: "IEEE Transactions",
          year: "2024",
        },
        {
          title: "Sustainable Energy Solutions for Smart Cities",
          journal: "Nature Energy",
          year: "2024",
        },
        {
          title: "Biocompatible Materials in Medical Implants",
          journal: "Biomaterials",
          year: "2023",
        },
      ],
      stats: {
        publications: 450,
        patents: 25,
        funding: "₹15Cr",
        hIndex: 8.5,
      },
    },

    financialAid: {
      scholarships: [
        {
          name: "Merit Scholarship",
          amount: "₹50,000/year",
          criteria: "Top 10% in entrance exam",
          deadline: "June 30, 2024",
        },
        {
          name: "Need-based Aid",
          amount: "₹75,000/year",
          criteria: "Family income < ₹5L",
          deadline: "July 15, 2024",
        },
        {
          name: "Sports Scholarship",
          amount: "₹40,000/year",
          criteria: "State/National level sports",
          deadline: "August 1, 2024",
        },
      ],
      feeStructure: [
        { category: "Tuition Fee", amount: "₹2,50,000/year" },
        { category: "Hostel Fee", amount: "₹80,000/year" },
        { category: "Mess Fee", amount: "₹45,000/year" },
        { category: "Other Charges", amount: "₹25,000/year" },
      ],
      loans: [
        { bank: "SBI", rate: "8.5% p.a.", amount: "Up to ₹30L" },
        { bank: "HDFC Bank", rate: "9.0% p.a.", amount: "Up to ₹25L" },
        { bank: "ICICI Bank", rate: "8.8% p.a.", amount: "Up to ₹20L" },
      ],
    },
  },

  3: {
    id: 3,
    name: "SRM Institute of Science and Technology",
    shortName: "SRM Institute",
    logo: "/cl3.png?height=120&width=120",
    coverImage: "/c3.png?height=400&width=800",
    gallery: [
      "/cl3.jpg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    location: "Kattankulathur, Chennai",
    state: "Tamil Nadu",
    country: "India",
    established: 1985,
    type: "Private Deemed University",
    affiliation: "UGC Approved, Deemed to be University",
    accreditation: ["NAAC A++", "NBA Accredited", "NIRF Top 20 (Engineering)"],

    // Contact Information
    contact: {
      address:
        "SRM Nagar, Kattankulathur, Chengalpattu District, Tamil Nadu 603203",
      phone: "+91-44-2745-5510",
      email: "admissions@srmist.edu.in",
      website: "https://www.srmist.edu.in",
      admissionsEmail: "admissions@srmist.edu.in",
    },

    // Basic Stats
    stats: {
      rating: 4.4,
      nirf: 28,
      campusSize: "250 acres",
      totalStudents: "50,000+",
      faculty: "1,700+",
      studentFacultyRatio: "20:1",
      placementRate: 92,
      averagePackage: "₹5L",
      highestPackage: "₹44L",
      internationalStudents: "10%",
    },

    // Detailed Information
    about: {
      overview:
        "SRM Institute of Science and Technology (SRMIST) is one of India’s top-ranked private universities, known for its excellence in engineering, medical, management, and science education. Established in 1985, SRMIST has grown into a multidisciplinary institution with a strong emphasis on innovation, research, and global exposure.",
      mission:
        "To emerge as a world-class university in creating and disseminating knowledge, and providing students a unique learning experience in science, technology, medicine, management, and other areas of scholarship.",
      vision:
        "To be the most preferred destination for global education, recognized for academic excellence and research innovation.",
      highlights: [
        "NAAC A++ Accredited and Category I University by UGC",
        "Over 52,000 students and 3,200 faculty members",
        "International collaborations with 100+ universities worldwide",
        "Cutting-edge research centers in AI, nanotechnology, and biotechnology",
        "Dedicated placement cell with strong industry connect and high placement rates",
      ],
    },

    // Academic Information
    academics: {
      courses: [
        {
          name: "Computer Science and Engineering",
          duration: "4 years",
          seats: 600,
          cutoff: 160,
          fees: "₹2.5L/year",
          description:
            "Focused on programming, software development, artificial intelligence, cybersecurity, and emerging digital technologies.",
        },
        {
          name: "Electronics and Communication Engineering",
          duration: "4 years",
          seats: 300,
          cutoff: 155,
          fees: "₹2.5L/year",
          description:
            "Covers VLSI, embedded systems, wireless communications, and IoT-based system design.",
        },
        {
          name: "Mechanical Engineering",
          duration: "4 years",
          seats: 240,
          cutoff: 150,
          fees: "₹2.5L/year",
          description:
            "Blends core mechanical principles with CAD/CAM, automation, and sustainable engineering practices.",
        },
        {
          name: "Civil Engineering",
          duration: "4 years",
          seats: 180,
          cutoff: 145,
          fees: "₹2.5L/year",
          description:
            "Emphasizes construction technology, urban infrastructure, and smart city planning.",
        },
      ],
      specializations: [
        "Artificial Intelligence and Machine Learning",
        "Cybersecurity",
        "Blockchain Technology",
        "IoT and Embedded Systems",
        "Automobile Engineering",
      ],
      researchAreas: [
        "Nanotechnology",
        "Renewable Energy Systems",
        "Biomedical Devices",
        "AI & Robotics",
        "Smart Infrastructure",
      ],
    },

    // Admissions
    admissions: {
      process: "SRMJEEE (SRM Joint Engineering Entrance Examination)",
      eligibility:
        "Minimum 60% aggregate in PCM (Physics, Chemistry, Math) in 12th grade or equivalent",
      applicationDeadline: "April 15, 2025",
      examDate: "April 20-25, 2025",
      counselingDates: "May 1-15, 2025",
      documentsRequired: [
        "SRMJEEE Scorecard",
        "Class 12 Mark Sheet",
        "Class 10 Mark Sheet",
        "Transfer Certificate",
        "Migration Certificate (if applicable)",
        "ID Proof (Aadhaar/Passport)",
        "Passport Size Photographs",
      ],
      importantDates: [
        { event: "Application Opens", date: "December 1, 2024" },
        { event: "Application Deadline", date: "April 15, 2025" },
        { event: "SRMJEEE Exam Window", date: "April 20-25, 2025" },
        { event: "Results Announcement", date: "April 28, 2025" },
        { event: "Counseling Begins", date: "May 1, 2025" },
      ],
    },

    // Placements
    placements: {
      overview:
        "SRMIST has a strong placement track record with a diverse range of recruiters from various industries offering competitive packages to students.",
      stats: {
        placementRate: 92,
        averagePackage: 6.2,
        medianPackage: 5.5,
        highestPackage: 57,
        totalOffers: 8200,
        companies: 650,
      },
      topRecruiters: [
        "TCS",
        "Cognizant",
        "Infosys",
        "Wipro",
        "Amazon",
        "Accenture",
        "Capgemini",
        "HCL",
        "Dell",
        "Zoho",
      ],
      sectorWise: [
        { sector: "IT Services", percentage: 40, color: "#3b82f6" },
        { sector: "Product Companies", percentage: 25, color: "#8b5cf6" },
        { sector: "Core Engineering", percentage: 15, color: "#f59e0b" },
        { sector: "Finance & Consulting", percentage: 10, color: "#10b981" },
        { sector: "Others", percentage: 10, color: "#ef4444" },
      ],
      yearWiseData: [
        { year: "2020", average: 5.2, highest: 35, placed: 90 },
        { year: "2021", average: 5.8, highest: 45, placed: 91 },
        { year: "2022", average: 6.0, highest: 50, placed: 92 },
        { year: "2023", average: 6.2, highest: 57, placed: 92 },
      ],
    },

    // Facilities
    facilities: {
      academic: [
        "Central Library with 300,000+ books and digital resources",
        "State-of-the-art Computing and AI Labs",
        "Centers of Excellence in Robotics, Nanotech, and IoT",
        "Smart Classrooms with digital boards and AV systems",
        "Well-equipped departmental laboratories",
      ],
      residential: [
        "24 Hostels accommodating over 15,000 students",
        "Faculty and staff residential quarters",
        "AC/Non-AC rooms with laundry and housekeeping services",
        "Multiple mess options with vegetarian and non-vegetarian cuisines",
        "Round-the-clock security and biometric access",
      ],
      recreational: [
        "Indoor Stadium and Outdoor Sports Facilities",
        "Olympic-sized Swimming Pool",
        "Fitness Centers and Yoga Halls",
        "Cricket and Football Grounds",
        "Cultural Auditorium and Amphitheatre",
      ],
      other: [
        "24/7 Medical and Ambulance Services",
        "On-campus Banks and ATMs",
        "Postal and Courier Services",
        "Cafeterias, Supermarkets, and Retail Outlets",
        "Electric Shuttle Services and Transport Buses",
        "High-Speed Wi-Fi across the campus",
      ],
    },

    // Rankings and Recognition
    rankings: [
      { organization: "NIRF", rank: 28, category: "Engineering", year: 2023 },
      { organization: "NIRF", rank: 18, category: "University", year: 2023 },
      {
        organization: "QS Asia University Rankings",
        rank: 301,
        category: "Asia University",
        year: 2023,
      },
      {
        organization: "Times Higher Education",
        rank: 801,
        category: "World University",
        year: 2023,
      },
    ],

    // Reviews and Ratings
    reviews: {
      overall: 4.3,
      categories: {
        academics: 4.2,
        placements: 4.1,
        infrastructure: 4.5,
        faculty: 4.3,
        campusLife: 4.6,
      },
      studentReviews: [
        {
          name: "Rahul Menon",
          batch: "2023",
          course: "CSE",
          rating: 4.5,
          review:
            "SRM offers great infrastructure and a wide range of opportunities. The coding culture is improving and placement support is strong.",
        },
        {
          name: "Sneha Reddy",
          batch: "2022",
          course: "Biotech",
          rating: 4.2,
          review:
            "Very good campus life with helpful faculty and decent placements. Lots of extracurricular activities and clubs to join.",
        },
      ],
    },

    // Cutoff Trends
    cutoffTrends: [
      { year: "2020", general: 135, obc: 125, sc: 110, st: 100 },
      { year: "2021", general: 140, obc: 128, sc: 113, st: 102 },
      { year: "2022", general: 145, obc: 132, sc: 115, st: 105 },
      { year: "2023", general: 148, obc: 135, sc: 118, st: 108 },
    ],
    campusLife: {
      clubs: [
        "Coding Club",
        "Cultural Club",
        "Entrepreneurship Cell",
        "Robotics Club",
        "Drama and Theatre Club",
        "Dance and Music Club",
      ],
      events: [
        {
          event: "SRM Open House",
          date: "April 5, 2024",
          type: "Admissions",
        },
        {
          event: "TechFest Aaruush",
          date: "August 22, 2024",
          type: "Academic",
        },
        {
          event: "Milan Cultural Fest",
          date: "February 10, 2024",
          type: "Cultural",
        },
        {
          event: "Placement Expo",
          date: "July 18, 2024",
          type: "Placement",
        },
      ],
      hostelLife: {
        hostels: 15,
        capacity: 7500,
        facilities: [
          "High-speed Wi-Fi",
          "AC Rooms Available",
          "Study Lounges",
          "Gymnasium",
          "24/7 Security",
          "Laundry and Mess Facilities",
        ],
      },
    },

    research: {
      centers: [
        {
          name: "Center for Artificial Intelligence and Robotics",
          focus: "Autonomous Systems, Generative AI, Human-Robot Interaction",
          funding: "₹3.2Cr",
        },
        {
          name: "Center for Sustainable Infrastructure & Smart Cities",
          focus: "Green Buildings, Smart Grids, Urban Mobility",
          funding: "₹2.4Cr",
        },
        {
          name: "Translational Health Science Lab",
          focus: "Wearable Tech, Telemedicine, Bioinformatics",
          funding: "₹1.9Cr",
        },
      ],
      publications: [
        {
          title: "Multimodal Learning Models for Healthcare Diagnostics",
          journal: "IEEE Access",
          year: "2024",
        },
        {
          title: "Smart Grid Optimization in Urban Environments",
          journal: "Renewable Energy Journal",
          year: "2024",
        },
        {
          title: "Human-AI Collaboration in Creative Robotics",
          journal: "Science Robotics",
          year: "2023",
        },
      ],
      stats: {
        publications: 600,
        patents: 40,
        funding: "₹18Cr",
        hIndex: 10.2,
      },
    },

    financialAid: {
      scholarships: [
        {
          name: "SRM Merit Scholarship",
          amount: "100% Tuition Fee Waiver",
          criteria: "Top 1,000 rank holders in JEE Main or State Board Toppers",
          deadline: "June 30, 2024",
        },
        {
          name: "Socio-Economic Scholarship",
          amount: "Up to ₹75,000/year",
          criteria:
            "Annual family income below ₹4L with academic performance above 70%",
          deadline: "July 10, 2024",
        },
        {
          name: "SRM Talent Scholarship (Sports/Arts)",
          amount: "₹40,000–₹1L/year",
          criteria:
            "Excellence at State/National/International level in sports or cultural events",
          deadline: "August 5, 2024",
        },
        {
          name: "Differently Abled Support Grant",
          amount: "₹50,000/year",
          criteria:
            "Valid disability certificate with minimum 60% in qualifying exam",
          deadline: "July 31, 2024",
        },
      ],
      feeStructure: [
        { category: "Tuition Fee", amount: "₹2,50,000/year" },
        { category: "Hostel Fee", amount: "₹90,000/year" },
        { category: "Mess Fee", amount: "₹50,000/year" },
        { category: "One-time Admission Fee", amount: "₹10,000" },
        { category: "Miscellaneous & Exam Charges", amount: "₹20,000/year" },
      ],
      loans: [
        {
          bank: "State Bank of India (SBI)",
          rate: "8.5% p.a.",
          amount: "Up to ₹30L",
          moratorium: "Course duration + 1 year",
        },
        {
          bank: "HDFC Credila",
          rate: "9.2% p.a.",
          amount: "Up to ₹25L",
          moratorium: "Flexible repayment options",
        },
        {
          bank: "ICICI Education Loan",
          rate: "8.8% p.a.",
          amount: "Up to ₹20L",
          moratorium: "Up to 12 months post-graduation",
        },
      ],
    },
  },

  4: {
    id: 4,
    name: "Vellore Institute of Technology",
    shortName: "VIT University",
    logo: "/cl4.png?height=120&width=120",
    coverImage: "/c4.png?height=400&width=800",
    gallery: [
      "/cl4.jpg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    location: "Vellore",
    state: "Tamil Nadu",
    country: "India",
    established: 1984,
    type: "Private",
    affiliation: "Deemed to be University",
    accreditation: ["NAAC A++", "NBA", "Institute of Eminence (IoE) – UGC"],

    // Contact Information
    contact: {
      address:
        "VIT University, Vellore Campus, Vellore - 632014, Tamil Nadu, India",
      phone: "+91-416-220-2020",
      email: "info@vit.ac.in",
      website: "https://www.vit.ac.in",
      admissionsEmail: "admission@vit.ac.in",
    },

    // Basic Stats
    stats: {
      rating: 4.5,
      nirf: 11,
      campusSize: "372 acres",
      totalStudents: "35,000+",
      faculty: "1,800+",
      studentFacultyRatio: "19:1",
      placementRate: 90,
      averagePackage: "₹7.2L",
      highestPackage: "₹1.02Cr",
      internationalStudents: "10%",
    },

    // Detailed Information
    about: {
      overview:
        "Vellore Institute of Technology (VIT) is a premier private deemed university in India, known for its academic excellence, innovation-driven research, and world-class infrastructure. Established in 1984, it offers a wide range of undergraduate, postgraduate, and doctoral programs across disciplines.",
      mission:
        "To transform life through excellence in education and research, fostering innovation and global competencies in students.",
      vision:
        "To be a globally recognized center of academic excellence and research, nurturing talent and empowering future leaders.",
      highlights: [
        "NAAC A++ accredited and ranked among top private universities in India",
        "International collaborations with 300+ foreign universities",
        "Flexible Credit System (FFCS) for personalized learning",
        "Host to one of India’s largest placement drives with record-breaking offers",
        "Multicultural campus with students from 50+ countries",
      ],
    },

    // Academic Information
    academics: {
      courses: [
        {
          name: "Computer Science and Engineering",
          duration: "4 years",
          seats: 780,
          cutoff: 82, // Based on VITEEE rank
          fees: "₹1.98L/year",
          description:
            "Extensive curriculum covering data structures, software development, cybersecurity, AI, and machine learning.",
        },
        {
          name: "Electronics and Communication Engineering",
          duration: "4 years",
          seats: 600,
          cutoff: 9000,
          fees: "₹1.98L/year",
          description:
            "Strong foundation in electronic systems, communication networks, embedded systems, and VLSI design.",
        },
        {
          name: "Mechanical Engineering",
          duration: "4 years",
          seats: 540,
          cutoff: 14000,
          fees: "₹1.98L/year",
          description:
            "Focus on mechanical design, thermal systems, manufacturing, and automation technologies.",
        },
        {
          name: "Civil Engineering",
          duration: "4 years",
          seats: 360,
          cutoff: 18000,
          fees: "₹1.98L/year",
          description:
            "Program includes structural design, environmental engineering, geotechnics, and urban infrastructure.",
        },
      ],
      specializations: [
        "Artificial Intelligence and Machine Learning",
        "Cyber-Physical Systems",
        "Data Analytics",
        "IoT and Smart Devices",
        "Bioinformatics",
      ],
      researchAreas: [
        "Advanced Computing",
        "Green and Sustainable Technologies",
        "Healthcare Engineering",
        "Autonomous Systems",
        "Nanotechnology",
      ],
    },

    // Admissions
    admissions: {
      process: "VITEEE (VIT Engineering Entrance Examination)",
      eligibility:
        "Minimum 60% in PCM/PCB in 12th grade (50% for SC/ST and J&K/Ladakh/Northeast candidates)",
      applicationDeadline: "March 31, 2024",
      examDate: "April 19-30, 2024",
      counselingDates: "May 15-30, 2024",
      documentsRequired: [
        "VITEEE Scorecard",
        "Class 12 Mark Sheet",
        "Class 10 Mark Sheet",
        "Transfer Certificate",
        "Migration Certificate (if applicable)",
        "Community Certificate (if applicable)",
        "Aadhaar Card/ID Proof",
        "Passport Size Photos",
      ],
      importantDates: [
        { event: "Application Opens", date: "November 1, 2023" },
        { event: "Application Deadline", date: "March 31, 2024" },
        { event: "VITEEE Exam", date: "April 19-30, 2024" },
        { event: "Results Announcement", date: "May 3, 2024" },
        { event: "Counseling", date: "May 15-30, 2024" },
      ],
    },

    // Placements
    placements: {
      overview:
        "Vellore Institute of Technology (VIT) maintains a strong placement record with over 900 companies visiting the campus every year, offering diverse opportunities across sectors.",
      stats: {
        placementRate: 90,
        averagePackage: 7,
        medianPackage: 6,
        highestPackage: 75,
        totalOffers: 12000,
        companies: 900,
      },
      topRecruiters: [
        "Microsoft",
        "Amazon",
        "Intel",
        "Deloitte",
        "TCS",
        "Wipro",
        "Cognizant",
        "Accenture",
        "HP",
        "L&T Infotech",
      ],
      sectorWise: [
        { sector: "IT Services", percentage: 40, color: "#3b82f6" },
        { sector: "Product Companies", percentage: 25, color: "#8b5cf6" },
        { sector: "Consulting", percentage: 15, color: "#10b981" },
        { sector: "Core Engineering", percentage: 10, color: "#f59e0b" },
        { sector: "Others", percentage: 10, color: "#ef4444" },
      ],
      yearWiseData: [
        { year: "2020", average: 6, highest: 44, placed: 85 },
        { year: "2021", average: 6.5, highest: 50, placed: 88 },
        { year: "2022", average: 6.8, highest: 55, placed: 90 },
        { year: "2023", average: 7, highest: 75, placed: 90 },
      ],
    },

    // Facilities
    facilities: {
      academic: [
        "State-of-the-art Central Library with digital resources",
        "Smart Classrooms with AV systems",
        "Dedicated Research & Innovation Centers",
        "Fully equipped Computing Labs and CAD/CAM Labs",
        "Department-specific laboratories and workshops",
      ],
      residential: [
        "24 Hostels with AC & Non-AC rooms",
        "Faculty and Staff Housing",
        "Guest House for visitors and parents",
        "Multi-cuisine Mess and Cafeterias",
        "24/7 campus security and biometric access",
      ],
      recreational: [
        "Indoor Sports Complex and Gym",
        "Olympic-standard Swimming Pool",
        "Football & Cricket Grounds",
        "Basketball, Tennis & Badminton Courts",
        "Auditoriums and Cultural Clubs",
      ],
      other: [
        "Health Center with ambulance service",
        "On-campus Banks and ATMs",
        "Post Office & Courier Facility",
        "Retail Shops and Cafeteria chains",
        "Wi-Fi enabled campus",
        "Transport services across Vellore",
      ],
    },

    // Rankings and Recognition
    rankings: [
      { organization: "NIRF", rank: 11, category: "Engineering", year: 2023 },
      {
        organization: "QS Asia University Rankings",
        rank: 173,
        category: "Asia University",
        year: 2023,
      },
      {
        organization: "Times Higher Education",
        rank: 801,
        category: "World University",
        year: 2023,
      },
      {
        organization: "ARIIA",
        rank: 1,
        category: "Private Institutions (Innovation)",
        year: 2021,
      },
    ],

    // Reviews and Ratings
    reviews: {
      overall: 4.5,
      categories: {
        academics: 4.4,
        placements: 4.3,
        infrastructure: 4.7,
        faculty: 4.5,
        campusLife: 4.6,
      },
      studentReviews: [
        {
          name: "Rahul Menon",
          batch: "2023",
          course: "CSE",
          rating: 5,
          review:
            "Great exposure to industry-level projects and internships. The infrastructure is impressive, and there are plenty of learning resources.",
        },
        {
          name: "Sneha Raj",
          batch: "2022",
          course: "Mechanical",
          rating: 4,
          review:
            "A very dynamic campus with a lot of events. The faculty is supportive, and hostel life is vibrant. Placement support could be better in core branches.",
        },
      ],
    },

    // Cutoff Trends
    cutoffTrends: [
      { year: "2020", general: 178, obc: 160, sc: 138, st: 118 },
      { year: "2021", general: 180, obc: 162, sc: 140, st: 120 },
      { year: "2022", general: 183, obc: 165, sc: 142, st: 122 },
      { year: "2023", general: 185, obc: 168, sc: 144, st: 124 },
    ],

    campusLife: {
      clubs: [
        "CodeChef VIT Chapter",
        "Dance Club (VIT Vibes)",
        "Dramatics Club",
        "DebSoc (Debating Society)",
        "Fine Arts Club",
        "IEEE Student Branch",
        "Entrepreneurship Cell",
      ],
      events: [
        {
          event: "VITEEE Counselling Week",
          date: "April 5, 2024",
          type: "Admissions",
        },
        {
          event: "GraVITas (Tech Fest)",
          date: "October 11, 2024",
          type: "Academic",
        },
        {
          event: "Riviera (Cultural Fest)",
          date: "February 16, 2024",
          type: "Cultural",
        },
        {
          event: "VIT Hackathon",
          date: "August 18, 2024",
          type: "Innovation",
        },
      ],
      hostelLife: {
        hostels: 24,
        capacity: 22000,
        facilities: [
          "Wi-Fi",
          "Indoor Games",
          "Laundry Services",
          "AC/Non-AC Rooms",
          "ATM",
          "24/7 Security",
        ],
      },
    },

    research: {
      centers: [
        {
          name: "Centre for Artificial Intelligence and Robotics (CAIR)",
          focus: "AI-driven automation, Deep Learning, and Smart Robotics",
          funding: "₹3.2Cr",
        },
        {
          name: "Centre for Clean Energy and Environment",
          focus: "Green technologies, Electric mobility, and Sustainability",
          funding: "₹2.6Cr",
        },
        {
          name: "Centre for Biomaterials and Tissue Engineering",
          focus: "Biomedical imaging, Implantable devices, and Drug delivery",
          funding: "₹2.1Cr",
        },
      ],
      publications: [
        {
          title: "Optimizing Transformer Models for Language Understanding",
          journal: "IEEE Access",
          year: "2024",
        },
        {
          title: "Smart Grids and Battery Management for Green Cities",
          journal: "Elsevier Renewable & Sustainable Energy Reviews",
          year: "2024",
        },
        {
          title: "Advancements in Tissue-Compatible Nanomaterials",
          journal: "ACS Biomaterials Science & Engineering",
          year: "2023",
        },
      ],
      stats: {
        publications: 780,
        patents: 48,
        funding: "₹21Cr",
        hIndex: 10.2,
      },
    },

    financialAid: {
      scholarships: [
        {
          name: "GV School Development Programme (GVSDP)",
          amount: "Up to 100% Tuition Fee Waiver",
          criteria: "Top 1000 in VITEEE / Top 50 in Board Exams",
          deadline: "June 20, 2024",
        },
        {
          name: "Economic Support Scholarship",
          amount: "₹60,000/year",
          criteria:
            "Family income below ₹3L and academic performance above 70%",
          deadline: "July 10, 2024",
        },
        {
          name: "Excellence in Sports Scholarship",
          amount: "₹50,000/year",
          criteria: "Participation in National/International Sports Events",
          deadline: "August 5, 2024",
        },
      ],
      feeStructure: [
        {
          category: "Tuition Fee",
          amount: "₹1,98,000 - ₹3,98,000/year (based on branch)",
        },
        {
          category: "Hostel Fee",
          amount: "₹70,000 - ₹1,10,000/year (based on room type)",
        },
        { category: "Mess Fee", amount: "₹45,000/year" },
        { category: "Additional Charges", amount: "₹20,000/year" },
      ],
      loans: [
        {
          bank: "SBI Scholar Loan Scheme",
          rate: "8.3% p.a.",
          amount: "Up to ₹40L",
        },
        {
          bank: "Axis Bank Education Loan",
          rate: "9.25% p.a.",
          amount: "Up to ₹30L",
        },
        { bank: "IDFC FIRST Bank", rate: "9.0% p.a.", amount: "Up to ₹25L" },
      ],
    },
  },

  5: {
    id: 5,
    name: "PSG College of Technology",
    shortName: "PSG Tech",
    logo: "/cl5.png?height=120&width=120",
    coverImage: "/c5.jpg?height=400&width=800",
    gallery: [
      "/cl5.jpg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    location: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    established: 1951,
    type: "Government-Aided Autonomous",
    affiliation: "Anna University",
    accreditation: ["NAAC A++", "NBA", "NIRF Top 100"],

    // Contact Information
    contact: {
      address: "Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004",
      phone: "+91-422-2572177",
      email: "principal@psgtech.ac.in",
      website: "https://www.psgtech.edu",
      admissionsEmail: "admissions@psgtech.ac.in",
    },

    // Basic Stats
    stats: {
      rating: 4.5,
      nirf: 63,
      campusSize: "85 acres",
      totalStudents: "8,000+",
      faculty: "450+",
      studentFacultyRatio: "17:1",
      placementRate: 92,
      averagePackage: "₹6.5L",
      highestPackage: "₹20L",
      internationalStudents: "2%",
    },

    // Detailed Information
    about: {
      overview:
        "PSG College of Technology, established in 1951 in Coimbatore, Tamil Nadu, is one of India’s premier engineering institutions. It is known for its academic excellence, strong industry collaboration, and focus on innovation and entrepreneurship.",
      mission:
        "To achieve excellence in education and research, and to nurture technically competent and socially responsible professionals.",
      vision:
        "To be a leader in technical education and research, contributing to the nation's progress through innovation and knowledge dissemination.",
      highlights: [
        "Established by the PSG & Sons’ Charities Trust in 1951",
        "Autonomous institution affiliated to Anna University",
        "Strong emphasis on industry-institute interaction",
        "Home to several research centers and innovation labs",
        "Consistently high placement records with top recruiters",
      ],
    },

    // Academic Information
    academics: {
      courses: [
        {
          name: "Computer Science and Engineering",
          duration: "4 years",
          seats: 120,
          cutoff: 190,
          fees: "₹85,000/year",
          description:
            "Offers in-depth knowledge of computer systems, software development, data structures, AI, and machine learning.",
        },
        {
          name: "Electronics and Communication Engineering",
          duration: "4 years",
          seats: 120,
          cutoff: 187,
          fees: "₹85,000/year",
          description:
            "Focuses on communication systems, embedded electronics, VLSI design, and wireless technologies.",
        },
        {
          name: "Mechanical Engineering",
          duration: "4 years",
          seats: 120,
          cutoff: 182,
          fees: "₹85,000/year",
          description:
            "Covers thermodynamics, fluid mechanics, manufacturing systems, and automotive engineering.",
        },
        {
          name: "Electrical and Electronics Engineering",
          duration: "4 years",
          seats: 90,
          cutoff: 180,
          fees: "₹85,000/year",
          description:
            "Combines electrical fundamentals with modern electronics, power systems, and automation.",
        },
      ],
      specializations: [
        "Artificial Intelligence",
        "Internet of Things (IoT)",
        "Cybersecurity",
        "Data Science",
        "Smart Manufacturing",
      ],
      researchAreas: [
        "Renewable Energy Systems",
        "Signal Processing",
        "Advanced Robotics",
        "Machine Learning",
        "Nanotechnology",
      ],
    },

    // Admissions
    admissions: {
      process: "TNEA (Tamil Nadu Engineering Admissions)",
      eligibility:
        "Minimum 45% in 12th grade with PCM (40% for reserved categories)",
      applicationDeadline: "June 5, 2024",
      counselingDates: "July 1-15, 2024",
      documentsRequired: [
        "Class 12 Mark Sheet",
        "Class 10 Mark Sheet",
        "Transfer Certificate",
        "Community Certificate (if applicable)",
        "Nativity Certificate (if applicable)",
        "Income Certificate (for scholarship)",
        "First Graduate Certificate (if applicable)",
        "Counseling Call Letter",
      ],
      importantDates: [
        { event: "TNEA Application Opens", date: "May 6, 2024" },
        { event: "Application Deadline", date: "June 5, 2024" },
        { event: "Random Number Allotment", date: "June 7, 2024" },
        { event: "Rank List Release", date: "June 12, 2024" },
        { event: "Counseling", date: "July 1-15, 2024" },
      ],
    },

    // Placements
    placements: {
      overview:
        "PSG College of Technology has a strong placement record with a wide range of recruiters from engineering, IT, finance, and core industries.",
      stats: {
        placementRate: 92,
        averagePackage: 6.5,
        medianPackage: 5.8,
        highestPackage: 40,
        totalOffers: 1500,
        companies: 500,
      },
      topRecruiters: [
        "TCS",
        "Wipro",
        "Infosys",
        "Cognizant",
        "Accenture",
        "L&T",
        "Qualcomm",
        "Zoho",
        "TVS Motors",
        "Amazon",
      ],
      sectorWise: [
        { sector: "IT Services", percentage: 40, color: "#3b82f6" },
        { sector: "Core Engineering", percentage: 30, color: "#f59e0b" },
        { sector: "Product Companies", percentage: 15, color: "#10b981" },
        { sector: "Consulting", percentage: 10, color: "#8b5cf6" },
        { sector: "Others", percentage: 5, color: "#ef4444" },
      ],
      yearWiseData: [
        { year: "2020", average: 5.2, highest: 20, placed: 88 },
        { year: "2021", average: 5.8, highest: 28, placed: 90 },
        { year: "2022", average: 6.2, highest: 35, placed: 91 },
        { year: "2023", average: 6.5, highest: 40, placed: 92 },
      ],
    },

    facilities: {
      academic: [
        "Digital Library with 300,000+ volumes",
        "Department-specific Research Labs",
        "Innovation and Entrepreneurship Cell",
        "E-Learning Classrooms",
        "Industry-Collaborated Centers of Excellence",
      ],
      residential: [
        "14 Student Hostels (Boys & Girls)",
        "Staff Quarters and Guest Houses",
        "Spacious Dining Halls and Messes",
        "24x7 Security and Surveillance",
        "Solar-Powered Hot Water Systems",
      ],
      recreational: [
        "Indoor Sports Arena",
        "Multipurpose Gym",
        "Cricket and Football Grounds",
        "Basketball and Volleyball Courts",
        "Open-Air Theater and Cultural Auditorium",
      ],
      other: [
        "On-Campus Hospital & Pharmacy",
        "Bank Branches and ATMs",
        "Bookstore and Shopping Outlets",
        "Public Transport and Shuttle Service",
        "Wi-Fi Enabled Campus",
      ],
    },

    // Rankings and Recognition
    rankings: [
      { organization: "NIRF", rank: 63, category: "Engineering", year: 2023 },
      {
        organization: "India Today",
        rank: 16,
        category: "Engineering Colleges",
        year: 2023,
      },
      {
        organization: "Outlook-ICARE",
        rank: 20,
        category: "Top Private Engineering Colleges",
        year: 2023,
      },
    ],

    // Reviews and Ratings
    reviews: {
      overall: 4.5,
      categories: {
        academics: 4.6,
        placements: 4.4,
        infrastructure: 4.5,
        faculty: 4.6,
        campusLife: 4.4,
      },
      studentReviews: [
        {
          name: "Karthik M",
          batch: "2023",
          course: "Mechanical Engineering",
          rating: 4.5,
          review:
            "PSG Tech provides a strong academic foundation with excellent lab facilities. The campus life is active with a lot of technical and cultural events.",
        },
        {
          name: "Sneha R",
          batch: "2022",
          course: "Information Technology",
          rating: 4.6,
          review:
            "Great faculty support and industry exposure. Placements are good, especially for CS and IT branches. Hostel and campus facilities are well-maintained.",
        },
      ],
    },

    // Cutoff Trends
    cutoffTrends: [
      { year: "2020", general: 178, obc: 163, sc: 138, st: 118 },
      { year: "2021", general: 180, obc: 165, sc: 140, st: 120 },
      { year: "2022", general: 182, obc: 167, sc: 142, st: 122 },
      { year: "2023", general: 183, obc: 168, sc: 143, st: 123 },
    ],

    campusLife: {
      clubs: [
        "Robotics Club",
        "Coding Club",
        "Drama Club",
        "Music Band",
        "Eco Club",
        "Entrepreneurship Cell",
      ],
      events: [
        {
          event: "Tech Day",
          date: "February 22, 2024",
          type: "Technical",
        },
        {
          event: "Kriya - National Level Symposium",
          date: "March 10, 2024",
          type: "Academic",
        },
        {
          event: "Intrams - Sports Fest",
          date: "March 22, 2024",
          type: "Sports",
        },
        {
          event: "Renaissance - Cultural Fest",
          date: "April 5, 2024",
          type: "Cultural",
        },
      ],
      hostelLife: {
        hostels: 12,
        capacity: 6000,
        facilities: [
          "Wi-Fi",
          "Indoor Stadium",
          "Laundry",
          "Common TV Room",
          "24/7 Security",
        ],
      },
    },

    research: {
      centers: [
        {
          name: "Centre for Artificial Intelligence and Data Science",
          focus: "AI, Machine Learning, Big Data, IoT",
          funding: "₹3.2Cr",
        },
        {
          name: "Centre for Renewable Energy Systems",
          focus: "Solar Photovoltaics, Biofuels, Energy Storage",
          funding: "₹2.1Cr",
        },
        {
          name: "Biomedical Signal and Image Processing Lab",
          focus: "Medical Imaging, Prosthetics, Biomaterials",
          funding: "₹1.6Cr",
        },
      ],
      publications: [
        {
          title: "Intelligent Systems for Industrial Automation",
          journal: "Springer AI & Robotics",
          year: "2024",
        },
        {
          title: "Smart Grid Integration using Renewable Sources",
          journal: "Renewable Energy Journal",
          year: "2024",
        },
        {
          title: "Advanced Materials in Biomedical Applications",
          journal: "Journal of Biomedical Research",
          year: "2023",
        },
      ],
      stats: {
        publications: 520,
        patents: 30,
        funding: "₹18Cr",
        hIndex: 9.2,
      },
    },

    financialAid: {
      scholarships: [
        {
          name: "PSG Merit Scholarship",
          amount: "₹40,000/year",
          criteria: "Top 5% in academic performance each year",
          deadline: "June 30, 2024",
        },
        {
          name: "PSG Trust Scholarship",
          amount: "₹60,000/year",
          criteria: "Family income below ₹4L and consistent academic record",
          deadline: "July 20, 2024",
        },
        {
          name: "Excellence in Sports Scholarship",
          amount: "₹35,000/year",
          criteria: "Participation at university/state/national level events",
          deadline: "August 5, 2024",
        },
      ],
      feeStructure: [
        { category: "Tuition Fee", amount: "₹85,000/year" },
        { category: "Hostel Fee", amount: "₹70,000/year" },
        { category: "Mess Fee", amount: "₹40,000/year" },
        { category: "Other Charges", amount: "₹20,000/year" },
      ],
      loans: [
        { bank: "Canara Bank", rate: "8.2% p.a.", amount: "Up to ₹20L" },
        { bank: "Indian Bank", rate: "8.4% p.a.", amount: "Up to ₹25L" },
        { bank: "Axis Bank", rate: "9.0% p.a.", amount: "Up to ₹20L" },
      ],
    },
  },

  6: {
    id: 6,
    name: "Thiagarajar College of Engineering",
    shortName: "TCE Madurai",
    logo: "/cl6.jpg?height=120&width=120",
    coverImage: "/c6.jpg?height=400&width=800",
    gallery: [
      "/cl6.jpg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    location: "Madurai",
    state: "Tamil Nadu",
    country: "India",
    established: 1957,
    type: "Government-Aided",
    affiliation: "Anna University",
    accreditation: ["NAAC A+", "NBA Accredited", "NIRF Top 100"],

    // Contact Information
    contact: {
      address:
        "Thiagarajar College of Engineering, Thiruparankundram, Madurai, Tamil Nadu 625015",
      phone: "+91-452-2482240",
      email: "principal@tce.edu",
      website: "https://www.tce.edu",
      admissionsEmail: "admissions@tce.edu",
    },

    // Basic Stats
    stats: {
      rating: 4.3,
      nirf: 86,
      campusSize: "143 acres",
      totalStudents: "4,000+",
      faculty: "300+",
      studentFacultyRatio: "13:1",
      placementRate: 90,
      averagePackage: "₹4.5L",
      highestPackage: "₹12L",
      internationalStudents: "2%",
    },

    // Detailed Information
    about: {
      overview:
        "Thiagarajar College of Engineering (TCE), Madurai, is a renowned autonomous institution in Tamil Nadu, established in 1957 and affiliated to Anna University. It is known for academic excellence, discipline, and a commitment to social upliftment through education and innovation.",
      mission:
        "To impart quality technical education and instill high moral values, leading to sustainable technological innovation and community development.",
      vision:
        "To be a globally recognized institution fostering excellence in education, research, and innovation to serve society.",
      highlights: [
        "One of the oldest engineering colleges in Tamil Nadu",
        "Autonomous status with NBA and NAAC A++ accreditation",
        "Strong emphasis on research and industry collaboration",
        "Excellent placement record with top IT and core companies",
        "Green and eco-friendly campus with modern facilities",
      ],
    },

    // Academic Information
    academics: {
      courses: [
        {
          name: "Computer Science and Engineering",
          duration: "4 years",
          seats: 180,
          cutoff: 190,
          fees: "₹55,000/year",
          description:
            "Offers strong foundations in computing with emphasis on software development, data science, and AI.",
        },
        {
          name: "Electronics and Communication Engineering",
          duration: "4 years",
          seats: 180,
          cutoff: 187,
          fees: "₹55,000/year",
          description:
            "Focuses on modern communication systems, embedded technologies, and VLSI design.",
        },
        {
          name: "Mechanical Engineering",
          duration: "4 years",
          seats: 120,
          cutoff: 175,
          fees: "₹55,000/year",
          description:
            "Integrates core mechanical principles with CAD/CAM and industrial automation.",
        },
        {
          name: "Civil Engineering",
          duration: "4 years",
          seats: 120,
          cutoff: 172,
          fees: "₹55,000/year",
          description:
            "Strong curriculum in structural design, construction technology, and geotechnical engineering.",
        },
        {
          name: "Information Technology",
          duration: "4 years",
          seats: 60,
          cutoff: 185,
          fees: "₹55,000/year",
          description:
            "Blends computer science and business systems with a focus on practical applications.",
        },
      ],
      specializations: [
        "Artificial Intelligence and Data Science",
        "Cyber Security",
        "Internet of Things",
        "Robotics and Automation",
        "Smart Infrastructure",
      ],
      researchAreas: [
        "AI & Machine Learning",
        "Wireless Sensor Networks",
        "Structural Health Monitoring",
        "Green Energy and Sustainability",
        "Biomedical Signal Processing",
      ],
    },

    // Admissions
    admissions: {
      process: "TNEA (Tamil Nadu Engineering Admissions)",
      eligibility:
        "Pass in 10+2 with Physics, Chemistry, and Mathematics. Minimum 45% aggregate for General and 40% for reserved categories.",
      applicationDeadline: "June 6, 2024",
      counselingDates: "July 10–31, 2024",
      documentsRequired: [
        "Class 12 Mark Sheet",
        "Class 10 Mark Sheet",
        "Transfer Certificate",
        "Community Certificate (if applicable)",
        "Nativity Certificate (if applicable)",
        "Income Certificate (for scholarship)",
        "Counseling Call Letter",
      ],
      importantDates: [
        { event: "Application Opens", date: "May 6, 2024" },
        { event: "Application Deadline", date: "June 6, 2024" },
        { event: "Random Number Generation", date: "June 7, 2024" },
        { event: "Rank List Publication", date: "June 12, 2024" },
        { event: "Counseling", date: "July 10–31, 2024" },
      ],
    },

    // Placements
    placements: {
      overview:
        "Thiagarajar College of Engineering (TCE) has a strong placement track record with a wide range of companies recruiting students across core, IT, and consulting domains.",
      stats: {
        placementRate: 90,
        averagePackage: 6.5,
        medianPackage: 5.8,
        highestPackage: 22,
        totalOffers: 620,
        companies: 150,
      },
      topRecruiters: [
        "TCS",
        "Infosys",
        "Wipro",
        "Zoho",
        "L&T",
        "Cognizant",
        "HCL",
        "TVS Motors",
        "Amazon",
        "Temenos",
      ],
      sectorWise: [
        { sector: "IT Services", percentage: 40, color: "#3b82f6" },
        { sector: "Core Engineering", percentage: 30, color: "#f59e0b" },
        { sector: "Product-Based Companies", percentage: 15, color: "#10b981" },
        { sector: "Consulting", percentage: 10, color: "#8b5cf6" },
        { sector: "Others", percentage: 5, color: "#ef4444" },
      ],
      yearWiseData: [
        { year: "2020", average: 5.0, highest: 15, placed: 88 },
        { year: "2021", average: 5.5, highest: 17, placed: 89 },
        { year: "2022", average: 6.2, highest: 20, placed: 90 },
        { year: "2023", average: 6.5, highest: 22, placed: 90 },
      ],
    },

    // Facilities
    facilities: {
      academic: [
        "Central Library with 1,00,000+ volumes",
        "Department-specific Labs with modern equipment",
        "Innovation and Entrepreneurship Cell",
        "E-learning and Smart Classrooms",
        "Dedicated Research and Development Centre",
      ],
      residential: [
        "Separate Hostels for boys and girls",
        "Faculty and Staff Quarters",
        "Mess facilities with hygienic food",
        "24x7 Security and Surveillance",
        "Power Backup and RO Drinking Water",
      ],
      recreational: [
        "Outdoor Sports Facilities (cricket, football, volleyball)",
        "Indoor Sports Complex",
        "Gym and Yoga Hall",
        "Open Air Theatre",
        "Cultural and Literary Clubs",
      ],
      other: [
        "On-campus Health Centre",
        "Indian Bank with ATM",
        "Stationery and Utility Stores",
        "Auditorium and Seminar Halls",
        "Wi-Fi Enabled Campus",
        "College Buses for City Commute",
      ],
    },

    // Rankings and Recognition
    rankings: [
      { organization: "NIRF", rank: 86, category: "Engineering", year: 2023 },
      {
        organization: "India Today",
        rank: 45,
        category: "Private Engineering Colleges",
        year: 2023,
      },
      {
        organization: "The Week",
        rank: 41,
        category: "Top Engineering Colleges India",
        year: 2023,
      },
    ],

    // Reviews and Ratings
    reviews: {
      overall: 4.4,
      categories: {
        academics: 4.5,
        placements: 4.3,
        infrastructure: 4.2,
        faculty: 4.4,
        campusLife: 4.3,
      },
      studentReviews: [
        {
          name: "Sathish Raj",
          batch: "2023",
          course: "CSE",
          rating: 4.5,
          review:
            "TCE provides a strong academic foundation and excellent support for placements. The faculty are very helpful and dedicated.",
        },
        {
          name: "Divya Ramesh",
          batch: "2022",
          course: "ECE",
          rating: 4.4,
          review:
            "The campus life is vibrant with active clubs and events. Labs and infrastructure are well maintained. Great place for engineering aspirants.",
        },
      ],
    },

    // Cutoff Trends
    cutoffTrends: [
      { year: "2020", general: 172, obc: 165, sc: 150, st: 135 },
      { year: "2021", general: 175, obc: 168, sc: 153, st: 138 },
      { year: "2022", general: 177, obc: 170, sc: 155, st: 140 },
      { year: "2023", general: 179, obc: 172, sc: 157, st: 142 },
    ],
    campusLife: {
      clubs: [
        "IEEE Student Branch",
        "Robotics Club",
        "Music and Arts Society",
        "Drama Club",
        "Coding Club",
        "NSS & YRC",
      ],
      events: [
        {
          event: "TechnoFest",
          date: "February 10, 2024",
          type: "Technical",
        },
        {
          event: "Intra-College Sports Meet",
          date: "March 5, 2024",
          type: "Sports",
        },
        {
          event: "Thiran - Annual Cultural Fest",
          date: "March 18, 2024",
          type: "Cultural",
        },
        {
          event: "Alumni Meet",
          date: "April 12, 2024",
          type: "Networking",
        },
      ],
      hostelLife: {
        hostels: 10,
        capacity: 3000,
        facilities: [
          "Wi-Fi",
          "Study Halls",
          "Canteen",
          "24/7 Security",
          "Laundry",
        ],
      },
    },

    research: {
      centers: [
        {
          name: "Center for Artificial Intelligence & Data Science",
          focus: "Machine Learning, Data Mining, Deep Learning",
          funding: "₹1.5Cr",
        },
        {
          name: "Center for Renewable Energy Research",
          focus: "Solar Power, Bioenergy, Smart Grids",
          funding: "₹1.2Cr",
        },
        {
          name: "Center for VLSI and Embedded Systems",
          focus: "IoT, VLSI Design, Real-time Systems",
          funding: "₹1Cr",
        },
      ],
      publications: [
        {
          title: "Optimized Deep Learning Models for Medical Diagnosis",
          journal: "Springer – Neural Computing and Applications",
          year: "2024",
        },
        {
          title: "Hybrid Renewable Systems for Rural Electrification",
          journal: "Elsevier – Renewable Energy",
          year: "2023",
        },
        {
          title: "Design of Low Power IoT Devices using VLSI Techniques",
          journal: "IEEE Access",
          year: "2023",
        },
      ],
      stats: {
        publications: 220,
        patents: 12,
        funding: "₹8Cr",
        hIndex: 6.2,
      },
    },

    financialAid: {
      scholarships: [
        {
          name: "TCE Merit Scholarship",
          amount: "₹25,000/year",
          criteria: "Top 5% academic performers in each department",
          deadline: "June 30, 2024",
        },
        {
          name: "Government First Graduate Scholarship",
          amount: "₹50,000/year",
          criteria: "First graduate in family with income < ₹2L",
          deadline: "July 10, 2024",
        },
        {
          name: "SC/ST Welfare Scholarship",
          amount: "Full fee waiver",
          criteria:
            "Applicable for SC/ST students under Tamil Nadu Govt. norms",
          deadline: "July 31, 2024",
        },
      ],
      feeStructure: [
        { category: "Tuition Fee", amount: "₹65,000/year" },
        { category: "Hostel Fee", amount: "₹35,000/year" },
        { category: "Mess Fee", amount: "₹30,000/year" },
        { category: "Other Charges", amount: "₹10,000/year" },
      ],
      loans: [
        { bank: "Indian Bank", rate: "8.5% p.a.", amount: "Up to ₹10L" },
        { bank: "Canara Bank", rate: "8.75% p.a.", amount: "Up to ₹15L" },
        {
          bank: "Tamil Nadu Mercantile Bank",
          rate: "9.0% p.a.",
          amount: "Up to ₹7.5L",
        },
      ],
    },
  },
};

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const [college, setCollege] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const collegeId = Number.parseInt(params.id as string);
      const collegeInfo = collegeData[collegeId];

      if (collegeInfo) {
        setCollege(collegeInfo);
      }
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">Loading college details...</h2>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">College not found</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-96 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <img
            src={college.coverImage || "/placeholder.svg"}
            alt={college.name}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Navigation */}
          <div className="absolute top-4 left-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              className="text-white hover:bg-white/20"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {/* College Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end space-x-6">
                <img
                  src={college.logo || "/placeholder.svg"}
                  alt={college.name}
                  className="w-24 h-24 rounded-xl bg-white p-2 shadow-lg"
                />
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2">{college.name}</h1>
                  <div className="flex items-center space-x-4 text-lg">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-5 w-5" />
                      <span>
                        {college.location}, {college.state}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-5 w-5" />
                      <span>Est. {college.established}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-5 w-5" />
                      <span>NIRF #{college.stats.nirf}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-6 w-6 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold">
                      {college.stats.rating}
                    </span>
                  </div>
                  <p className="text-blue-200">Overall Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-6 mb-8 -mt-16 relative z-10"
        >
          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-lg">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {college.stats.placementRate}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Placement Rate
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-lg">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {college.stats.averagePackage}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Average Package
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {college.stats.totalStudents}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Students
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-lg">
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">
                {college.stats.campusSize}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Campus Size
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-10 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="admissions">Admissions</TabsTrigger>
              <TabsTrigger value="placements">Placements</TabsTrigger>
              <TabsTrigger value="campus-life">Campus Life</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="financial-aid">Financial Aid</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* About */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5" />
                        <span>About {college.shortName}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {college.about.overview}
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Mission</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {college.about.mission}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Vision</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {college.about.vision}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Key Highlights</h4>
                        <ul className="space-y-2">
                          {college.about.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rankings */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="h-5 w-5" />
                        <span>Rankings & Recognition</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        {college.rankings.map((ranking, index) => (
                          <div
                            key={index}
                            className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
                          >
                            <div className="text-2xl font-bold text-blue-600">
                              #{ranking.rank}
                            </div>
                            <div className="text-sm font-medium">
                              {ranking.organization}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {ranking.category} {ranking.year}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Info */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Quick Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Type:
                        </span>
                        <Badge variant="outline">{college.type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Affiliation:
                        </span>
                        <span className="font-medium">
                          {college.affiliation}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Faculty:
                        </span>
                        <span className="font-medium">
                          {college.stats.faculty}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Student-Faculty Ratio:
                        </span>
                        <span className="font-medium">
                          {college.stats.studentFacultyRatio}
                        </span>
                      </div>
                      <Separator />
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">
                          Accreditation:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {college.accreditation.map((acc, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {acc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Info */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                        <span className="text-sm">
                          {college.contact.address}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{college.contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{college.contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <a
                          href={college.contact.website}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Official Website
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Admission Calculator */}
                  <AdmissionCalculator college={college} />

                  {/* Virtual Tour */}
                  <VirtualTour college={college} />
                </div>
              </div>
            </TabsContent>

            {/* Academics Tab */}
            <TabsContent value="academics" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Courses */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <GraduationCap className="h-5 w-5" />
                        <span>Undergraduate Programs</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {college.academics.courses.map((course, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">{course.name}</h4>
                              <Badge variant="outline">{course.duration}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {course.description}
                            </p>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Seats:</span>
                                <span className="ml-1 font-medium">
                                  {course.seats}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">Cutoff:</span>
                                <span className="ml-1 font-medium">
                                  {course.cutoff}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">Fees:</span>
                                <span className="ml-1 font-medium">
                                  {course.fees}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Specializations */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Specializations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {college.academics.specializations.map(
                          (spec, index) => (
                            <Badge key={index} variant="secondary">
                              {spec}
                            </Badge>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Research Areas */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Research Areas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {college.academics.researchAreas.map((area, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Zap className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{area}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cutoff Trends */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Cutoff Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={college.cutoffTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="general"
                              stroke="#3b82f6"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="obc"
                              stroke="#8b5cf6"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="sc"
                              stroke="#10b981"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="st"
                              stroke="#f59e0b"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Admissions Tab */}
            <TabsContent value="admissions" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Admission Process */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>Admission Process</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Entrance Exam</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {college.admissions.process}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Eligibility</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {college.admissions.eligibility}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">
                          Important Deadlines
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                            <span className="text-sm">
                              Application Deadline
                            </span>
                            <Badge variant="destructive">
                              {college.admissions.applicationDeadline}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <span className="text-sm">Exam Date</span>
                            <Badge variant="outline">
                              {college.admissions.examDate}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Required Documents */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Required Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {college.admissions.documentsRequired.map(
                          (doc, index) => (
                            <li
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{doc}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Important Dates */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span>Important Dates</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {college.admissions.importantDates.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                            >
                              <span className="font-medium">{item.event}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {item.date}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Application CTA */}
                  <Card className="backdrop-blur-sm bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-bold text-lg mb-2">
                        Ready to Apply?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Start your application process today
                      </p>
                      <div className="space-y-2">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Apply Online
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Brochure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Placements Tab */}
            <TabsContent value="placements" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Placement Stats */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Briefcase className="h-5 w-5" />
                        <span>Placement Statistics</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {college.placements.stats.placementRate}%
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Placement Rate
                          </div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            ₹{college.placements.stats.averagePackage}L
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Average Package
                          </div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            ₹{college.placements.stats.highestPackage}L
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Highest Package
                          </div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {college.placements.stats.companies}+
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Companies
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Recruiters */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Top Recruiters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {college.placements.topRecruiters.map(
                          (company, index) => (
                            <div
                              key={index}
                              className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-center text-sm"
                            >
                              {company}
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Sector-wise Distribution */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Sector-wise Placements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={college.placements.sectorWise}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="percentage"
                              label={({ sector, percentage }) =>
                                `${sector}: ${percentage}%`
                              }
                            >
                              {college.placements.sectorWise.map(
                                (entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                )
                              )}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Year-wise Trends */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Placement Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={college.placements.yearWiseData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                              dataKey="average"
                              fill="#3b82f6"
                              name="Average Package (₹L)"
                            />
                            <Bar
                              dataKey="highest"
                              fill="#8b5cf6"
                              name="Highest Package (₹L)"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Facilities Tab */}
            <TabsContent value="facilities" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(college.facilities).map(([category, items]) => (
                  <Card
                    key={category}
                    className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg"
                  >
                    <CardHeader>
                      <CardTitle className="capitalize">
                        {category} Facilities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {items.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Student Reviews */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Student Reviews</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {college.reviews.studentReviews.map((review, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {review.course} • Batch {review.batch}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[
                                ...Array(
                                  Math.floor(Number(review.rating) || 0)
                                ),
                              ].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 text-yellow-400 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {review.review}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Overall Rating */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Overall Rating</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {college.reviews.overall}
                      </div>
                      <div className="flex justify-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(college.reviews.overall)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Based on student reviews
                      </p>
                    </CardContent>
                  </Card>

                  {/* Category Ratings */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Category Ratings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(college.reviews.categories).map(
                        ([category, rating]) => (
                          <div key={category}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm capitalize">
                                {category}
                              </span>
                              <span className="text-sm font-medium">
                                {rating}/5
                              </span>
                            </div>
                            <Progress
                              value={(rating / 5) * 100}
                              className="h-2"
                            />
                          </div>
                        )
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-8">
              <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>Campus Gallery</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {college.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedImage(index)}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Campus ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Campus Life Tab */}
            <TabsContent value="campus-life" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Student Life */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5" />
                        <span>Student Life</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">
                          Clubs & Societies
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "Technical Club",
                            "Cultural Society",
                            "Sports Club",
                            "Literary Society",
                            "Photography Club",
                            "Music Club",
                          ].map((club, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="justify-center"
                            >
                              {club}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Annual Events</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• TechFest - Annual Technical Festival</li>
                          <li>• CulturalFest - Cultural Extravaganza</li>
                          <li>• Sports Meet - Inter-college Competition</li>
                          <li>• Alumni Meet - Networking Event</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Campus Events Calendar */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <span>Upcoming Events</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          {
                            event: "Admission Open Day",
                            date: "March 15, 2024",
                            type: "Admissions",
                          },
                          {
                            event: "Research Symposium",
                            date: "March 20, 2024",
                            type: "Academic",
                          },
                          {
                            event: "Cultural Night",
                            date: "March 25, 2024",
                            type: "Cultural",
                          },
                          {
                            event: "Industry Connect",
                            date: "April 2, 2024",
                            type: "Placement",
                          },
                        ].map((event, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 border rounded-lg"
                          >
                            <div>
                              <h5 className="font-medium">{event.event}</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {event.date}
                              </p>
                            </div>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Virtual Tour */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Camera className="h-5 w-5" />
                        <span>Virtual Campus Tour</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 to-purple-900 rounded-lg flex items-center justify-center mb-4">
                        <Button
                          size="lg"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                        >
                          <Play className="mr-2 h-5 w-5" />
                          Start Virtual Tour
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Main Campus",
                          "Library",
                          "Labs",
                          "Hostels",
                          "Sports Complex",
                          "Cafeteria",
                        ].map((area, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            {area}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Campus Weather */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Campus Weather</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          28°C
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Partly Cloudy
                        </p>
                        <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                          <div>
                            <div className="font-medium">Humidity</div>
                            <div>65%</div>
                          </div>
                          <div>
                            <div className="font-medium">Wind</div>
                            <div>12 km/h</div>
                          </div>
                          <div>
                            <div className="font-medium">UV Index</div>
                            <div>6</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Research Tab */}
            <TabsContent value="research" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Research Centers */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="h-5 w-5" />
                        <span>Research Centers</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            name: "AI & Machine Learning Lab",
                            focus: "Deep Learning, NLP, Computer Vision",
                            funding: "₹2.5Cr",
                          },
                          {
                            name: "Renewable Energy Center",
                            focus: "Solar, Wind, Energy Storage",
                            funding: "₹1.8Cr",
                          },
                          {
                            name: "Biomedical Engineering Lab",
                            focus: "Medical Devices, Biomaterials",
                            funding: "₹1.2Cr",
                          },
                        ].map((center, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-1">
                              {center.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {center.focus}
                            </p>
                            <div className="flex justify-between items-center">
                              <Badge variant="outline">
                                Funding: {center.funding}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Publications */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Recent Publications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          {
                            title:
                              "Advanced Neural Networks for Image Recognition",
                            journal: "IEEE Transactions",
                            year: "2024",
                          },
                          {
                            title:
                              "Sustainable Energy Solutions for Smart Cities",
                            journal: "Nature Energy",
                            year: "2024",
                          },
                          {
                            title:
                              "Biocompatible Materials in Medical Implants",
                            journal: "Biomaterials",
                            year: "2023",
                          },
                        ].map((pub, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-blue-500 pl-4"
                          >
                            <h5 className="font-medium text-sm">{pub.title}</h5>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {pub.journal} • {pub.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Research Stats */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Research Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            450+
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Publications
                          </div>
                        </div>
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            25
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Patents
                          </div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            ₹15Cr
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Research Funding
                          </div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            8.5
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            H-Index
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Industry Collaborations */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Industry Collaborations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Google",
                          "Microsoft",
                          "ISRO",
                          "DRDO",
                          "Tata Group",
                          "Infosys",
                          "TCS",
                          "Wipro",
                        ].map((company, index) => (
                          <div
                            key={index}
                            className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-center text-sm"
                          >
                            {company}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Financial Aid Tab */}
            <TabsContent value="financial-aid" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Scholarships */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5" />
                        <span>Scholarships Available</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            name: "Merit Scholarship",
                            amount: "₹50,000/year",
                            criteria: "Top 10% in entrance exam",
                            deadline: "June 30, 2024",
                          },
                          {
                            name: "Need-based Aid",
                            amount: "₹75,000/year",
                            criteria: "Family income < ₹5L",
                            deadline: "July 15, 2024",
                          },
                          {
                            name: "Sports Scholarship",
                            amount: "₹40,000/year",
                            criteria: "State/National level sports",
                            deadline: "August 1, 2024",
                          },
                        ].map((scholarship, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">
                                {scholarship.name}
                              </h4>
                              <Badge variant="outline">
                                {scholarship.amount}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {scholarship.criteria}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-red-600">
                                Deadline: {scholarship.deadline}
                              </span>
                              <Button variant="ghost" size="sm">
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Fee Structure */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Fee Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { category: "Tuition Fee", amount: "₹2,50,000/year" },
                          { category: "Hostel Fee", amount: "₹80,000/year" },
                          { category: "Mess Fee", amount: "₹45,000/year" },
                          { category: "Other Charges", amount: "₹25,000/year" },
                        ].map((fee, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 border rounded-lg"
                          >
                            <span className="font-medium">{fee.category}</span>
                            <span className="text-blue-600 font-semibold">
                              {fee.amount}
                            </span>
                          </div>
                        ))}
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center font-bold text-lg">
                            <span>Total Annual Fee</span>
                            <span className="text-blue-600">₹4,00,000</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Financial Aid Calculator */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Financial Aid Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">
                            Family Annual Income
                          </label>
                          <select className="w-full mt-1 p-2 border rounded-lg">
                            <option>Select income range</option>
                            <option>Below ₹2L</option>
                            <option>₹2L - ₹5L</option>
                            <option>₹5L - ₹10L</option>
                            <option>Above ₹10L</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Academic Performance
                          </label>
                          <select className="w-full mt-1 p-2 border rounded-lg">
                            <option>Select percentage</option>
                            <option>Above 90%</option>
                            <option>80% - 90%</option>
                            <option>70% - 80%</option>
                            <option>Below 70%</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Category
                          </label>
                          <select className="w-full mt-1 p-2 border rounded-lg">
                            <option>General</option>
                            <option>OBC</option>
                            <option>SC/ST</option>
                            <option>EWS</option>
                          </select>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                          Calculate Aid Eligibility
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Loan Information */}
                  <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Education Loans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Partner banks offering education loans:
                        </p>
                        {[
                          {
                            bank: "SBI",
                            rate: "8.5% p.a.",
                            amount: "Up to ₹30L",
                          },
                          {
                            bank: "HDFC Bank",
                            rate: "9.0% p.a.",
                            amount: "Up to ₹25L",
                          },
                          {
                            bank: "ICICI Bank",
                            rate: "8.8% p.a.",
                            amount: "Up to ₹20L",
                          },
                        ].map((loan, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 border rounded-lg"
                          >
                            <div>
                              <h5 className="font-medium">{loan.bank}</h5>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {loan.rate}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {loan.amount}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                              >
                                Apply
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            {/* Live Chat Widget */}
            <TabsContent value="live-chat" className="space-y-8">
              <LiveChatWidget />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      {/* Live Chat Widget */}
      <LiveChatWidget />
    </div>
  );
}
