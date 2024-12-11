import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import ExamNavbar from "../components/ExamNavbar";
import { ExamDTO, QuestionDTO, AnswerDTO } from "../interfaces/DTOs";
import LeftSidebar from "../components/exam/LeftSidebar";
import Question from "../components/exam/Question";
import Cookies from "js-cookie";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { submitExam } from "../utils/aspEndpoints";
import { compress, decompress } from "lz-string";

const Exam: React.FC = () => {
  const navigate = useNavigate();

  const loadDraft: () => ExamDTO | null = () => {
    const cookieData = localStorage.getItem("draft");
    if (cookieData) {
      const decompressedData = decompress(cookieData);
      const parsedData = decompressedData
        ? (JSON.parse(decompressedData) as ExamDTO)
        : null;

      console.log(parsedData);
      if (parsedData) return JSON.parse(decompressedData) as ExamDTO;
    }

    console.log("There is no saved draft");
    navigate("/"); //return to Home
    return null;
  };

  const initialData: ExamDTO = loadDraft() as ExamDTO;

  const [examData, setExamData] = useState<ExamDTO>(initialData!);
  const [currQuestion, setCurrQuestion] = useState<QuestionDTO>(
    initialData!.Questions[0]
  );
  const [currQuestionIndex, setCurrQuestionIndex] = useState<number>(0);

  useEffect(() => {
    setCurrQuestion(examData.Questions[currQuestionIndex]);
  }, [currQuestionIndex]);

  useEffect(() => {
    setCurrQuestionIndex(
      examData.Questions.findIndex((x) => x.Id == currQuestion.Id)
    );
  }, [currQuestion]);

  useEffect(() => {
    if (examData) return;
    const draftData = loadDraft();
    if (!draftData) {
      console.log("There is no saved draft");
      navigate("/");
      return;
    }
    setExamData(draftData as ExamDTO);
    setCurrQuestion((draftData as ExamDTO).Questions[0]);
  }, []);

  const questions = examData.Questions.map((question, i) => {
    return {
      id: question.Id,
      text: (i + 1).toString(),
      answered: false,
    };
  });

  useEffect(() => {
    if (examData && examData.EndTime) {
      const compresedData = compress(JSON.stringify(examData));
      localStorage.setItem("draft", compresedData);
    }
  }, [examData]);

  const handleAnswerSelection = (questionId: number, answerId: number) => {
    console.log(`Selecting question[${questionId}].Answer[${answerId}]`);

    // Update examData and currQuestion together in a functional update
    setExamData((prevData) => {
      const updatedQuestions = prevData.Questions.map((question) =>
        question.Id === questionId
          ? {
              ...question,
              Answers: question.Answers.map((answer) =>
                answer.Id === answerId
                  ? { ...answer, Selected: !answer.Selected }
                  : answer
              ),
            }
          : question
      );

      // After updating examData, update the current question based on updated data
      const updatedCurrQuestion = updatedQuestions.find(
        (q) => q.Id === currQuestion.Id
      );

      if (updatedCurrQuestion) {
        setCurrQuestion(updatedCurrQuestion); // Update currQuestion state
      }

      return {
        ...prevData,
        Questions: updatedQuestions,
      };
    });
  };

  const handleGoToQuestion = (questionId: number) => {
    const targetQuestion = examData.Questions.find((q) => q.Id === questionId);
    if (targetQuestion) {
      setCurrQuestion(targetQuestion);
    }
  };

  const handleSubmit = async () => {
    const response = await submitExam(examData);
    if (typeof response === "string" && response.startsWith("error: ")) {
      alert(response);
    } else {
      //TODO: redirect to result page and display results
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
            id={(currQuestionIndex + 1).toString()}
            onAnswerSelect={handleAnswerSelection}
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => {
                setCurrQuestionIndex(currQuestionIndex - 1);
              }}
            >
              Предишен
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => {
                setCurrQuestionIndex(currQuestionIndex + 1);
              }}
            >
              Следващ
            </button>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="bg-bg_primary w-1/6 p-4 flex flex-col justify-between">
          <button
            className="bg-bg_primary p-3 rounded shadow hover:bg-gray-200"
            onClick={handleSubmit}
          >
            Предай
          </button>
        </aside>
      </div>
    </>
  );
};

export default Exam;
