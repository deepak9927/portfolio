export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export const reactQuiz: Question[] = [
  {
    id: 1,
    question: "What is React.js?",
    options: [
      "A JavaScript library for building user interfaces",
      "A backend framework",
      "A database management system",
      "A mobile operating system",
    ],
    answer: "A JavaScript library for building user interfaces",
  },
  {
    id: 2,
    question: "What is JSX?",
    options: [
      "A JavaScript extension that allows you to write HTML-like syntax in your JavaScript files",
      "A new JavaScript framework",
      "A CSS preprocessor",
      "A database query language",
    ],
    answer: "A JavaScript extension that allows you to write HTML-like syntax in your JavaScript files",
  },
  {
    id: 3,
    question: "What is a component in React?",
    options: [
      "A reusable, self-contained module that renders a part of the UI",
      "A global state management tool",
      "A type of database",
      "A server-side rendering technique",
    ],
    answer: "A reusable, self-contained module that renders a part of the UI",
  },
  {
    id: 4,
    question: "What is the purpose of `useState` hook?",
    options: [
      "To add state to functional components",
      "To perform side effects in functional components",
      "To optimize component rendering",
      "To handle routing in React applications",
    ],
    answer: "To add state to functional components",
  },
  {
    id: 5,
    question: "What is the virtual DOM?",
    options: [
      "A lightweight copy of the actual DOM, used by React to optimize updates",
      "A server-side rendering technique",
      "A browser API for manipulating the DOM",
      "A way to style React components",
    ],
    answer: "A lightweight copy of the actual DOM, used by React to optimize updates",
  },
];

export const nextjsQuiz: Question[] = [
  {
    id: 1,
    question: "What is Next.js?",
    options: [
      "A React framework for building server-side rendered and static web applications",
      "A CSS framework",
      "A database ORM",
      "A testing library for React",
    ],
    answer: "A React framework for building server-side rendered and static web applications",
  },
  {
    id: 2,
    question: "What is server-side rendering (SSR) in Next.js?",
    options: [
      "Rendering React components on the server and sending the HTML to the client",
      "Rendering React components directly in the browser",
      "A method for managing application state",
      "A way to optimize image loading",
    ],
    answer: "Rendering React components on the server and sending the HTML to the client",
  },
  {
    id: 3,
    question: "What is static site generation (SSG) in Next.js?",
    options: [
      "Generating HTML at build time and reusing it on each request",
      "Generating HTML on the server for each request",
      "A technique for client-side routing",
      "A way to fetch data from an API",
    ],
    answer: "Generating HTML at build time and reusing it on each request",
  },
  {
    id: 4,
    question: "How do you define API routes in Next.js?",
    options: [
      "By creating files inside the `pages/api` directory",
      "By using a third-party library",
      "By defining functions in `next.config.js`",
      "By adding a `server.js` file",
    ],
    answer: "By creating files inside the `pages/api` directory",
  },
  {
    id: 5,
    question: "What is the purpose of `getStaticProps`?",
    options: [
      "To fetch data at build time for static site generation",
      "To fetch data on the server for each request",
      "To fetch data on the client-side after the component mounts",
      "To handle form submissions",
    ],
    answer: "To fetch data at build time for static site generation",
  },
];
