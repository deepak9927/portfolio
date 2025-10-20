# Frontend Deployment Guide (Azure Static Web Apps)

This guide will walk you through deploying your Next.js frontend to Azure Static Web Apps, leveraging your GitHub repository.

## Prerequisites

*   An Azure account with active credits.
*   A GitHub repository for your frontend code (the `backend/` directory should be ignored by Git).
*   Your frontend code ready for deployment.

## Steps

### 1. Push Your Frontend Code to GitHub

Ensure your frontend code is pushed to a GitHub repository. The `.gitignore` file in the root of your project should prevent the `backend/` directory from being pushed.

**Note on Building:** You do not need to run a local build command (e.g., `pnpm build` or `npm build`) before pushing. Azure Static Web Apps will automatically handle the build process for your Next.js application when it detects changes in your connected GitHub repository.

```bash
# Make sure you are in the root directory of your project
git add .
git commit -m "Initial frontend commit for Azure deployment"
git push origin main # Or your main branch name
```

### 2. Create an Azure Static Web App

1.  **Go to the Azure Portal:** Navigate to [portal.azure.com](https://portal.azure.com/) and log in.
2.  **Create a new resource:** Search for "Static Web Apps" and select "Static Web App".
3.  **Click "Create":**
    *   **Subscription:** Select your Azure subscription.
    *   **Resource Group:** Choose an existing resource group (e.g., the one you created for the backend) or create a new one (e.g., `my-portfolio-frontend-rg`).
    *   **Static Web App details:**
        *   **Name:** Enter a unique name for your static web app (e.g., `my-portfolio-frontend`).
        *   **Region:** Choose a region close to your users.
    *   **Deployment details:**
        *   **Source:** Select "GitHub".
        *   **Sign in with GitHub:** Authenticate with your GitHub account.
        *   **Organization:** Select your GitHub organization.
        *   **Repository:** Choose the GitHub repository where your frontend code resides.
        *   **Branch:** Select the branch you want to deploy from (e.g., `main`).
    *   **Build Details:**
        *   **Build Presets:** Select "Next.js".
        *   **App location:** `/frontend` (This is crucial as your Next.js app is in the `frontend` subdirectory).
        *   **Api location:** Leave blank or set to `api` if you plan to use Azure Functions for serverless API, but for now, your backend is separate.
        *   **Output location:** `.next` (This is the default build output for Next.js).

4.  **Review and Create:** Review your settings and click "Create".

### 3. Configure Environment Variables for Frontend

Once your Azure Static Web App is created, you'll need to configure environment variables, especially the URL of your deployed backend.

1.  **Navigate to your Static Web App:** In the Azure Portal, go to your newly created Static Web App resource.
2.  **Go to "Configuration":** Under "Settings", select "Configuration".
3.  **Add new application setting:**
    *   **Name:** `NEXT_PUBLIC_BACKEND_URL` (or whatever environment variable your frontend uses to reference the backend).
    *   **Value:** The URL of your deployed Azure App Service backend (obtained from `backend/DEPLOYMENT_GUIDE.md` step 6).
    *   Click "OK" and then "Save".

### 4. Verify Deployment

Azure Static Web Apps will automatically build and deploy your application whenever you push changes to the configured branch.

1.  **Check Deployment Status:** In the Azure Portal, go to your Static Web App and check the "Deployment history" to ensure the build and deployment were successful.
2.  **Browse to your application:** Once deployed, you can access your frontend using the URL provided in the Azure Portal (Overview section of your Static Web App).
3.  **Test Integration:** Verify that your frontend can successfully communicate with your backend by interacting with features that require backend data.
