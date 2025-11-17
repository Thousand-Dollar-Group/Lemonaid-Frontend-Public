import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import * as Models from "../models/index";
//import { postBackground } from "../services/chatbotApi";

const BrowserContext = createContext<Models.BrowserContext>({
  records: [],
  background: "",
  addRecords: () => {},
  setBackground: () => {},
});

export const BrowserProvider = ({ children }: { children: ReactNode }) => {
  // We use a functional update for useState to ensure we get the latest value from localStorage.
  const [records, setRecords] = useState<Models.Record[]>(() => {
    try {
      const storedRecords = localStorage.getItem("records");
      return storedRecords ? JSON.parse(storedRecords) : [];
    } catch (e) {
      console.error("Failed to parse records from localStorage", e);
      return [];
    }
  });

  const [background, setBackground] = useState<string>(() => {
    return localStorage.getItem("background") || "";
  });

  const addRecords = (record: Models.Record) => {
    setRecords((prevRecords) => [...prevRecords, record]);
  };

  // // This useEffect saves the records state to localStorage whenever it changes.
  // useEffect(() => {
  //   localStorage.setItem("records", JSON.stringify(records));
  // }, [records]);

  // // This useEffect saves the background state to localStorage whenever it changes.
  // useEffect(() => {
  //   localStorage.setItem("background", background);
  // }, [background]);

  // // This useEffect handles the background processing.
  // // We define an async function inside and call it immediately.
  // useEffect(() => {
  //   const processBackground = async () => {
  //     if (records.length >= 20) {
  //       try {
  //         const res = await postBackground(records);
  //         setBackground(res);
  //         setRecords([]); // Clear records after processing
  //       } catch (error) {
  //         console.error("Failed to post background:", error);
  //       }
  //     }
  //   };
  //   processBackground();
  // }, [records, setBackground]);

  // The value provided to the context should contain all the state and functions that components will need.
  const value = {
    records,
    background,
    addRecords,
    setBackground,
  };

  return (
    <BrowserContext.Provider value={value}>{children}</BrowserContext.Provider>
  );
};

export const useBrowser = () => {
  const context = useContext(BrowserContext);
  if (context === undefined) {
    throw new Error("useBrowser must be used within a BrowserProvider");
  }
  return context;
};
