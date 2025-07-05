
export interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
}
