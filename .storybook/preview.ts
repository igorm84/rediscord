import type { Preview } from '@storybook/react'
import 'tailwindcss/tailwind.css';
import '../src/app/globals.css';
import "swiper/css"
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;