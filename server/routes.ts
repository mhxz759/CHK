import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

const checkCardSchema = z.object({
  card: z.string(),
});

interface BinListResponse {
  scheme?: string;
  type?: string;
  brand?: string;
  country?: {
    name: string;
    emoji: string;
    alpha2: string;
  };
  bank?: {
    name: string;
  };
}

interface CheckResponse {
  code: number;
  status: string;
  message: string;
  card?: {
    card: string;
    bank?: string;
    type?: string;
    category?: string;
    brand?: string;
    country?: {
      name: string;
      code: string;
      emoji: string;
    };
  };
}

async function fetchBinInfo(bin: string): Promise<BinListResponse | null> {
  try {
    const response = await fetch(`https://lookup.binlist.net/${bin}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('BIN lookup error:', error);
    return null;
  }
}

async function checkCard(cardData: string): Promise<CheckResponse> {
  try {
    const response = await fetch('https://api.chkr.cc/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: cardData }),
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Card check error:', error);
    return {
      code: 2,
      status: 'Unknown',
      message: 'Request failed or timeout',
    };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/check-card", async (req, res) => {
    try {
      const { card } = checkCardSchema.parse(req.body);
      
      const startTime = Date.now();
      
      // Check card with chkr.cc API
      const checkResult = await checkCard(card);
      
      const responseTime = Date.now() - startTime;
      
      // Extract BIN from card number
      const bin = card.split('|')[0]?.slice(0, 6);
      let binInfo: BinListResponse | null = null;
      
      if (bin && bin.length === 6) {
        binInfo = await fetchBinInfo(bin);
      }
      
      // Merge results
      const result = {
        status: checkResult.status,
        cardNumber: card,
        message: checkResult.message,
        binInfo: binInfo ? {
          country: binInfo.country,
          bank: binInfo.bank?.name,
          scheme: binInfo.scheme,
          type: binInfo.type,
        } : undefined,
        responseTime,
      };
      
      res.json(result);
    } catch (error) {
      console.error('Error checking card:', error);
      res.status(400).json({ error: 'Invalid request' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
