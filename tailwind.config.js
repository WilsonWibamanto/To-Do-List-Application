module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.gray.300", "currentColor"),
        lightGreen: "#41b883",
        primary: "var(--bg-primary)",
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.gray.300", "currentColor"),
        lightGreen: "#41b883",
      }),
      textColor: (theme) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.gray.300", "currentColor"),
        lightGreen: "#41b883",
        primary: "var(--text-primary)",
      }),
      placeholderColor: (theme) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.gray.300", "currentColor"),
        lightGreen: "#41b883",
        primary: "var(--placeholder-primary)",
      }),
    },
  },
  variants: {
    extend: {
      padding: ["hover"],
      borderColor: ["hover"],
    },
  },
  plugins: [],
};
