
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, Activity, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";

interface ResultChartsProps {
  showCharts?: boolean;
  selectedData: Record<string, any> | null;
  chartType?: 'pie' | 'area' | 'radar' | 'bar';
}

export function ResultCharts({ showCharts = true, selectedData, chartType = 'pie' }: ResultChartsProps) {
  if (!showCharts) return null;
  
  const [animateChart, setAnimateChart] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setAnimateChart(true), 100);
  }, []);
  
  // Generate projection data based on selectedData
  const generateProjectionData = () => {
    // Current age and estimated remaining years
    const personalInfo = selectedData?.personalInfo || {};
    const currentAge = personalInfo?.age ? parseInt(personalInfo.age) : 30;
    
    // Generate 12 data points for the projection
    return Array(12).fill(0).map((_, i) => {
      const projectedAge = currentAge + (i * 5);
      const healthScore = 65 + Math.sin(i / 2) * 15 + (Math.random() * 5);
      const wellnessScore = 70 + Math.cos(i / 3) * 10 + (Math.random() * 5);
      
      return {
        age: projectedAge,
        healthScore: Math.round(healthScore),
        wellnessScore: Math.round(wellnessScore),
      };
    });
  };
  
  // Generate pie chart data
  const generateFactorsData = () => {
    const lifestyleInfo = selectedData?.lifestyleInfo || {};
    const healthInfo = selectedData?.healthInfo || {};
    const activityInfo = selectedData?.activityInfo || {};
    
    // Start with base values
    let physical = 25;
    let diet = 20;
    let mental = 15;
    let sleep = 15;
    let environmental = 10;
    let social = 15;
    
    // Adjust based on user data if available
    if (activityInfo.exerciseFrequency === "daily") {
      physical = 35;
    } else if (activityInfo.exerciseFrequency === "never") {
      physical = 15;
    }
    
    if (healthInfo.medicalCondition === "bad") {
      physical -= 5;
      mental -= 5;
      sleep -= 5;
      diet += 15; // Diet becomes more important
    }
    
    if (lifestyleInfo.sleepPatterns === "insomnia") {
      sleep = 25; // Sleep becomes more critical
    }
    
    if (lifestyleInfo.environmentalFactors === "pollution") {
      environmental = 20; // Environment becomes more significant
    }
    
    if (lifestyleInfo.socialRelationships === "strong") {
      social = 20;
    } else if (lifestyleInfo.socialRelationships === "weak") {
      social = 10;
    }
    
    return [
      { name: "Physical Activity", value: physical, color: "#4ade80" },
      { name: "Diet", value: diet, color: "#fb923c" },
      { name: "Mental Health", value: mental, color: "#818cf8" },
      { name: "Sleep", value: sleep, color: "#60a5fa" },
      { name: "Environmental", value: environmental, color: "#a78bfa" },
      { name: "Social", value: social, color: "#f472b6" },
    ];
  };
  
  // Generate radar data
  const generateRadarData = () => {
    const lifestyleInfo = selectedData?.lifestyleInfo || {};
    const healthInfo = selectedData?.healthInfo || {};
    const activityInfo = selectedData?.activityInfo || {};
    const dietInfo = selectedData?.dietInfo || {};
    
    // Start with base values
    let physical = 70;
    let mental = 70;
    let diet = 70;
    let sleep = 70;
    let social = 70;
    let medical = 70;
    
    // Adjust based on user data if available
    if (activityInfo.exerciseFrequency === "daily") {
      physical = 90;
    } else if (activityInfo.exerciseFrequency === "weekly") {
      physical = 75;
    } else if (activityInfo.exerciseFrequency === "rarely") {
      physical = 50;
    } else if (activityInfo.exerciseFrequency === "never") {
      physical = 30;
    }
    
    if (lifestyleInfo.mentalHealth === "depression" || lifestyleInfo.mentalHealth === "anxiety") {
      mental = 50;
    } else if (lifestyleInfo.mentalHealth === "Burnout") {
      mental = 40;
    } else if (lifestyleInfo.mentalHealth === "none") {
      mental = 85;
    }
    
    if (dietInfo.dietType === "balanced" || dietInfo.dietType === "mediterranean") {
      diet = 90;
    } else if (dietInfo.dietType === "vegetarian" || dietInfo.dietType === "vegan") {
      diet = 85;
    } else if (dietInfo.dietType === "processed" || dietInfo.dietType === "high_sugar") {
      diet = 40;
    }
    
    if (lifestyleInfo.sleepPatterns === "insomnia") {
      sleep = 30;
    } else if (lifestyleInfo.sleepPatterns === "normal") {
      sleep = 85;
    }
    
    if (lifestyleInfo.socialRelationships === "strong") {
      social = 90;
    } else if (lifestyleInfo.socialRelationships === "moderate") {
      social = 70;
    } else if (lifestyleInfo.socialRelationships === "weak") {
      social = 40;
    }
    
    if (healthInfo.medicalCondition === "excellent") {
      medical = 90;
    } else if (healthInfo.medicalCondition === "good") {
      medical = 75;
    } else if (healthInfo.medicalCondition === "fair") {
      medical = 60;
    } else if (healthInfo.medicalCondition === "bad") {
      medical = 40;
    }
    
    return [
      {
        subject: 'Physical',
        value: physical,
        fullMark: 100,
      },
      {
        subject: 'Mental',
        value: mental,
        fullMark: 100,
      },
      {
        subject: 'Diet',
        value: diet,
        fullMark: 100,
      },
      {
        subject: 'Sleep',
        value: sleep,
        fullMark: 100,
      },
      {
        subject: 'Social',
        value: social,
        fullMark: 100,
      },
      {
        subject: 'Medical',
        value: medical,
        fullMark: 100,
      },
    ];
  };

  // Generate bar chart data for health comparison
  const generateBarData = () => {
    // We can use this to compare user's stats against averages
    const data = [
      { name: 'Physical', user: 65, average: 50 },
      { name: 'Diet', user: 72, average: 45 },
      { name: 'Sleep', user: 58, average: 60 },
      { name: 'Activity', user: 80, average: 40 },
      { name: 'Mental', user: 65, average: 55 },
      { name: 'Social', user: 70, average: 65 },
    ];

    // Modify based on user data if available
    if (selectedData) {
      const activityInfo = selectedData.activityInfo || {};
      if (activityInfo.exerciseFrequency === "daily") {
        data[3].user = 90;
      } else if (activityInfo.exerciseFrequency === "weekly") {
        data[3].user = 75;
      } else if (activityInfo.exerciseFrequency === "rarely") {
        data[3].user = 45;
      } else if (activityInfo.exerciseFrequency === "never") {
        data[3].user = 20;
      }

      const dietInfo = selectedData.dietInfo || {};
      if (dietInfo.dietType === "balanced" || dietInfo.dietType === "mediterranean") {
        data[1].user = 90;
      } else if (dietInfo.dietType === "processed" || dietInfo.dietType === "high_sugar") {
        data[1].user = 35;
      }
    }

    return data;
  };
  
  const projectionData = generateProjectionData();
  const factorsData = generateFactorsData();
  const radarData = generateRadarData();
  const barData = generateBarData();
  
  // Render different chart types based on chartType prop
  const renderChartContent = () => {
    switch (chartType) {
      case 'pie':
        return (
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-500" />
                Health Factors Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex flex-col sm:flex-row items-center justify-between">
                <div className="w-full sm:w-1/2 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={factorsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {factorsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Impact']}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: '1px solid #f1f1f1',
                          borderRadius: '4px',
                          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)'
                        }}
                      />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-1/2 space-y-4 mt-4 sm:mt-0">
                  {factorsData.map((factor, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <span 
                            className="inline-block w-3 h-3 mr-2 rounded-full" 
                            style={{ backgroundColor: factor.color }}
                          ></span>
                          {factor.name}
                        </span>
                        <span className="font-medium">{factor.value}%</span>
                      </div>
                      <motion.div 
                        className="h-2 rounded-full bg-muted overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      >
                        <motion.div 
                          className="h-full rounded-full" 
                          style={{ backgroundColor: factor.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${factor.value}%` }}
                          transition={{ delay: 0.5, duration: 1 }}
                        ></motion.div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'area':
        return (
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                Year by Year Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={projectionData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="wellnessGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" vertical={false} />
                    <XAxis
                      dataKey="age"
                      label={{ value: 'Age (years)', position: 'bottom', offset: 0 }}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      label={{ value: 'Score', angle: -90, position: 'insideLeft' }}
                      domain={[0, 100]}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}`, 'Score']}
                      labelFormatter={(label) => `Age: ${label}`}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid #f1f1f1',
                        borderRadius: '4px',
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="healthScore"
                      stackId="1"
                      stroke="#10b981"
                      fill="url(#healthGradient)"
                      name="Health Score"
                      animationDuration={animateChart ? 1500 : 0}
                      animationEasing="ease-out"
                    />
                    <Area
                      type="monotone"
                      dataKey="wellnessScore"
                      stackId="2"
                      stroke="#3b82f6"
                      fill="url(#wellnessGradient)"
                      name="Wellness Score"
                      animationDuration={animateChart ? 1500 : 0}
                      animationEasing="ease-out"
                    />
                    <Legend verticalAlign="top" height={36} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs">Health Score</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Wellness Score</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3 pt-4 border-t">
                <h4 className="text-sm font-medium">Key Insights</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <ArrowUp className="h-4 w-4 text-emerald-500" />
                    <span>Health score improves with better lifestyle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowDown className="h-4 w-4 text-rose-500" />
                    <span>Wellness decreases with poor habits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>Age impacts overall health metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-amber-500" />
                    <span>Regular activity maintains scores</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );
        
      case 'radar':
        return (
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Health Dimensions Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Health Score"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                      animationDuration={animateChart ? 1500 : 0}
                      animationEasing="ease-out"
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-sm">
                <p className="text-card-foreground">This radar chart shows your relative scores across key health dimensions. Higher values indicate better outcomes.</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'bar':
        return (
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-500" />
                Health Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="user" fill="#8884d8" name="Your Score" 
                      animationDuration={animateChart ? 1500 : 0}
                      animationEasing="ease-out" />
                    <Bar dataKey="average" fill="#82ca9d" name="Average Score" 
                      animationDuration={animateChart ? 1500 : 0}
                      animationEasing="ease-out" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm">
                <p className="text-card-foreground">This chart compares your health metrics against the general population average. Higher values indicate better outcomes.</p>
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <motion.div 
      className="space-y-8 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {renderChartContent()}
    </motion.div>
  );
}
