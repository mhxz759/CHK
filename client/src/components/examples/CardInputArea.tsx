import { useState } from 'react';
import CardInputArea from '../CardInputArea';

export default function CardInputAreaExample() {
  const [value, setValue] = useState("4242424242424242|12|2025|123\n5555555555554444|01|2026|456");
  
  return <CardInputArea value={value} onChange={setValue} />;
}
