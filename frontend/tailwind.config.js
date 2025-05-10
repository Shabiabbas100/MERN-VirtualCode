export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'above-850': '850px',
      },
      animation: {
        pulseSlow: 'pulseSlow 3s ease-in-out infinite',
        textGlow: 'textGlow 1.5s ease-in-out infinite',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.2)', opacity: 0.6 },
        },
        textGlow: {
          '0%, 100%': {
            textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          },
          '50%': {
            textShadow: '0 0 20px rgba(255, 255, 255, 1)',
          },
        },
        glowPulse: {
          '0%, 100%': {
            textShadow: '0 0 0px rgba(255, 255, 255, 0)',
            transform: 'scale(1)',
          },
          '50%': {
            textShadow: '0 0 20px rgba(255, 255, 255, 0.9)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
  plugins: [],
}
