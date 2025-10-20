'use client';

import Quiz from '../../components/quiz/Quiz';

export default function QuizPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-codedex-950 via-codedex-900 to-codedex-950 p-4">
      <Quiz quizTitle="Next.js Quiz" />
    </div>
  );
}
