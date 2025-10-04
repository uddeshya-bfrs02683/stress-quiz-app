import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StressGauge } from "./StressGauge";
import { Button } from "@/components/ui/button";

interface ResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  score: number;
}

const getResultMessage = (score: number) => {
  if (score <= 18) {
    return {
      title: "Low Stress",
      message:
        "You're managing stress well, and it's not significantly affecting your daily life. Keep maintaining healthy habits like exercise, hobbies, social connections, and relaxation practices. Stay mindful to prevent small stressors from building up.",
      icon: "🟢",
    };
  } else if (score <= 30) {
    return {
      title: "Mild Stress",
      message:
        "You may experience stress occasionally, especially during busy or high-pressure periods. While it's manageable, it's important to build routines for balance—such as regular breaks, mindfulness, or physical activity. Address stress early to prevent it from growing.",
      icon: "🟡",
    };
  } else if (score <= 40) {
    return {
      title: "Moderate Stress",
      message:
        "Stress is showing up more regularly and may be affecting your mood, sleep, or productivity. This is a good time to explore coping strategies—journaling, deep-breathing techniques, talking to a friend or mentor, or setting boundaries at work. Pay attention to patterns so you can take corrective steps.",
      icon: "🟠",
    };
  } else {
    return {
      title: "High Stress",
      message:
        "Your stress level is very high and may be taking a toll on both your mental and physical well-being. It's important to take active steps—consider structured stress management practices (yoga, meditation, counseling) and reach out for professional support if needed. Remember, seeking help is a sign of strength, not weakness.",
      icon: "🔴",
    };
  }
};

export const ResultsDialog = ({ open, onOpenChange, score }: ResultsDialogProps) => {
  const result = getResultMessage(score);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Your Stress Assessment Results
          </DialogTitle>
          <DialogDescription className="text-center">
            Here's what your score means
          </DialogDescription>
        </DialogHeader>

        <StressGauge score={score} animate={true} />

        <div className="mt-4 p-6 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{result.icon}</span>
            <h4 className="text-xl font-semibold">{result.title}</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.message}
          </p>
        </div>

        <Button
          onClick={() => onOpenChange(false)}
          className="w-full mt-4"
          size="lg"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};
