# FX Exposure Tracker - Living Documentation

## Architecture & Data Flow
The application is now a fully polished, institutional-grade decision support tool with integrated training capabilities.
- **Frontend Framework:** React via Vite.
- **UI Architecture:** 
    - **Global Market Ticker:** A persistent footer component uses CSS keyframe animations for a seamless scrolling marquee of global currency pairs.
    - **Market Simulation Lab:** A dedicated simulation environment that allows users to override live data to test risk scenarios.
- **Data Flow:** 
    1. Real-time rates power the Hero Stat and Exposure Calculator.
    2. Historical data drives the volatility chart and risk alerts.
    3. **Simulation Logic:** When enabled, the `isSimulationMode` flag redirects the risk calculation engine to use the `simulatedVolatility` state instead of live market data.

## Core Logic
- **UI State & UX:** 
    - **Strategy Advisor:** A logic engine that maps percentage volatility to specific financial actions (e.g., "Execute Forward Contract").
    - **Hover Dynamics:** Interactive cards feature scale transitions and glow effects for tactile feedback.
- **Simulation Scenarios:** 
    - Includes presets for "Stable Market", "Euro Rally" (+3.5%), and "USD Strength" (-2.5%).
    - A manual slider provides granular control from -5% to +5% volatility.

## Dependencies & Integrations
- **`tailwindcss`**: Custom animations (marquee, pulsing) and simulation-specific themes.
- **`framer-motion`**: Orchestrates state transitions, risk-based shake animations, and simulation entry effects.
- **`lucide-react`**: Provides the iconography across the dashboard, about page, and simulation lab.

*Note: This document will be updated as we integrate the data engine, exposure calculator, and charting features.*
