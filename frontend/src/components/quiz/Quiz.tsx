'use client';

import React, { useState, useEffect } from 'react';
import { Question, QuizSubmission } from '../../lib/types';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { CheckCircle2, XCircle, RefreshCw, Timer } from 'lucide-react';
import { getQuestions, submitQuiz } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface QuizProps {
  quizTitle: string;
}

const QUIZ_DURATION_SECONDS = 30;

const Quiz: React.FC<QuizProps> = ({ quizTitle }) => {
  const { user, getToken } = useAuth();
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizSubmission[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [quizStarted, setQuizStarted] = useState(false);
  const [optionsDisabled, setOptionsDisabled] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    loadQuestions();
  }, [user]);

  useEffect(() => {
    if (!quizStarted || showResults) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleNextQuestion(true); // Auto-submit on timer end
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, quizStarted, showResults]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const fetchedQuestions = await getQuestions();
      setQuestions(fetchedQuestions);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load questions.');
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(QUIZ_DURATION_SECONDS);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setFeedback(null);
    setOptionsDisabled(true); // Disable options after selection
  };

  const handleNextQuestion = async (timerEnded = false) => {
    if (!timerEnded && selectedOption === null) {
      setFeedback('Please select an option before proceeding.');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    setQuizAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOption: selectedOption || 'no_answer', // Store 'no_answer' if timer ended or no option selected
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setFeedback(null);
      setTimeLeft(QUIZ_DURATION_SECONDS);
      setOptionsDisabled(false); // Re-enable options for the next question
    } else {
      // Last question, submit quiz
      await handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await submitQuiz(quizAnswers);
      // Assuming the backend returns the score or a success message
      // For now, we'll just show a generic success message or navigate
      console.log('Quiz submitted:', result);
      setShowResults(true);
      window.dispatchEvent(new Event('quizSubmitted'));
    } catch (err: any) {
      setError(err.message || 'Failed to submit quiz.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizAnswers([]);
    setShowResults(false);
    setFeedback(null);
    setLoading(true);
    setError(null);
    setTimeLeft(QUIZ_DURATION_SECONDS);
    setQuizStarted(false);
    setOptionsDisabled(false);
    loadQuestions();
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto bg-codedex-900/90 border-codedex-500/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-codedex-400 to-codedex-200 bg-clip-text text-transparent">
            Loading Quiz...
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl text-white">Please wait while we fetch the questions.</p>
          <div className="w-8 h-8 border-4 border-codedex-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto bg-codedex-900/90 border-codedex-500/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-codedex-400 to-codedex-200 bg-clip-text text-transparent">
            Error
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl text-red-400">{error}</p>
          <Button onClick={handleRestart} className="w-full bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold">
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!quizStarted) {
    return (
      <Card className="w-full max-w-md mx-auto bg-codedex-900/90 border-codedex-500/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-codedex-400 to-codedex-200 bg-clip-text text-transparent">
            {quizTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl text-white">Ready to start the quiz?</p>
          <Button onClick={handleStartQuiz} className="w-full bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold">
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    return (
      <Card className="w-full max-w-md mx-auto bg-codedex-900/90 border-codedex-500/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-codedex-400 to-codedex-200 bg-clip-text text-transparent">
            Quiz Completed!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl text-white">Your results have been submitted.</p>
          <p className="text-lg text-codedex-300">Check the leaderboard for your score!</p>
          <Button onClick={handleRestart} className="w-full bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold">
            <RefreshCw className="mr-2 h-4 w-4" /> Take Quiz Again
          </Button>
          <Button onClick={() => router.push('/leaderboard')} className="w-full bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold mt-2">
            View Leaderboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-md mx-auto bg-codedex-900/90 border-codedex-500/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-codedex-400 to-codedex-200 bg-clip-text text-transparent">
          {quizTitle} - Question {currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
        <div className="flex items-center justify-between mt-2 text-codedex-300">
          <div className="w-full bg-codedex-700 rounded-full h-2.5">
            <div
              className="bg-codedex-500 h-2.5 rounded-full"
              style={{ width: `${(timeLeft / QUIZ_DURATION_SECONDS) * 100}%` }}
            ></div>
          </div>
          <span className="flex items-center gap-1 ml-4">
            <Timer className="h-4 w-4" /> {timeLeft}s
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-semibold text-white">{currentQuestion.question}</p>
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? 'default' : 'outline'}
              className={`w-full justify-start text-left ${selectedOption === option ? 'bg-codedex-500 hover:bg-codedex-600' : 'bg-codedex-800 border-codedex-700 text-white hover:bg-codedex-700'} ${optionsDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleOptionSelect(option)}
              disabled={optionsDisabled}
            >
              {option}
            </Button>
          ))}
        </div>
        {feedback && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm flex items-center gap-2">
            <XCircle className="h-4 w-4" /> {feedback}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => handleNextQuestion()}
          className="w-full bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold"
          disabled={loading || optionsDisabled && selectedOption === null}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
