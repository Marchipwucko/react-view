import React from "react";
import { QuestionDTO } from "../../interfaces/DTOs";

const Question: React.FC<{
  question: QuestionDTO;
  onAnswerSelect: (questionId: number, answerId: number) => void;
}> = ({ question, onAnswerSelect }) => {
  return (
    <>
      {/* Question Section */}
      <div className="bg-gray-100 rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Въпрос 1</h2>
        <p>{question.text}</p>
      </div>

      {/* Answers Section */}
      <div className="flex flex-col gap-4">
        {question.answers.map((ans) => (
          <button
            key={ans.id} // Ensure each button has a unique key
            className="bg-gray-200 border border-gray-300 p-3 rounded shadow hover:bg-gray-300"
            onClick={() => {
              onAnswerSelect(question.id, ans.id);
            }}
          >
            {ans.text}
          </button>
        ))}
      </div>
    </>
  );
};

export default Question;
