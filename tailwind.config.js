/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#FF5A5F', // Coral-red (primary) - red-500
        'primary-50': '#FFF5F5', // Very light coral - red-50
        'primary-100': '#FFE5E6', // Light coral - red-100
        'primary-200': '#FFCCCE', // Medium light coral - red-200
        'primary-500': '#FF5A5F', // Base coral-red - red-500
        'primary-600': '#E5515A', // Darker coral - red-600
        'primary-700': '#CC484F', // Dark coral - red-700
        'primary-800': '#B23F44', // Very dark coral - red-800

        // Secondary Colors
        'secondary': '#00A699', // Teal (secondary) - teal-600
        'secondary-50': '#F0FDFA', // Very light teal - teal-50
        'secondary-100': '#CCFBF1', // Light teal - teal-100
        'secondary-200': '#99F6E4', // Medium light teal - teal-200
        'secondary-500': '#14B8A6', // Medium teal - teal-500
        'secondary-600': '#00A699', // Base teal - teal-600
        'secondary-700': '#0D9488', // Dark teal - teal-700
        'secondary-800': '#0F766E', // Very dark teal - teal-800

        // Accent Colors
        'accent': '#FC642D', // Vibrant orange (accent) - orange-600
        'accent-50': '#FFF7ED', // Very light orange - orange-50
        'accent-100': '#FFEDD5', // Light orange - orange-100
        'accent-200': '#FED7AA', // Medium light orange - orange-200
        'accent-500': '#F97316', // Medium orange - orange-500
        'accent-600': '#FC642D', // Base vibrant orange - orange-600
        'accent-700': '#C2410C', // Dark orange - orange-700
        'accent-800': '#9A3412', // Very dark orange - orange-800

        // Background Colors
        'background': '#FFFFFF', // Pure white (background) - white
        'surface': '#F7F7F7', // Subtle warm gray (surface) - gray-100
        'surface-50': '#FAFAFA', // Very light surface - gray-50
        'surface-100': '#F7F7F7', // Light surface - gray-100
        'surface-200': '#E5E5E5', // Medium surface - gray-200
        'surface-300': '#D4D4D4', // Darker surface - gray-300

        // Text Colors
        'text-primary': '#222222', // Near-black (text primary) - gray-900
        'text-secondary': '#717171', // Medium gray (text secondary) - gray-500
        'text-tertiary': '#A3A3A3', // Light gray (text tertiary) - gray-400
        'text-inverse': '#FFFFFF', // White text for dark backgrounds - white

        // Status Colors
        'success': '#008A05', // Forest green (success) - green-700
        'success-50': '#F0FDF4', // Very light green - green-50
        'success-100': '#DCFCE7', // Light green - green-100
        'success-500': '#22C55E', // Medium green - green-500
        'success-700': '#008A05', // Base forest green - green-700

        'warning': '#FFB400', // Amber (warning) - yellow-500
        'warning-50': '#FEFCE8', // Very light yellow - yellow-50
        'warning-100': '#FEF3C7', // Light yellow - yellow-100
        'warning-500': '#FFB400', // Base amber - yellow-500
        'warning-600': '#D97706', // Dark amber - yellow-600

        'error': '#D93025', // Clear red (error) - red-600
        'error-50': '#FEF2F2', // Very light red - red-50
        'error-100': '#FEE2E2', // Light red - red-100
        'error-500': '#EF4444', // Medium red - red-500
        'error-600': '#D93025', // Base clear red - red-600

        // Border Colors
        'border': '#E8E8E8', // Minimal border - gray-200
        'border-light': '#F3F4F6', // Light border - gray-100
        'border-dark': '#D1D5DB', // Dark border - gray-300
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'], // Modern geometric sans-serif - headings
        'body': ['Inter', 'sans-serif'], // Optimized for digital interfaces - body text
        'caption': ['Source Sans Pro', 'sans-serif'], // Clean neutral typeface - captions
        'mono': ['JetBrains Mono', 'monospace'], // Monospace font - data/prices
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle card elevation
        'modal': '0 4px 16px rgba(0, 0, 0, 0.12)', // Modal elevation
        'elevation': '0 2px 8px rgba(0, 0, 0, 0.1)', // Interactive elevation
        'elevation-hover': '0 4px 16px rgba(0, 0, 0, 0.12)', // Hover elevation
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)', // Contemporary smooth timing
      },
      transitionDuration: {
        '150': '150ms', // Fast interactions
        '200': '200ms', // Normal interactions
        '300': '300ms', // Slow interactions
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      zIndex: {
        'header': '100',
        'dropdown': '200',
        'sidebar': '300',
        'modal': '400',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}