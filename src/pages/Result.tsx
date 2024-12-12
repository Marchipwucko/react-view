import React, { useEffect, useState } from "react";

export default function Result() {
  const [points, setPoints] = useState<number>(0);
  useEffect(() => {
    setPoints(Number.parseInt(localStorage.getItem("resultPoints")!));
  }, []);
  return (
    <>
      <div
        className={`flex items-center justify-center text-3xl font-mono font-extrabold ${
          points >= 87 ? "bg-green-300" : "bg-red-300"
        }`}
      >
        {points}
      </div>
      <a href="/exam">View</a>
    </>
  );
}
