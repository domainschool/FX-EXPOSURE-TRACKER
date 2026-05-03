To build an "Institutional Grade" dashboard with a focus on high-end UI, we will use an Incremental Vibe-Coding approach. This ensures the logic is sound before we layer on the complex animations and visual polish.

Feed these prompts one by one to your AI Agent Builder. Verify and test the output of each step before moving to the next.

Step 1: The "Bloomberg" Foundation

Prompt: Initialize a Vite project using React, TypeScript, and Tailwind CSS. Use pnpm. Create a "Bloomberg-style" UI Shell: a dark-mode layout with a deep slate background (#0b0e14), a top navigation bar showing "FX EXPOSURE TRACKER" in a monospaced font, and a sidebar for navigation. Add a "Market Status" indicator in the header that shows a green pulse if the system is "Live."

Step 2: The Data Engine (API Integration)

Prompt: Create a custom hook useFXData to fetch the current EUR/USD exchange rate from ExchangeRate-API. Define a strict TypeScript interface for the API response. Display the "Live Rate" in a large, high-visibility "Hero Stat" card in the center of the dashboard. Include a "Last Updated" timestamp and a manual "Refresh" button using Lucide-React icons.

Step 3: The Business Input (Exposure Logic)

Prompt: Build an "Exposure Calculator" card. It should have a labeled input field for "Invoice Amount (EUR)." As the user types, it should dynamically calculate the "Current USD Value" based on the live rate from Step 2. Style this using a glassmorphism effect (semi-transparent background with a subtle border-glow). Use Framer Motion to animate the numbers as they change.

Step 4: The 7-Day Trend (Visual Analytics)

Prompt: Integrate Recharts. Create a "Weekly Volatility" line chart that shows the EUR/USD trend for the last 7 days. (Note: You may need to use the API's historical endpoint or mock 7 days of data for the MVP). The line should be a vibrant neon blue with a gradient area fill. Add a custom tooltip that shows the rate and the % change from the previous day.

Step 5: The "Red Alert" (Risk Threshold)

Prompt: Implement the Industry Logic: Calculate the percentage difference between the current rate and the rate from 7 days ago. If the Euro has strengthened by > 2% against the USD, trigger a "CRITICAL RISK" state.

Change the card border to a pulsing red.

Display a "Hedging Recommended" banner.

Use Framer Motion for a "shake" animation on the Risk Card when the threshold is breached.

Step 6: The "Institutional" Polish

Prompt: Final UI pass. Add a "Global Market Ticker" at the very bottom of the screen scrolling other major pairs (GBP/USD, USD/JPY) using a marquee effect. Ensure all typography uses a clean, professional sans-serif (like Inter) with monospaced numbers for financial data. Add subtle "hover" states to all interactive cards using transition-all and scale-105.

Step 7: Viewed explainer.md:1-22

That is an excellent idea. Adding a **Market Simulation Lab** transforms the dashboard from a purely reactive tool into a powerful **strategic simulator**. This perfectly aligns with the "Domain School" philosophy of becoming "Business-Fluent" by allowing users to visualize the exact moment margin erosion occurs.

### My Proposed Implementation:

**1. "Market Simulation Lab" Component**
I will add a new, premium card section below the current dashboard cards. It will be styled with a distinct **Indigo/Violet** theme to differentiate "Simulated" actions from "Live" market data.

**2. Practical Features:**
*   **Scenario Presets:** Quick-action buttons for:
    *   `Stable Market` (0.2% change)
    *   `Euro Rally` (+3.5% — *will trigger Critical Risk*)
    *   `USD Strengthening` (-2.5% — *favorable for US importers*)
*   **Manual Override:** A high-fidelity slider that allows the user to manually "bend" the 7-day volatility from -5% to +5% to see the UI react in real-time.

**3. "Strategy Advisor" Panel:**
Instead of just showing "Red", I will implement a dynamic advisor that provides specific financial recommendations based on the risk level:
*   **< 1% Change:** "Status: Optimized. No action required. Maintain current spot-market strategy."
*   **1% - 2% Change:** "Status: Warning. Volatility increasing. Review outstanding EUR invoices for next 60 days."
*   **> 2% Change:** "Status: CRITICAL. Margin erosion imminent. **Recommended Action:** Execute Forward Contract or Currency Option to lock in rates."

**4. Logic Integration:**
I will update the `isCritical` and `percentChange` calculations to support a "Simulation Mode." When enabled, the entire dashboard (including the pulsing borders and the Red Alert banner) will respond to the simulated values instead of the live API data.

**How does this plan sound to you?** If you approve, I can implement this "Simulation Lab" right away.