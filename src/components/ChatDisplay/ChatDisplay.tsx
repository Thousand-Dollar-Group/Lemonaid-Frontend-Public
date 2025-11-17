import React, { useRef, useEffect } from "react";
import RequestMessage from "./RequestMesssage";
import ResponseMessage from "./ResponseMessage";
import AttachmentMessage from "./AttachmentMessage";
import { spacing } from "../../styles";
import { useChatbot } from "../../context/ChatbotContext";
import Loading from "./Loading";

interface ChatDisplayProps {}

const ChatDisplay: React.FC<ChatDisplayProps> = () => {
  const { messages } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll whenever the messages array changes
    scrollToBottom();
  }, [messages]);
  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        whiteSpace: "nowrap",
        display: "flex",
        flexDirection: "column",
        gap: spacing.xl,
      }}
    >
      {messages.map((message) => {
        switch (message.type) {
          case "user":
            return <RequestMessage key={message.id} message={message} />;

          case "ai":
            return <ResponseMessage key={message.id} message={message} />;

          case "attachment":
            return (
              <AttachmentMessage key={message.id} fileInfo={message.fileInfo} />
            );
        }
      })}

      {<Loading />}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatDisplay;
