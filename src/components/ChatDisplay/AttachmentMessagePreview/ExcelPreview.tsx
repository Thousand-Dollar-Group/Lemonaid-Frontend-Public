import React, { useState, useEffect } from "react";
import { spacing } from "../../../styles";
import * as XLSX from "xlsx";
import styled from "styled-components"; //Container styles library
import { DocumentChartBarIcon } from "@heroicons/react/24/outline";

interface ExcelPreviewProps {
  url: string;
  maxSize: string;
  fileName: string;
}

const StyledTableContainer = styled.div<ExcelPreviewProps>`
  /* Container styles */
  max-width: ${(props) => `calc(${props.maxSize} - 48px)`};
  max-height: ${(props) => `calc(${props.maxSize} - 86px)`};
  overflow: auto;
  border: 1px solid #ccc;
  padding: 5px;
  background-color: white;

  /* gridlines */
  & table {
    /* Ensure the table fills the container and collapses double borders */
    width: 100%;
    border-collapse: collapse;
  }

  & td,
  & th {
    border: 1px solid #e0e0e0; /* Gridline color */
    padding: 6px;
    font-size: 13px;
    text-align: left;
  }

  /* Odd/Even row background color */
  & tr:nth-child(even) {
    background-color: #f8f8f8;
  }

  /* table header styles */
  & th {
    background-color: #f0f0f0;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 10;
  }
`;

const ExcelPreview: React.FC<ExcelPreviewProps> = ({
  url,
  maxSize,
  fileName,
}) => {
  const [htmlTable, setHtmlTable] = useState<string>("loading...");

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch Excel file");
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const html = XLSX.utils.sheet_to_html(worksheet, {
        id: "excel-preview-table",
      });
      // console.log(html);
      setHtmlTable(html);
    } catch (error) {
      console.error("Error processing Excel file:", error);
      setHtmlTable("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: spacing.xs,
      }}
    >
      <StyledTableContainer
        maxSize={maxSize}
        url={url}
        fileName={fileName}
        dangerouslySetInnerHTML={{ __html: htmlTable }}
      />
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          flexDirection: "row",
          padding: `${spacing.xs} ${spacing.sm} ${spacing.xs} ${spacing.xs}`,
        }}
      >
        <div
          style={{
            padding: spacing.xs,
            backgroundColor: "#009D51",
            borderRadius: "4px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DocumentChartBarIcon
            style={{ width: "30px", height: "30px" }}
            stroke="#FFFFFF"
          />
        </div>
        <p
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: 0,
          }}
        >
          {fileName}
        </p>
      </div>
    </div>
  );
};

export default ExcelPreview;
