export const colorfullScroll = `
    /* Chrome, Edge, Safari */
    div::-webkit-scrollbar {
      height: 8px; /* horizontal scrollbar height */
    }
    div::-webkit-scrollbar-track {
      background: #8b5cf6; /* purple track */
    }
    div::-webkit-scrollbar-thumb {
      background: linear-gradient(to right, #ec4899, #8b5cf6); /* pink → purple */
      border-radius: 8px;
    }
    div::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to right, #f472b6, #a78bfa); /* brighter hover effect */
    }
  `