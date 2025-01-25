import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#f5f5f5',    // dull white/gray
                    medium: '#1a1a1a',
                    dark: '#0a0a0a',
                },
                dark: '#171717',    // neutral-900
                medium: '#262626',   // neutral-800
                light: '#404040'     // neutral-700
            }
        }
    },
    plugins: [
        forms,
        typography,
        require('flowbite/plugin')
    ]
} satisfies Config;
