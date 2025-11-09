import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard } from "lucide-react";

interface CardGeneratorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (cards: string[]) => void;
}

export default function CardGeneratorModal({
  open,
  onOpenChange,
  onGenerate,
}: CardGeneratorModalProps) {
  const [bin, setBin] = useState("");
  const [month, setMonth] = useState("random");
  const [year, setYear] = useState("random");
  const [cvv, setCvv] = useState("");
  const [quantity, setQuantity] = useState("10");

  const generateLuhnCard = (bin: string): string => {
    let cardNumber = bin.padEnd(15, '0');
    let sum = 0;
    let isEven = true;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    return cardNumber + checkDigit;
  };

  const handleGenerate = () => {
    if (!bin || bin.length < 6) {
      alert("Please enter a valid BIN (at least 6 digits)");
      return;
    }

    const qty = parseInt(quantity) || 10;
    const cards: string[] = [];

    for (let i = 0; i < qty; i++) {
      const cardNumber = generateLuhnCard(bin);
      const cardMonth = month === "random" 
        ? String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
        : month;
      const cardYear = year === "random"
        ? String(2025 + Math.floor(Math.random() * 8))
        : year;
      const cardCvv = cvv || String(Math.floor(Math.random() * 900) + 100);
      
      cards.push(`${cardNumber}|${cardMonth}|${cardYear}|${cardCvv}`);
    }

    onGenerate(cards);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="modal-card-generator">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Card Generator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="bin">BIN</Label>
            <Input
              id="bin"
              placeholder="406655"
              value={bin}
              onChange={(e) => setBin(e.target.value.replace(/\D/g, ''))}
              className="font-mono"
              maxLength={8}
              data-testid="input-bin"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger id="month" data-testid="select-month">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Random</SelectItem>
                  {Array.from({ length: 12 }, (_, i) => {
                    const m = String(i + 1).padStart(2, '0');
                    return <SelectItem key={m} value={m}>{m}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger id="year" data-testid="select-year">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Random</SelectItem>
                  {Array.from({ length: 10 }, (_, i) => {
                    const y = String(2025 + i);
                    return <SelectItem key={y} value={y}>{y}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="Leave blank to random"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                className="font-mono"
                maxLength={4}
                data-testid="input-cvv"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="font-mono"
                data-testid="input-quantity"
              />
            </div>
          </div>

          <Button 
            onClick={handleGenerate} 
            className="w-full"
            data-testid="button-generate"
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
