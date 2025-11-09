import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CardInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CardInputArea({ value, onChange, placeholder }: CardInputAreaProps) {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="space-y-2">
        <Label htmlFor="card-input" className="text-base font-semibold">
          Card Input
        </Label>
        <p className="text-sm text-muted-foreground">
          Format: <span className="font-mono text-primary">number|month|year|cvv</span>
        </p>
      </div>
      
      <Textarea
        id="card-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "4242424242424242|12|2025|123\n5555555555554444|01|2026|456"}
        className="flex-1 font-mono text-sm resize-none bg-card border-border focus-visible:ring-primary min-h-[500px]"
        data-testid="textarea-card-input"
      />
    </div>
  );
}
