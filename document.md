# Project Folder Structure Explanation

This document outlines the purpose of the main directories within this project.

## Root Directory (`/`)

This is the top-level directory of the entire project, containing both the frontend and backend applications, along with global configuration files.

## `backend/`

This directory contains all the code and configuration for the backend application. As per your request, this directory is ignored by Git (via `.gitignore`) and is intended for deployment to a separate cloud provider.

## `frontend/`

This directory contains all the code and assets for the static frontend application. This part of the application is intended to be deployed to GitHub and then to Azure Static Web Apps.

### `frontend/public/`

This folder is used by Next.js (the framework likely used for the frontend, given `next.config.js` and other files) to serve static assets like images, fonts, and other files directly. Content placed here is accessible at the root of the deployed site (e.g., `public/assets/plura-logo.svg` would be `/assets/plura-logo.svg`).

### `frontend/src/`

This is the primary source code directory for the frontend application. It typically contains:
*   **`app/`**: In Next.js, this is where route-based components and layouts reside. Each subfolder often corresponds to a route (e.g., `app/quiz/page.tsx` for the `/quiz` route).
*   **`components/`**: Reusable UI components used throughout the application (e.g., `Leaderboard.tsx`, `Quiz.tsx`, `ui/` for Shadcn UI components).
*   **`contexts/`**: React Context API providers for global state management (e.g., `AuthContext.tsx`).
*   **`data/`**: Static data or mock data used by the application (e.g., `quiz-data.ts`).
*   **`hooks/`**: Custom React hooks for encapsulating reusable logic.
*   **`lib/`**: Utility functions, API clients, authentication logic, and other helper modules (e.g., `api.ts`, `auth.ts`, `utils.ts`).
*   **`providers/`**: Global providers for various functionalities (e.g., `modal-provider.tsx`, `theme-provider.tsx`).

## `src/` (Unnecessary/Duplicate)

Based on the file structure, it appears there is a duplicate `src/` directory at the root level, containing some files that seem to mirror those in `frontend/src/`. This `src/` directory at the root level (`/src`) is likely unnecessary and could be a remnant or a misplacement. All frontend source code should ideally reside within `frontend/src/`.

**Recommendation:** Review the contents of `/src/` and confirm if it's indeed a duplicate or contains outdated files. If so, it should be removed to avoid confusion and maintain a clean project structure.

## `out/` (Build Output - Not Present, but mentioned in .gitignore)

The `.gitignore` file includes `/out/` as a directory to ignore. In the context of a Next.js project, an `out/` directory is typically generated when you export the project as a static HTML application (e.g., using `next export`). This directory would contain the fully built, static version of your frontend application, ready for deployment to a static hosting service.

**Current Status:** This directory is not currently present in the file listing, which is expected as it's a build output and not part of the source code. It will be created during the build process if static export is used.
