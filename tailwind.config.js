/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    './index.html',
    './script.js'
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'text-3xl', 'font-extrabold', 'my-6', 'text-gray-900',
    'font-extrabold', 'text-xl',
    'mb-2', 'h-16', 'overflow-hidden',
    'gap-x-2', 'gap-y-1', 'text-base', 'text-gray-600',
    'px-1'
  ],
  plugins: [],
};