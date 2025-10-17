# Azure Static Web Apps Deployment - Environment Setup

## ✅ Changes Applied

The following fixes have been pushed to GitHub:

1. ✅ **next.config.js** - Added `output: 'export'` for static generation
2. ✅ **Azure Workflow** - Updated to build to `out` directory
3. ✅ **staticwebapp.config.json** - Added routing configuration
4. ✅ **Build Process** - Manual build step with environment variables

---

## 🔑 Required: Add GitHub Secrets

**IMPORTANT:** You must add these secrets to your GitHub repository for the deployment to work.

### Steps:

1. Go to your repository: **https://github.com/deepak9927/portfolio**

2. Click **Settings** (top menu)

3. In the left sidebar, click **Secrets and variables** → **Actions**

4. Click **New repository secret** button

5. Add these TWO secrets:

#### Secret 1: NEXT_PUBLIC_APPWRITE_ENDPOINT
- **Name:** `NEXT_PUBLIC_APPWRITE_ENDPOINT`
- **Value:** `https://cloud.appwrite.io/v1`
- Click **Add secret**

#### Secret 2: NEXT_PUBLIC_APPWRITE_PROJECT_ID
- **Name:** `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
- **Value:** `your_appwrite_project_id_here`
- Click **Add secret**

---

## 🚀 After Adding Secrets

Once you add the secrets:

1. The workflow will automatically trigger on the next push
2. Or you can manually trigger it:
   - Go to **Actions** tab
   - Click on the workflow
   - Click **Run workflow**

---

## 📊 Build Process

The updated workflow now:

1. ✅ Sets up Node.js 18
2. ✅ Installs dependencies with `npm ci`
3. ✅ Builds the app with `npm run build`
4. ✅ Injects environment variables during build
5. ✅ Deploys the `out` directory to Azure
6. ✅ Skips Azure's build (uses our custom build)

---

## 🔍 Verify Deployment

After adding secrets and the workflow runs:

1. Go to **Actions** tab in GitHub
2. Click on the latest workflow run
3. Check if it completes successfully
4. Your site should be live at your Azure URL

---

## ⚠️ Known Limitations with Azure SWA

Since we're using static export for Azure:

- ✅ **Homepage** - Works perfectly
- ✅ **Quiz pages** - Works perfectly
- ✅ **Static content** - Works perfectly
- ⚠️ **Authentication** - May need adjustments (Appwrite should work with client-side auth)
- ⚠️ **Server actions** - Not available in static export
- ⚠️ **Dynamic routes** - Limited support

---

## 🎯 Alternative: Use Vercel (No Configuration Needed)

If you continue having issues with Azure, **Vercel** is the easiest option:

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **Import Project**
4. Select `deepak9927/portfolio`
5. Add environment variables
6. Deploy!

Vercel supports all Next.js features without any configuration.

---

## 📝 Files Changed

- `.github/workflows/azure-static-web-apps-red-ocean-04acd9b1e.yml`
- `next.config.js`
- `staticwebapp.config.json` (new)

---

## ✅ Checklist

- [x] Updated Next.js config for static export
- [x] Updated Azure workflow
- [x] Added staticwebapp.config.json
- [x] Pushed changes to GitHub
- [ ] **Add GitHub secrets** (YOU NEED TO DO THIS)
- [ ] Verify deployment in Actions tab
- [ ] Test the deployed site

---

## 🆘 If Deployment Still Fails

1. Check the **Actions** tab for error messages
2. Verify both secrets are added correctly
3. Make sure your Appwrite project ID is correct
4. Consider using Vercel instead (it's easier for Next.js)

---

**Next Step:** Add the two GitHub secrets, then your deployment will work! 🚀
