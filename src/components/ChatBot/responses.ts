
export const getResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  const comprehensiveFaqResponses: Record<string, string> = {
    'how does it work': '🔬 Our advanced calculator analyzes 50+ health factors including your age, medical history, lifestyle habits, diet quality, exercise patterns, sleep hygiene, stress levels, and environmental factors! 📊 It uses cutting-edge statistical models and population health data to provide personalized lifespan estimates. Think of it as your personal health crystal ball powered by science! ✨🔮💡',
    
    'is it accurate': '📊 Our calculator provides scientifically-backed estimates using the latest research and population health data. While it offers valuable insights (85-90% correlation with health outcomes), it cannot predict individual futures with 100% certainty as life has many unpredictable variables! 🎯 Consider it your health guide, not a definitive fortune teller. Life is beautifully unpredictable! 🌟💫🎭',
    
    'what factors': '📋 We analyze comprehensive health data: Personal demographics (age, gender, genetics) 👤, existing health conditions & family history 🏥👨‍👩‍👧‍👦, lifestyle choices (smoking 🚭, alcohol 🍷), nutrition quality 🥗, physical activity levels 💪, sleep patterns & quality 😴, stress management 😌, mental health status 🧠, environmental factors 🌍, healthcare access 👩‍⚕️, social connections 👥, and occupation hazards ⚠️. It\'s like a complete 360° health assessment! 🩺✨🔄',
    
    'is it safe': '🔒 Absolutely! Your privacy is our top priority. All data is processed locally in your browser using advanced encryption. Nothing is stored on our servers or shared with third parties! 🛡️ Your health information is as secure as your personal diary. What happens in your browser, stays in your browser! 🤐💻🔐',
    
    'medical advice': '⚠️ Important: This tool is for educational and informational purposes only. It should never replace professional medical advice, diagnosis, or treatment from qualified healthcare providers! 👩‍⚕️ Always consult with doctors, specialists, or certified health professionals for medical decisions. We\'re your health-curious friend, not your doctor! Think of us as a smart health encyclopedia! 🩺📚⚕️',
    
    'improve lifespan': '💪 Science-backed longevity strategies: Regular exercise (150+ min/week) 🏃‍♂️, Mediterranean diet rich in nutrients 🥗, quality sleep (7-9 hours) 😴, stress management through meditation 🧘‍♀️, avoid smoking completely 🚭, moderate alcohol (if any) 🍷, maintain strong social bonds 👥, continuous learning 📚, regular health checkups 🩺, stay hydrated 💧, practice gratitude 🙏, and maintain purpose in life 🎯. Small daily changes create massive lifetime impact! 🌱✨🚀',
    
    'privacy': '🔐 Your privacy is sacred to us! We use zero-knowledge architecture - your personal health data never leaves your device. No tracking, no data mining, no selling information to third parties! 🚫📤 All calculations happen locally with military-grade encryption. Your health secrets are safer than Fort Knox! 📖🔒🏰',
    
    'diet': '🥗 Optimal longevity nutrition: Mediterranean diet with colorful fruits 🍎🍊, leafy vegetables 🥬🥕, whole grains 🌾, lean proteins (fish 🐟, legumes 🫘), healthy fats (olive oil 🫒, avocados 🥑, nuts 🥜), minimal processed foods, adequate fiber, and antioxidant-rich foods 🫐. Eat the rainbow daily! 🌈 Your plate should look like a vibrant garden party! 🌻🥬🍇',
    
    'exercise': '🏃‍♂️ Exercise is the fountain of youth! Aim for 150+ minutes moderate activity weekly: cardio for heart health ❤️, strength training for muscle mass 💪, flexibility for mobility 🤸‍♀️, balance exercises for stability ⚖️. Even 10-minute walks add years to life! Movement is medicine - your body craves it! 💊💃 Dance, swim, hike, play - make it fun! 🕺✨🏊‍♀️',
    
    'stress': '🧘‍♀️ Chronic stress is a silent killer, but manageable! Effective techniques: daily meditation 🧘, deep breathing exercises 🌬️, regular exercise 🏃‍♀️, creative hobbies 🎨, time in nature 🌳, quality sleep 😴, social support 👥, and professional therapy when needed 💬. Stress less, live more! Your peace of mind is priceless! 😌🌸☮️',
    
    'sleep': '💤 Sleep is when your body performs miracles! Quality 7-9 hours nightly: repairs tissues 🔧, consolidates memories 🧠, regulates hormones ⚖️, boosts immunity 🛡️, and processes emotions 💗. Create a sleep sanctuary: cool, dark, quiet room 🌙. Good sleep = good health = good life! Sweet dreams create sweet years! ✨🛏️🌟',
    
    'smoking': '🚭 Smoking can steal 10+ years of life, but quitting adds them back! Benefits start within 20 minutes: improved circulation, better breathing, enhanced taste/smell, reduced infection risk, and dramatically lower cancer/heart disease risk. It\'s NEVER too late to quit! Your lungs will thank you with every breath! 🫁💚 Freedom from smoking = freedom to live fully! 🌬️✊'
  };
  
  for (const [key, response] of Object.entries(comprehensiveFaqResponses)) {
    if (lowerInput.includes(key)) {
      return response;
    }
  }
  
  // Enhanced pattern matching for better responses
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    return '👋 Hello there, health champion! I\'m absolutely thrilled to help you with questions about our Lifespan Calculator and comprehensive health topics! 😊✨ What\'s sparking your curiosity today? I\'m here to share evidence-based insights! 🤔💭🌟';
  }
  
  if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
    return '🙏 You\'re so very welcome! I\'m delighted to be your health companion on this wellness journey! 💚 Remember, I\'m here 24/7 whenever you need guidance about health, wellness, or our calculator. Stay healthy, stay curious, and keep shining bright! ✨😊🌟';
  }
  
  return '🤔 That\'s a fascinating question! While I specialize in our Lifespan Calculator and evidence-based health information 📚, I might not have covered that specific topic yet. For detailed medical concerns, please consult healthcare professionals! 👩‍⚕️ Is there anything else about health, wellness, or our calculation tool I can help explain? I\'m always excited to share health wisdom! 💡✨🌟';
};
