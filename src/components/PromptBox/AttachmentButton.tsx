import React, { useState, useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { colors, spacing } from "../../styles";

interface AttachmentButtonProps {
  onFileSelect: (files: File[]) => void;
}

const AttachmentButton: React.FC<AttachmentButtonProps> = ({
  onFileSelect,
}) => {
  const [isHover, setHover] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(Array.from(files));
      e.target.value = ""; // ← 關鍵：清空 input value，避免選同檔案無法觸發 change
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        padding: spacing.xs,
        borderRadius: "50%",
        backgroundColor: isHover ? colors.light : "transparent",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PlusIcon
          style={{ width: "24px", height: "24px", color: colors.text[100] }}
        />
      </div>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.docx,.doc
        ,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        ,application/vnd.ms-excel
        ,application/vnd.openxmlformats-officedocument.wordprocessingml.document
        ,application/msword"
        multiple
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default AttachmentButton;
