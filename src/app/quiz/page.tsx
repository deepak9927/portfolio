'use client';

import React, { useState } from 'react';
import Quiz from '@/components/quiz/Quiz';
import { reactQuiz, nextjsQuiz } from '@/data/quiz-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Code2 } from 'lucide-react';

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<'react' | 'nextjs' | null>(null);

  const handleQuizSelect = (quizType: 'react' | 'nextjs') => {
    setSelectedQuiz(quizType);
  };

  const handleBackToSelection = () => {
    setSelectedQuiz(null);
  };

  if (selectedQuiz === 'react') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-codedex-950 via-codedex-900 to-codedex-950 p-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-codedex-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-codedex-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-codedex-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative z-10 mb-8">
          <Button onClick={handleBackToSelection} variant="outline" className="text-white border-codedex-500 hover:bg-codedex-500/20">
            Back to Quiz Selection
          </Button>
        </div>
        <Quiz questions={reactQuiz} quizTitle="React.js Quiz" />
      </div>
    );
  }

  if (selectedQuiz === 'nextjs') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-codedex-950 via-codedex-900 to-codedex-950 p-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-codedex-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-codedex-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-codedex-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative z-10 mb-8">
          <Button onClick={handleBackToSelection} variant="outline" className="text-white border-codedex-500 hover:bg-codedex-500/20">
            Back to Quiz Selection
          </Button>
        </div>
        <Quiz questions={nextjsQuiz} quizTitle="Next.js Quiz" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-codedex-950 via-codedex-900 to-codedex-950 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-codedex-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-codedex-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-codedex-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-codedex-900/90 border-codedex-500/50 backdrop-blur-sm text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-codedex-500 to-codedex-300 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-codedex-400 to-codedex-200 bg-clip-text text-transparent">
            Choose Your DevQuest!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => handleQuizSelect('react')}
            className="w-full bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold flex items-center justify-center gap-2"
          >
            <Code2 className="h-5 w-5" /> Start React.js Quiz
          </Button>
          <Button
            onClick={() => handleQuizSelect('nextjs')}
            className="w-full bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold flex items-center justify-center gap-2"
          >
            <Code2 className="h-5 w-5" /> Start Next.js Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
