export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}
export interface Quiz {
  _id: string;
  icon: string;
  title: string;
  questions: Question[];
}
