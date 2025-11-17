import ChatDisplay from "../components/ChatDisplay/ChatDisplay";
import PromptBox from "../components/PromptBox/PromptBox";
import EmailDraft from "../components/EmailDraft/EmailDraft";
import { colors, spacing } from "../styles";
import { useChatbot } from "../context/ChatbotContext";
import LimitModel from "../components/LimitModel";
import { useAuth } from "../context/AuthContext";

const ChatLayout = () => {
  const { emailDraft } = useChatbot();
  const { isLimitReached } = useAuth();

  return (
    <div
      style={{
        height: "calc(100vh - 5vw)",
        justifyContent: emailDraft ? "flex-start" : "center",
        flex: 1,
        backgroundColor: colors.background[100],
        display: "flex",
        flexDirection: "row",
        marginLeft: emailDraft ? "calc(46px + 48px)" : 0,
      }}
    >
      <div
        style={{
          width: "50vw",
          paddingTop: spacing.md,
          paddingBottom: spacing.md,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "45vw",
            flex: 1,
            overflow: "hidden",
          }}
        >
          <ChatDisplay />
        </div>

        <PromptBox key={location.pathname} />
      </div>
      {emailDraft && <EmailDraft />}
      {isLimitReached && (
        <>
          <div //Backdrop div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.75)", //backdrop color
              zIndex: 999,
            }}
          />
          <LimitModel />
        </>
      )}
    </div>
  );
};

export default ChatLayout;
