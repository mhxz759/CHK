import CardResult from '../CardResult';

export default function CardResultExample() {
  const liveResult = {
    status: 'Live' as const,
    cardNumber: '4242424242424242|12|2025|123',
    message: 'Card verified successfully',
    binInfo: {
      country: { name: 'United States', emoji: '🇺🇸' },
      bank: 'Chase Bank',
      scheme: 'visa',
      type: 'credit'
    },
    responseTime: 245
  };

  const dieResult = {
    status: 'Die' as const,
    cardNumber: '4066553535156500|08|2030|414',
    message: 'Your card is declined',
    binInfo: {
      country: { name: 'Brazil', emoji: '🇧🇷' },
      scheme: 'visa',
      type: 'credit'
    },
    responseTime: 189
  };

  const unknownResult = {
    status: 'Unknown' as const,
    cardNumber: '4066554445210742|03|2030|002',
    message: 'Request Timeout',
    binInfo: {
      country: { name: 'Brazil', emoji: '🇧🇷' },
      scheme: 'visa',
      type: 'credit'
    },
    responseTime: 5002
  };

  return (
    <div className="space-y-4 p-6 bg-background">
      <CardResult result={liveResult} />
      <CardResult result={dieResult} />
      <CardResult result={unknownResult} />
    </div>
  );
}
