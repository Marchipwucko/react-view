import React from "react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";

interface Question {
  id: number;
  text: string;
  answered: boolean;
  correct: boolean | null;
}

const LeftSidebar: React.FC<{
  questions: Question[];
  onQuestionClick: (questionId: number) => void;
}> = ({ questions, onQuestionClick }) => {
  return (
    <>
      {/* Left Sidebar */}
      <aside className=" w-1/6 p-4 flex flex-col gap-2 overflow-y-auto bg-bg_sidebar">
        <div className="grid grid-cols-2 gap-1">
          {questions.map((question) => (
            <div
              onClick={() => onQuestionClick(question.id)}
              key={question.text}
              className={`flex items-center justify-center p-1 text-center ${
                question.correct === null
                  ? "bg-white rounded shadow hover:bg-gray-200"
                  : question.correct
                  ? "bg-[#8df381] rounded shadow hover:bg-[#73ca6a]"
                  : "bg-[#f38181] rounded shadow hover:bg-[#ca6a6a]"
              }`}
            >
              <span className="font-semibold text-xs">{question.text}</span>
              {question.answered ? (
                <FiCheckCircle className="text-green-500 text-xs ml-1" />
              ) : (
                <FiCircle className="text-gray-400 text-xs ml-1" />
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;
