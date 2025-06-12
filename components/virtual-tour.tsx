"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Camera,
  Play,
  MapPin,
  Navigation,
  Maximize2,
  Volume2,
  VolumeX,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";

interface VirtualTourProps {
  college: any;
}

interface TourLocation {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  highlights: string[];
  coordinates?: { x: number; y: number };
}

export default function VirtualTour({ college }: VirtualTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const tourLocations: TourLocation[] = [
    {
      id: "main-gate",
      name: "Main Entrance",
      description:
        "Welcome to the prestigious campus with its iconic main gate and beautiful landscaping.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Entrance",
      highlights: ["Historic Architecture", "Security Check", "Visitor Center"],
      coordinates: { x: 10, y: 20 },
    },
    {
      id: "academic-block",
      name: "Academic Block",
      description:
        "State-of-the-art classrooms and lecture halls equipped with modern technology.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Academic",
      highlights: ["Smart Classrooms", "Lecture Halls", "Faculty Offices"],
      coordinates: { x: 30, y: 40 },
    },
    {
      id: "library",
      name: "Central Library",
      description:
        "A vast collection of books, journals, and digital resources in a serene environment.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Academic",
      highlights: ["500,000+ Books", "Digital Library", "Study Spaces"],
      coordinates: { x: 50, y: 30 },
    },
    {
      id: "labs",
      name: "Research Laboratories",
      description:
        "Advanced laboratories for cutting-edge research and practical learning.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Research",
      highlights: ["AI Lab", "Robotics Lab", "Chemistry Lab"],
      coordinates: { x: 70, y: 50 },
    },
    {
      id: "hostel",
      name: "Student Hostels",
      description:
        "Comfortable accommodation with modern amenities for students.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Residential",
      highlights: ["Wi-Fi", "Common Rooms", "Mess Facilities"],
      coordinates: { x: 20, y: 70 },
    },
    {
      id: "sports",
      name: "Sports Complex",
      description:
        "World-class sports facilities for various indoor and outdoor activities.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Recreation",
      highlights: ["Swimming Pool", "Gymnasium", "Cricket Ground"],
      coordinates: { x: 80, y: 70 },
    },
  ];

  const categories = [
    "All",
    "Academic",
    "Research",
    "Residential",
    "Recreation",
    "Entrance",
  ];

  const nextLocation = () => {
    setCurrentLocation((prev) => (prev + 1) % tourLocations.length);
  };

  const prevLocation = () => {
    setCurrentLocation(
      (prev) => (prev - 1 + tourLocations.length) % tourLocations.length
    );
  };

  const goToLocation = (index: number) => {
    setCurrentLocation(index);
  };

  const current = tourLocations[currentLocation];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0">
          <CardContent className="p-6">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 to-purple-900 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
              <img
                src={college.coverImage || "/placeholder.svg"}
                alt="Campus Preview"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Virtual Tour
                </Button>
              </div>
              <Badge className="absolute top-3 right-3 bg-blue-600">
                360° View
              </Badge>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">Virtual Campus Tour</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Explore our campus from the comfort of your home
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "Main Campus",
                  "Library",
                  "Labs",
                  "Hostels",
                  "Sports",
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
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Virtual Campus Tour - {college.shortName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMap(!showMap)}
              >
                <MapPin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-4 gap-6 h-[70vh]">
          {/* Main Tour View */}
          <div className="lg:col-span-3 space-y-4">
            {/* Current Location */}
            <div className="relative h-96 rounded-lg overflow-hidden bg-black">
              <img
                src={current.image || "/placeholder.svg"}
                alt={current.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Location Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{current.category}</Badge>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? "Pause" : "Play"} Tour
                    </Button>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{current.name}</h3>
                <p className="text-sm opacity-90 mb-3">{current.description}</p>
                <div className="flex flex-wrap gap-2">
                  {current.highlights.map((highlight, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-white border-white/30"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevLocation}
                  className="text-white hover:bg-white/20 rounded-full w-10 h-10"
                >
                  <Navigation className="h-4 w-4 rotate-180" />
                </Button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextLocation}
                  className="text-white hover:bg-white/20 rounded-full w-10 h-10"
                >
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2">
              {tourLocations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToLocation(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentLocation
                      ? "bg-blue-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>

            {/* Campus Map */}
            {showMap && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 relative h-48"
              >
                <h4 className="font-semibold mb-3">Campus Map</h4>
                <div className="relative w-full h-32 bg-green-100 dark:bg-green-900/20 rounded border-2 border-dashed border-green-300 dark:border-green-700">
                  {tourLocations.map((location, index) => (
                    <button
                      key={location.id}
                      onClick={() => goToLocation(index)}
                      className={`absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                        index === currentLocation
                          ? "bg-blue-600 scale-125 ring-2 ring-blue-300"
                          : "bg-gray-400 hover:bg-gray-600"
                      }`}
                      style={{
                        left: `${location.coordinates?.x}%`,
                        top: `${location.coordinates?.y}%`,
                      }}
                      title={location.name}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <h4 className="font-semibold mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location List */}
            <div>
              <h4 className="font-semibold mb-3">Tour Locations</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {tourLocations.map((location, index) => (
                  <motion.button
                    key={location.id}
                    onClick={() => goToLocation(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      index === currentLocation
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={location.image || "/placeholder.svg"}
                        alt={location.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{location.name}</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {location.description}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {location.category}
                        </Badge>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tour Stats */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Tour Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Locations:</span>
                    <span className="font-medium">{tourLocations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Location:</span>
                    <span className="font-medium">{currentLocation + 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Progress:</span>
                    <span className="font-medium">
                      {Math.round(
                        ((currentLocation + 1) / tourLocations.length) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
