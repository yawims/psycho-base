// minikit.config.ts

const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * Psycho Base – Onchain Personality Quiz Mini App
 */
export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjUxNzQwMCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDFEOWE1QWU2Yzg0QzIzNTMzZUI2YTAxOURDODA1N2NkZDcwYUI4MzEifQ",
    payload: "eyJkb21haW4iOiJwc3ljaG8tYmFzZS52ZXJjZWwuYXBwIn0",
    signature: "8SFA8oZCrZIWNiv9qhjba6Ox85a33F65w2+UyPTn/K0q8VaZ1jvcPgpPYXns6PFyC5sZuJUKPfSb+cs+6fWquRw="
  },
  baseBuilder: {
    ownerAddress: "0xDF791bF8449B39c17DF06a83104c1286d271A539"
  },
  miniapp: {
    version: "1",
    name: "Psycho Base",
    subtitle: "Onchain Personality Test",
    description: "10 wild questions. Discover how psycho you really are on Base.",
    iconUrl: `${ROOT_URL}/icon.png`,                    // 512×512 required
    screenshotUrls: [
      `${ROOT_URL}/screenshot-1.png`,   // portrait screenshot (required)
      `${ROOT_URL}/screenshot-2.png`,   // extra screenshot (highly recommended)
    ],
    splashImageUrl: `${ROOT_URL}/hero.png`,
    splashBackgroundColor: "#0d001a",                   // dark purple-black vibe
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,              // do not change
    primaryCategory: "games" as const,                  // or "entertainment"
    tags: ["quiz", "personality", "fun", "base", "onchain"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "How psycho are you on Base?",
    ogTitle: "Psycho Base — Personality",
    ogDescription:
      "Answer 10 questions and get your psycho level instantly. Share results on Warpcast!",
    ogImageUrl: `${ROOT_URL}/og.png`,
    enableGPT5Mini: true,                               // Enable GPT-5 mini for all clients
  },
} as const;