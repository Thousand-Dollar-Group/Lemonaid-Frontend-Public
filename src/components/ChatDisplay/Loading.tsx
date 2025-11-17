import { spacing, colors } from "../../styles";
import { useChatbot } from "../../context/ChatbotContext";

// This is the Loading component, a simple bouncing dots animation.
const Loading = () => {
  const { isLoading } = useChatbot();
  return (
    isLoading && (
      <div style={{ display: "flex", gap: spacing.sm }}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: colors.focus,
              borderRadius: "50%",
              animation: `bounce 0.6s infinite ease-in-out`,
              animationDelay: `${index * 0.15}s`,
            }}
          />
        ))}

        <style>
          {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
        `}
        </style>
      </div>
    )
  );
};

export default Loading;
