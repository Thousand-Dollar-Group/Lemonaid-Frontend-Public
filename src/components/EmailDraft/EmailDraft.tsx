import React, { useState, useEffect } from "react";
import "./EmailDraft.css";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { colors, spacing } from "../../styles";
import EmailToolbox from "./EmailToolbox/EmailToolbox";
import { useChatbot } from "../../context/ChatbotContext";
import type * as Models from "../../models/index";

const EmailDraft = () => {
  const { emailDraft, updateEmail, disableEmailDraft } = useChatbot();

  if (!emailDraft) return <></>;
  else {
    const [localDraft, setLocalDraft] = useState<Models.EmailDraft>(emailDraft);

    useEffect(() => {
      updateEmail(localDraft);
      setLocalDraft(emailDraft);
    }, [emailDraft]);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;

      setLocalDraft((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleClose = () => {
      updateEmail(localDraft);
      disableEmailDraft();
      console.log(`handle close ${localDraft}`);
    };

    return (
      <div
        style={{
          //width: "50vw",
          padding: spacing.md,
          backgroundColor: colors.background[80],
          display: "flex",
          flexDirection: "column",
          flex: "1",
        }}
      >
        <div className="email-fields">
          <div className="email-header">
            <label htmlFor="subject" />
            <input
              type="text"
              id="subject"
              name="subject"
              value={localDraft.subject}
              onChange={handleChange}
            />
            <div
              style={{ padding: spacing.xs, cursor: "pointer" }}
              onClick={() => handleClose()}
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
                <XMarkIcon style={{ width: "24px", height: "24px" }} />
              </div>
            </div>
          </div>
          <div className="field-row">
            <label htmlFor="to">To:</label>
            <input
              type="text"
              id="to"
              name="to"
              value={localDraft.to}
              onChange={handleChange}
            />
          </div>
          <div className="field-row">
            <label htmlFor="cc">Cc:</label>
            <input
              type="text"
              id="cc"
              name="cc"
              value={localDraft.cc}
              onChange={handleChange}
            />
          </div>
          <div className="field-row">
            <label htmlFor="bcc">Bcc:</label>
            <input
              type="text"
              id="bcc"
              name="bcc"
              value={localDraft.bcc}
              onChange={handleChange}
            />
          </div>
          <div className="email-body">
            <textarea
              name="body"
              value={localDraft.body}
              onChange={handleChange}
            />
          </div>
        </div>
        <EmailToolbox draftData={localDraft} />
      </div>
    );
  }
};

export default EmailDraft;
