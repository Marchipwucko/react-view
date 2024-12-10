export interface AnswerDTO {
  id: number;
  questionId: number;
  text?: string;
  pictureId?: string;
  correct?: boolean;
  selected: boolean;
}

export interface QuestionDTO {
  id: number;
  text: string;
  pictureId?: string;
  points: number;
  correctAnswersCount: number;
  answers: AnswerDTO[];
}

export interface ExamDTO {
  hash: string;
  endTime: string; // ISO string format
  questions: QuestionDTO[];
}
