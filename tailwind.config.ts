
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {  
      boxShadow: {
        
        'ps': 'rgba(255, 255, 255, 0.199) -8px 8px, rgba(255, 255, 255, 0.19) -16px 16px',
     
        },
      
      },
    },
  plugins: [],
};
export default config;
