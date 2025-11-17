export const colors = {
  light: "#f8f8f8",
  primary: "#132d25",
  focus: "#eecd70",
  text: {
    100: "#000000",
    90: "#0d0d0d",
    80: "#1a1a1a",
    70: "#262626",
    60: "#333333",
    50: "#404040",
    40: "#4d4d4d",
    30: "#595959",
    20: "#737373",
    10: "#808080",
  },
  background: {
    100: "#ffffff",
    90: "#f2f2f2",
    80: "#e6e6e6",
    70: "#d9d9d9",
    60: "#cccccc",
    50: "#bfbfbf",
    40: "#b3b3b3",
    30: "#a6a6a6",
    20: "#999999",
    10: "#8c8c8c",
  },
};

export type ColorKey = keyof typeof colors;
export type TextColorKey = keyof typeof colors.text;
export type BackgroundColorKey = keyof typeof colors.background;
