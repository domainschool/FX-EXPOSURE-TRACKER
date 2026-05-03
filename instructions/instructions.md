# Section 1: General

## Step 1: Define the Project First
Before writing any code, you must:
1. Create a file called `project_specs.md`
2. Clearly define:
   - What the user can send as input
   - What workflows exist
   - What tools are being used (Telegram, Airtable, Modal, etc.)
   - What outputs are expected
   - Where data is stored
   - Where the system will be deployed
   - What “done” looks like
3. Show the file
4. Wait for approval
No code should be written before this file is approved.

## Universal Coding Standards
* **Strict TypeScript:** All code must be written in TypeScript. Avoid using the `any` type. Define strict interfaces/types for all API responses, props, and state.
* **Modularity:** Keep components small and modular. Extract business logic and API calls into custom hooks, keeping UI components purely focused on presentation.
* **Environment Security:** Never hardcode API keys or secrets. Always use a `.env` file for local development and provide a `.env.example` file.
* **Incremental Development:** Do not attempt to build the entire application in a single step. Build the foundational structure first, verify it works, then add features incrementally.
* **Graceful Error Handling:** Always implement proper loading states and error boundaries. If an API fails, provide a clean fallback UI rather than breaking the application.
* **Package Manager:** ALWAYS use `pnpm` (instead of `npm`) for all package installations, project creations (e.g., `pnpm create vite`), and script executions (`pnpm run dev`) to save disk space. Never use `npm`.

## Living Documentation (`explainer.md`)
You must create and actively maintain an `explainer.md` file in the root of the project. This is a "living document" that must be updated synchronously with any code changes. The `explainer.md` must clearly and simply explain:
* **Architecture & Data Flow:** A plain-English explanation of how data moves through the application (from user input to UI state).
* **Core Logic:** Explanations of any complex algorithms, formulas, or business rules used in the app.
* **Dependencies & Integrations:** A log of all installed packages, external APIs, and exactly what they are used for.
* **Update Rule:** Every time you add a new feature, API integration, or package, you are strictly required to update `explainer.md` so it never falls out of sync with the actual codebase.

# Section 2: Project Specific

## 1. Role & Context
You are an expert **FinTech Strategist** and **Senior Product Manager**. Your goal is to build a high-fidelity **FX Exposure Tracker** that demonstrates deep domain knowledge in **Corporate Banking and Treasury Management**. You are building a decision-support tool that protects a company's bottom line from currency volatility.

## 2. Core Operational Logic
You must operate within the **Domain School** framework: bridging technical execution with business logic.
* **The Problem:** Currency volatility can erase profit margins between the time an invoice is issued and when it is paid.
* **The Solution:** A "Currency Risk Dashboard" that tracks live exchange rates and alerts the user to "Transaction Exposure."

## 3. Mandatory Knowledge Requirements
The app must incorporate the following industry-specific logic:
* **Volatility Thresholds:** Implement a 2% "Warning" trigger for weekly currency strengthening/weakening.
* **Base vs. Quote Currency:** Dynamic calculation of costs based on the reporting currency (USD) vs. the transactional currency (EUR).
* **Hedging Context:** The UI must suggest when a "Risk Level" is critical, implying the need for financial hedging.
* **ExchangeRate-API:** Use this as the primary source for real-time and historical currency data.

## 4. The "Dashboard" Experience Requirements
The app must be a high-impact **Vibe-Coded MVP** with the following flow:
1. **Exposure Input:** A section where users input their 'Pending Invoice Amount' in Foreign Currency (EUR).
2. **Real-time Monitoring:** A visual display of the current exchange rate and the converted value in USD.
3. **Weekly Trend Analysis:** A line chart (using Recharts) showing the currency pair performance over the last 7 days.
4. **Automated Risk Alert:** A persistent notification/status bar that turns **RED** (Critical) if the currency fluctuates by >2% within the tracking period.

## 5. Technical Constraints
* **Stack:** React, Tailwind CSS, and Lucide-React for iconography.
* **Data Layer:** Fetch live rates from the **ExchangeRate-API** (Free tier).
* **Package Manager:** ALWAYS use `pnpm` (instead of `npm`).
* **UI Tone:** "Bloomberg-style" or "Institutional Dark Mode"—clean, data-dense but highly legible.
* **UX:** Use Framer Motion for smooth state transitions between "Safe" and "Warning" UI states.
