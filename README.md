# [React-Chat](https://pavel1uvarov-react-app.netlify.app)

This is open-source react-chat project build with everything new in React.

## Tech Stack

- **Library:** [React.js](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [Shadcn](https://ui.shadcn.com/)
- **Store:** [Zustand](https://github.com/pmndrs/zustand)
- **API Calls:** [Tanstack/React-query](https://tanstack.com/)
- **Testing:** [Jest](https://jestjs.io/docs/getting-started)
  and [React-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
- **Backend:** [Supabase](https://supabase.com/)

## Features to be implemented

- [x] Authentication with **Supabase**
- [x] Send message with **Supabase**
- [x] Getting message in live with **Supabase**
- [x] Store with **Zustand**
- [x] Unit tests with **Jest** and **React Testing Library**
- [x] Using TypeScript

## Running Locally

1. Clone the repository
    ```bash
    git clone https://github.com/Pavel1Uvarov/react-chat.git
     ```
2. Install dependencies using pnpm
     ```bash
    npm install
    ```
3. Copy the `.env.example` to `.env` and update the variables.
    ```bash
    cp .env.example .env
    ```
4. Start the development server
    ```bash
   npm run dev
   ```