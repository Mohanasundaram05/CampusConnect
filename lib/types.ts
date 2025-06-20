export interface College {
  id: number
  name: string
  shortName: string
  location: string
  state: string
  logo: string
  rating: number
  predictedCutoff: number
  fees: string
  placements: string
  highestPackage: string
  courses: string[]
  type: string
  established: number
  nirf: number
  accreditation: string
  campus: string
  faculty: string
  students: string
  facilities: string[]
  admissionProcess: string
  applicationDeadline: string
  tags: string[]
  strengths: string[]
  weaknesses: string[]
  placementRate: number
  researchRating: number
  infrastructureRating: number
  facultyRating: number
  industryConnections: number
  aiScore: number
  matchReasons: string[]
}

export interface StudentProfile {
  // Define student profile properties here based on `app/profile/page.tsx`
  // For now, we can leave it as a record, or define some known properties
  [key: string]: any
} 