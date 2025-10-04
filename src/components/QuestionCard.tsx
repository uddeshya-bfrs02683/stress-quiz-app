import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Option {
  label: string;
  value: number;
}

interface QuestionCardProps {
  questionId: number;
  question: string;
  options: Option[];
  value: number | null;
  onChange: (value: number) => void;
}

export const QuestionCard = ({
  questionId,
  question,
  options,
  value,
  onChange,
}: QuestionCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border transition-all hover:shadow-[var(--shadow-soft)]">
      <h3 className="text-lg font-semibold text-foreground mb-6">{question}</h3>
      <RadioGroup
        value={value?.toString()}
        onValueChange={(val) => onChange(parseInt(val))}
        className="space-y-3"
      >
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <RadioGroupItem
              value={option.value.toString()}
              id={`option-${questionId}-${option.value}`}
            />
            <Label
              htmlFor={`option-${questionId}-${option.value}`}
              className="flex-1 cursor-pointer font-normal text-foreground"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
