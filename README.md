# FX Exposure Tracker 🛡️

### **Institutional-grade risk mitigation for international supply chains.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

---

## 📺 Product Preview
<img width="1414" height="816" alt="image" src="https://github.com/user-attachments/assets/f6df387b-089d-4146-9b91-ec79fed831db" />

> [View Live Demo] (https://domainschool.github.io/FX-EXPOSURE-TRACKER/

---

## 💼 The Business Problem
For any company operating across borders, the value of their money is constantly "leaking" due to market fluctuations. This is known as **Transaction Exposure**.

### **The Industry Pain Point: "The Profit Eraser"**
Imagine a US-based retailer that buys **$1M** worth of goods from Italy. They agree on a price today but pay in 30 days. If the Euro strengthens by 5% during that window, the goods cost an extra **$50,000**—**wiping out their entire profit margin** without the retailer ever changing their prices.

### **The Risk of Status Quo**
*   **The "Excel Lag":** Manual spreadsheets are updated too slowly for volatile markets.
*   **Invisible Losses:** Without automated monitoring, CFOs often don't realize they've lost money until the quarterly FX Loss report.

---

## 🚀 Core Features & Domain Logic

### **1. Real-Time Risk Monitoring**
Near-real-time tracking of the EUR/USD pair, providing immediate visibility into current exposure costs.

### **2. Market Simulation Lab**
A high-fidelity stress-testing environment where users can override live data to simulate "Euro Rallies" or "USD Strengthening" to see the impact on their bottom line.

### **3. Strategy Advisor**
A logic engine that provides dynamic financial recommendations (e.g., "Execute Forward Contract") based on calculated risk levels.

---

### **🧠 The Domain Logic: The 2% Threshold**
The business value of this tool isn't just showing exchange rates; it’s the **automated intelligence**. 
*   **The Rule:** International businesses can typically absorb small movements (~0.5%).
*   **The Panic Button:** A **2% weekly move** is the industry standard for a "Critical Risk" state.
*   **The Action:** When breached, the tracker triggers a "CRITICAL" UI state (pulsing borders and shake animations), signaling that hedging or pricing changes are required immediately.

---

## 🛠️ Tech Stack & Architecture

*   **Frontend:** React 18 with TypeScript for type-safe financial calculations.
*   **Styling:** Tailwind CSS (Institutional Dark Mode aesthetics).
*   **Animations:** Framer Motion for scroll-reveals and haptic risk alerts.
*   **Analytics:** Recharts for 7-day volatility visualization.

### **How it Works**
1.  **Data Ingestion:** Fetches live mid-market rates from the **ExchangeRate-API**.
2.  **Logic Engine:** A custom React hook processes the live rate against 7-day historical mocks.
3.  **Risk Evaluation:** The engine compares the delta against the 2% threshold.
4.  **UI Orchestration:** Subscribes the Dashboard and Simulation Lab to the risk state to trigger global UI changes.

---

## ⚙️ Getting Started

### **Prerequisites**
* [Node.js](https://nodejs.org/) (v18+)
* [pnpm](https://pnpm.io/) (Strictly Recommended)

### **Installation**

1.  **Clone the Repo**
    ```bash
    git clone https://github.com/your-username/fx-exposure-tracker.git
    ```

2.  **Install Dependencies**
    ```bash
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root and add your API key:
    ```env
    VITE_EXCHANGE_RATE_API_KEY=your_key_here
    ```

4.  **Run Development Server**
    ```bash
    pnpm dev
    ```

---

## 🗺️ What's Next? (Enterprise Roadmap)
*   [ ] **Automated Hedging:** Direct integration with bank APIs (like Stripe Treasury) to buy Forward Contracts.
*   [ ] **AI-Driven Forecasting:** Predictive modeling of "What-If" scenarios using 10 years of historical tick data.
*   [ ] **Compliance Engine:** Automated IFRS 9 / ASC 815 accounting logs for treasury audits.

---

## 🏛️ Built with the Domain School Framework
This project was developed as part of a mission to bridge the gap between technical execution and industry domain knowledge. We build software that solves real-world business problems.

**Want to build software that moves the needle?**
[Follow Domain School on LinkedIn](https://www.linkedin.com/company/domain-school) | [Join the Masterclass](https://domain.school)

---
*Transforming Engineers into Strategists.*
