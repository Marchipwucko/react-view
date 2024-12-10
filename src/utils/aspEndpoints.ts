import { ExamDTO } from "../interfaces/DTOs";

export const getNewExam: () => ExamDTO | null = () => {
  fetch("https://localhost:7018/generate-new").then((response) => {});

  return null;
};
