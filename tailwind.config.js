/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.{html,md}"
  ],
  theme: {
    screens: {
      sm: '450px',
      md: '600px',
      lg: '800px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          50: '#eef0f6',
          100: '#d9dcee',
          200: '#b4b8dd',
          300: '#8e94cd',
          400: '#696fbc',
          500: '#434bab',
          600: '#1F1C4E',
          700: '#18153D',
          800: '#11102d',
          900: '#0a0a1e',
        },
        secondary: {
          50: '#eff0f7',
          100: '#dcdff0',
          200: '#b8bfe1',
          300: '#959fd2',
          400: '#717fc3',
          500: '#4e5fb4',
          600: '#2E3058',
          700: '#242646',
          800: '#1a1d35',
          900: '#111323',
        },
        // Button background token: rgba(66, 90, 214, 1) = #425AD6
        buttonPrimary: '#425AD6',
        buttonPrimaryHover: '#3d4d9e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
