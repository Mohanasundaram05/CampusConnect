"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";
import {
  User,
  GraduationCap,
  MapPin,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Save,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Target,
  Award,
  Users,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const steps = [
  {
    id: 1,
    title: "Personal Information",
    icon: User,
    description: "Basic details about you",
  },
  {
    id: 2,
    title: "Academic Profile",
    icon: GraduationCap,
    description: "Your academic performance",
  },
  {
    id: 3,
    title: "Preferences",
    icon: MapPin,
    description: "Location and college preferences",
  },
  {
    id: 4,
    title: "Career Goals",
    icon: BookOpen,
    description: "Courses and career aspirations",
  },
];

const initialFormData = {
  // Personal Information
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  parentName: "",
  parentPhone: "",
  parentEmail: "",

  // Academic Profile
  currentClass: "",
  schoolName: "",
  board: "",
  physics: "",
  chemistry: "",
  maths: "",
  totalMarks: "",
  percentage: "",
  category: "",
  otherExams: [],

  // Preferences
  preferredLocations: [],
  collegeType: "",
  budgetRange: [0],
  accommodationType: "",
  distanceFromHome: [0],
  campusSize: "",

  // Career Goals
  interestedCourses: [],
  careerGoals: "",
  specializations: [],
  industryPreference: [],
  salaryExpectation: [0],
  workEnvironment: "",
  additionalSkills: [],
  extracurriculars: [],
};

export default function ProfilePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [savedProgress, setSavedProgress] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("studentProfileDraft");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData({ ...initialFormData, ...parsed });
        setSavedProgress(true);
        toast({
          title: "Progress Restored",
          description: "Your previously saved progress has been restored.",
        });
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  // Auto-save progress
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("studentProfileDraft", JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

  const locations = [
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Pune",
    "Coimbatore",
    "Madurai",
    "Kochi",
    "Thiruvananthapuram",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Bhopal",
    "Indore",
  ];

  const courses = [
    "Computer Science Engineering",
    "Electronics and Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Information Technology",
    "Aerospace Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Automobile Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Robotics Engineering",
    "Environmental Engineering",
    "Petroleum Engineering",
  ];

  const specializations = [
    "Machine Learning",
    "Cybersecurity",
    "Web Development",
    "Mobile App Development",
    "Cloud Computing",
    "DevOps",
    "Blockchain",
    "IoT",
    "AR/VR",
    "Game Development",
    "Embedded Systems",
    "VLSI Design",
    "Signal Processing",
    "Power Systems",
    "Structural Engineering",
    "Transportation",
    "Environmental",
    "Geotechnical",
  ];

  const industries = [
    "Information Technology",
    "Automotive",
    "Aerospace",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Energy",
    "Telecommunications",
    "Defense",
    "Research & Development",
    "Consulting",
    "Startups",
    "Government",
  ];
  
  const extracurriculars = [
    "Sports",
    "Music",
    "Dance",
    "Drama",
    "Debate",
    "Quiz",
    "Photography",
    "Volunteering",
    "Coding Competitions",
    "Robotics",
    "Science Olympiad",
    "Model UN",
    "Student Government",
    "Clubs",
    "Community Service",
  ];

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim())
          newErrors.firstName = "First name is required";
        if (!formData.lastName.trim())
          newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
          newErrors.phone = "Please enter a valid 10-digit phone number";
        }
        if (!formData.dateOfBirth)
          newErrors.dateOfBirth = "Date of birth is required";
        if (!formData.gender) newErrors.gender = "Gender selection is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        break;

      case 2:
        if (!formData.currentClass)
          newErrors.currentClass = "Current class is required";
        if (!formData.schoolName.trim())
          newErrors.schoolName = "School name is required";
        if (!formData.board) newErrors.board = "Board selection is required";
        if (!formData.physics) {
          newErrors.physics = "Physics marks are required";
        } else if (
          isNaN(formData.physics) ||
          formData.physics < 0 ||
          formData.physics > 100
        ) {
          newErrors.physics = "Please enter valid marks (0-100)";
        }
        if (!formData.chemistry) {
          newErrors.chemistry = "Chemistry marks are required";
        } else if (
          isNaN(formData.chemistry) ||
          formData.chemistry < 0 ||
          formData.chemistry > 100
        ) {
          newErrors.chemistry = "Please enter valid marks (0-100)";
        }
        if (!formData.maths) {
          newErrors.maths = "Maths marks are required";
        } else if (
          isNaN(formData.maths) ||
          formData.maths < 0 ||
          formData.maths > 100
        ) {
          newErrors.maths = "Please enter valid marks (0-100)";
        }
        if (!formData.category)
          newErrors.category = "Category selection is required";
        break;

      case 3:
        if (formData.preferredLocations.length === 0) {
          newErrors.preferredLocations =
            "Select at least one preferred location";
        }
        if (!formData.collegeType)
          newErrors.collegeType = "College type selection is required";
        if (!formData.accommodationType)
          newErrors.accommodationType = "Accommodation preference is required";
        break;

      case 4:
        if (formData.interestedCourses.length === 0) {
          newErrors.interestedCourses =
            "Select at least one course of interest";
        }
        if (!formData.careerGoals.trim())
          newErrors.careerGoals = "Career goals are required";
        if (formData.industryPreference.length === 0) {
          newErrors.industryPreference =
            "Select at least one industry preference";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsLoading(true);
      try {
        // Calculate percentage if not provided
        if (
          formData.physics &&
          formData.chemistry &&
          formData.maths &&
          !formData.percentage
        ) {
          const totalObtained =
            Number.parseFloat(formData.physics) +
            Number.parseFloat(formData.chemistry) +
            Number.parseFloat(formData.maths);
          const percentage = (totalObtained / 300) * 100;
          formData.percentage = percentage.toFixed(2);
        }

        // Store complete profile
        localStorage.setItem("studentProfile", JSON.stringify(formData));
        localStorage.removeItem("studentProfileDraft");

        toast({
          title: "Profile Created Successfully!",
          description: "Redirecting to your personalized recommendations...",
        });

        setTimeout(() => {
          router.push("/recommendations");
        }, 1500);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save profile. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleMultiSelect = (field, item, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], item]
        : prev[field].filter((i) => i !== item),
    }));
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Your Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Help us understand you better to provide personalized college
                recommendations
              </p>
            </div>
            {savedProgress && (
              <Badge variant="secondary" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Progress Saved
              </Badge>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {currentStep} of 4
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Step Indicators */}
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                  step.id === currentStep
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : step.id < currentStep
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.id === currentStep
                        ? "bg-blue-500 text-white"
                        : step.id < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border-0 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center gap-3">
                  {(() => {
                    const IconComponent = steps[currentStep - 1].icon;
                    return IconComponent ? (
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    ) : null;
                  })()}
                  {steps[currentStep - 1].title}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  {steps[currentStep - 1].description}
                </p>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="firstName"
                          className="flex items-center gap-2"
                        >
                          <User className="h-4 w-4" />
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className={errors.firstName ? "border-red-500" : ""}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className={errors.lastName ? "border-red-500" : ""}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="email"
                          className="flex items-center gap-2"
                        >
                          <Mail className="h-4 w-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={errors.email ? "border-red-500" : ""}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="phone"
                          className="flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className={errors.phone ? "border-red-500" : ""}
                          placeholder="10-digit mobile number"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="dateOfBirth"
                          className="flex items-center gap-2"
                        >
                          <Calendar className="h-4 w-4" />
                          Date of Birth *
                        </Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            handleInputChange("dateOfBirth", e.target.value)
                          }
                          className={errors.dateOfBirth ? "border-red-500" : ""}
                        />
                        {errors.dateOfBirth && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.dateOfBirth}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Gender *</Label>
                        <RadioGroup
                          value={formData.gender}
                          onValueChange={(value) =>
                            handleInputChange("gender", value)
                          }
                          className="flex space-x-6 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                        {errors.gender && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.gender}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <Label
                        htmlFor="address"
                        className="flex items-center gap-2"
                      >
                        <Home className="h-4 w-4" />
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="Enter your complete address"
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className={errors.city ? "border-red-500" : ""}
                          placeholder="Your city"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                          className={errors.state ? "border-red-500" : ""}
                          placeholder="Your state"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.state}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={(e) =>
                            handleInputChange("pincode", e.target.value)
                          }
                          placeholder="6-digit PIN code"
                        />
                      </div>
                    </div>

                    {/* Parent/Guardian Info */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Parent/Guardian Information
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="parentName">
                            Parent/Guardian Name
                          </Label>
                          <Input
                            id="parentName"
                            value={formData.parentName}
                            onChange={(e) =>
                              handleInputChange("parentName", e.target.value)
                            }
                            placeholder="Full name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="parentPhone">Parent Phone</Label>
                          <Input
                            id="parentPhone"
                            value={formData.parentPhone}
                            onChange={(e) =>
                              handleInputChange("parentPhone", e.target.value)
                            }
                            placeholder="10-digit number"
                          />
                        </div>

                        <div>
                          <Label htmlFor="parentEmail">Parent Email</Label>
                          <Input
                            id="parentEmail"
                            type="email"
                            value={formData.parentEmail}
                            onChange={(e) =>
                              handleInputChange("parentEmail", e.target.value)
                            }
                            placeholder="parent@example.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Academic Profile */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    {/* Current Education */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Current Class *</Label>
                        <Select
                          value={formData.currentClass}
                          onValueChange={(value) =>
                            handleInputChange("currentClass", value)
                          }
                        >
                          <SelectTrigger
                            className={
                              errors.currentClass ? "border-red-500" : ""
                            }
                          >
                            <SelectValue placeholder="Select your current class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12th">12th Standard</SelectItem>
                            <SelectItem value="12th-completed">
                              12th Completed
                            </SelectItem>
                            <SelectItem value="diploma">Diploma</SelectItem>
                            <SelectItem value="gap-year">Gap Year</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.currentClass && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.currentClass}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Board *</Label>
                        <Select
                          value={formData.board}
                          onValueChange={(value) =>
                            handleInputChange("board", value)
                          }
                        >
                          <SelectTrigger
                            className={errors.board ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select your board" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cbse">CBSE</SelectItem>
                            <SelectItem value="icse">ICSE</SelectItem>
                            <SelectItem value="state">State Board</SelectItem>
                            <SelectItem value="ib">
                              International Baccalaureate
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.board && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.board}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="schoolName">School Name *</Label>
                      <Input
                        id="schoolName"
                        value={formData.schoolName}
                        onChange={(e) =>
                          handleInputChange("schoolName", e.target.value)
                        }
                        className={errors.schoolName ? "border-red-500" : ""}
                        placeholder="Enter your school name"
                      />
                      {errors.schoolName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.schoolName}
                        </p>
                      )}
                    </div>

                    {/* Subject Marks */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Subject Marks (Out of 100)
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="physics">Physics *</Label>
                          <Input
                            id="physics"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.physics}
                            onChange={(e) =>
                              handleInputChange("physics", e.target.value)
                            }
                            className={errors.physics ? "border-red-500" : ""}
                            placeholder="0-100"
                          />
                          {errors.physics && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {errors.physics}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="chemistry">Chemistry *</Label>
                          <Input
                            id="chemistry"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.chemistry}
                            onChange={(e) =>
                              handleInputChange("chemistry", e.target.value)
                            }
                            className={errors.chemistry ? "border-red-500" : ""}
                            placeholder="0-100"
                          />
                          {errors.chemistry && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {errors.chemistry}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="maths">Mathematics *</Label>
                          <Input
                            id="maths"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.maths}
                            onChange={(e) =>
                              handleInputChange("maths", e.target.value)
                            }
                            className={errors.maths ? "border-red-500" : ""}
                            placeholder="0-100"
                          />
                          {errors.maths && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {errors.maths}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Overall Performance */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="totalMarks">Total Marks Obtained</Label>
                        <Input
                          id="totalMarks"
                          type="number"
                          value={formData.totalMarks}
                          onChange={(e) =>
                            handleInputChange("totalMarks", e.target.value)
                          }
                          placeholder="Total marks obtained"
                        />
                      </div>

                      <div>
                        <Label htmlFor="percentage">Percentage</Label>
                        <Input
                          id="percentage"
                          type="number"
                          step="0.01"
                          value={formData.percentage}
                          onChange={(e) =>
                            handleInputChange("percentage", e.target.value)
                          }
                          placeholder="Overall percentage"
                        />
                      </div>
                    </div>

                    {/* Category and Competitive Exams */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            handleInputChange("category", value)
                          }
                        >
                          <SelectTrigger
                            className={errors.category ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select your category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="mbc">
                              MBC (Most Backward class)
                            </SelectItem>
                            <SelectItem value="obc">
                              OBC (Other Backward Class)
                            </SelectItem>
                            <SelectItem value="sc">
                              SC (Scheduled Caste)
                            </SelectItem>
                            <SelectItem value="st">
                              ST (Scheduled Tribe)
                            </SelectItem>
                            <SelectItem value="ews">
                              EWS (Economically Weaker Section)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.category}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Competitive Exam Ranks */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Competitive Exam Ranks (Optional)
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="jeeMainRank">JEE Main Rank</Label>
                          <Input
                            id="jeeMainRank"
                            type="number"
                            value={formData.jeeMainRank}
                            onChange={(e) =>
                              handleInputChange("jeeMainRank", e.target.value)
                            }
                            placeholder="Your JEE Main rank"
                          />
                        </div>

                        <div>
                          <Label htmlFor="jeeAdvancedRank">
                            JEE Advanced Rank
                          </Label>
                          <Input
                            id="jeeAdvancedRank"
                            type="number"
                            value={formData.jeeAdvancedRank}
                            onChange={(e) =>
                              handleInputChange(
                                "jeeAdvancedRank",
                                e.target.value
                              )
                            }
                            placeholder="Your JEE Advanced rank"
                          />
                        </div>

                        <div>
                          <Label htmlFor="stateRank">State CET Rank</Label>
                          <Input
                            id="stateRank"
                            type="number"
                            value={formData.stateRank}
                            onChange={(e) =>
                              handleInputChange("stateRank", e.target.value)
                            }
                            placeholder="Your state exam rank"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Preferences */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    {/* Preferred Locations */}
                    <div>
                      <Label className="flex items-center gap-2 mb-4">
                        <MapPin className="h-4 w-4" />
                        Preferred Locations *
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Select all cities where you'd like to study
                      </p>
                      <div className="grid md:grid-cols-3 gap-3">
                        {locations.map((location) => (
                          <div
                            key={location}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={location}
                              checked={formData.preferredLocations.includes(
                                location
                              )}
                              onCheckedChange={(checked) =>
                                handleMultiSelect(
                                  "preferredLocations",
                                  location,
                                  checked
                                )
                              }
                            />
                            <Label htmlFor={location} className="text-sm">
                              {location}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.preferredLocations && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.preferredLocations}
                        </p>
                      )}
                    </div>

                    {/* College Type */}
                    <div>
                      <Label>College Type Preference *</Label>
                      <RadioGroup
                        value={formData.collegeType}
                        onValueChange={(value) =>
                          handleInputChange("collegeType", value)
                        }
                        className="grid md:grid-cols-3 gap-4 mt-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="government" id="government" />
                          <Label htmlFor="government">Government</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="private" id="private" />
                          <Label htmlFor="private">Private</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both">Both</Label>
                        </div>
                      </RadioGroup>
                      {errors.collegeType && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.collegeType}
                        </p>
                      )}
                    </div>
                    {/* Budget Range */}
                    <div>
                      <Label className="flex items-center gap-2 mb-4">
                        <DollarSign className="h-4 w-4" />
                        Annual Budget Range (in Lakhs)
                      </Label>
                      <div className="px-4">
                        <Slider
                          value={formData.budgetRange}
                          onValueChange={(value) =>
                            handleInputChange("budgetRange", value)
                          }
                          max={25}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>₹0 Lakhs</span>
                          <span className="font-medium">
                            ₹{formData.budgetRange[0]} Lakhs
                          </span>
                          <span>₹25+ Lakhs</span>
                        </div>
                      </div>
                    </div>

                    {/* Campus Size */}
                    <div>
                      <Label>Campus Size Preference</Label>
                      <RadioGroup
                        value={formData.campusSize}
                        onValueChange={(value) =>
                          handleInputChange("campusSize", value)
                        }
                        className="grid md:grid-cols-3 gap-4 mt-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="small" id="small" />
                          <Label htmlFor="small">Compact Campus</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium">Mid-Sized Campus</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="large" id="large" />
                          <Label htmlFor="large">Large Campus</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="flex items-center gap-2 mb-4">
                        <BookOpen className="h-4 w-4" />
                        Interested Courses *
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Select all engineering courses that interest you
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {courses.map((course) => (
                          <div
                            key={course}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={course}
                              checked={formData.interestedCourses.includes(
                                course
                              )}
                              onCheckedChange={(checked) =>
                                handleMultiSelect(
                                  "interestedCourses",
                                  course,
                                  checked
                                )
                              }
                            />
                            <Label htmlFor={course} className="text-sm">
                              {course}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.interestedCourses && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.interestedCourses}
                        </p>
                      )}
                    </div>

                    {/* Career Goals */}
                    <div>
                      <Label
                        htmlFor="careerGoals"
                        className="flex items-center gap-2"
                      >
                        <Target className="h-4 w-4" />
                        Career Goals & Aspirations *
                      </Label>
                      <Textarea
                        id="careerGoals"
                        value={formData.careerGoals}
                        onChange={(e) =>
                          handleInputChange("careerGoals", e.target.value)
                        }
                        className={errors.careerGoals ? "border-red-500" : ""}
                        placeholder="Describe your career goals, what you want to achieve, and your long-term aspirations..."
                        rows={4}
                      />
                      {errors.careerGoals && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.careerGoals}
                        </p>
                      )}
                    </div>

                    {/* Specializations */}
                    <div>
                      <Label className="mb-4 block">
                        Preferred Specializations
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Select areas you'd like to specialize in
                      </p>
                      <div className="grid md:grid-cols-3 gap-3">
                        {specializations.map((spec) => (
                          <div
                            key={spec}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={spec}
                              checked={formData.specializations.includes(spec)}
                              onCheckedChange={(checked) =>
                                handleMultiSelect(
                                  "specializations",
                                  spec,
                                  checked
                                )
                              }
                            />
                            <Label htmlFor={spec} className="text-sm">
                              {spec}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Industry Preference */}
                    <div>
                      <Label className="mb-4 block">
                        Industry Preferences *
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Select industries you'd like to work in
                      </p>
                      <div className="grid md:grid-cols-3 gap-3">
                        {industries.map((industry) => (
                          <div
                            key={industry}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={industry}
                              checked={formData.industryPreference.includes(
                                industry
                              )}
                              onCheckedChange={(checked) =>
                                handleMultiSelect(
                                  "industryPreference",
                                  industry,
                                  checked
                                )
                              }
                            />
                            <Label htmlFor={industry} className="text-sm">
                              {industry}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.industryPreference && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.industryPreference}
                        </p>
                      )}
                    </div>

                    {/* Extracurricular Activities */}
                    <div>
                      <Label className="mb-4 block">
                        Extracurricular Activities
                      </Label>
                      <div className="grid md:grid-cols-3 gap-3">
                        {extracurriculars.map((activity) => (
                          <div
                            key={activity}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={activity}
                              checked={formData.extracurriculars.includes(
                                activity
                              )}
                              onCheckedChange={(checked) =>
                                handleMultiSelect(
                                  "extracurriculars",
                                  activity,
                                  checked
                                )
                              }
                            />
                            <Label htmlFor={activity} className="text-sm">
                              {activity}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>

                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        localStorage.setItem(
                          "studentProfileDraft",
                          JSON.stringify(formData)
                        );
                        toast({
                          title: "Progress Saved",
                          description:
                            "Your progress has been saved. You can continue later.",
                        });
                      }}
                      className="flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Progress</span>
                    </Button>

                    {currentStep < 4 ? (
                      <Button
                        onClick={nextStep}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <span>Next Step</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Creating Profile...</span>
                          </>
                        ) : (
                          <>
                            <span>Get My Recommendations</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
