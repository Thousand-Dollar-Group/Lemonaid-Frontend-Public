// ChatbotContext.tsx
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import * as Models from "../models/index";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";
import { postChatbot } from "../services/chatbotApi";
import {
  getFilesFromS3,
  uploadFilesToS3,
} from "../services/s3AttachmentService";
import {
  postConversation,
  getConversation,
  postMessages,
  postMessage,
  getMessages,
} from "../services/ConversationApi";

// Initialize the context with a default value that matches the defined type
const ChatbotContext = createContext<Models.ChatbotContext | undefined>(
  undefined
);

function formatDateToString(date: Date): string {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}`;
}

const ANONYMOUS_LOGINDATA_KEY = "messages";

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Models.Message[]>([]);
  const [emailDraft, setEmailDraft] = useState<Models.EmailDraft | null>(null);
  const [conversations, setConversations] = useState<Models.Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const { incrementMessageCount, checkMessageLimit, isAuthenticated } =
    useAuth(); // Access AuthContext to get message count and increment function
  const [hasSynced, setHasSynced] = useState(false);
  const [loginData, setLoginData] = useState<Models.ConversationMessage[]>(
    () => {
      try {
        const storedHistories = localStorage.getItem(ANONYMOUS_LOGINDATA_KEY);
        return storedHistories ? JSON.parse(storedHistories) : [];
      } catch (error) {
        console.error("Failed to load histories from localStorage", error);
        return [];
      }
    }
  );

  const enableEmailDraft = (currentMessage: Models.Message) => {
    const messageToDraft = messages.find(
      (message) => !!message.email && currentMessage.id === message.id
    );
    if (messageToDraft && messageToDraft.email) {
      setEmailDraft({
        message_id: messageToDraft.id,
        to: messageToDraft.email.to.join(", "),
        cc: messageToDraft.email.cc.join(", "),
        bcc: messageToDraft.email.bcc.join(", "),
        subject: messageToDraft.email.subject,
        body: messageToDraft.email.body,
      } as Models.EmailDraft);
    } else {
      setEmailDraft(null);
    }
  };

  const disableEmailDraft = () => {
    setEmailDraft(null);
  };

  const updateEmail = (email: Models.EmailDraft) => {
    const updatedMessages = messages.map((message) => {
      if (email.message_id === message.id) {
        return {
          ...message,
          email: {
            ...message.email,
            to: email.to.split(", "),
            cc: email.cc.split(", "),
            bcc: email.bcc.split(", "),
            subject: email.subject,
            body: email.body,
          },
        };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  const setLandingMessage = (message: Models.Message) => {
    setMessages([message]);
  };

  const addMessage = (newMessage: Models.Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (newMessage && newMessage.type === "ai" && newMessage.email) {
      setEmailDraft({
        message_id: newMessage.id,
        to: newMessage.email.to.join(", "),
        cc: newMessage.email.cc.join(", "),
        bcc: newMessage.email.bcc.join(", "),
        subject: newMessage.email.subject,
        body: newMessage.email.body,
      } as Models.EmailDraft);
    }
  };

  const [histories, setHistories] = useState<Models.History[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const sendMessage = async (
    background: string,
    inputValue: string,
    files?: File[]
  ) => {
    if (checkMessageLimit() && !isAuthenticated) {
      // console.log("Message limit reached");
      return;
    } //if isLimitedReached from AuthContext is true, do not send message
    incrementMessageCount(); // Increment message count in AuthContext
    if (!inputValue.trim() && (!files || files.length === 0)) return;

    void navigate("/chat");
    const formData = new FormData();
    const chatbotReqMetadata: Models.ChatbotReq = {
      background,
      query: inputValue,
      histories: histories,
    };
    formData.append("chatbotReq", JSON.stringify(chatbotReqMetadata));

    let attachments: Models.Attachment[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        formData.append("attachments", file);

        const url = URL.createObjectURL(file);
        const userMessage: Models.Message = {
          id: uuidv4(),
          content: file.name,
          type: "attachment",
          email: null,
          fileInfo: {
            name: file.name,
            type: file.type,
            size: file.size,
            url: url,
          },
        };

        const attachment: Models.Attachment = {
          s3_url: url,
          filename: file.name,
          file_type: file.type,
          created_at: new Date().toISOString(),
        };

        addMessage(userMessage);
        attachments.push(attachment);
      }
    }

    const userMessage: Models.Message = {
      id: uuidv4(),
      content: inputValue,
      type: "user",
      email: null,
    };
    //make sure will not send empty message
    if (inputValue && inputValue.trim().length > 0) {
      addMessage(userMessage);
    }

    setIsLoading(true);

    //new chat call conversatiion to get conversation ID
    let convIdToUse = currentConversationId;
    if (!convIdToUse && isAuthenticated) {
      try {
        const convResponse = await postConversation(inputValue);
        convIdToUse = convResponse.conversation_id;
        setCurrentConversationId(convIdToUse);
      } catch (error) {
        console.error("Failed to create conversation:", error);
        setIsLoading(false);
        return;
      }
    }

    let chatbotRes: Models.ChatbotRes | null = null;
    try {
      chatbotRes = await postChatbot(formData);

      if (chatbotRes.result.email) {
        chatbotRes.result.email.subject = `RFQ ${formatDateToString(new Date())}`;
      }
      let chatbotEmail: Models.EmailContent | null = null;

      const resString = chatbotRes.result.text || "";

      if (
        chatbotRes.result.email &&
        (chatbotRes.result.email.to.length ||
          chatbotRes.result.email.cc.length ||
          chatbotRes.result.email.bcc.length ||
          chatbotRes.result.email.subject != "" ||
          chatbotRes.result.email.body != "")
      ) {
        chatbotEmail = chatbotRes.result.email;
        chatbotEmail.subject = chatbotRes.result.email.subject;
      } else {
        chatbotRes.result.email = null;
      }

      const aiMessage: Models.Message = {
        id: uuidv4(),
        content: resString,
        type: "ai",
        email: chatbotEmail,
      };
      addMessage(aiMessage);

      if (convIdToUse && chatbotRes) {
        attachments = [];
        if (files && files.length > 0)
          attachments = await uploadFilesToS3(convIdToUse, files);
        await postConversationMessage(convIdToUse, chatbotRes, attachments);
      }

      const history: Models.History = {
        file_description: chatbotRes.file_description,
        query: chatbotRes.query,
        result: chatbotRes.result,
        resources: chatbotRes.resources,
        attachment: attachments,
      };

      const conversationMessage: Models.ConversationMessage = {
        file_description: chatbotRes.file_description,
        query: chatbotRes.query,
        result_text: chatbotRes.result.text,
        resources: chatbotRes.resources,
        email: JSON.stringify(chatbotRes.result.email),
        attachments: attachments,
      };

      setHistories((prev) => [...prev, history]);
      setLoginData((prev) => [...prev, conversationMessage]);
    } catch {
      const errorMessage: Models.Message = {
        id: uuidv4(),
        content: "Failed to fetch content from server",
        type: "ai",
        email: null,
      };
      addMessage(errorMessage);
    } finally {
      await fetchConversationList();
      setIsLoading(false);
    }
  };

  //send messages to conversation
  const postConversationMessage = async (
    convIdToUse: string,
    chatbotResponse: Models.ChatbotRes,
    attachments: Models.Attachment[]
  ) => {
    const apiMessage: Models.ConversationMessage = {
      query: chatbotResponse.query,
      file_description: chatbotResponse.file_description,
      resources: chatbotResponse.resources,
      result_text: chatbotResponse.result.text || "",
      email: JSON.stringify(chatbotResponse.result.email),
      attachments: attachments,
    };

    try {
      await postMessage(convIdToUse, apiMessage);
    } catch (error) {
      console.error("Failed to save user message to database:", error);
    }
  };

  //clear messages
  const clearMessages = () => {
    setMessages([]);
  };

  //get conversaiton list
  const fetchConversationList = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await getConversation();
      const list: Models.Conversation[] = response.conversations;
      if (Array.isArray(list)) {
        setConversations(list);
      } else {
        console.error("API response structure is incorrect, expected array.");
      }
    } catch (error) {
      console.error("Failed to fetch conversation list:", error);
    }
  }, [isAuthenticated]);

  //get conversationlist when user login and message exist
  const handleLoginDataSync = useCallback(async () => {
    if (!isAuthenticated) return;

    if (loginData.length > 0) {
      try {
        const firstQuery = loginData[0]?.query || "New Conversation";

        const newConv = await postConversation(firstQuery);
        const newConvId = newConv.conversation_id;

        const processAttachment = async (attachments: Models.Attachment[]) => {
          const files: File[] = [];

          for (const attachment of attachments) {
            if (attachment.s3_url == undefined) continue;
            const response = await fetch(attachment.s3_url);
            if (!response.ok) {
              throw new Error(
                `Failed to fetch Blob from URL: ${response.statusText}`
              );
            }
            const fileBlob: Blob = await response.blob();
            const fileName = "retrieved_file";
            const fileType = fileBlob.type;

            const file: File = new File([fileBlob], fileName, {
              type: fileType,
            });

            files.push(file);
          }

          const formatedAttachments = await uploadFilesToS3(newConvId, files);
          return formatedAttachments;
        };

        const apiMessages: Models.ConversationMessages = [];

        for (const history of loginData) {
          let attachments: Models.Attachment[] = [];

          if (history.attachments.length > 0) {
            attachments = await processAttachment(history.attachments);
          }

          const mesg: Models.ConversationMessage = {
            query: history.query,
            file_description: history.file_description,
            resources: history.resources,
            result_text: history.result_text || "",
            email: history.email,
            attachments: attachments,
          };

          apiMessages.push(mesg);
        }

        // const apiMessages: Models.ConversationMessages = loginData.map(
        //   (history) => ({
        //     query: history.query,
        //     file_description: history.file_description,
        //     resources: history.resources,
        //     result_text: history.result_text || "",
        //     email: history.email,
        //     attachments: await processAttachment,
        //   })
        // );
        const requestPayload: Models.PostMessageReq = {
          messages: apiMessages,
          count: apiMessages.length,
        };
        await postMessages(newConvId, requestPayload);
        localStorage.removeItem(ANONYMOUS_LOGINDATA_KEY);
        setLoginData([]);
      } catch (error) {
        console.error("Failed to migrate anonymous messages:", error);
      }
    }
    await fetchConversationList();
    clearMessages();
    // if (newConvId) {
    //   setCurrentConversationId(newConvId);
    // } else {
    //   clearMessages();
    // }
  }, [isAuthenticated, loginData, fetchConversationList, clearMessages]);

  // 1. The outer function MUST be async to use 'await'.
  async function processConversationMessages(
    backendMessages: Models.MessagesResponse[]
  ) {
    // 2. Use map to generate a Promise for each backendMsg in the original order.
    const messagePromises = backendMessages.map(
      async (backendMsg: Models.MessagesResponse) => {
        const currentMessageBatch: Models.Message[] = []; // Stores 1 or 2 messages per backendMsg

        console.log("backend mesg: ", backendMsg);
        // ----------------------------------------------------
        // 1. Handling Attachments (The ASYNC part)
        if (backendMsg.attachments && backendMsg.attachments.length > 0) {
          const files = backendMsg.attachments;

          // Use another map/Promise.all to fetch files in parallel but wait here
          const attachmentMessages = await Promise.all(
            files.map(async (file) => {
              const fileContent = await getFilesFromS3(file);
              const userMessage: Models.Message = {
                id: uuidv4(),
                content: file.filename,
                type: "attachment",
                email: null,
                fileInfo: {
                  name: fileContent.name,
                  type: fileContent.type,
                  size: fileContent.size,
                  url: URL.createObjectURL(fileContent),
                },
              };
              return userMessage;
            })
          );
          currentMessageBatch.push(...attachmentMessages);
        }
        // ----------------------------------------------------

        if (backendMsg.query && backendMsg.query.trim()) {
          const userMessage: Models.Message = {
            id: `${backendMsg.message_id}-user` || uuidv4(),
            content: backendMsg.query,
            type: "user" as const,
            email: null,
            fileInfo: backendMsg.file_description
              ? { name: backendMsg.file_description }
              : undefined,
          };
          currentMessageBatch.push(userMessage);
        }

        if (backendMsg.result_text && backendMsg.result_text.trim()) {
          let emailContent: Models.EmailContent | null = null;

          if (backendMsg.email) {
            try {
              const emailData: Models.EmailContent =
                typeof backendMsg.email === "string"
                  ? JSON.parse(backendMsg.email)
                  : backendMsg.email;

              if (
                emailData &&
                (emailData.to?.length > 0 ||
                  emailData.cc?.length > 0 ||
                  emailData.bcc?.length > 0 ||
                  emailData.subject ||
                  emailData.body)
              ) {
                emailContent = {
                  to: emailData.to || [],
                  cc: emailData.cc || [],
                  bcc: emailData.bcc || [],
                  subject: emailData.subject || "",
                  body: emailData.body || "",
                };
              }
            } catch (error) {
              console.warn("Failed to parse email data:", error);
            }
          }

          const aiMessage: Models.Message = {
            id: `${backendMsg.message_id}-ai` || uuidv4(),
            content: backendMsg.result_text,
            type: "ai" as const,
            email: emailContent,
          };
          currentMessageBatch.push(aiMessage);
        }

        // This return value is what Promise.all will resolve in order.
        return currentMessageBatch;
      }
    );

    // 3. Await all promises. The resulting array preserves the original order.
    const resolvedBatches = await Promise.all(messagePromises);

    // 4. Flatten the array of message batches into a single array.
    const frontendMessages = resolvedBatches.flat();

    return frontendMessages;
  }

  // change another conversation
  const changeConversation = async (newConversationId: string | null) => {
    if (!isAuthenticated) return;

    if (!newConversationId) {
      setCurrentConversationId(null);
      clearMessages();
      await fetchConversationList();
      return;
    }
    clearMessages();
    disableEmailDraft();
    try {
      const backendResponse = await getMessages(newConversationId);
      const backendMessages: Models.MessagesResponse[] =
        backendResponse.messages;

      void navigate("/chat");
      const frontendMessages: Models.Message[] =
        await processConversationMessages(backendMessages);
      setCurrentConversationId(newConversationId);
      setMessages(frontendMessages);
    } catch (error) {
      console.error(`Failed to load messages for ${newConversationId}:`, error);
      setCurrentConversationId(newConversationId);
      clearMessages();
    } finally {
      await fetchConversationList();
    }
  };

  //new chat
  const newConversation = () => {
    // console.log("new conversation");
    clearMessages();
    setCurrentConversationId(null);
    void navigate("/chat");
  };

  //get current ConversationId
  // const ensureConversationId = async (): Promise<string> => {
  //   if (currentConversationId) {
  //     return currentConversationId;
  //   }
  //   try {
  //     const convResponse = await postConversation();
  //     const newConvId = convResponse.conversationId;
  //     setCurrentConversationId(newConvId);
  //     return newConvId;
  //   } catch (error) {
  //     console.error("Failed to create conversation:", error);
  //     throw new Error("can not post conversation");
  //   }
  // };

  useEffect(() => {
    if (isAuthenticated && !hasSynced) {
      // console.log("TRIGGERING handleLoginDataSync on login success.");
      setHasSynced(true);
      void handleLoginDataSync();
    }
    if (!isAuthenticated && hasSynced) {
      setHasSynced(false);
    }
  }, [isAuthenticated, hasSynced, handleLoginDataSync]);

  useEffect(() => {
    fetchConversationList();
  }, [fetchConversationList]);

  useEffect(() => {
    if (!isAuthenticated) {
      try {
        localStorage.setItem(
          ANONYMOUS_LOGINDATA_KEY,
          JSON.stringify(loginData)
        );
      } catch (error) {
        console.error("Failed to save histories to localStorage", error);
      }
    }
  }, [loginData, isAuthenticated]);

  const value = {
    messages,
    conversations,
    setMessages,
    setLandingMessage,
    addMessage,
    updateEmail,
    emailDraft,
    setEmailDraft,
    enableEmailDraft,
    disableEmailDraft,
    sendMessage,
    isLoading,
    currentConversationId,
    setCurrentConversationId,
    clearMessages,
    handleLoginDataSync,
    fetchConversationList,
    changeConversation,
    newConversation,
  };

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};
