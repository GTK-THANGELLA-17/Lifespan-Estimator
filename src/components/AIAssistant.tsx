
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, SendHorizonal, User, Brain, MessageSquare, Heart, Activity, Pizza, Dumbbell, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface AIAssistantProps {
  selectedData: Record<string, any> | null;
}

export function AIAssistant({ selectedData }: AIAssistantProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Array<{type: 'user' | 'assistant'; content: string}>>([
    { 
      type: 'assistant', 
      content: `Hi there! I'm your health assistant. I can provide personalized tips based on your health profile and answer questions about health, fitness, nutrition, and lifestyle. How can I help you today?` 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [currentResponse, setCurrentResponse] = useState("");
  const [fullResponse, setFullResponse] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Typing effect for AI responses
  useEffect(() => {
    if (isTyping && currentTypingIndex < fullResponse.length) {
      const timer = setTimeout(() => {
        setCurrentResponse(prev => prev + fullResponse[currentTypingIndex]);
        setCurrentTypingIndex(prev => prev + 1);
      }, 15); // Speed of typing simulation
      return () => clearTimeout(timer);
    } else if (isTyping && currentTypingIndex >= fullResponse.length) {
      setIsTyping(false);
      setMessages(prev => [...prev.slice(0, -1), { type: 'assistant', content: fullResponse }]);
    }
  }, [isTyping, currentTypingIndex, fullResponse]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate response based on user's health data and message
      let response = "";
      
      if (userMessage.toLowerCase().includes("exercise") || userMessage.toLowerCase().includes("workout")) {
        response = generateExerciseTips(selectedData);
      } else if (userMessage.toLowerCase().includes("diet") || userMessage.toLowerCase().includes("eat") || userMessage.toLowerCase().includes("food")) {
        response = generateDietTips(selectedData);
      } else if (userMessage.toLowerCase().includes("sleep") || userMessage.toLowerCase().includes("rest")) {
        response = generateSleepTips(selectedData);
      } else if (userMessage.toLowerCase().includes("stress") || userMessage.toLowerCase().includes("anxiety")) {
        response = generateStressTips(selectedData);
      } else if (userMessage.toLowerCase().includes("lifespan") || userMessage.toLowerCase().includes("live longer")) {
        response = generateLifespanTips(selectedData);
      } else if (userMessage.toLowerCase().includes("weight") || userMessage.toLowerCase().includes("bmi")) {
        response = generateWeightTips(selectedData);
      } else if (userMessage.toLowerCase().includes("hydration") || userMessage.toLowerCase().includes("water")) {
        response = generateHydrationTips(selectedData);
      } else if (userMessage.toLowerCase().includes("mental health") || userMessage.toLowerCase().includes("depression")) {
        response = generateMentalHealthTips(selectedData);
      } else {
        response = generateGeneralHealth(selectedData);
      }
      
      // Start the typing effect
      setFullResponse(response);
      setCurrentResponse("");
      setCurrentTypingIndex(0);
      setMessages(prev => [...prev, { type: 'assistant', content: "" }]);
      setIsTyping(true);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem generating a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Generate tips based on categories
  const generateExerciseTips = (data: Record<string, any> | null) => {
    if (!data) return "I need more information about your health profile to give personalized advice.";
    
    const activityInfo = data.activityInfo || {};
    const exerciseFreq = activityInfo.exerciseFrequency || "unknown";
    
    if (exerciseFreq === "daily") {
      return "You're already exercising daily, which is excellent! To continue improving, consider varying your workouts with a mix of cardio, strength training, and flexibility exercises. Adding interval training could boost your results further. Make sure to include rest days to allow your body to recover properly.";
    } else if (exerciseFreq === "weekly") {
      return "You're on the right track with weekly exercise! Try to gradually increase to 4-5 sessions per week, mixing different types of activities. Start with an extra 10-minute walk daily to build momentum. Consider joining a class or finding a workout buddy to make it more enjoyable and help you stay accountable.";
    } else if (exerciseFreq === "rarely") {
      return "It's great you're thinking about exercise! Start small with 10-minute walks daily, then gradually add more activities you enjoy like swimming, cycling or dancing. The key is consistency rather than intensity at first. Find activities that bring you joy, and remember that any movement counts. Even household chores or taking the stairs can be beneficial.";
    } else if (exerciseFreq === "never") {
      return "It's never too late to start moving more! Begin with gentle activities like walking or stretching for just 5 minutes daily. Focus on activities you might enjoy, and remember that any movement is better than none. Consider consulting with a healthcare provider before beginning a new exercise regimen, especially if you have existing health conditions.";
    } else {
      return "Regular physical activity is crucial for health. Aim for 150 minutes of moderate exercise weekly, spread across several days. Find activities you enjoy to make it sustainable long-term. A combination of cardio, strength training, and flexibility exercises provides the most comprehensive benefits for your health.";
    }
  };
  
  const generateDietTips = (data: Record<string, any> | null) => {
    if (!data) return "I need more information about your health profile to give personalized advice.";
    
    const dietInfo = data.dietInfo || {};
    const dietType = dietInfo.dietType || "unknown";
    
    if (dietType === "balanced") {
      return "You're already following a balanced diet, which is excellent! To optimize further, focus on meal timing, portion control, and ensuring enough protein with each meal. Consider adding more colorful vegetables to increase your phytonutrient intake. Stay hydrated throughout the day, and try incorporating more omega-3 rich foods like fatty fish, flaxseeds, or walnuts.";
    } else if (dietType === "vegetarian" || dietType === "vegan") {
      return "Your plant-based diet is a great foundation! Ensure you're getting enough vitamin B12, iron, zinc, and omega-3s which can be more challenging with plant-based eating. Consider fortified foods or appropriate supplements if needed. Include a variety of protein sources like legumes, tofu, tempeh, and seitan. Experiment with different grains and try new vegetables regularly to get a wide range of nutrients.";
    } else if (dietType === "mediterranean") {
      return "The Mediterranean diet is an excellent choice for long-term health! Continue incorporating olive oil, nuts, seeds, fresh vegetables, fruits, whole grains, and fish. Consider reducing refined carbohydrates further and increasing your intake of leafy greens. This diet is associated with lower risk of heart disease and improved cognitive function.";
    } else if (dietType === "processed" || dietType === "high_sugar") {
      return "Small changes can make a big difference! Try swapping one processed food item daily for a whole food alternative. Add a fruit or vegetable to each meal, and gradually reduce added sugars by using natural sweeteners or enjoying the natural sweetness in fruits. Plan and prepare meals in advance to avoid relying on convenience foods, and read nutrition labels to become more aware of hidden sugars and additives.";
    } else {
      return "Focus on whole, unprocessed foods as the foundation of your diet. Include plenty of fruits, vegetables, lean proteins, whole grains, and healthy fats. Stay hydrated and be mindful of portion sizes. Try the 'plate method': fill half your plate with vegetables, a quarter with lean protein, and a quarter with whole grains or starchy vegetables. This simple approach can help you create balanced meals.";
    }
  };
  
  const generateSleepTips = (data: Record<string, any> | null) => {
    if (!data) return "I need more information about your health profile to give personalized advice.";
    
    const lifestyleInfo = data.lifestyleInfo || {};
    const sleepPatterns = lifestyleInfo.sleepPatterns || "unknown";
    
    if (sleepPatterns === "insomnia") {
      return "Addressing insomnia is crucial for your overall health. Create a consistent sleep schedule by going to bed and waking up at the same time every day, even on weekends. Establish a calming bedtime routine without screens at least 30 minutes before sleep. Make your bedroom cool, dark, and quiet. Consider relaxation techniques like deep breathing or progressive muscle relaxation. If insomnia persists, consult a healthcare provider as it may require more targeted interventions.";
    } else if (sleepPatterns === "other") {
      return "Sleep disorders can significantly impact your health. Create an optimal sleep environment that's cool, dark, and quiet. Maintain consistent sleep and wake times. Limit caffeine, alcohol, and large meals before bed. Try relaxation techniques before bedtime, such as meditation or gentle stretching. Track your sleep patterns to identify triggers that may be disrupting your sleep. Consider speaking with a healthcare provider about your specific sleep issues.";
    } else {
      return "Quality sleep is essential for health and longevity. Aim for 7-9 hours nightly, maintain a consistent sleep schedule, create a relaxing bedtime routine, and optimize your sleep environment to be dark, quiet and cool. Limit screen time, caffeine, and alcohol before bed. During the day, get some natural sunlight exposure, especially in the morning, to help regulate your body's internal clock. Regular exercise (not too close to bedtime) can also promote better sleep quality.";
    }
  };
  
  const generateStressTips = (data: Record<string, any> | null) => {
    if (!data) return "I need more information about your health profile to give personalized advice.";
    
    const lifestyleInfo = data.lifestyleInfo || {};
    const stressManagement = lifestyleInfo.stressManagement || "unknown";
    
    if (stressManagement === "meditation" || stressManagement === "yoga") {
      return "You're already using wonderful stress management techniques! To enhance their benefits, try varying your practice - if you meditate, maybe add some gentle yoga, or vice versa. Consistency is key, even if it's just 5-10 minutes daily. Consider exploring different styles of meditation like focused attention, loving-kindness, or body scan techniques. You might also benefit from adding breathwork exercises or progressive muscle relaxation to your toolkit.";
    } else if (stressManagement === "none") {
      return "Finding effective stress management techniques could significantly improve your health and wellbeing. Start with just 5 minutes of deep breathing daily, take short nature breaks, or try a guided meditation app. Small, consistent practices make a big difference over time. Connect with supportive friends or family regularly. Schedule short breaks throughout your day to reset your stress response system. Consider keeping a gratitude journal to shift focus toward positive aspects of your life.";
    } else {
      return "Regular stress management practices are vital for health. Try deep breathing exercises, meditation, yoga, spending time in nature, journaling, or any activity that helps you feel calm and centered. Even 5-10 minutes daily can make a significant difference. Pay attention to how you talk to yourself and practice self-compassion. Set boundaries around work and digital device use. Remember that managing stress is not just about relaxation techniques but also addressing the sources of stress in your life when possible.";
    }
  };
  
  const generateLifespanTips = (data: Record<string, any> | null) => {
    if (!data) return "I need more information about your health profile to give personalized advice.";
    
    // Personalize based on selected health data
    const personalInfo = data.personalInfo || {};
    const healthInfo = data.healthInfo || {};
    const lifestyleInfo = data.lifestyleInfo || {};
    
    let response = "The keys to longevity include: regular physical activity, a nutrient-dense diet rich in plants, maintaining social connections, managing stress effectively, getting quality sleep, avoiding smoking and excessive alcohol, staying mentally active, and regular health check-ups. ";
    
    if (personalInfo.age && parseInt(personalInfo.age) > 50) {
      response += "As you're over 50, it's particularly important to focus on strength training to maintain muscle mass, and regular health screenings. ";
    }
    
    if (healthInfo.chronicConditions && healthInfo.chronicConditions.includes("diabetes")) {
      response += "With diabetes, maintaining stable blood sugar through diet, exercise, and medication adherence is crucial for longevity. ";
    }
    
    if (lifestyleInfo.lifestyleHabits && lifestyleInfo.lifestyleHabits.includes("smoking")) {
      response += "Quitting smoking would be the single most effective step you could take to extend your lifespan. Even after years of smoking, your body can begin healing quickly after cessation. ";
    }
    
    response += "Small, consistent healthy habits over time have the biggest impact on lifespan. Focus on making sustainable changes rather than dramatic short-term efforts.";
    
    return response;
  };

  const generateWeightTips = (data: Record<string, any> | null) => {
    if (!data) return "I need more information about your health profile to give personalized advice.";
    
    const personalInfo = data.personalInfo || {};
    const bmi = personalInfo.bmi ? parseFloat(personalInfo.bmi) : null;
    
    if (!bmi) {
      return "For healthy weight management, focus on nutrient-dense whole foods, regular physical activity, adequate sleep, and stress management. Remember that health is more than weight alone - your energy levels, mood, and overall functioning are important indicators too.";
    }
    
    if (bmi < 18.5) {
      return "Your BMI suggests you might be underweight. Consider working with a healthcare provider to determine if weight gain would benefit your health. Focus on nutrient-dense foods, adequate protein intake, and strength training exercises. Small, frequent meals may help increase calorie consumption without feeling overwhelmed.";
    } else if (bmi >= 18.5 && bmi < 25) {
      return "Your BMI is within the generally healthy range. To maintain this, continue focusing on balanced nutrition, regular physical activity, and overall healthy habits. Remember that muscle weighs more than fat, so if you're physically active, BMI might not be the best measure of health.";
    } else if (bmi >= 25 && bmi < 30) {
      return "Your BMI suggests you may be overweight. Small, sustainable changes often work better than drastic measures. Consider focusing on adding more vegetables, lean proteins, and whole grains to your diet while reducing processed foods and sugar. Aim for regular activity you enjoy, and remember that even modest weight loss (5-10%) can significantly improve health markers.";
    } else {
      return "Your BMI suggests obesity, which can increase health risks. Working with healthcare providers to develop a personalized approach is recommended. Focus on gradual, sustainable changes rather than rapid weight loss. Regular physical activity, even just walking, can provide significant benefits regardless of weight change. Consider tracking not just weight but other measures of health like energy levels, sleep quality, and mood.";
    }
  };
  
  const generateHydrationTips = (data: Record<string, any> | null) => {
    if (!data) return "I need more information about your health profile to give personalized advice.";
    
    const activityInfo = data.activityInfo || {};
    const hydrationLevel = activityInfo.hydrationLevel || "unknown";
    
    if (hydrationLevel === "very_low") {
      return "Your hydration level is concerning. Increasing your fluid intake is a top priority for your health. Start by keeping a water bottle with you at all times and setting regular reminders to drink. Add slices of fruit to your water if you prefer flavored drinks. Track your intake using a water bottle with time markers or a mobile app. Aim to gradually increase to at least 8 cups (64 ounces) daily, more if you're physically active or in hot weather.";
    } else if (hydrationLevel === "low") {
      return "Your hydration could use improvement. Try drinking a full glass of water first thing in the morning and before each meal. Choose water instead of sugary drinks when possible. Eat more hydrating foods like watermelon, cucumber, and oranges. Notice how your energy levels, skin appearance, and digestion improve as you increase your water intake. Consider setting small goals, like adding one extra glass of water each day this week.";
    } else if (hydrationLevel === "moderate") {
      return "You're doing okay with hydration, but there's room for improvement. Continue your current habits and try adding one more glass of water per day. Keep water visible and accessible during your day. Consider using a marked water bottle to track your intake. Remember that needs increase during exercise, illness, and hot weather, so adjust accordingly.";
    } else if (hydrationLevel === "high" || hydrationLevel === "very_high") {
      return "You're doing well with hydration! Continue your excellent habits. Remember that hydration needs can change with activity level, weather, and health status. If your urine is consistently very clear and you're urinating frequently, you might actually be overhydrating, which can occasionally cause electrolyte imbalances. Adjust based on thirst, activity level, and urine color (pale yellow is ideal).";
    } else {
      return "Proper hydration is essential for optimal health. Aim for about 8 cups (64 ounces) of water daily, more if you're physically active or in hot weather. Your urine should be pale yellow - darker means you need more fluids, while completely clear might indicate overhydration. Remember that many fruits and vegetables also contribute to your hydration status, so a diet rich in produce helps maintain good hydration.";
    }
  };
  
  const generateMentalHealthTips = (data: Record<string, any> | null) => {
    if (!data) return "I need more information about your health profile to give personalized advice.";
    
    const lifestyleInfo = data.lifestyleInfo || {};
    const mentalHealth = lifestyleInfo.mentalHealth || "unknown";
    
    if (mentalHealth === "anxiety") {
      return "Living with anxiety can be challenging, but there are effective strategies that can help. Regular physical activity, particularly aerobic exercise, can significantly reduce anxiety symptoms. Mindfulness meditation and deep breathing exercises can help manage acute anxiety. Consider limiting caffeine and alcohol, as they can worsen symptoms for many people. Adequate sleep is crucial, as sleep deprivation can heighten anxiety. If anxiety interferes with daily functioning, speaking with a mental health professional can provide additional support and treatment options.";
    } else if (mentalHealth === "depression") {
      return "Depression requires proper care and attention. Regular physical activity has been shown to have significant antidepressant effects. Maintaining social connections, even when it feels difficult, is important. Structure and routine can help provide stability. Exposure to natural light, especially in the morning, may help regulate mood and sleep. Professional help through therapy, medication, or both can be very effective for treating depression. Remember that recovery isn't always linear, and self-compassion is important throughout the process.";
    } else if (mentalHealth === "Burnout") {
      return "Addressing burnout requires attention to boundaries and self-care. Identify which aspects of your life are contributing most to your exhaustion and see where you can make changes or set limits. Prioritize restorative activities like adequate sleep, physical movement, and time in nature. Consider which responsibilities you might delegate or eliminate. Reconnect with activities that bring you joy and meaning. If workplace factors are significant, consider speaking with your supervisor about possible accommodations or changes. Recovery from burnout takes time, so be patient with yourself.";
    } else if (mentalHealth === "other") {
      return "Taking care of your mental health is just as important as physical health. Regular physical activity, adequate sleep, social connection, and stress management techniques can all support your mental wellbeing. Consider incorporating mindfulness practices into your daily routine. Limit exposure to negative news and social media if you find it affecting your mood. If you're struggling, remember that seeking professional help is a sign of strength, not weakness.";
    } else {
      return "Maintaining good mental health is fundamental to overall wellbeing. Regular physical activity, social connection, adequate sleep, and stress management all contribute to mental resilience. Try to identify activities that bring you joy and meaning, and make time for them regularly. Practicing gratitude and mindfulness can help shift focus toward positive aspects of life. If you notice persistent changes in your mood, sleep, appetite, or energy levels, consider speaking with a healthcare provider.";
    }
  };
  
  const generateGeneralHealth = (data: Record<string, any> | null) => {
    if (!data) return "For optimal health, focus on the five pillars: nutrition (eat mostly whole foods), movement (stay active daily), recovery (prioritize sleep and rest), stress management (practice mindfulness or relaxation techniques), and connection (maintain meaningful relationships). Small improvements in these areas compound over time for significant health benefits.";
    
    // Extract some key data points to personalize the response
    const personalInfo = data.personalInfo || {};
    const healthInfo = data.healthInfo || {};
    const lifestyleInfo = data.lifestyleInfo || {};
    
    let areas = [];
    
    // Check for health areas that need improvement
    if (healthInfo.medicalCondition === "bad") {
      areas.push("regular medical check-ups");
    }
    
    if (lifestyleInfo.lifestyleHabits && lifestyleInfo.lifestyleHabits.includes("smoking")) {
      areas.push("smoking cessation");
    }
    
    if (lifestyleInfo.sleepPatterns === "insomnia") {
      areas.push("sleep quality");
    }
    
    const activityInfo = data.activityInfo || {};
    if (activityInfo.exerciseFrequency === "rarely" || activityInfo.exerciseFrequency === "never") {
      areas.push("regular physical activity");
    }
    
    const dietInfo = data.dietInfo || {};
    if (dietInfo.dietType === "processed" || dietInfo.dietType === "high_sugar") {
      areas.push("whole food nutrition");
    }
    
    let response = "Based on your profile, ";
    
    if (areas.length > 0) {
      response += `focusing on ${areas.join(", ")} could significantly improve your overall health and potentially extend your lifespan. `;
    } else {
      response += "you're already making many good health choices! To continue optimizing your wellbeing, consider fine-tuning your habits for even better results. ";
    }
    
    response += "Remember that consistent small improvements are more effective than short-term drastic changes. Building sustainable habits that you can maintain long-term is the key to lasting health.";
    
    return response;
  };

  // Custom suggestion chips based on user's health data
  const getPersonalizedSuggestions = () => {
    if (!selectedData) return [
      "How can I improve my health?",
      "What are some exercise tips?",
      "How can I sleep better?",
      "Tips for reducing stress"
    ];
    
    const suggestions = [];
    const activityInfo = selectedData.activityInfo || {};
    const lifestyleInfo = selectedData.lifestyleInfo || {};
    const dietInfo = selectedData.dietInfo || {};
    const healthInfo = selectedData.healthInfo || {};
    
    // Personalize suggestions based on data
    if (activityInfo.exerciseFrequency === "rarely" || activityInfo.exerciseFrequency === "never") {
      suggestions.push("How can I start exercising?");
    }
    
    if (lifestyleInfo.lifestyleHabits && lifestyleInfo.lifestyleHabits.includes("smoking")) {
      suggestions.push("Tips to quit smoking");
    }
    
    if (dietInfo.dietType === "processed" || dietInfo.dietType === "high_sugar") {
      suggestions.push("How can I improve my diet?");
    }
    
    if (lifestyleInfo.sleepPatterns === "insomnia" || lifestyleInfo.sleepPatterns === "other") {
      suggestions.push("How can I sleep better?");
    }
    
    if (selectedData.personalInfo && selectedData.personalInfo.bmi && parseFloat(selectedData.personalInfo.bmi) > 25) {
      suggestions.push("Weight management advice");
    }
    
    if (lifestyleInfo.mentalHealth === "anxiety" || lifestyleInfo.mentalHealth === "depression") {
      suggestions.push("Mental health tips");
    }
    
    // Add general questions if we don't have enough personalized ones
    if (suggestions.length < 3) {
      if (!suggestions.find(s => s.toLowerCase().includes("exercise"))) {
        suggestions.push("Exercise recommendations");
      }
      if (!suggestions.find(s => s.toLowerCase().includes("diet"))) {
        suggestions.push("Nutrition advice");
      }
      if (!suggestions.find(s => s.toLowerCase().includes("sleep"))) {
        suggestions.push("Sleep improvement tips");
      }
      if (!suggestions.find(s => s.toLowerCase().includes("stress"))) {
        suggestions.push("Stress management techniques");
      }
      if (!suggestions.find(s => s.toLowerCase().includes("lifespan"))) {
        suggestions.push("How can I live longer?");
      }
    }
    
    // Return up to 4 suggestions
    return suggestions.slice(0, 4);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    // Focus the textarea after setting the suggestion
    const textarea = document.getElementById("message-input") as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.focus();
    }
  };
  
  const renderChatIconByContent = (content: string) => {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes("exercise") || lowerContent.includes("workout") || lowerContent.includes("physical activity")) {
      return <Dumbbell className="h-4 w-4 text-emerald-500" />;
    } else if (lowerContent.includes("diet") || lowerContent.includes("eat") || lowerContent.includes("food") || lowerContent.includes("nutrition")) {
      return <Pizza className="h-4 w-4 text-amber-500" />;
    } else if (lowerContent.includes("sleep") || lowerContent.includes("rest")) {
      return <Moon className="h-4 w-4 text-indigo-500" />;
    } else if (lowerContent.includes("heart") || lowerContent.includes("blood pressure") || lowerContent.includes("cardiac")) {
      return <Heart className="h-4 w-4 text-rose-500" />;
    } else if (lowerContent.includes("active") || lowerContent.includes("steps") || lowerContent.includes("movement")) {
      return <Activity className="h-4 w-4 text-blue-500" />;
    } else {
      return <Brain className="h-4 w-4 text-primary" />;
    }
  };
  
  return (
    <Card className="shadow-lg border-primary/20 overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" /> 
          <span>AI Health Assistant</span>
          <Badge variant="outline" className="ml-2 bg-primary/10">
            <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
            <span className="text-xs">Personalized</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-[350px] overflow-y-auto flex flex-col space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`flex max-w-[80%] ${
                  message.type === 'user' 
                    ? 'bg-primary/90 text-primary-foreground rounded-t-2xl rounded-bl-2xl' 
                    : 'bg-muted rounded-t-2xl rounded-br-2xl'
                } p-3 shadow`}
              >
                <span className={`mr-2 mt-0.5 ${message.type === 'user' ? 'text-primary-foreground' : ''}`}>
                  {message.type === 'user' ? 
                    <User className="h-4 w-4" /> : 
                    renderChatIconByContent(message.content)
                  }
                </span>
                <div className="text-sm">
                  {index === messages.length - 1 && message.type === 'assistant' && isTyping
                    ? currentResponse
                    : message.content}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-muted rounded-2xl p-3 max-w-[80%]">
                <div className="flex space-x-2">
                  <span className="bg-primary/20 rounded-full h-2 w-2 animate-pulse"></span>
                  <span className="bg-primary/40 rounded-full h-2 w-2 animate-pulse delay-75"></span>
                  <span className="bg-primary/60 rounded-full h-2 w-2 animate-pulse delay-150"></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </CardContent>
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {getPersonalizedSuggestions().map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs bg-primary/5 border-primary/20"
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isLoading || isTyping}
              >
                <MessageSquare className="h-3 w-3 mr-1 text-primary" />
                {suggestion}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
      <CardFooter className="p-4 border-t">
        <div className="relative w-full flex space-x-2">
          <Textarea
            id="message-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask for health tips and advice..."
            className="resize-none pr-12 font-lato"
            maxLength={500}
            disabled={isLoading || isTyping}
          />
          <Button 
            className="absolute right-2 bottom-2 p-2 h-8 w-8 rounded-full" 
            size="sm"
            onClick={handleSendMessage}
            disabled={isLoading || isTyping || !input.trim()}
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
