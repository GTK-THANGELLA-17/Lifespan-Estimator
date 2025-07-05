
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Book, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function DisclaimerSection() {
  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-amber-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-amber-800 dark:text-amber-200">
              Important Disclaimer
            </h2>
          </div>
          <p className="text-xl text-amber-700 dark:text-amber-300">
            Please read and understand these important limitations before using our calculator
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Main Alert */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200 font-medium">
                This lifespan estimator provides general estimations based on statistical models and population data. 
                It is NOT intended as a precise prediction of any individual's actual lifespan or as medical advice.
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Detailed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="h-full border-amber-200 bg-white/70 dark:bg-gray-900/70 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <Book className="h-5 w-5" />
                    Educational Purpose Only
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-amber-700 dark:text-amber-300">
                  <ul className="space-y-2 text-sm">
                    <li>• Designed for educational and informational purposes</li>
                    <li>• Based on general population statistics</li>
                    <li>• Cannot account for all individual factors</li>
                    <li>• Should not replace professional medical consultation</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="h-full border-amber-200 bg-white/70 dark:bg-gray-900/70 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <Users className="h-5 w-5" />
                    Unpredictable Factors
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-amber-700 dark:text-amber-300">
                  <ul className="space-y-2 text-sm">
                    <li>• Medical advances and breakthrough treatments</li>
                    <li>• Unforeseen health conditions or accidents</li>
                    <li>• Lifestyle changes over time</li>
                    <li>• Environmental and societal changes</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/70 dark:bg-gray-900/70 rounded-xl p-6 border border-amber-200 dark:border-amber-800"
          >
            <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-4">
              Key Limitations to Consider:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-700 dark:text-amber-300">
              <div>
                <h4 className="font-medium mb-2">What We Can't Predict:</h4>
                <ul className="space-y-1">
                  <li>→ Future medical breakthroughs</li>
                  <li>→ Individual genetic variations</li>
                  <li>→ Rare or unknown conditions</li>
                  <li>→ Life-changing events</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">What You Should Do:</h4>
                <ul className="space-y-1">
                  <li>→ Consult healthcare professionals</li>
                  <li>→ Get regular medical check-ups</li>
                  <li>→ Focus on healthy lifestyle choices</li>
                  <li>→ Use results as general guidance only</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Final Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center p-6 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/40 rounded-xl"
          >
            <p className="text-amber-800 dark:text-amber-200 font-medium">
              By using this calculator, you acknowledge understanding these limitations and agree to use 
              the information responsibly as a general reference tool for health awareness only.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
