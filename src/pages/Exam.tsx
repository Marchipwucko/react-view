import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import ExamNavbar from "../components/ExamNavbar";
import { ExamDTO, QuestionDTO, AnswerDTO } from "../interfaces/DTOs";
import LeftSidebar from "../components/exam/LeftSidebar";
import Question from "../components/exam/Question";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const Exam: React.FC = () => {
  // Retrieve initialData from the location state
  const location = useLocation();
  const initialData = location.state?.initialData as ExamDTO; // Type-casting to ExamDTO

  const [examData, setExamData] = useState<ExamDTO>(initialData);
  const [currQuestion, setCurrQuestion] = useState<QuestionDTO>(
    initialData.questions[0]
  );

  const questions = Array.from({ length: 45 }, (_, index) => ({
    id: index + 1,
    answered: false, // Mark if a question is answered
  }));

  useEffect(() => {
    const data = Cookies.get("draft");
    if (data) {
      setExamData(JSON.parse(data) as ExamDTO);
    } else {
      console.log("There is no saved draft");
    }
  }, []);

  useEffect(() => {
    if (examData && examData.endTime) {
      const expiryDate = new Date(examData.endTime); // Convert ISO string to Date object
      Cookies.set("draft", JSON.stringify(examData), { expires: expiryDate });
    }
  }, [examData]);

  const handleAnswerSelection = (questionId: number, answerId: number) => {
    setExamData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answers: question.answers.map((answer) => ({
                ...answer,
                selected:
                  answer.id === answerId ? !answer.selected : answer.selected,
              })),
            }
          : question
      ),
    }));
  };

  const handleGoToQuestion = (questionId: number) => {
    const targetQuestion = examData.questions.find((q) => q.id === questionId);
    if (targetQuestion) {
      setCurrQuestion(targetQuestion);
    }
  };

  return (
    <>
      <ExamNavbar />

      <div className="min-h-screen bg-bg_sidebar flex">
        <LeftSidebar
          questions={questions}
          onQuestionClick={handleGoToQuestion}
        />

        {/* Main Content */}
        <main className="flex-grow bg-bg_mainarea_mid p-6">
          {/* Progress and Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <p className="text-gray-700">Отговорени 0 от 45</p>
            </div>
          </div>

          <Question
            question={currQuestion}
            onAnswerSelect={handleAnswerSelection}
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
              Предишен
            </button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
              Следващ
            </button>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="bg-bg_primary w-1/6 p-4 flex flex-col justify-between">
          <button className="bg-bg_primary p-3 rounded shadow hover:bg-gray-200">
            Предай
          </button>
        </aside>
      </div>
    </>
  );
};

export default Exam;
