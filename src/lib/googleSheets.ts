import { timeStamp } from "console";

export interface StressAssessmentData {
  timestamp: string;
  answers: number[];
  totalScore: number;
  stressLevel: string;
}

export const submitToGoogleSheets = async (data: StressAssessmentData) => {
  try {
    const response = await fetch(
      "http://localhost:5678/webhook/c78f633e-9b03-4773-97b5-89094d7df32d",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: data.timestamp,
          answers: data.answers,
          total_score: data.totalScore,
          stress_level: data.stressLevel,
        }),
      }
    );

    console.log("Data submitted to Google Sheets successfully");
    return true;
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return false;
  }
};
