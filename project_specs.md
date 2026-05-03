# Project Specifications: FX Exposure Tracker

## 1. What the user can send as input
- **Invoice Amount (EUR):** The user can input a numerical value representing a pending invoice amount in Euros (Foreign Currency) into a dedicated "Exposure Calculator" card.

## 2. What workflows exist
- **Real-Time Rate Fetching:** Upon loading (and via a manual "Refresh" button), the system fetches the live EUR/USD exchange rate.
- **Dynamic Conversion:** As the user types the EUR invoice amount, the system dynamically calculates and animates the equivalent Current USD Value using the live rate.
- **Historical Trend Analysis:** The system generates a "Weekly Volatility" line chart using 7-day historical exchange rate data.
- **Risk Assessment & Alerting:** The system continuously evaluates the currency pair's performance over the last 7 days. If the Euro strengthens against the USD by > 2% (Warning Threshold), the system triggers a "CRITICAL RISK" UI state, displaying a "Hedging Recommended" banner, turning the UI red, and applying a shake animation.

## 3. What tools are being used
- **Core Frameworks:** React (via Vite), TypeScript
- **Styling & UI:** Tailwind CSS, Framer Motion (for animations and micro-interactions), Lucide-React (for icons)
- **Data Visualization:** Recharts (for the 7-day trend line chart)
- **External APIs:** ExchangeRate-API (Free tier) for real-time and historical currency data.
- **Package Management:** `pnpm` (strictly mandated)

## 4. What outputs are expected
- A high-fidelity, "Bloomberg-style" or "Institutional Dark Mode" web dashboard.
- A "Hero Stat" card displaying the live EUR/USD rate with a timestamp.
- An interactive Exposure Calculator with glassmorphism effects.
- A neon blue line chart displaying the 7-day volatility trend with a custom tooltip.
- A "Global Market Ticker" at the bottom of the screen showing scrolling pairs (e.g., GBP/USD, USD/JPY).
- A maintained `explainer.md` file documenting architecture, logic, and dependencies.

## 5. Where data is stored
- Data is transient and stored entirely in client-side **React State**. There is no backend database for this MVP. Real-time and historical rate data is fetched directly from the external API on the fly.

## 6. Where the system will be deployed
- The frontend dashboard will be deployable as a static site. Standard modern frontend platforms like **Vercel**, **Netlify**, or standard static hosting would be the target deployment environments.

## 7. What "done" looks like
The project is complete when:
- The dashboard is successfully built using the "Incremental Vibe-Coding" approach through all 6 steps defined in `prompts.md`.
- All institutional-grade UI requirements (dark slate background `#0b0e14`, Inter font, monospaced numbers, marquee ticker, hover states) are implemented.
- The 2% volatility business logic is functioning perfectly, transitioning the application between "Safe" and "Warning/Critical" UI states.
- The `explainer.md` file is completely up-to-date and accurately reflects the built system.
- Code adheres to strict TypeScript standards without `any` types, and `pnpm` was used exclusively for dependency management.
