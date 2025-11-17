import React from "react";
import { spacing } from "../../styles/spacing";
import { colors } from "../../styles";
import {
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import { useChatbot } from "../../context/ChatbotContext";

const SidebarExpanded: React.FC = () => {
  const {
    conversations = [],
    newConversation,
    changeConversation,
  } = useChatbot();
  const { user } = useAuth();

  return (
    <div
      // Sidebar container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: colors.light,
      }}
    >
      <div //container for header and chat list
        style={{
          width: "12.5vw",
          display: "flex",
          flexDirection: "column",
          gap: spacing.sm, //px8
          marginTop: "calc(5vw + 8px)",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* -------------------- Header / New Chat -------------------- */}
        <div
          onClick={newConversation}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: spacing.xs,
            gap: spacing.sm,
            flexShrink: 0,
          }}
        >
          {/* Writing Icon */}
          <div
            style={{
              padding: spacing.xs, // 4px
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PencilSquareIcon
              style={{
                width: "30px",
                height: "30px",
                color: "black",
              }}
            />
          </div>
          <div
            style={{
              alignItems: "center",
            }}
          >
            {/* Text: New Chat */}
            <p>New chat</p>
          </div>
        </div>

        {/* -------------------- Chat / Conversation List -------------------- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            flex: 1,
          }}
        >
          {/* chat bubble icon */}
          <div style={{ padding: spacing.xs, display: "flex" }}>
            <div
              style={{
                alignItems: "center",
                padding: spacing.xs,
              }}
            >
              <ChatBubbleLeftRightIcon
                style={{
                  width: "30px",
                  height: "30px",
                  color: "black",
                }}
              />
            </div>
          </div>

          {/* chat list */}
          <div
            style={{
              padding: "0 0 0 8px",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
            }}
          >
            {conversations.map((conversation) => (
              <div
                key={conversation.conversation_id}
                onClick={() => changeConversation(conversation.conversation_id)}
                style={{
                  padding: spacing.xs,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {conversation.title ||
                    `conversation: ${conversation.conversation_id.substring(0, 8)}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------- Footer / Account -------------------- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",

          padding: spacing.lg, // 24px
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "12.5vw",
            display: "flex",
            gap: spacing.sm, // 8px
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              backgroundColor: "#EECD7080",
            }}
          />
          <div
            style={{
              alignItems: "center",
            }}
          >
            <p>{user?.username || "User Name"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarExpanded;
