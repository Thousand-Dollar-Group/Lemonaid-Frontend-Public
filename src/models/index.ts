export type MessageType = "user" | "ai" | "attachment";

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  email: EmailContent | null;
  fileInfo?: {
    name: string;
    type?: string;
    size?: number;
    url?: string;
  };
}

export interface Attachment {
  attachment_id?: string;
  s3_url?: string;
  filename: string;
  file_type: string;
  created_at: string;
}

export interface ChatbotReq {
  background: string;
  query: string;
  histories: History[];
}

export interface ChatbotRes {
  query: string;
  file_description: string;
  resources: string[];
  result: ChatResult;
}

export interface ChatResult {
  text: string;
  email: EmailContent | null;
}

export interface EmailContent {
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
}

export interface History {
  query: string;
  file_description: string;
  resources: string[];
  result: ChatResult;
  attachment: Attachment[];
}

export interface Record {
  query: string;
  result: string;
}

export type ChatbotContext = {
  messages: Message[];
  conversations: Conversation[];
  setLandingMessage: (message: Message) => void;
  addMessage: (newMessage: Message) => void;
  updateEmail: (email: EmailDraft) => void;
  emailDraft: EmailDraft | null;
  setEmailDraft: React.Dispatch<React.SetStateAction<EmailDraft | null>>;
  enableEmailDraft: (message: Message) => void;
  disableEmailDraft: () => void;
  sendMessage: (
    background: string,
    inputValue: string,
    files?: File[]
  ) => Promise<void>;
  isLoading: boolean;
  currentConversationId: string | null;
  setCurrentConversationId: React.Dispatch<React.SetStateAction<string | null>>;
  clearMessages: () => void;
  handleLoginDataSync: () => void;
  fetchConversationList: () => void;
  changeConversation: (newConversationId: string | null) => void;
  //migrateAnonymousMessages: (newConversationId: string | null) => void;
  newConversation: () => void;
};

export type EmailDraft = {
  message_id: string;
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  body: string;
};

export type BrowserContext = {
  records: Record[];
  background: string;
  addRecords: (record: Record) => void;
  setBackground: React.Dispatch<React.SetStateAction<string>>;
};

export interface UserInfo {
  user_id: string;
  username: string;
  email: string;
  // userImg: string | null;
}

export interface Conversation {
  conversation_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationMessage {
  query: string;
  file_description: string;
  resources: string[];
  result_text: string;
  email: string | null;
  attachments: Attachment[];
}

export type ConversationMessages = ConversationMessage[];

export interface PostConversationResponse extends Conversation {
  userId: string;
}

export type GetConversationsResponse = {
  conversations: Conversation[];
  count: number;
};
//updated_at

export interface PostMessageReq {
  messages: ConversationMessages;
  count: number;
}

export interface PostMessagesResponse extends Message {
  conversation_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface MessagesResponse {
  message_id: string;
  conversation_id: string;
  query: string;
  file_description: string;
  resources: string;
  result_text: string;
  email: string;
  attachments: Attachment[];
  created_at: string;
  updated_at: string;
}

export type GetMessagesResponse = {
  messages: MessagesResponse[];
  count: number;
};

export interface PostAttachmentURLType {
  file_size: number | undefined;
  file_type: string | undefined;
  filename: string;
}

export interface PostAttachmentsURLReq {
  files: PostAttachmentURLType[];
}

export interface AttachmentS3Info {
  filename: string;
  upload_url: string;
  s3_key: string;
}

export interface PostAttachmentsURLRes {
  files: AttachmentS3Info[];
}
