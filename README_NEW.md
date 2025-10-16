# DevQuest Portfolio

A modern, playful developer portfolio with interactive quizzes for React and Next.js developers. Built with Next.js 15, Appwrite, and Tailwind CSS, inspired by Codedex's fun and engaging design.

## ✨ Features

- 🎨 **Codedex-Inspired Design**: Playful, colorful, and gamified UI with animated gradients and blob effects
- 🔐 **Appwrite Authentication**: Secure user authentication with email/password
- 🎯 **Interactive Quizzes**: Test your React and Next.js knowledge with:
  - 15+ carefully crafted questions
  - Multiple difficulty levels (Beginner, Intermediate, Advanced)
  - Instant feedback and explanations
  - Score tracking and progress badges
- 📱 **Fully Responsive**: Beautiful on all devices
- 🌙 **Dark Mode**: Eye-friendly dark theme by default
- ⚡ **Next.js 15 App Router**: Latest Next.js features with Server Components
- 🎭 **Smooth Animations**: Framer Motion and custom CSS animations

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Appwrite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Language**: TypeScript
- **Form Handling**: React Hook Form + Zod

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/deepak9927/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Appwrite**
   
   - Create an account at [Appwrite Cloud](https://cloud.appwrite.io)
   - Create a new project
   - In the project settings, add your local development URL (http://localhost:3000)
   - Go to Auth settings and enable Email/Password authentication
   - Copy your Project ID and Endpoint

4. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
   ```

5. **Update Tailwind Config** (Important!)
   
   Replace the content of `tailwind.config.ts` with `tailwind.config.new.ts`:
   ```bash
   mv tailwind.config.new.ts tailwind.config.ts
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Using the Quiz Feature

1. **Sign Up/Sign In**: Create an account or sign in to access all features
2. **Navigate to Quizzes**: Click the "Quizzes" button in the navigation or "Take a Quiz" button
3. **Choose Your Challenge**: Select either React or Next.js quiz
4. **Answer Questions**: Read each question carefully and select your answer
5. **Get Feedback**: After each question, see if you're correct with detailed explanations
6. **Track Your Progress**: View your final score and earn badges for high scores (80%+)

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Homepage with Codedex design
│   │   ├── quiz/               # Quiz section
│   │   ├── sign-in/            # Sign in page
│   │   └── sign-up/            # Sign up page
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   └── quiz/               # Quiz components
│   ├── contexts/
│   │   └── AuthContext.tsx     # Auth context provider
│   ├── data/
│   │   └── quiz-data.ts        # Quiz questions database
│   ├── lib/
│   │   ├── appwrite.ts         # Appwrite client setup
│   │   ├── auth.ts             # Auth service functions
│   │   └── utils.ts            # Utility functions
│   └── hooks/                  # Custom React hooks
├── public/                     # Static assets
├── .env.example                # Environment variables template
├── tailwind.config.ts          # Tailwind configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies
```

## 🎨 Design Features

### Codedex-Inspired Elements

- **Vibrant Gradients**: Purple, pink, and blue gradients throughout
- **Animated Blobs**: Floating background animations
- **Playful Cards**: Rounded corners with gradient borders
- **Badge System**: Colorful difficulty badges
- **Interactive Feedback**: Smooth transitions and hover effects
- **Gamification**: Trophy icons, progress bars, and achievement celebrations

### Color Palette

- Primary: Purple (`#a855f7`) to Pink (`#ec4899`)
- Secondary: Blue (`#3b82f6`) to Cyan (`#06b6d4`)
- Accent: Yellow (`#fbbf24`) to Orange (`#f97316`)
- Background: Dark slate (`#0f172a`, `#1e293b`)

## 🔧 Customization

### Adding More Quiz Questions

Edit `src/data/quiz-data.ts`:

```typescript
{
  id: 'unique-id',
  category: 'react' | 'nextjs',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  question: 'Your question here?',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correctAnswer: 0, // Index of correct option
  explanation: 'Explanation of the correct answer'
}
```

### Modifying the Theme

Update `tailwind.config.ts` and `src/app/global.css` for color and animation changes.

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 👨‍💻 Author

**Deepak Thakur**
- GitHub: [@deepak9927](https://github.com/deepak9927)
- LinkedIn: [Deepak Thakur](https://www.linkedin.com/in/deepak-thakur-304b2a186)
- Email: deepakthakur9927@gmail.com

## 🙏 Acknowledgments

- Design inspiration from [Codedex](https://www.codedex.io/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Authentication powered by [Appwrite](https://appwrite.io/)

## 🐛 Known Issues

- Make sure to replace `tailwind.config.ts` with the new config file after installation
- Appwrite requires proper CORS configuration for local development

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel project settings
4. Add your Vercel deployment URL to Appwrite's platform settings
5. Deploy!

---

Made with ❤️ and lots of ☕
