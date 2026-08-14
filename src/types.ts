export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  sources?: { title: string; score: number; id: string }[];
  confidence?: number;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'API' | 'Policies' | 'Troubleshooting' | 'Integrations' | 'Security';
  updatedAt: string;
  chunkCount: number;
  content: string;
  tags: string[];
}

export interface ConversationTicket {
  id: string;
  customerName: string;
  customerAvatar?: string;
  channel: 'Web' | 'Slack' | 'WhatsApp' | 'Email' | 'API';
  status: 'Open' | 'Pending AI' | 'Resolved' | 'Escalated';
  sentiment: 'positive' | 'neutral' | 'negative' | 'frustrated';
  sentimentScore: number;
  lastMessage: string;
  timestamp: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedAgent: string;
  messages: {
    sender: 'customer' | 'bot' | 'agent';
    text: string;
    time: string;
  }[];
}

export type ActiveModalType = 
  | null 
  | 'chatbot' 
  | 'knowledge' 
  | 'conversations' 
  | 'architecture' 
  | 'contact';
