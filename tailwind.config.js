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
            colors: {
                primary:'#C8D6CD', //lighter
                secondary: '#7FA16D', //darker
                accent: '#3E5D49',
                background: '#FAF1E6',
                error: '#774E31',
              },
            fontFamily: {
                sans: ['"Posten One"', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
