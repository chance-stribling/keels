import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            boxShadow: {
                'text': '1px 1px 2px rgba(0, 0, 0, 0.8)',
              },
            // START_TOGGLE
            colors: {
                primary:'#D63484', //darker
                secondary: '#FF9BD2', //lighter
                accent: '#F8F4EC',
                background: '#402B3A',
                error: '#FF8A8A',
//                 error: '#FF4E4E',
              },
//             colors: {
//                 primary: '#2E8B57',
//                 secondary: '#98FB98',
//                 accent: '#F0FFF0',
//                 background: '#1C3B29',
//                 error: '#FF8A8A',
                  error: '#FF4E4E',
//               },
            // END_TOGGLE
            fontFamily: {
                sans: ['"Posten One"', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
