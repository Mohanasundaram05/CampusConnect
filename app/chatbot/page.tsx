"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const initialMessages = [
  {
    id: 1,
    type: "bot",
    content:
      "Hello! I'm your AI college counselor. I can help you with college recommendations, admission guidance, and answer any questions about engineering colleges. How can I assist you today?",
    timestamp: new Date(),
  },
];

const quickQuestions = [
  "What are the top engineering colleges in Chennai?",
  "How do I calculate my cutoff marks?",
  "What is the difference between government and private colleges?",
  "Which branch has the best placement opportunities?",
  "How important are NIRF rankings?",
  "What documents do I need for admission?",
];

const botResponses = {
  "top engineering colleges":
    "Based on your profile, here are the top engineering colleges in Chennai:\n\n1. **IIT Madras** - Premier institute with excellent research facilities\n2. **Anna University** - Government college with affordable fees\n3. **SRM Institute** - Private university with good industry connections\n4. **VIT University** - Known for placements and modern infrastructure\n\nWould you like detailed information about any specific college?",

  "cutoff marks":
    "Cutoff marks are calculated based on:\n\n• **Physics marks** (25% weightage)\n• **Chemistry marks** (25% weightage) \n• **Mathematics marks** (50% weightage)\n\n**Formula:** (Physics + Chemistry + 2×Maths) ÷ 4\n\nFor example: If you scored 90, 85, 95 in PCM respectively:\nCutoff = (90 + 85 + 2×95) ÷ 4 = 91.25\n\nWould you like me to calculate your cutoff?",

  "government vs private":
    "Here's a comparison between government and private colleges:\n\n**Government Colleges:**\n✅ Lower fees (₹50K-2L per year)\n✅ Better faculty-student ratio\n✅ Strong alumni network\n❌ Limited seats, high competition\n\n**Private Colleges:**\n✅ More seats available\n✅ Modern infrastructure\n✅ Industry partnerships\n❌ Higher fees (₹2L-5L per year)\n\nChoice depends on your budget and preferences!",

  "placement opportunities":
    "Branch-wise placement trends:\n\n🥇 **Computer Science** - Highest packages (₹8-25L)\n🥈 **Electronics & Communication** - Good opportunities (₹6-18L)\n🥉 **Information Technology** - Similar to CSE (₹7-20L)\n🏅 **Mechanical Engineering** - Core + IT roles (₹5-15L)\n🏅 **Civil Engineering** - Government + Private (₹4-12L)\n\nCSE and IT have the most opportunities currently!",

  "nirf rankings":
    "NIRF (National Institutional Ranking Framework) rankings are important because:\n\n📊 **What they measure:**\n• Teaching & Learning Resources (30%)\n• Research & Professional Practice (30%)\n• Graduation Outcomes (20%)\n• Outreach & Inclusivity (10%)\n• Perception (10%)\n\n🎯 **Why they matter:**\n• Industry recognition\n• Better placement opportunities\n• Quality assurance\n\nHowever, don't choose solely based on rankings - consider your interests and career goals too!",

  "admission documents":
    "Essential documents for engineering admission:\n\n📋 **Academic Documents:**\n• 10th & 12th mark sheets\n• Transfer certificate\n• Conduct certificate\n\n🆔 **Identity Proof:**\n• Aadhaar card\n• Passport size photos\n\n📜 **Category Certificates:**\n• Caste certificate (if applicable)\n• Income certificate\n• Domicile certificate\n\n💰 **Financial:**\n• Bank statements\n• Fee payment receipts\n\nKeep both originals and photocopies ready!",
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(botResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }

    // Default responses for common patterns
    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! I'm here to help you with college admissions and guidance. What would you like to know?";
    }

    if (message.includes("thank")) {
      return "You're welcome! Feel free to ask if you have any more questions about colleges or admissions.";
    }

    if (message.includes("college") && message.includes("recommend")) {
      return "I'd be happy to recommend colleges! To give you personalized suggestions, could you tell me:\n\n• Your 12th marks in PCM\n• Preferred location\n• Budget range\n• Interested branches\n\nOr you can fill out your profile for AI-powered recommendations!";
    }

    // Default response
    return "I understand you're asking about college admissions. While I'm still learning, I can help you with:\n\n• College recommendations\n• Cutoff calculations\n• Admission procedures\n• Branch information\n• Placement details\n\nCould you please rephrase your question or choose from the quick questions below?";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        content: getBotResponse(inputMessage),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              AI College Counselor
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Get instant answers to your college admission questions
            </p>
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg h-96 flex flex-col">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Chat with AI Counselor</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                        message.type === "user"
                          ? "flex-row-reverse space-x-reverse"
                          : ""
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback
                          className={`${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-purple-600 text-white"
                          }`}
                        >
                          {message.type === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>

                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">
                          {message.content}
                        </p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-purple-600 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
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
            </CardContent>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question here..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {quickQuestions.map((question, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-3 text-sm"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
