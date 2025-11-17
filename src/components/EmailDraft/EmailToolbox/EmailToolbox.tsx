import React from "react";
import { colors, spacing } from "../../../styles";

import EmailButton from "./EmailButton";
import GmailIcon from "../../../assets/gmail_icon_250825.svg";
import OutlookIcon from "../../../assets/outlook_icon_250825.svg";
import { EnvelopeIcon } from "@heroicons/react/16/solid";

const Lemonaid_signature =
  "\n\n---\nAid by Lemonaid – your AI buddy 🤖🍋\nwww.lemonsllc.com";

interface EmailToolboxProps {
  draftData: Record<string, string>;
}

const EmailToolbox: React.FC<EmailToolboxProps> = ({ draftData }) => {
  const buildMailto = () => {
    const { to, cc, bcc, subject, body } = draftData;
    const params = [];

    if (cc) params.push("cc=" + encodeURIComponent(cc));
    if (bcc) params.push("bcc=" + encodeURIComponent(bcc));
    if (subject) params.push("subject=" + encodeURIComponent(subject));
    if (body)
      params.push("body=" + encodeURIComponent(body + Lemonaid_signature));

    let url = "mailto:" + encodeURIComponent(to || "");
    if (params.length) url += "?" + params.join("&");

    window.open(url, "_blank");
  };

  const buildGmail = () => {
    const { to, cc, bcc, subject, body } = draftData;
    let url = "https://mail.google.com/mail/?view=cm&fs=1";

    if (to) url += "&to=" + encodeURIComponent(to);
    if (cc) url += "&cc=" + encodeURIComponent(cc);
    if (bcc) url += "&bcc=" + encodeURIComponent(bcc);
    if (subject) url += "&su=" + encodeURIComponent(subject);
    if (body) url += "&body=" + encodeURIComponent(body + Lemonaid_signature);

    window.open(url, "_blank");
  };

  // Function to build the Outlook URL
  const buildOutlook = () => {
    const { to, cc, bcc, subject, body } = draftData;
    const url = "https://outlook.office.com/mail/deeplink/compose?";
    const params = [];

    if (to) params.push("to=" + encodeURIComponent(to));
    if (cc) params.push("cc=" + encodeURIComponent(cc));
    if (bcc) params.push("bcc=" + encodeURIComponent(bcc));
    if (subject) params.push("subject=" + encodeURIComponent(subject));
    if (body)
      params.push("body=" + encodeURIComponent(body + Lemonaid_signature));

    window.open(url + params.join("&"), "_blank");
  };

  const emailMediums = [
    {
      name: "Default Mail App",
      icon: <EnvelopeIcon style={{ width: "24px", height: "24px" }} />,
      onClick: buildMailto,
    },
    {
      name: "Outlook",
      icon: <img src={OutlookIcon} style={{ width: "24px", height: "24px" }} />,
      onClick: buildOutlook,
    },
    {
      name: "Gmail",
      icon: <img src={GmailIcon} style={{ width: "24px", height: "24px" }} />,
      onClick: buildGmail,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: spacing.md,
      }}
    >
      <p style={{ color: colors.text[40] }}>Send through</p>
      <div
        style={{
          width: "1.5px",
          alignSelf: "stretch",
          backgroundColor: colors.text[40],
        }}
      />
      <div style={{ display: "flex", gap: spacing.xs }}>
        {emailMediums.map((emailMedium) => (
          <EmailButton
            key={emailMedium.name}
            title={emailMedium.name}
            onClick={emailMedium.onClick}
          >
            {emailMedium.icon}
          </EmailButton>
        ))}
      </div>
    </div>
  );
};

export default EmailToolbox;
