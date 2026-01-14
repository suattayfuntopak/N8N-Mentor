
export interface MessagePart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  parts: MessagePart[];
  timestamp: number;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  base64: string;
  isImage: boolean;
}

export interface AppState {
  messages: ChatMessage[];
  isTyping: boolean;
  selectedAttachments: Attachment[];
}
