import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExamDTO } from "../interfaces/DTOs"; // Import ExamDTO
import { getNewExam } from "../utils/aspEndpoints";
import Cookies from "js-cookie";
import PopupAlert from "../components/PopupAlert";
import { compress, decompress } from "lz-string";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [examData, setExamData] = useState<ExamDTO | null>(null);

  useEffect(() => {
    const examData = localStorage.getItem("draft");
    if (examData) {
      setShowPopup(true);
    }
  }, []);

  const handleStartExam = async () => {
    // Example of initializing exam data (use your actual structure here)
    const initialData = await getNewExam();

    if (initialData != null) {
      console.log(initialData);
      const compresedData = compress(JSON.stringify(initialData));
      localStorage.setItem("draft", compresedData);
      navigate("/exam");
    } else alert("Error generating exam");
  };

  const handleOnLoadDraft = () => {
    setShowPopup(false);
    if (localStorage.getItem("draft")) {
      navigate("/exam");
    } else {
      alert("Exam has expired :(");
      localStorage.removeItem("draft");
    }
  };

  const handleOnDeleteDraft = () => {
    setShowPopup(false);
    localStorage.removeItem("draft");
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
