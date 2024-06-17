/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            spacing: {
                '120': '480px',
            },
            animation: {
                wave1: 'wave1 0.6s infinite',
                wave2: 'wave2 0.6s infinite ease-in-out 0.1s',
                wave3: 'wave3 0.6s infinite ease-in-out 0.2s',
                wave4: 'wave4 0.6s infinite ease-in-out 0.3s',
                wave5: 'wave5 0.6s infinite ease-in-out 0.4s',
            },
            keyframes: {
                wave1: {
                    '0%, 100%': {transform: 'scaleY(1)'},
                    '50%': {transform: 'scaleY(2)'},
                },
                wave2: {
                    '0%, 100%': {transform: 'scaleY(1)'},
                    '50%': {transform: 'scaleY(1.5)'},
                },
                wave3: {
                    '0%, 100%': {transform: 'scaleY(1)'},
                    '50%': {transform: 'scaleY(1.75)'},
                },
                wave4: {
                    '0%, 100%': {transform: 'scaleY(1)'},
                    '50%': {transform: 'scaleY(1.25)'},
                },
                wave5: {
                    '0%, 100%': {transform: 'scaleY(1)'},
                    '50%': {transform: 'scaleY(1.85)'},
                },
            }
        },
    },
    plugins: [],
}