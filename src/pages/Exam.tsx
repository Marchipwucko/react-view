import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import ExamNavbar from "../components/ExamNavbar";
import { ExamDTO, QuestionDTO, AnswerDTO, ResultDTO } from "../interfaces/DTOs";
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
    initialData!.questions[0]
  );
  const [currQuestionIndex, setCurrQuestionIndex] = useState<number>(0);
  const [sidebarQuestions, setSidebarQuestions] = useState(
    examData.questions.map((question, i) => {
      return {
        id: question.id,
        text: (i + 1).toString(),
        answered: false,
        correct: !examData.isResult
          ? null
          : !question.answers.some((x) => x.correct != x.selected),
      };
    })
  );

  useEffect(() => {
    setCurrQuestion(examData.questions[currQuestionIndex]);
  }, [currQuestionIndex]);

  useEffect(() => {
    setCurrQuestionIndex(
      examData.questions.findIndex((x) => x.id == currQuestion.id)
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
    setCurrQuestion((draftData as ExamDTO).questions[0]);
  }, []);

  useEffect(() => {
    if (examData && examData.endTime) {
      const compresedData = compress(JSON.stringify(examData));
      localStorage.setItem("draft", compresedData);
    }
  }, [examData]);

  useEffect(() => {
    setSidebarQuestions(
      examData.questions.map((question, i) => {
        return {
          id: question.id,
          text: (i + 1).toString(),
          answered: question.answers.some((a) => a.selected),
          correct: !examData.isResult
            ? null
            : !question.answers.some((x) => x.correct != x.selected),
        };
      })
    );
  }, [examData]);

  const handleAnswerSelection = (questionId: number, answerId: number) => {
    if (examData.isResult) return;

    console.log(`Selecting question[${questionId}].Answer[${answerId}]`);

    // Update examData and currQuestion together in a functional update
    setExamData((prevData) => {
      const updatedQuestions = prevData.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              answers: question.answers.map((answer) =>
                answer.id === answerId
                  ? { ...answer, selected: !answer.selected }
                  : answer
              ),
            }
          : question
      );

      // After updating examData, update the current question based on updated data
      const updatedCurrQuestion = updatedQuestions.find(
        (q) => q.id === currQuestion.id
      );

      if (updatedCurrQuestion) {
        setCurrQuestion(updatedCurrQuestion); // Update currQuestion state
      }

      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  const handleGoToQuestion = (questionId: number) => {
    const targetQuestion = examData.questions.find((q) => q.id === questionId);
    if (targetQuestion) {
      setCurrQuestion(targetQuestion);
    }
  };

  const handleSubmit = async () => {
    const response = await submitExam(examData);
    if (typeof response === "string" && response.startsWith("error: ")) {
      alert(response);
    } else {
      const result: ResultDTO = response as ResultDTO;
      localStorage.setItem("resultPoints", result.points.toString());
      setExamData(result.exam);
      navigate("/result");
    }
  };

  return (
    <>
      <ExamNavbar />

      <div className="min-h-screen bg-bg_sidebar flex">
        <LeftSidebar
          questions={sidebarQuestions}
          onQuestionClick={handleGoToQuestion}
        />

        {/* Main Content */}
        <main className="flex-grow bg-bg_mainarea_mid p-6">
          {/* Progress and Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <p className="text-gray-700">
                Отговорени {sidebarQuestions.filter((q) => q.answered).length}{" "}
                от 45
              </p>
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

        {examData.isResult ? (
          <></>
        ) : (
          <>
            {/* Right Sidebar */}
            <aside className="bg-bg_primary w-1/6 p-4 flex flex-col justify-between">
              <button
                className="bg-[#ff8484] p-3 rounded shadow hover:bg-[#ffc3c3] hover:border-2 hover:border-[#fffeab]"
                onClick={handleSubmit}
              >
                Предай
              </button>
            </aside>
          </>
        )}
      </div>
    </>
  );
};

export default Exam;
