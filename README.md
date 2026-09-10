# MarineMind AI 

### **An Agentic AI Copilot for Safer, Smarter and Sustainable Marine Decision-Making**
*Conversational Marine Intelligence powered by AI Agents, Satellite Earth Observation and Geospatial Reasoning*

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111.0-009688.svg?style=flat&logo=FastAPI&logoColor=white)](https://fastapi.tiangolo.com)
[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?style=flat&logo=React&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF.svg?style=flat&logo=Vite&logoColor=white)](https://vitejs.dev/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900.svg?style=flat&logo=Leaflet&logoColor=white)](https://leafletjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC.svg?style=flat&logo=Tailwind-CSS&logoColor=white)](https://tailwindcss.com/)

---

##  Executive Summary

The marine ecosystem directly sustains over 4 million Indian fishermen, food security, maritime logistics, and coastal blue economy operations. However, critical decision-making datasets—such as Sea Surface Temperature (SST), Chlorophyll-a optical radiometer plumes, significant wave heights, swell surge warnings, lightning corridors, and International Maritime Boundary Lines (IMBL)—exist across fragmented dashboards, raw netCDF formats, and technical bulletins.

**MarineMind AI** replaces manual dashboard interpretation with an autonomous, conversational **Agentic AI Marine Copilot**. Rather than returning raw search queries or canned chatbot templates, MarineMind AI visibly plans tasks, decomposes problems, dynamically invokes specialized domain agents, performs vector geospatial calculations, fuses multi-factor risk scores, and transparently explains **"Why?"** every recommendation was generated.

---

##  Key Differentiators & Features

1. **Genuine Agentic AI Multi-Agent Architecture**:
   - **Autonomous Planner Agent**: Inspects user queries, extracts entities (coordinates, times, activities), and dynamically selects only the necessary agents.
   - **Weather Intelligence Agent**: Ingests atmospheric wind, gust velocity, swell periods, and IMD cyclone alerts.
   - **Ocean Analytics Agent**: Analyzes satellite SST and chlorophyll-a density to compute the **Ocean Productivity Score (0-100)**.
   - **PFZ Intelligence Agent**: Multi-criteria ranking of Potential Fishing Zones combining fish density with hydrodynamic wave safety.
   - **Geospatial Reasoning Agent**: Vector calculations via Shapely and PostGIS to measure distance to the IMBL and audit Marine Protected Area (MPA) boundaries.
   - **Risk Assessment Engine**: 6-factor weighted risk model (Waves 30%, Wind 20%, Lightning 15%, Cyclone 20%, Visibility 5%, Geofence 10%).
   - **Safe Route Planning Agent**: Evaluates Direct Route A vs Fairway Detour Route B, ensuring vessels avoid 2.7m breaker shoals.
   - **Explainability Agent**: Generates transparent, evidence-backed explanations answering "Why?" for every recommendation.
2. **Multi-Turn Conversational Memory**:
   - Contextually understands pronoun references (e.g. Turn 1: *"Where is the nearest PFZ?"* $\rightarrow$ Turn 2: *"Is it safe tomorrow?"* resolves *"it"* to the previously identified PFZ Alpha).
3. **Interactive Geospatial Map (Leaflet)**:
   - Live vessel GPS marker with heading telemetry.
   - Toggable layers: PFZ Hotspots, SST Thermal Fronts, Chlorophyll Blooms, High Swell Hazards, IMBL Boundaries, Naval Firing Ranges, and Safe Routes.
4. **Presentation-Ready Operational Demo Scenarios**:
   - **Scenario 1: Safe Fishing Decision** (Morning safe window 06:00-10:00 vs afternoon 2.6m swell surge).
   - **Scenario 2: PFZ Multi-Criteria Recommendation** (Explains why closer PFZ Bravo at 6.1 km is avoided due to hazardous waves, recommending PFZ Alpha at 8.2 km).
   - **Scenario 3: Safe Route Planning** (Direct Route A 12 km flagged HIGH RISK vs Safe Detour Route B 16 km flagged RECOMMENDED).
   - **Scenario 4: Geofence Boundary Warning** (Simulates vessel approaching IMBL at 4.2 km and issues course correction).
5. **Multi-Lingual Support for Coastal Communities**:
   - Built-in detection and response in **English**, **Hindi (हिन्दी)**, **Marathi (मराठी)**, and **Tamil (தமிழ்)**.

---

##  Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Leaflet, Lucide Icons |
| **Backend** | Python 3.9+, FastAPI, Uvicorn, Pydantic v2, Shapely, SQLAlchemy |
| **Geospatial & Math** | Shapely, NumPy, Pandas, Haversine Vector Math |
| **Database** | PostgreSQL + PostGIS (with seamless zero-config SQLite fallback) |
| **APIs & Connectors** | Open-Meteo Marine/Weather API, INCOIS PFZ format models |

---

##  Project Structure

```text
marinemind-ai/
 backend/
    main.py                    # FastAPI server entrypoint
    api/                       # REST endpoint routers
       chat.py                # Agentic conversational copilot
       marine.py              # Oceanographic overview & analytics
       weather.py             # Marine weather & forecast
       pfz.py                 # Potential Fishing Zones
       routes.py              # Safe path navigation
       geofence.py            # Boundary auditing
       alerts.py              # Coastal bulletins
       scenarios.py           # Operational demo triggers
    agents/                    # Multi-agent implementations
       orchestrator.py        # Central multi-agent coordinator
       planner_agent.py       # Autonomous intent & dynamic planner
       language_agent.py      # Language detection & localization
       weather_agent.py       # Weather intelligence
       ocean_agent.py         # Ocean analytics (SST & Chlorophyll)
       pfz_agent.py           # PFZ ranking
       geospatial_agent.py    # Spatial vector & boundary auditing
       risk_agent.py          # 6-factor weighted risk engine
       route_agent.py         # Multi-objective route planning
       explainability_agent.py# Transparent evidence synthesis
    tools/                     # Domain connectors & spatial tools
    services/                  # Business logic & risk engines
    models/                    # Pydantic & SQLAlchemy ORM schemas
    data/                      # Coastal datasets (Maharashtra, Gujarat, TN, Kerala)

 frontend/
    src/
       components/            # UI workspace components
          MarineMap.tsx      # Leaflet geospatial map
          AICopilot.tsx      # Chat copilot & prompt chips
          AgentExecutionPanel.tsx # Live agent execution visualizer
          Dashboard.tsx      # Landing page & KPI snapshots
          PFZView.tsx        # PFZ intelligence view
          RiskCenter.tsx     # Marine risk gauge & factor bars
          RouteView.tsx      # Route comparison (A vs B)
          GeofenceView.tsx   # Boundary proximity simulator
          AlertCenter.tsx    # Filterable advisory feed
          AnalyticsView.tsx  # SST & swell charts
          Navbar.tsx         # Navigation & language switcher
       services/api.ts        # Client API service
       types/marine.ts        # TypeScript data contracts
    package.json
    tailwind.config.js
    vite.config.ts

 docs/
    architecture.md            # In-depth system architecture documentation
 docker-compose.yml             # PostGIS deployment setup
 run_dev.bat                    # One-click Windows launch script
```

---

##  Quickstart Guide

### Prerequisites
- Python 3.9+ installed
- Node.js v18+ & npm installed

### 1. Backend Setup & Startup
```powershell
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Start FastAPI backend
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
*API documentation will be accessible at `http://localhost:8000/docs`.*

### 2. Frontend Setup & Startup
```powershell
# Navigate to frontend
cd frontend

# Install packages
npm install

# Start Vite development server
npm run dev
```
*Frontend application will launch at `http://localhost:5173`.*

---

##  Operational Demonstration Scenarios

1. **Scenario 1: Safe Fishing Decision**
   - Click *Scenario 1* on the Dashboard.
   - Query: *"Is it safe to go fishing tomorrow morning?"*
   - System analyzes temporal weather trends, identifies a safe morning window (06:00 - 10:30 AM), and warns against afternoon swells (2.6m).

2. **Scenario 2: PFZ Multi-Criteria Recommendation**
   - Click *Scenario 2*.
   - Query: *"Where is the nearest Potential Fishing Zone today?"*
   - Demonstrates multi-source reasoning: PFZ Bravo (6.1 km) is closer than PFZ Alpha (8.2 km), but PFZ Bravo is flagged **AVOID** due to hazardous 2.7m breaker shoals, while PFZ Alpha is **RECOMMENDED**.

3. **Scenario 3: Safe Route Planning**
   - Click *Scenario 3*.
   - Query: *"What is the safest route to PFZ Alpha?"*
   - Compares Direct Route A (12 km, 45 min, High Risk) against Recommended Route B (16 km, 61 min, Low Risk detour around naval ranges and shallow reefs).

4. **Scenario 4: Geofence Boundary Warning (IMBL)**
   - Click *Scenario 4*.
   - Query: *"Am I approaching a restricted or international maritime boundary?"*
   - Simulates vessel near the border, detects proximity at 4.2 km (< 5 km buffer), and issues course correction to 270° West.

---

##  Statutory AI Safety Notice
**MarineMind AI** is an assistive Decision Support System (DSS). It does not replace statutory marine advisories issued by INCOIS, the India Meteorological Department (IMD), or the Indian Coast Guard. Always follow official port authority clearances before unmooring.

---

##  Enterprise Innovation Highlights
- **No hardcoded chat answers**: Dynamic planner determines which agents to run for every query.
- **Explainable by design**: Every single recommendation provides explicit, verifiable "Why?" rationale.
- **Dual-mode architecture**: Runs out-of-the-box in Interactive Demo Mode without requiring paid external API credentials, and seamlessly connects to live satellite/weather feeds when API keys are configured.