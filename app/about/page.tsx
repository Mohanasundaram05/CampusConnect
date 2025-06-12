"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Mail, Linkedin, Github } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const team = [
  {
    name: "MOHANASUNDARAM ",
    role: "Founder & CEO",
    image: "/tm1.png?height=200&width=200",
    bio: "Former IIT professor with 15+ years in education technology",
    email: "mohan@campusconnect.com",
    linkedin: "#",
    github: "#",
  },
  {
    name: "RAJESH KUMAR ",
    role: "Co-Founder",
    image: "/tm2.png?height=200&width=200",
    bio: "AI/ML expert with experience at top tech companies",
    email: "rajesh@campusconnect.com",
    linkedin: "#",
    github: "#",
  },
  {
    name: "SANJAY VAASAN",
    role: "Head of Product",
    image: "/tm3.png?height=200&width=200",
    bio: "Product strategist focused on student experience",
    email: "vaasan@campusconnect.com",
    linkedin: "#",
    github: "#",
  },
  {
    name: "ARUN KUMAR",
    role: "Lead Designer",
    image: "/tm4.png?height=200&width=200",
    bio: "UX designer passionate about accessible education",
    email: "arun@campusconnect.com",
    linkedin: "#",
    github: "#",
  },
  {
    name: "MUTHUMANIKANDAN",
    role: "CTO",
    image: "/tm5.png?height=200&width=200",
    bio: "Driving innovation in educational technology with a focus on scalable and inclusive digital solutions.",
    email: "muthu@campusconnect.com",
    linkedin: "#",
    github: "#",
  },
];  

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To democratize access to quality education by providing AI-powered guidance that helps every student find their perfect college match.",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    icon: Heart,
    title: "Our Vision",
    description:
      "A world where every student has equal opportunity to pursue their dreams through informed educational choices.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Our Values",
    description:
      "Transparency, accessibility, innovation, and student-first approach guide everything we do.",
    gradient: "from-green-500 to-teal-600",
  },
];

const stats = [
  { number: "50,000+", label: "Students Helped" },
  { number: "500+", label: "Colleges Listed" },
  { number: "95%", label: "Accuracy Rate" },
  { number: "4.9/5", label: "User Rating" },
];


export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              About CampusConnect
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're on a mission to revolutionize college admissions through
              AI-powered guidance, making quality education accessible to every
              student.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${value.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Team Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate educators and technologists working together to
              transform education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="relative mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gradient-to-r from-blue-500 to-purple-600"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>

                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {member.bio}
                    </p>

                    <div className="flex justify-center space-x-3">
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                      <a
                        href={member.linkedin}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href={member.github}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-2xl">
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Find Your Perfect College?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of students who have found their dream colleges
                  with our AI-powered recommendations.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Get Started Today
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
