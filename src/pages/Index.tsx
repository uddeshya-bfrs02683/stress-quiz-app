import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsDialog } from "@/components/ResultsDialog";
import { submitToGoogleSheets } from "@/lib/googleSheets";
import { toast } from "sonner";

const questions = [
  {
    id: 1,
    text: "How often do you feel overwhelmed by work or personal responsibilities?",
    options: [
      { label: "Rarely", value: 1 },
      { label: "Occasionally", value: 2 },
      { label: "Sometimes", value: 3 },
      { label: "Often", value: 4 },
      { label: "Almost always", value: 5 },
    ],
  },
  {
    id: 2,
    text: "How often do you feel restless, anxious, or worried without a clear reason?",
    options: [
      { label: "Rarely", value: 1 },
      { label: "Occasionally", value: 2 },
      { label: "Sometimes", value: 3 },
      { label: "Often", value: 4 },
      { label: "Almost always", value: 5 },
    ],
  },
  {
    id: 3,
    text: "How well are you able to relax after work or before sleeping?",
    options: [
      { label: "Very easily", value: 1 },
      { label: "Mostly fine", value: 2 },
      { label: "Sometimes difficult", value: 3 },
      { label: "Quite difficult", value: 4 },
      { label: "Almost impossible", value: 5 },
    ],
  },
  {
    id: 4,
    text: "How often do you notice physical symptoms of stress (headache, fatigue, muscle tension, upset stomach)?",
    options: [
      { label: "Rarely", value: 1 },
      { label: "Occasionally", value: 2 },
      { label: "Sometimes", value: 3 },
      { label: "Often", value: 4 },
      { label: "Almost always", value: 5 },
    ],
  },
  {
    id: 5,
    text: "How balanced do you feel between work and personal life?",
    options: [
      { label: "Very balanced", value: 1 },
      { label: "Mostly balanced", value: 2 },
      { label: "Somewhat balanced", value: 3 },
      { label: "Rarely balanced", value: 4 },
      { label: "Not at all balanced", value: 5 },
    ],
  },
  {
    id: 6,
    text: "How often do you feel irritable, frustrated, or short-tempered?",
    options: [
      { label: "Rarely", value: 1 },
      { label: "Occasionally", value: 2 },
      { label: "Sometimes", value: 3 },
      { label: "Often", value: 4 },
      { label: "Almost always", value: 5 },
    ],
  },
  {
    id: 7,
    text: "How motivated and energetic do you feel during the day?",
    options: [
      { label: "Very motivated/energetic", value: 1 },
      { label: "Mostly good", value: 2 },
      { label: "Neutral", value: 3 },
      { label: "Low motivation", value: 4 },
      { label: "Very low motivation", value: 5 },
    ],
  },
  {
    id: 8,
    text: "Have you recently experienced a shaky, unsteady feeling (e.g., legs feeling weak or about to give way)?",
    options: [
      { label: "Never", value: 1 },
      { label: "Rarely", value: 2 },
      { label: "Sometimes", value: 3 },
      { label: "Often", value: 4 },
      { label: "Almost always", value: 5 },
    ],
  },
  {
    id: 9,
    text: "How often do you find yourself losing patience quickly when delayed (e.g., waiting in lines, traffic, slow responses)?",
    options: [
      { label: "Rarely", value: 1 },
      { label: "Occasionally", value: 2 },
      { label: "Sometimes", value: 3 },
      { label: "Often", value: 4 },
      { label: "Almost always", value: 5 },
    ],
  },
  {
    id: 10,
    text: "How difficult is it for you to calm down after being upset by something (even small issues)?",
    options: [
      { label: "Not difficult at all", value: 1 },
      { label: "Slightly difficult", value: 2 },
      { label: "Sometimes difficult", value: 3 },
      { label: "Quite difficult", value: 4 },
      { label: "Very difficult", value: 5 },
    ],
  },
];

const Index = () => {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const answeredCount = answers.filter((answer) => answer !== null).length;
  const progress = (answeredCount / questions.length) * 100;
  const totalScore = answers.reduce((sum, answer) => sum + (answer || 0), 0);

  const handleAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const getStressLevel = (score: number) => {
    if (score <= 18) return "Low Stress";
    if (score <= 30) return "Mild Stress";
    if (score <= 40) return "Moderate Stress";
    return "High Stress";
  };

  const handleSubmit = async () => {
    if (answers.some((answer) => answer === null)) {
      toast.error("Please answer all questions before submitting");
      return;
    }

    setIsSubmitting(true);

    const data = {
      timestamp: new Date().toISOString(),
      answers: answers as number[],
      totalScore,
      stressLevel: getStressLevel(totalScore),
    };

    const success = await submitToGoogleSheets(data);

    if (success) {
      toast.success("Assessment completed and saved!");
    } else {
      toast.info(
        "Assessment completed! (Note: Configure Google Sheets URL to save results)"
      );
    }

    setIsSubmitting(false);
    setShowResults(true);
  };

  const allQuestionsAnswered = answers.every((answer) => answer !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Stress Meter</h1>
          <p className="text-sm text-muted-foreground mt-1">
            A quick assessment to understand your stress levels
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl pb-32">
        {!isCompleted ? (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  {answeredCount} of {questions.length} questions answered
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* All Questions */}
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="scroll-mt-24">
                  <div className="text-xs font-semibold text-primary mb-3">
                    QUESTION {index + 1}
                  </div>
                  <QuestionCard
                    questionId={question.id}
                    question={question.text}
                    options={question.options}
                    value={answers[index]}
                    onChange={(value) => handleAnswer(index, value)}
                  />
                </div>
              ))}
            </div>

            {/* Fixed Submit Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-10">
              <div className="container mx-auto max-w-4xl">
                <Button
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered || isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : `Submit Assessment ${
                        allQuestionsAnswered
                          ? "✓"
                          : `(${answeredCount}/${questions.length})`
                      }`}
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Thank You Page */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-card rounded-2xl p-12 shadow-[var(--shadow-soft)] border border-border max-w-2xl">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Thank You for Completing the Assessment!
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Your responses have been recorded.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Results Dialog */}
      <ResultsDialog
        open={showResults}
        onOpenChange={(open) => {
          setShowResults(open);
          if (!open) {
            setIsCompleted(true);
          }
        }}
        score={totalScore}
      />
    </div>
  );
};

export default Index;
