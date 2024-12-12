import React from "react";
import { QuestionDTO } from "../../interfaces/DTOs";

const Question: React.FC<{
  question: QuestionDTO;
  id: string;
  onAnswerSelect: (questionId: number, answerId: number) => void;
}> = ({ question, id, onAnswerSelect }) => {
  return (
    <>
      {/* Header */}
      <div className="bg-gray-100 flex flex-row w-full rounded p-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Въпрос {id}</h2>
          <p>{question.text}</p>
        </div>
        <div className="text-green-300 bg-gray-700 p-3 ml-auto rounded-full">
          {question.correctAnswersCount}
        </div>
      </div>

      {/* Answers Section */}
      <div className="flex flex-row justify-center gap-2">
        {question.pictureId ? (
          <img
            src={`https://avtoizpit.com/api/pictures/${question.pictureId}.png?quality=3`}
            alt={"Couldn't load image"}
          />
        ) : (
          <></>
        )}
        <div
          className={`flex ${
            question.answers[0].pictureId
              ? "flex-row justify-evenly"
              : "flex-col"
          } w-full gap-4`}
        >
          {question.answers.map((ans) => (
            <button
              key={ans.id} // Ensure each button has a unique key
              className={`border border-gray-300 p-3 rounded shadow ${
                ans.selected
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => {
                onAnswerSelect(question.id, ans.id);
              }}
            >
              {ans.pictureId ? (
                <img
                  src={`https://avtoizpit.com/api/pictures/${ans.pictureId}.png?quality=3`}
                />
              ) : (
                <p>{ans.text}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Question;
