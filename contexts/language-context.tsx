"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "ta" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.explore": "Explore",
    "nav.login": "Login",
    "nav.signup": "Sign Up",

    // Hero Section
    "hero.title": "Find Your Perfect Engineering College",
    "hero.subtitle":
      "Make informed decisions about engineering college admissions with our intelligent recommendation system",
    "hero.cta": "Get Started",

    // Features
    "features.title": "Why Choose CampusConnect?",
    "features.subtitle":
      "Comprehensive tools and insights to make informed decisions about your engineering education",
    "features.ai_recommendations": "AI Recommendations",
    "features.ai_recommendations_desc":
      "Get personalized college suggestions based on your academic profile and preferences",
    "features.cutoff_predictions": "Cutoff Predictions",
    "features.cutoff_predictions_desc":
      "Accurate cutoff predictions using historical data and machine learning",
    "features.chatbot_support": "24/7 AI Support",
    "features.chatbot_support_desc":
      "Get instant answers to your admission queries anytime, anywhere",
    "features.multi_language": "Multi-Language",
    "features.multi_language_desc":
      "Access our platform in English, Tamil, and Hindi for better understanding",

    // Stats
    "stats.students_helped": "Students Helped",
    "stats.colleges_listed": "Colleges Listed",
    "stats.accuracy_rate": "Accuracy Rate",
    "stats.user_rating": "User Rating",

    // Why Us
    "why_us.title": "Why Students Trust CampusConnect",
    "why_us.subtitle":
      "We combine cutting-edge AI technology with deep educational insights to provide the most accurate and helpful college guidance.",
    "why_us.point1":
      "Advanced AI algorithms analyze thousands of data points to provide personalized recommendations",
    "why_us.point2":
      "Real-time cutoff predictions based on current trends and historical data",
    "why_us.point3":
      "Comprehensive database of 500+ engineering colleges with detailed information",

    // Testimonials
    "testimonials.title": "What Students Say",
    "testimonials.subtitle":
      "Join thousands of students who found their perfect college match with CampusConnect",

    // CTA
    "cta.title": "Ready to Find Your Perfect College?",
    "cta.subtitle":
      "Join thousands of students who have successfully found their ideal engineering college with our AI-powered platform.",
    "cta.button": "Start Your Journey",

    // Profile Page
    "profile.title": "Create Your Profile",

    // Recommendations
    "recommendations.title": "Your College Recommendations",

    // Cutoff Trends
    "cutoff_trends.title": "Cutoff Trends & Analysis",

    // Courses
    "courses.title": "Explore Engineering Courses",

    // Comparison
    "comparison.title": "College Comparison",
  },
  ta: {
    // Navigation
    "nav.home": "முகப்பு",
    "nav.features": "அம்சங்கள்",
    "nav.explore": "ஆராய்",
    "nav.login": "உள்நுழை",
    "nav.signup": "பதிவு செய்",

    // Hero Section
    "hero.title": "AI-இயங்கும் கல்லூரி வழிகாட்டுதல்",
    "hero.subtitle":
      "உங்கள் கல்வி சுயவிவரம் மற்றும் தொழில் அபிலாஷைகளுக்கு ஏற்ப தனிப்பயனாக்கப்பட்ட AI பரிந்துரைகளுடன் உங்கள் சரியான பொறியியல் கல்லூரியைக் கண்டறியுங்கள்.",
    "hero.cta": "தொடங்குங்கள்",

    // Features
    "features.title": "CampusConnect ஏன் தேர்வு செய்ய வேண்டும்?",
    "features.subtitle":
      "உங்கள் பொறியியல் கல்வியைப் பற்றி தகவலறிந்த முடிவுகளை எடுக்க விரிவான கருவிகள் மற்றும் நுண்ணறிவுகள்",
    "features.ai_recommendations": "AI பரிந்துரைகள்",
    "features.ai_recommendations_desc":
      "உங்கள் கல்வி சுயவிவரம் மற்றும் விருப்பங்களின் அடிப்படையில் தனிப்பயனாக்கப்பட்ட கல்லூரி பரிந்துரைகளைப் பெறுங்கள்",
    "features.cutoff_predictions": "கட்ஆஃப் கணிப்புகள்",
    "features.cutoff_predictions_desc":
      "வரலாற்று தரவு மற்றும் இயந்திர கற்றலைப் பயன்படுத்தி துல்லியமான கட்ஆஃப் கணிப்புகள்",
    "features.chatbot_support": "24/7 AI ஆதரவு",
    "features.chatbot_support_desc":
      "எந்த நேரத்திலும், எங்கிருந்தும் உங்கள் சேர்க்கை கேள்விகளுக்கு உடனடி பதில்களைப் பெறுங்கள்",
    "features.multi_language": "பல மொழி",
    "features.multi_language_desc":
      "சிறந்த புரிதலுக்காக ஆங்கிலம், தமிழ் மற்றும் இந்தியில் எங்கள் தளத்தை அணுகவும்",

    // Stats
    "stats.students_helped": "உதவிய மாணவர்கள்",
    "stats.colleges_listed": "பட்டியலிடப்பட்ட கல்லூரிகள்",
    "stats.accuracy_rate": "துல்லிய விகிதம்",
    "stats.user_rating": "பயனர் மதிப்பீடு",

    // Why Us
    "why_us.title": "மாணவர்கள் CampusConnect ஐ ஏன் நம்புகிறார்கள்",
    "why_us.subtitle":
      "மிகவும் துல்லியமான மற்றும் உதவிகரமான கல்லூரி வழிகாட்டுதலை வழங்க நாங்கள் அதிநவீன AI தொழில்நுட்பத்தை ஆழமான கல்வி நுண்ணறிவுகளுடன் இணைக்கிறோம்.",
    "why_us.point1":
      "மேம்பட்ட AI அல்காரிதம்கள் ஆயிரக்கணக்கான தரவு புள்ளிகளை பகுப்பாய்வு செய்து தனிப்பயனாக்கப்பட்ட பரிந்துரைகளை வழங்குகின்றன",
    "why_us.point2":
      "தற்போதைய போக்குகள் மற்றும் வரலாற்று தரவுகளின் அடிப்படையில் நிகழ்நேர கட்ஆஃப் கணிப்புகள்",
    "why_us.point3":
      "விரிவான தகவல்களுடன் 500+ பொறியியல் கல்லூரிகளின் விரிவான தரவுத்தளம்",

    // Testimonials
    "testimonials.title": "மாணவர்கள் என்ன சொல்கிறார்கள்",
    "testimonials.subtitle":
      "CampusConnect உடன் தங்கள் சரியான கல்லூரி பொருத்தத்தைக் கண்டறிந்த ஆயிரக்கணக்கான மாணவர்களுடன் சேருங்கள்",

    // CTA
    "cta.title": "உங்கள் சரியான கல்லூரியைக் கண்டறிய தயாரா?",
    "cta.subtitle":
      "எங்கள் AI-இயங்கும் தளத்துடன் தங்கள் சிறந்த பொறியியல் கல்லூரியை வெற்றிகரமாகக் கண்டறிந்த ஆயிரக்கணக்கான மாணவர்களுடன் சேருங்கள்.",
    "cta.button": "உங்கள் பயணத்தைத் தொடங்குங்கள்",

    // Profile Page
    "profile.title": "உங்கள் சுயவிவரத்தை உருவாக்குங்கள்",

    // Recommendations
    "recommendations.title": "உங்கள் கல்லூரி பரிந்துரைகள்",

    // Cutoff Trends
    "cutoff_trends.title": "கட்ஆஃப் போக்குகள் மற்றும் பகுப்பாய்வு",

    // Courses
    "courses.title": "பொறியியல் படிப்புகளை ஆராயுங்கள்",

    // Comparison
    "comparison.title": "கல்லூரி ஒப்பீடு",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.features": "विशेषताएं",
    "nav.explore": "खोजें",
    "nav.login": "लॉगिन",
    "nav.signup": "साइन अप",

    // Hero Section
    "hero.title": "AI-संचालित कॉलेज मार्गदर्शन",
    "hero.subtitle":
      "अपनी शैक्षणिक प्रोफ़ाइल और करियर की आकांक्षाओं के अनुकूल व्यक्तिगत AI सिफारिशों के साथ अपना सही इंजीनियरिंग कॉलेज खोजें।",
    "hero.cta": "शुरू करें",

    // Features
    "features.title": "CampusConnect क्यों चुनें?",
    "features.subtitle":
      "अपनी इंजीनियरिंग शिक्षा के बारे में सूचित निर्णय लेने के लिए व्यापक उपकरण और अंतर्दृष्टि",
    "features.ai_recommendations": "AI सिफारिशें",
    "features.ai_recommendations_desc":
      "अपनी शैक्षणिक प्रोफ़ाइल और प्राथमिकताओं के आधार पर व्यक्तिगत कॉलेज सुझाव प्राप्त करें",
    "features.cutoff_predictions": "कटऑफ भविष्यवाणियां",
    "features.cutoff_predictions_desc":
      "ऐतिहासिक डेटा और मशीन लर्निंग का उपयोग करके सटीक कटऑफ भविष्यवाणियां",
    "features.chatbot_support": "24/7 AI सहायता",
    "features.chatbot_support_desc":
      "कभी भी, कहीं भी अपने प्रवेश प्रश्नों के तुरंत उत्तर प्राप्त करें",
    "features.multi_language": "बहुभाषी",
    "features.multi_language_desc":
      "बेहतर समझ के लिए अंग्रेजी, तमिल और हिंदी में हमारे प्लेटफॉर्म तक पहुंचें",

    // Stats
    "stats.students_helped": "सहायता प्राप्त छात्र",
    "stats.colleges_listed": "सूचीबद्ध कॉलेज",
    "stats.accuracy_rate": "सटीकता दर",
    "stats.user_rating": "उपयोगकर्ता रेटिंग",

    // Why Us
    "why_us.title": "छात्र CampusConnect पर क्यों भरोसा करते हैं",
    "why_us.subtitle":
      "हम सबसे सटीक और सहायक कॉलेज मार्गदर्शन प्रदान करने के लिए अत्याधुनिक AI तकनीक को गहरी शैक्षणिक अंतर्दृष्टि के साथ जोड़ते हैं।",
    "why_us.point1":
      "उन्नत AI एल्गोरिदम व्यक्तिगत सिफारिशें प्रदान करने के लिए हजारों डेटा पॉइंट्स का विश्लेषण करते हैं",
    "why_us.point2":
      "वर्तमान रुझानों और ऐतिहासिक डेटा के आधार पर रीयल-टाइम कटऑफ भविष्यवाणियां",
    "why_us.point3":
      "विस्तृत जानकारी के साथ 500+ इंजीनियरिंग कॉलेजों का व्यापक डेटाबेस",

    // Testimonials
    "testimonials.title": "छात्र क्या कहते हैं",
    "testimonials.subtitle":
      "CampusConnect के साथ अपना सही कॉलेज मैच खोजने वाले हजारों छात्रों से जुड़ें",

    // CTA
    "cta.title": "अपना सही कॉलेज खोजने के लिए तैयार हैं?",
    "cta.subtitle":
      "हमारे AI-संचालित प्लेटफॉर्म के साथ सफलतापूर्वक अपना आदर्श इंजीनियरिंग कॉलेज खोजने वाले हजारों छात्रों से जुड़ें।",
    "cta.button": "अपनी यात्रा शुरू करें",

    // Profile Page
    "profile.title": "अपनी प्रोफ़ाइल बनाएं",

    // Recommendations
    "recommendations.title": "आपकी कॉलेज सिफारिशें",

    // Cutoff Trends
    "cutoff_trends.title": "कटऑफ रुझान और विश्लेषण",

    // Courses
    "courses.title": "इंजीनियरिंग कोर्स खोजें",

    // Comparison
    "comparison.title": "कॉलेज तुलना",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
