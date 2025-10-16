'use client';

import React, { useState } from 'react';
import { Question } from '@/data/quiz-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  quizTitle: string;
}

const Quiz: React.FC<QuizProps> = ({ questions, quizTitle }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      setFeedback('Please select an option before submitting.');
      return;
    }

    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setFeedback(null);
  };

  if (showResults) {
    return (
      <Card className="w-full max-w-md mx-auto bg-codedex-900/90 border-codedex-500/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-codedex-400 to-codedex-200 bg-clip-text text-transparent">
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl text-white">You scored {score} out of {questions.length}!</p>
          <Button onClick={handleRestart} className="w-full bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold">
            <RefreshCw className="mr-2 h-4 w-4" /> Restart Quiz
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
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-semibold text-white">{currentQuestion.question}</p>
        <RadioGroup onValueChange={handleOptionChange} value={selectedOption || ''}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border border-codedex-700 bg-codedex-800 hover:bg-codedex-700 transition-colors duration-200">
              <RadioGroupItem value={option} id={`option-${index}`} className="text-codedex-400" />
              <Label htmlFor={`option-${index}`} className="text-white flex-grow cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {feedback && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm flex items-center gap-2">
            <XCircle className="h-4 w-4" /> {feedback}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-codedex-500 to-codedex-300 hover:from-codedex-600 hover:to-codedex-400 text-white font-semibold">
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
