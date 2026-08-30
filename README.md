# RailForecast AI — Operations & Dynamic ETA Intelligence Platform

> **AI-powered railway operational intelligence platform for monitoring coaching trains and predicting dynamic ETA.**

---

## 🚆 Overview

**RailForecast AI** provides real-time train telemetry, dynamic ETA prediction with neural factor decomposition, network-wide congestion analysis, and automated operational risk mitigation for railway controllers and dispatchers.

---

## 🛠️ Technology Stack

- **Core**: React 18, TypeScript (Strict Mode)
- **Build & Dev Server**: Vite 6
- **Routing**: React Router v6
- **Styling**: Tailwind CSS (with custom Material Design 3 / Indian Railways tokens), Glassmorphism utilities, CSS custom animations
- **Icons**: Google Material Symbols Outlined
- **Typography**: Inter (Body/Headlines) & JetBrains Mono (Telemetry, Delays & Timestamps)

---

## 📁 Clean Project Architecture

```
stitch_railforecast_ai_operations_dashboard/
├── dist/                          # Production build output
├── node_modules/                  # Installed dependencies
├── public/                        # Static public assets
├── src/
│   ├── components/
│   │   ├── alerts/                # Alerts KPIs, Active alerts table, Timeline, AI Intelligence
│   │   ├── analytics/             # Delay trend chart, On-time donut, Accuracy, Corridor table
│   │   ├── common/                # Reusable badges, StatCard, ConfidenceBar, Modals (Simulation, Alerts, Export)
│   │   ├── dashboard/             # 5 Top KPIs, Network Health, Schematic Map, AI Insights, Recent Changes
│   │   ├── forecast/              # Conventional vs AI ETA Hero, Factor breakdown, Trend chart, Confidence
│   │   ├── layout/                # Navy Sidebar, TopNavbar, Global Status Footer, AppLayout
│   │   ├── network/               # Cyber-physical visualizer, Network intelligence, Live activity table
│   │   ├── routes/                # Journey visualizer, Station predictions, Delay propagation chart, Risks
│   │   └── trains/                # Fleet metrics, Search & filter, Fleet table, Live train details view
│   ├── data/                      # Realistic mock domain datasets (trains, alerts, network, analytics, system)
│   ├── types/                     # Strongly-typed TypeScript interfaces (train, alert, network, simulation, etc.)
│   ├── pages/                     # 11 Dedicated page views
│   │   ├── DashboardPage.tsx      # Route: /
│   │   ├── TrainMonitoringPage.tsx# Route: /train-monitoring
│   │   ├── TrainDetailPage.tsx    # Route: /train/:id and /train-monitoring/:id
│   │   ├── LiveNetworkPage.tsx    # Route: /live-network
│   │   ├── AIEtaForecastPage.tsx  # Route: /eta-forecast and /eta-forecast/:id
│   │   ├── RoutePredictionsPage.tsx# Route: /route-predictions and /route-predictions/:id
│   │   ├── AlertsPage.tsx         # Route: /alerts
│   │   ├── AnalyticsPage.tsx      # Route: /analytics
│   │   ├── SystemStatusPage.tsx   # Route: /system-status
│   │   ├── SettingsPage.tsx       # Route: /settings
│   │   └── ProfilePage.tsx        # Route: /profile
│   ├── App.tsx                    # React Router configuration
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles, Tailwind directives, design tokens
├── index.html                     # Vite single-page application entry point
├── package.json                   # Project metadata, dependencies, scripts
├── postcss.config.js              # PostCSS configuration for Tailwind
├── tailwind.config.js             # Extended color tokens, elevation shadows, typography
├── tsconfig.json                  # TypeScript compiler configuration
├── tsconfig.node.json             # Vite Node TypeScript configuration
└── vite.config.ts                 # Vite bundler configuration (port 3000)
```

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates production-optimized static assets in `dist/`.

### 4. Type Checking
```bash
npx tsc --noEmit
```

---

## 🎯 Key Application Views & Features

| View | Route | Description |
| :--- | :--- | :--- |
| **Operations Dashboard** | `/` | Real-time monitoring hub with 5 KPIs, live schematic track map, recent ETA changes, and critical operational alerts. |
| **Train Monitoring** | `/train-monitoring` | Searchable & filterable fleet table with speed meters, delay badges, and AI recovery vectors. |
| **Live Train Details** | `/train/:id` | Detailed train telemetry, dynamic speed gauge, journey progression bar, stop breakdown, and interlocking events. |
| **Live Network** | `/live-network` | Cyber-physical dark map visualizer with station nodes (NDLS to HWH), glowing route segments, and floating train cards. |
| **AI ETA Forecast** | `/eta-forecast/:id` | Conventional vs AI dynamic ETA comparison hero, mathematical factor decomposition, and trend graphs. |
| **Route Predictions** | `/route-predictions/:id` | Remaining journey visualizer, station-by-station delay propagation chart, risk analysis, and dispatcher recommendations. |
| **Alerts & Risks** | `/alerts` | Severity filter chips, active operational alerts table, 1-hour timeline, and automated AI action intelligence. |
| **Analytics & Intelligence**| `/analytics` | Weekly delay trends, on-time performance radial gauge, AI model accuracy (94.8%), and corridor bottleneck tables. |
| **What-If Simulation** | `Modal` | Interactive scenario testing for signal failures, adverse weather, and speed restrictions with real-time recalculation. |
| **System Status** | `/system-status` | Cluster worker nodes, GPU memory utilization, and ISRO NavIC GPS / SCADA telemetry pipeline monitors. |
| **Settings** | `/settings` | AI model sensitivity biases, recalculation cycles, and UI display preferences. |
| **Profile** | `/profile` | Dispatcher credentials, operational clearance levels (Level 4), and shift audit trail. |
