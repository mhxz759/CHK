import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, HelpCircle, Clock } from "lucide-react";

export interface CardResultData {
  status: 'Live' | 'Die' | 'Unknown';
  cardNumber: string;
  message: string;
  binInfo?: {
    country?: { name: string; emoji: string };
    bank?: string;
    scheme?: string;
    type?: string;
  };
  responseTime?: number;
}

interface CardResultProps {
  result: CardResultData;
}

export default function CardResult({ result }: CardResultProps) {
  const getStatusColor = () => {
    switch (result.status) {
      case 'Live':
        return 'bg-primary/20 border-primary text-primary';
      case 'Die':
        return 'bg-destructive/20 border-destructive text-destructive';
      case 'Unknown':
        return 'bg-amber-500/20 border-amber-500 text-amber-500';
    }
  };

  const getStatusIcon = () => {
    switch (result.status) {
      case 'Live':
        return <CheckCircle2 className="w-5 h-5 text-primary" />;
      case 'Die':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'Unknown':
        return <HelpCircle className="w-5 h-5 text-amber-500" />;
    }
  };

  const formatBinInfo = () => {
    if (!result.binInfo) return '';
    
    const parts = [];
    if (result.binInfo.country?.emoji) parts.push(result.binInfo.country.emoji);
    if (result.binInfo.scheme) parts.push(result.binInfo.scheme.toUpperCase());
    if (result.binInfo.type) parts.push(result.binInfo.type);
    
    return parts.join(' - ');
  };

  if (result.status === 'Live') {
    return (
      <Card 
        className="p-4 hover-elevate border-l-4"
        style={{ borderLeftColor: 'hsl(var(--primary))' }}
        data-testid="card-result-live"
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={getStatusColor()}>
                  Aprovada
                </Badge>
                <span className="font-mono text-sm font-semibold text-primary" data-testid="text-card-number">
                  {result.cardNumber}
                </span>
              </div>
              
              {result.binInfo && (
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Bandeira: </span>
                    <span className="font-semibold" data-testid="text-scheme">
                      {result.binInfo.scheme?.toUpperCase() || 'N/A'}
                    </span>
                    {result.binInfo.type && (
                      <>
                        <span className="text-muted-foreground"> • Tipo: </span>
                        <span className="capitalize" data-testid="text-type">{result.binInfo.type}</span>
                      </>
                    )}
                  </div>
                  
                  {result.binInfo.bank && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Banco: </span>
                      <span data-testid="text-bank">{result.binInfo.bank}</span>
                    </div>
                  )}
                  
                  {result.binInfo.country && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">País: </span>
                      <span data-testid="text-country">
                        {result.binInfo.country.emoji} {result.binInfo.country.name}
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-3 pt-3 border-t border-border">
                <div className="text-sm text-primary font-semibold">
                  Retorno: Cartão Verificado com Sucesso
                </div>
                {result.responseTime !== undefined && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3" />
                    <span data-testid="text-response-time">Tempo de resposta: {result.responseTime}ms</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="p-4 hover-elevate border-l-4"
      style={{ borderLeftColor: result.status === 'Die' ? 'hsl(var(--destructive))' : '#f59e0b' }}
      data-testid={`card-result-${result.status.toLowerCase()}`}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">
          {getStatusIcon()}
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className={getStatusColor()}>
              {result.status}
            </Badge>
            <span className="font-mono text-sm font-semibold" data-testid="text-card-number">
              {result.cardNumber}
            </span>
          </div>
          
          {result.binInfo && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              {result.binInfo.country && (
                <span data-testid="text-country">
                  {result.binInfo.country.emoji} {result.binInfo.country.name}
                </span>
              )}
              {result.binInfo.scheme && (
                <span className="capitalize" data-testid="text-scheme">{result.binInfo.scheme}</span>
              )}
              {result.binInfo.type && (
                <span className="capitalize" data-testid="text-type">{result.binInfo.type}</span>
              )}
              {result.binInfo.bank && (
                <span className="text-xs" data-testid="text-bank">{result.binInfo.bank}</span>
              )}
            </div>
          )}
          
          <p className="text-sm text-foreground" data-testid="text-message">
            {result.message}
          </p>
          
          {result.responseTime !== undefined && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span data-testid="text-response-time">{result.responseTime}ms</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
