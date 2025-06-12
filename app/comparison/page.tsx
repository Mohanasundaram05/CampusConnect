"use client";
import CollegeComparison from "@/components/college-comparison";
import RankingSystem from "@/components/ranking-system";

// Sample colleges data for ranking system
const sampleColleges = [
  {
    id: "1",
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    location: "New Delhi, Delhi",
    logo: "/cc1.png?height=50&width=50",
    stats: {
      nirf: 1,
      rating: 4.8,
      placementRate: 95,
      faculty: 450,
      studentFacultyRatio: "8:1",
      campusSize: "320 acres",
      internationalStudents: "5%",
    },
    reviews: {
      categories: {
        academics: 4.8,
        infrastructure: 4.7,
        faculty: 4.6,
      },
    },
    placements: {
      stats: {
        averagePackage: 18,
      },
      topRecruiters: [
        "Google",
        "Microsoft",
        "Amazon",
        "Goldman Sachs",
        "McKinsey",
      ],
    },
    facilities: {
      academic: ["Library", "Labs", "Auditoriums"],
      sports: ["Swimming Pool", "Gym", "Cricket Ground"],
      residential: ["Hostels", "Mess", "Medical Center"],
    },
    research: {
      stats: {
        publications: 2500,
        patents: 150,
        funding: 500,
      },
      centers: ["AI Research Center", "Robotics Lab", "Innovation Hub"],
    },
    academics: {
      courses: ["Computer Science", "Electrical", "Mechanical", "Civil"],
      specializations: ["AI & ML", "Data Science", "Cybersecurity"],
    },
    accreditation: ["NAAC A++", "NBA", "NIRF"],
    about: {
      highlights: [
        "Top startup incubator",
        "Innovation excellence",
        "Research leadership",
      ],
    },
    alumni: {
      notable: ["Sundar Pichai", "Raghuram Rajan", "Chetan Bhagat"],
    },
    rankings: ["NIRF #1", "QS World #185", "Times Higher Education #300"],
    campusLife: {
      clubs: [
        "Coding Club",
        "Robotics Club",
        "Cultural Society",
        "Sports Club",
        "Literary Society",
      ],
    },
  },
  {
    id: "2",
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    logo: "/cc2.png?height=50&width=50",
    stats: {
      nirf: 2,
      rating: 4.7,
      placementRate: 93,
      faculty: 520,
      studentFacultyRatio: "9:1",
      campusSize: "550 acres",
      internationalStudents: "7%",
    },
    reviews: {
      categories: {
        academics: 4.7,
        infrastructure: 4.8,
        faculty: 4.5,
      },
    },
    placements: {
      stats: {
        averagePackage: 17.5,
      },
      topRecruiters: ["Microsoft", "Google", "Amazon", "JP Morgan", "BCG"],
    },
    facilities: {
      academic: ["Central Library", "Research Labs", "Conference Halls"],
      sports: ["Sports Complex", "Swimming Pool", "Tennis Courts"],
      residential: ["Student Hostels", "Faculty Housing", "Health Center"],
    },
    research: {
      stats: {
        publications: 2200,
        patents: 120,
        funding: 450,
      },
      centers: ["Machine Learning Lab", "Biotech Center", "Energy Research"],
    },
    academics: {
      courses: ["Computer Science", "Chemical", "Aerospace", "Biotechnology"],
      specializations: [
        "Machine Learning",
        "Biotechnology",
        "Aerospace Engineering",
      ],
    },
    accreditation: ["NAAC A++", "NBA", "NIRF"],
    about: {
      highlights: [
        "Industry partnerships",
        "startup ecosystem",
        "research excellence",
      ],
    },
    alumni: {
      notable: ["N.R. Narayana Murthy", "Nandan Nilekani"],
    },
    rankings: ["NIRF #2", "QS World #172", "Times Higher Education #251-300"],
    campusLife: {
      clubs: ["Tech Club", "Innovation Cell", "Music Society", "Drama Club"],
    },
  },
  {
    id: "3",
    name: "Indian Institute of Science Bangalore",
    shortName: "IISc Bangalore",
    location: "Bangalore, Karnataka",
    logo: "/cc3.png?height=50&width=50",
    stats: {
      nirf: 3,
      rating: 4.9,
      placementRate: 98,
      faculty: 350,
      studentFacultyRatio: "6:1",
      campusSize: "371 acres",
      internationalStudents: "12%",
    },
    reviews: {
      categories: {
        academics: 4.9,
        infrastructure: 4.6,
        faculty: 4.8,
      },
    },
    placements: {
      stats: {
        averagePackage: 22,
      },
      topRecruiters: ["Google", "Microsoft", "Facebook", "Intel", "NVIDIA"],
    },
    facilities: {
      academic: [
        "Research Libraries",
        "Advanced Labs",
        "Supercomputing Center",
      ],
      sports: ["Gym", "Sports Grounds", "Recreation Center"],
      residential: ["Graduate Hostels", "Faculty Quarters", "Guest House"],
    },
    research: {
      stats: {
        publications: 3000,
        patents: 200,
        funding: 800,
      },
      centers: [
        "Centre for AI",
        "Quantum Computing Lab",
        "Nano Science Center",
      ],
    },
    academics: {
      courses: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
      specializations: [
        "Quantum Computing",
        "Nano Science",
        "Computational Biology",
      ],
    },
    accreditation: ["NAAC A++", "UGC", "NIRF"],
    about: {
      highlights: [
        "Research excellence",
        "PhD programs",
        "International collaborations",
      ],
    },
    alumni: {
      notable: ["C.N.R. Rao", "Raghunath Anant Mashelkar"],
    },
    rankings: ["NIRF #3", "QS World #155", "Times Higher Education #201-250"],
    campusLife: {
      clubs: ["Science Club", "Research Society", "Cultural Committee"],
    },
  },
];

const ComparisonPage = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <CollegeComparison />

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Intelligent Ranking System
          </h2>
          <p className="text-muted-foreground">
            Discover colleges ranked by weighted scoring based on your
            priorities
          </p>
        </div>
        <RankingSystem colleges={sampleColleges} />
      </section>
    </div>
  );
};

export default ComparisonPage;
