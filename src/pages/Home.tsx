import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExamDTO } from "../interfaces/DTOs"; // Import ExamDTO
import { getNewExam } from "../utils/aspEndpoints";
import Cookies from "js-cookie";
import PopupAlert from "../components/PopupAlert";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [examData, setExamData] = useState<ExamDTO | null>(null);

  useEffect(() => {
    const examData = Cookies.get("draft");
    if (examData) {
      setShowPopup(true);
    }
  }, []);

  const handleStartExam = () => {
    // Example of initializing exam data (use your actual structure here)
    const initialData = getNewExam();

    if (initialData) {
    }
    alert("Error generating exam");
  };

  const handleOnLoadDraft = () => {
    setShowPopup(false);
    if (examData) navigate("/exam", { state: { examData } });
    else alert("Exam has expired :(");
  };

  const handleOnDeleteDraft = () => {
    setShowPopup(false);
    Cookies.remove("draft");
  };

  return (
    <>
      {showPopup ? (
        <PopupAlert
          title="You have an unfinished exam!"
          message="Would you like to continue it?"
          customText="Yessss"
          cancelText="No"
          onCustomAction={handleOnLoadDraft}
          onCancel={handleOnDeleteDraft}
        />
      ) : (
        <div className="flex justify-center items-center">
          <button
            className="w-52 h-36 p-3 font-sans text-3xl font-extrabold"
            onClick={handleStartExam}
          >
            Start
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
