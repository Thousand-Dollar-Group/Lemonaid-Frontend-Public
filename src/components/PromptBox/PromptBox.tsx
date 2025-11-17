import React, { useState, useRef, useEffect } from "react";
import SubmitButton from "./SubmitButton";
import AttachmentButton from "./AttachmentButton";
import AttachmentPreview from "./AttachmentPreview/AttachmentPreview";
import { useChatbot } from "../../context/ChatbotContext";
import { useBrowser } from "../../context/BrowserContext";

const MAX_FILES = 5;

const PromptBox: React.FC = () => {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useChatbot();
  const { background } = useBrowser();
  const [isImeActive, setIsImeActive] = useState(false);
  const compositionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (compositionTimer.current) {
        clearTimeout(compositionTimer.current);
      }
    };
  }, []);

  const handleCompositionStart = () => {
    if (compositionTimer.current) {
      clearTimeout(compositionTimer.current);
    }
    setIsImeActive(true);
  };

  const handleCompositionEnd = () => {
    // Set a short delay (e.g., 50ms) to ensure the IME is truly finished
    compositionTimer.current = setTimeout(() => {
      setIsImeActive(false);
    }, 50);
  };

  const handleFiles = (newFiles: File[]) => {
    const allFiles = [...files, ...newFiles];
    const uniqueFiles = Array.from(new Set(allFiles.map((f) => f.name))).map(
      (name) => allFiles.find((f) => f.name === name)!
    );

    if (uniqueFiles.length > MAX_FILES) {
      alert(`Upload at most ${MAX_FILES} documents at once.`);
      setFiles(uniqueFiles.slice(0, MAX_FILES));
    } else {
      setFiles(uniqueFiles);
    }
  };

  const removeFile = (nameToRemove: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== nameToRemove));
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(
        Math.max(textareaRef.current.scrollHeight, 24),
        8 * 24
      );
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message, files]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed || files.length > 0) {
      void sendMessage(background, message, files);
    }
    setMessage("");
    setFiles([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleDivClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "45vw",
          height: "auto",
          padding: "24px",
          borderRadius: "24px",
          backgroundColor: "#cccccc",
          boxSizing: "border-box",
          cursor: "text",
        }}
        onClick={handleDivClick}
      >
        {files.length > 0 && (
          <AttachmentPreview files={files} onRemoveFile={removeFile} />
        )}

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // 2. UNIVERSAL FIX FOR IME BUG: Check your state variable
              if (isImeActive) {
                // Prevent the Enter from sending while composing (works in all browsers)
                e.preventDefault();
                return;
              }

              // 3. STANDARD SEND LOGIC
              // If composition is finished AND Shift is NOT pressed, send the message.
              if (!e.shiftKey) {
                e.preventDefault();
                void handleSend();
              }
            }
          }}
          style={{
            lineHeight: "24px",
            boxSizing: "border-box",
            overflowY: "auto",
          }}
          rows={1}
          placeholder="What do you want to know?"
        />

        <div style={{ display: "flex" }}>
          <div>
            <AttachmentButton onFileSelect={handleFiles} />
          </div>
          <div style={{ marginLeft: "auto" }}>
            <SubmitButton onClick={() => void handleSend()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptBox;
