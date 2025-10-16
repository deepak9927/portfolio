# 🚀 Quick Setup Guide

## Your portfolio has been successfully updated and pushed to GitHub!

Repository: https://github.com/deepak9927/portfolio

## Next Steps

### 1. Install Dependencies (Required)
```bash
npm install
```

### 2. Set Up Appwrite (Required for Authentication)

#### Option A: Using Appwrite Cloud (Recommended)
1. Go to https://cloud.appwrite.io/
2. Sign up for a free account
3. Create a new project
4. Copy your **Project ID** from Settings
5. Go to **Auth** → Enable **Email/Password** authentication
6. Add `http://localhost:3000` to **Platforms** → **Web** → Add your domain

#### Option B: Self-Hosted Appwrite
Follow the guide at https://appwrite.io/docs/installation

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Then edit `.env.local` and add your Appwrite credentials:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_actual_project_id_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 to see your portfolio!

## 🎮 Features Available

### ✅ Homepage
- Beautiful Codedex-inspired design
- Animated background blobs
- Skill showcase cards
- Social links

### ✅ Authentication
- Sign Up: http://localhost:3000/sign-up
- Sign In: http://localhost:3000/sign-in
- Secure authentication with Appwrite

### ✅ Quiz System
- React Quiz: http://localhost:3000/quiz
- Next.js Quiz: http://localhost:3000/quiz
- 16 total questions (8 React + 8 Next.js)
- Instant feedback and explanations

## 🎨 What's New

- ✨ Replaced Clerk with Appwrite (no more paid subscriptions!)
- 🧠 Interactive developer quizzes
- 🎨 Codedex-inspired playful design
- 🌈 Vibrant gradient colors
- ✨ Smooth animations
- 📦 All packages updated to latest versions

## 📝 Important Notes

1. **Don't commit `.env.local`** - It's already in `.gitignore`
2. **Appwrite is FREE** - No credit card required for the features we're using
3. **Quiz data is local** - No database setup needed for quizzes to work
4. **Production deployment** - Remember to add your production URL to Appwrite allowed domains

## 🚀 Deploy to Production

### Vercel (Recommended)
1. Go to https://vercel.com
2. Import your GitHub repository
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_APPWRITE_ENDPOINT`
   - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
4. Deploy!
5. **Important**: Add your Vercel URL to Appwrite allowed domains

### Netlify
1. Go to https://netlify.com
2. Connect your GitHub repository
3. Add environment variables
4. Build command: `npm run build`
5. Publish directory: `.next`
6. **Important**: Add your Netlify URL to Appwrite allowed domains

## 🐛 Troubleshooting

### "Cannot find module 'appwrite'"
```bash
npm install
```

### Authentication not working
1. Check `.env.local` has correct Appwrite credentials
2. Verify Appwrite project has Email/Password auth enabled
3. Make sure `localhost:3000` is in Appwrite allowed domains

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📚 Documentation

- Full README: `README.md`
- Migration details: `MIGRATION_SUMMARY.md`
- Appwrite Docs: https://appwrite.io/docs
- Next.js Docs: https://nextjs.org/docs

## 🎉 You're All Set!

Your portfolio is now:
- ✅ Migrated to Appwrite (free!)
- ✅ Has interactive quizzes
- ✅ Features a beautiful Codedex-inspired design
- ✅ Using latest Next.js 15
- ✅ Pushed to GitHub

Happy coding! 🚀
