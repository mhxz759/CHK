import { useState } from 'react';
import CardGeneratorModal from '../CardGeneratorModal';
import { Button } from '@/components/ui/button';

export default function CardGeneratorModalExample() {
  const [open, setOpen] = useState(false);
  
  const handleGenerate = (cards: string[]) => {
    console.log('Generated cards:', cards);
  };
  
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Generator</Button>
      <CardGeneratorModal 
        open={open} 
        onOpenChange={setOpen}
        onGenerate={handleGenerate}
      />
    </div>
  );
}
