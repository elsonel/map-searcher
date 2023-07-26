
# Map Application - Vue.js

This is a Map application built in Vue.js that allows users to search and record locations using the Google Maps API.

## Technologies Used

- Vite - Frontend build tool
- Vue - Frontend framework
- PrimeVue - Third-party component library
- Storybook - Component unit testing and documentation

## Installation Process

1. Install all package dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory and add the following line with your Google Maps API key:

```env
VITE_GOOGLE_MAPS_API_KEY = 'YOUR API KEY HERE'
```

3. Launch the development server:

```bash
npm run dev
```

## Testing Components with Storybook

To test individual components on Storybook, run the following command:

```bash
npm run storybook dev -p 6007
```
