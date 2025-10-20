export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export interface QuizSubmission {
  questionId: string;
  selectedOption: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
}
