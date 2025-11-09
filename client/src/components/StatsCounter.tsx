import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

interface StatsCounterProps {
  live: number;
  die: number;
  unknown: number;
}

export default function StatsCounter({ live, die, unknown }: StatsCounterProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">Live</span>
        <Badge 
          variant="outline" 
          className="bg-primary/20 border-primary text-primary font-mono"
          data-testid="badge-live-count"
        >
          {live}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <XCircle className="w-4 h-4 text-destructive" />
        <span className="text-sm font-medium text-muted-foreground">Die</span>
        <Badge 
          variant="outline" 
          className="bg-destructive/20 border-destructive text-destructive font-mono"
          data-testid="badge-die-count"
        >
          {die}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-medium text-muted-foreground">Unknown</span>
        <Badge 
          variant="outline" 
          className="bg-amber-500/20 border-amber-500 text-amber-500 font-mono"
          data-testid="badge-unknown-count"
        >
          {unknown}
        </Badge>
      </div>
    </div>
  );
}
