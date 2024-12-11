import React from "react";
import { QuestionDTO } from "../../interfaces/DTOs";

const Question: React.FC<{
  question: QuestionDTO;
  id: string;
  onAnswerSelect: (questionId: number, answerId: number) => void;
}> = ({ question, id, onAnswerSelect }) => {
  return (
    <>
      {/* Question Section */}
      <div className="bg-gray-100 rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Въпрос {id}</h2>
        <p>{question.Text}</p>
      </div>

      {/* Answers Section */}
      <div className="flex flex-col gap-4">
        {question.Answers.map((ans) => (
          <button
            key={ans.Id} // Ensure each button has a unique key
            className={`border border-gray-300 p-3 rounded shadow ${
              ans.Selected
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => {
              onAnswerSelect(question.Id, ans.Id);
            }}
          >
            {ans.Text}
          </button>
        ))}
      </div>
    </>
  );
};

export default Question;
