export interface AnswerDTO {
  Id: number;
  QuestionId: number;
  Text?: string;
  PictureId?: string;
  Correct?: boolean;
  Selected: boolean;
}

export interface QuestionDTO {
  Id: number;
  Text: string;
  PictureId?: string;
  Points: number;
  CorrectAnswersCount: number;
  Answers: AnswerDTO[];
}

export interface ExamDTO {
  Hash: string;
  EndTime: string; // ISO string format
  Questions: QuestionDTO[];
}
