import React from "react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";

interface Question {
  id: number;
  answered: boolean;
}

const LeftSidebar: React.FC<{
  questions: Question[];
  onQuestionClick: (questionId: number) => void;
}> = ({ questions, onQuestionClick }) => {
  return (
    <>
      {/* Left Sidebar */}
      <aside className=" w-1/6 p-4 flex flex-col gap-2 overflow-y-auto">
        <div className="grid grid-cols-2 gap-1">
          {questions.map((question) => (
            <div
              onClick={() => onQuestionClick(question.id)}
              key={question.id}
              className="flex items-center justify-center p-1 bg-white rounded shadow hover:bg-gray-200 text-center"
            >
              <span className="font-semibold text-xs">{question.id}</span>
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
