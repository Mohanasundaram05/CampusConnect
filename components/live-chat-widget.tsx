"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Phone, Video } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  text: string
  sender: "user" | "bot" | "counselor"
  timestamp: Date
  type?: "text" | "quick-reply" | "file"
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI counselor. How can I help you with your college admission queries today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [counselorOnline, setCounselorOnline] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickReplies = [
    "Admission process",
    "Fee structure",
    "Scholarships",
    "Campus facilities",
    "Placement statistics",
    "Talk to counselor",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase()

    if (lowerText.includes("admission") || lowerText.includes("apply")) {
      return "For admissions, you need to appear for JEE Advanced. The application process starts in April. Would you like me to share the detailed admission timeline?"
    }

    if (lowerText.includes("fee") || lowerText.includes("cost")) {
      return "The annual fee is ₹4,00,000 including tuition, hostel, and mess charges. We also offer various scholarships based on merit and need. Would you like to know about scholarship options?"
    }

    if (lowerText.includes("scholarship")) {
      return "We offer Merit Scholarships (₹50,000/year), Need-based Aid (₹75,000/year), and Sports Scholarships (₹40,000/year). You can check your eligibility using our scholarship calculator."
    }

    if (lowerText.includes("placement")) {
      return "Our placement rate is 95% with an average package of ₹25L. Top recruiters include Google, Microsoft, Amazon, and Goldman Sachs. Would you like to see detailed placement statistics?"
    }

    if (lowerText.includes("facility") || lowerText.includes("campus")) {
      return "Our campus spans 617 acres with state-of-the-art facilities including advanced labs, library, sports complex, and 16 hostels. Would you like to take a virtual campus tour?"
    }

    if (lowerText.includes("counselor") || lowerText.includes("human")) {
      return "I'll connect you with our admission counselor. Please hold on while I transfer your chat."
    }

    return "I understand you're asking about our college. Could you please be more specific? You can ask about admissions, fees, scholarships, placements, or facilities."
  }

  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  if (!isOpen) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        {counselorOnline && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-2xl ${isMinimized ? "h-16" : "h-[500px]"} transition-all duration-300`}>
        {/* Header */}
        <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">Admission Assistant</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-xs opacity-90">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1">
                <Video className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 p-1"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[436px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      {message.sender !== "user" && (
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {message.sender === "bot" ? <Bot className="h-3 w-3" /> : "C"}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`p-3 rounded-lg text-sm ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {message.text}
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        <Bot className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="p-3 border-t">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === "Enter" && sendMessage(inputMessage)}
                  className="flex-1"
                />
                <Button
                  onClick={() => sendMessage(inputMessage)}
                  disabled={!inputMessage.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}
