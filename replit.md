# Card Checker Application

A professional credit card validation tool with real-time BIN lookup and card generation capabilities.

## Overview
This application validates credit cards using external APIs and provides detailed BIN (Bank Identification Number) information. It features a sleek dark theme with green, black, and white colors for a modern hacker/fintech aesthetic.

## Features

### Card Validation
- Validates credit cards using the chkr.cc API
- Real-time status checking (Live/Die/Unknown)
- Bulk card checking support (multiple cards at once)
- Response time tracking for each validation

### BIN Lookup
- Automatic BIN information retrieval from binlist.net
- Displays card details:
  - Country (with flag emoji)
  - Bank name
  - Card scheme (Visa, Mastercard, etc.)
  - Card type (Credit/Debit)

### Card Generator
- Generates valid credit card numbers using the Luhn algorithm
- Customizable BIN input
- Configurable month, year, and CVV
- Adjustable quantity (1-100 cards)
- Random or specific values for month/year

### User Interface
- Dark theme with neon green accents
- Two-column layout: input area and results feed
- Real-time statistics counters (Live/Die/Unknown)
- Auto-scrolling results
- Clear results functionality

## Technical Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- Wouter for routing
- TanStack Query for data fetching

### Backend
- Express.js server
- Integration with external APIs:
  - https://api.chkr.cc/ - Card validation
  - https://lookup.binlist.net/ - BIN information

### Color Scheme
- **Primary Green**: `hsl(120 100% 50%)` - Live status, accents
- **Background Black**: `hsl(0 0% 0%)` - Pure black base
- **Card Surface**: `hsl(0 0% 10%)` - Elevated surfaces
- **Destructive Red**: `hsl(0 84% 60%)` - Die status
- **Warning Amber**: `#f59e0b` - Unknown status

## API Endpoints

### POST /api/check-card
Validates a credit card and fetches BIN information.

**Request:**
```json
{
  "card": "4242424242424242|12|2025|123"
}
```

**Response:**
```json
{
  "status": "Live|Die|Unknown",
  "cardNumber": "4242424242424242|12|2025|123",
  "message": "Card verified successfully",
  "binInfo": {
    "country": {
      "name": "Brazil",
      "emoji": "🇧🇷"
    },
    "bank": "Banco Do Estado Do Rio Grande Do Sul",
    "scheme": "visa",
    "type": "credit"
  },
  "responseTime": 245
}
```

## Card Format
Cards must be in the format: `number|month|year|cvv`

Examples:
- `4242424242424242|12|2025|123`
- `5555555555554444|01|2026|456`

## Recent Changes (November 9, 2025)
- ✅ Created complete dark-themed UI design
- ✅ Implemented card input area and results display
- ✅ Built card generator with Luhn algorithm
- ✅ Integrated with chkr.cc API for card validation
- ✅ Integrated with binlist.net API for BIN lookup
- ✅ Added real-time statistics tracking
- ✅ Implemented auto-scrolling results feed
- ✅ Added response time tracking
- ✅ Full end-to-end testing completed

## Usage

1. **Generate Cards**: Click the "Generator" button (settings icon) to open the card generator modal
2. **Enter BIN**: Input a 6-8 digit BIN number
3. **Configure**: Set month, year, CVV, and quantity
4. **Generate**: Click "Generate" to create valid card numbers
5. **Check Cards**: Click "Start Check" to validate all cards in the input area
6. **View Results**: Results appear in real-time on the right side with full details
7. **Clear**: Use the "Clear" button to remove all results

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── StatsCounter.tsx       # Live/Die/Unknown counters
│   │   ├── CardInputArea.tsx      # Bulk card input
│   │   ├── CardResult.tsx         # Individual result display
│   │   └── CardGeneratorModal.tsx # Card generation modal
│   └── pages/
│       └── home.tsx                # Main application page
server/
└── routes.ts                       # API endpoints and integrations
```

## Development

The application runs on port 5000 with hot reload enabled.

### Testing
Comprehensive end-to-end tests verify:
- UI rendering and navigation
- Card generator functionality
- Card validation API integration
- Results display and formatting
- Statistics counter updates
- Clear functionality

## Notes
- No database required (stateless utility tool)
- External API dependencies (chkr.cc, binlist.net)
- BIN lookup may fail for some card numbers if not in binlist database
- Response times vary based on external API performance
