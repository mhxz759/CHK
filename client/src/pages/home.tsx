import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Settings2, Trash2 } from "lucide-react";
import StatsCounter from "@/components/StatsCounter";
import CardInputArea from "@/components/CardInputArea";
import CardResult, { type CardResultData } from "@/components/CardResult";
import CardGeneratorModal from "@/components/CardGeneratorModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

type CategoryFilter = 'all' | 'Live' | 'Die' | 'Unknown';

export default function Home() {
  const [cardInput, setCardInput] = useState("");
  const [results, setResults] = useState<CardResultData[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const stats = {
    live: results.filter(r => r.status === 'Live').length,
    die: results.filter(r => r.status === 'Die').length,
    unknown: results.filter(r => r.status === 'Unknown').length,
  };

  const filteredResults = activeCategory === 'all' 
    ? results 
    : results.filter(r => r.status === activeCategory);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [results]);

  const handleCheck = async () => {
    const cards = cardInput.split('\n').filter(line => line.trim());
    if (cards.length === 0) {
      toast({
        title: "No cards to check",
        description: "Please enter at least one card",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    
    for (const card of cards) {
      try {
        const response = await fetch('/api/check-card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ card: card.trim() }),
        });

        if (!response.ok) {
          throw new Error('Failed to check card');
        }

        const result: CardResultData = await response.json();
        setResults(prev => [...prev, result]);
      } catch (error) {
        console.error('Error checking card:', error);
        
        const errorResult: CardResultData = {
          status: 'Unknown',
          cardNumber: card,
          message: 'Failed to check card - network error',
          responseTime: 0,
        };
        
        setResults(prev => [...prev, errorResult]);
      }
    }
    
    setIsChecking(false);
    toast({
      title: "Check complete",
      description: `Checked ${cards.length} card(s)`,
    });
  };

  const handleGenerate = (cards: string[]) => {
    setCardInput(cards.join('\n'));
    toast({
      title: "Cards generated",
      description: `Generated ${cards.length} card(s)`,
    });
  };

  const handleClearResults = () => {
    setResults([]);
    setActiveCategory('all');
    toast({
      title: "Results cleared",
      description: "All results have been removed",
    });
  };

  const getCategoryButtonClass = (category: CategoryFilter) => {
    const isActive = activeCategory === category;
    const baseClass = "gap-2 font-mono";
    
    if (category === 'Live') {
      return `${baseClass} ${isActive ? 'bg-primary text-primary-foreground' : 'hover-elevate'}`;
    } else if (category === 'Die') {
      return `${baseClass} ${isActive ? 'bg-destructive text-destructive-foreground' : 'hover-elevate'}`;
    } else if (category === 'Unknown') {
      return `${baseClass} ${isActive ? 'bg-amber-500 text-black' : 'hover-elevate'}`;
    }
    return `${baseClass} ${isActive ? '' : 'hover-elevate'}`;
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Card Checker</h1>
          </div>
          
          <StatsCounter live={stats.live} die={stats.die} unknown={stats.unknown} />
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleCheck}
              disabled={isChecking || !cardInput.trim()}
              className="gap-2"
              data-testid="button-check-cards"
            >
              <Play className="w-4 h-4" />
              {isChecking ? 'Checking...' : 'Start Check'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowGenerator(true)}
              className="gap-2"
              data-testid="button-open-generator"
            >
              <Settings2 className="w-4 h-4" />
              Generator
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-2/5 border-r border-border p-6">
          <CardInputArea
            value={cardInput}
            onChange={setCardInput}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={activeCategory === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory('all')}
                className="gap-2 font-mono"
                data-testid="button-filter-all"
              >
                All ({results.length})
              </Button>
              <Button
                variant={activeCategory === 'Live' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory('Live')}
                className={getCategoryButtonClass('Live')}
                data-testid="button-filter-live"
              >
                Live ({stats.live})
              </Button>
              <Button
                variant={activeCategory === 'Die' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory('Die')}
                className={getCategoryButtonClass('Die')}
                data-testid="button-filter-die"
              >
                Die ({stats.die})
              </Button>
              <Button
                variant={activeCategory === 'Unknown' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory('Unknown')}
                className={getCategoryButtonClass('Unknown')}
                data-testid="button-filter-unknown"
              >
                Unknown ({stats.unknown})
              </Button>
            </div>
            
            {results.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearResults}
                className="gap-2"
                data-testid="button-clear-results"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </Button>
            )}
          </div>
          
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-6 space-y-4">
              {filteredResults.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  {results.length === 0 
                    ? "No results yet. Add cards and click \"Start Check\" to begin."
                    : `No ${activeCategory} results.`
                  }
                </div>
              ) : (
                filteredResults.map((result, index) => (
                  <CardResult key={index} result={result} />
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      <CardGeneratorModal
        open={showGenerator}
        onOpenChange={setShowGenerator}
        onGenerate={handleGenerate}
      />
    </div>
  );
}
