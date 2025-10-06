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
      "https://n8n.shiprocket.in/webhook/682c48ff-31ef-402f-9084-2f317fec7a31",
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
