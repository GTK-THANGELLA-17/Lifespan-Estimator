
import React, { useState, useEffect } from 'react';
import { ChatBotButton } from './ChatBotButton';
import { ChatBotWindow } from './ChatBotWindow';

interface ChatBotProps {
  isVisible: boolean;
  activeSection?: string;
}

export function ChatBot({ isVisible, activeSection }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Open chatbot when activeSection is 'chatbot'
  useEffect(() => {
    if (activeSection === 'chatbot') {
      setIsOpen(true);
    }
  }, [activeSection]);

  if (!isVisible) return null;

  return (
    <>
      <ChatBotButton 
        onClick={() => setIsOpen(true)} 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <ChatBotWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
