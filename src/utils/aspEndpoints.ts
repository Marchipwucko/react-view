import { ExamDTO, ResultDTO } from "../interfaces/DTOs";

export const getNewExam: () => Promise<ExamDTO | null> = async () => {
  try {
    const response = await fetch("https://localhost:7018/generate-new", {
      method: "GET",
    });

    if (!response.ok) {
      // Handle error case, e.g., 404 or 500
      console.error(
        "Error fetching new exam:",
        response.status,
        response.statusText
      );
      return null;
    }

    const data = await response.json(); // Parse the response body as JSON
    return data as ExamDTO; // Return the parsed data as ExamDTO
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
};

export const submitExam: (
  exam: ExamDTO
) => Promise<ResultDTO | string> = async (exam: ExamDTO) => {
  const response = await fetch("https://localhost:7018/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify content type as JSON
    },
    body: JSON.stringify(exam),
  });

  if (!response.ok) return `error: ${response.statusText}`;

  const data = await response.json();
  if (data && (data as ResultDTO)) return data as ResultDTO;

  return "error: Data is in wrong format";
};
