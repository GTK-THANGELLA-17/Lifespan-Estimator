
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Code, 
  GithubIcon, 
  BookOpen, 
  MessageSquare, 
  Twitter, 
  Mail, 
  Globe, 
  HeartPulse, 
  ExternalLink, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Youtube 
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface AppFooterProps {
  setShowDeveloperModal: (show: boolean) => void;
}

export function AppFooter({ setShowDeveloperModal }: AppFooterProps) {
  return (
    <footer className="mt-16 border-t pt-12 pb-8 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h4 className="font-bold text-xl mb-4">Lifespan Estimator</h4>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              A comprehensive tool that helps you estimate your potential lifespan based on various health and lifestyle factors, backed by scientific research and advanced algorithms.
            </p>
            <div className="flex space-x-3 mb-6">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <Twitter className="h-4 w-4 text-sky-500" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <Facebook className="h-4 w-4 text-blue-600" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <Instagram className="h-4 w-4 text-pink-500" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4 text-blue-700" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                <Youtube className="h-4 w-4 text-red-600" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Lifespan Estimator. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.who.int/health-topics" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="h-4 w-4 text-emerald-600 mr-2" />
                  Health Articles
                  <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.who.int/westernpacific/newsroom/feature-stories/item/10-health-tips-for-2025" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <HeartPulse className="h-4 w-4 text-red-500 mr-2" />
                  Wellness Tips
                  <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.healthdata.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="h-4 w-4 text-blue-500 mr-2" />
                  Global Health Data
                  <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cdc.gov/healthyweight/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="h-4 w-4 text-purple-500 mr-2" />
                  Weight Management
                  <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground flex items-center">
                  <MessageSquare className="h-4 w-4 text-amber-500 mr-2" />
                  FAQ
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground flex items-center">
                  <Mail className="h-4 w-4 text-blue-500 mr-2" />
                  Contact Us
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground flex items-center">
                  <BookOpen className="h-4 w-4 text-teal-500 mr-2" />
                  User Guide
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground flex items-center">
                  <MessageSquare className="h-4 w-4 text-violet-500 mr-2" />
                  Feedback
                </Button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">About Us</h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDeveloperModal(true)}
              className="text-xs hover:bg-primary hover:text-white transition-colors mb-3 w-full"
            >
              <Code className="h-3.5 w-3.5 mr-1 text-emerald-500" /> Meet the Developer
            </Button>
            
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Version:</span> 1.2.0
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Last Updated:</span> April 2025
              </p>
            </div>
            
            <Button variant="ghost" size="sm" className="mt-3 text-xs px-0">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <GithubIcon className="h-4 w-4 mr-1" />
                View Source Code
              </a>
            </Button>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-xs text-muted-foreground">
              This tool provides estimations based on statistical data and should not be considered medical advice.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
            <Link to="/sitemap" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
