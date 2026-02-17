export default {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/styles/**/*.css",
  ],
  theme: {
    extend: {
      // Custom brand colors defined for the Film Finder identity
      colors: {
        "midnight-blue": "#00004d", // Deep dark blue for the main background
        "midnight-light": "#1a1a5f",  // Slightly lighter shade for cards/inputs
      }
    },
  },
  plugins: [],
};
