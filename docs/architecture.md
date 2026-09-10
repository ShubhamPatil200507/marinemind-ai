# MarineMind AI: System & Agent Architecture Documentation

**MarineMind AI** is an Agentic AI Marine Intelligence Platform designed for small-scale and commercial fishermen, fishing cooperatives, maritime operators, and coastal authorities.

---

## 1. System Architecture Overview

```
                                  
                                        Web / Mobile UI      
                                     (React + TypeScript)    
                                     Leaflet Geospatial Map  
                                  
                                                 REST / WebSockets
                                                
                                  
                                       FastAPI Application   
                                      CORS & Session Layer   
                                  
                                                
                                                
                                  
                                      Orchestrator Agent     
                                   (Context & Session Store) 
                                  
                                                
                 
                                                                             
       
         Language Agent           Intent & Planning Agent      Geospatial Reasoning     
     (EN / HI / MR / TA)          (Dynamic Decomposition)       (Shapely / PostGIS)     
       
                                                
                 
                                                                             
       
       Weather Intelligence        Ocean Analytics Agent          PFZ Intelligence      
      (Open-Meteo / Swells)        (SST & Chlorophyll-a)       (Multi-Criteria Ranking) 
       
                                                                             
                 
                                                
                                                
                                  
                                      Risk Assessment Engine 
                                    (6-Factor Weighted Model)
                                  
                                                
                                                
                                  
                                      Safe Route Optimizer   
                                     (Direct vs Fairway A*)  
                                  
                                                
                                                
                                  
                                     Explainability Agent    
                                   (Evidence Fusion & "Why") 
                                  
```

---

## 2. Multi-Agent Domain Responsibilities

### 2.1 Orchestrator Agent (`backend/agents/orchestrator.py`)
- Coordinates multi-agent lifecycle and manages conversational session state (`CONVERSATION_SESSIONS`).
- Tracks conversational referents across multi-turn exchanges (e.g. resolving pronouns such as *"Is it safe tomorrow?"* to previously discussed PFZs).
- Gathers intermediate evidence items, calculates confidence scores, sets active map layers, and formats responses.

### 2.2 Intent & Planning Agent (`backend/agents/planner_agent.py`)
- Decomposes natural language queries into structured execution plans.
- **Dynamic Workflow Determination**:
  - *Query*: "Where is the nearest PFZ?" -> `[pfz_agent, geospatial_agent, explainability_agent]`
  - *Query*: "Which PFZ is safest tomorrow morning?" -> `[pfz_agent, weather_agent, ocean_agent, geospatial_agent, risk_agent, explainability_agent]`
  - *Query*: "What is the safest route to PFZ Alpha?" -> `[route_agent, geospatial_agent, weather_agent, risk_agent, explainability_agent]`
  - *Query*: "Am I approaching a boundary?" -> `[geospatial_agent, risk_agent, explainability_agent]`

### 2.3 Language Agent (`backend/agents/language_agent.py`)
- Automatic dialect and script detection supporting English, Hindi (हिन्दी), Marathi (मराठी), and Tamil (தமிழ்).
- Localizes explanations, advisories, and risk summaries into native vernacular without losing technical accuracy.

### 2.4 Weather Intelligence Agent (`backend/agents/weather_agent.py`)
- Connects to Open-Meteo Live Marine API and high-resolution coastal diurnal models.
- Synthesizes wind speed, wind gust, swell wave height, swell period, sea state, visibility, and cyclone alerts.

### 2.5 Ocean Analytics Agent (`backend/agents/ocean_agent.py`)
- Ingests satellite Sea Surface Temperature (SST) and Chlorophyll-a optical radiometer observations.
- Computes **Ocean Productivity Score (0-100)**:
  $$\text{Productivity} = \text{SST Suitability (25)} + \text{Chlorophyll Density (35)} + \text{Surface Current (15)} + \text{Frontal Stability (25)}$$

### 2.6 PFZ Intelligence Agent (`backend/agents/pfz_agent.py`)
- Searches, filters, and ranks Potential Fishing Zones based on:
  $$\text{PFZ Recommendation Score} = \text{Distance (20\%)} + \text{Productivity (40\%)} + \text{Wave Safety (25\%)} + \text{Geofence Compliance (15\%)}$$
- **Multi-Source Contrast**: Filters out closer hazardous zones (e.g. PFZ Bravo, 6.1 km, 2.7m breaker waves flagged AVOID) in favor of farther safe zones (PFZ Alpha, 8.2 km, 1.2m calm swells).

### 2.7 Geospatial Reasoning Agent (`backend/agents/geospatial_agent.py`)
- Executes vector geometry operations using Shapely and PostGIS.
- Functions:
  - `haversine_distance()`
  - `point_in_polygon()`: Audits entry into Marine Protected Areas (MPAs) or Western Naval Command Firing Ranges.
  - `distance_to_linestring()`: Calculates perpendicular distance to the International Maritime Boundary Line (IMBL).
  - Generates course corrections when boundary buffer drops below 5.0 km.

### 2.8 Marine Risk Engine (`backend/services/risk_engine.py`)
- Configurable multi-criteria weighted scoring model:
  - Wave Swell Risk: 30%
  - Wind Velocity Risk: 20%
  - Lightning Index: 15%
  - Cyclone Advisory: 20%
  - Navigational Visibility: 5%
  - Geofence Proximity: 10%
- Categorical thresholds:
  - 0–25: **LOW** (Safe full-day operations)
  - 26–50: **MODERATE** (Proceed with caution; nearshore safe 06:00-10:30 AM)
  - 51–75: **HIGH** (Avoid offshore operations)
  - 76–100: **CRITICAL** (Do not venture into sea)

### 2.9 Safe Route Planning Agent (`backend/agents/route_agent.py`)
- Generates dual trajectories:
  - **Route A (Direct)**: Shortest direct trajectory (12.2 km, 45 mins), but intersects hazardous swell breaking shoals and approaches naval firing perimeter -> Marked **HIGH RISK (AVOID)**.
  - **Route B (Safe Fairway Detour)**: Deep channel detour (16.2 km, 61 mins), maintaining > 5 km clearance from defense perimeters and avoiding rough shoals -> Marked **LOW RISK (RECOMMENDED)**.

### 2.10 Explainability Agent (`backend/agents/explainability_agent.py`)
- Synthesizes all gathered evidence into transparent, numbered "Why?" explanations.
- Never fabricates unverified data; cites specific agent sources and computed metrics.

---

## 3. Data & Decision Flow

```
User Query: "Is it safe to go fishing tomorrow morning?"
    
    
[Language Agent]  Language: English (Confidence: 0.99)
    
    
[Planner Agent]  Intent: marine_safety_assessment
                    Target: morning window (06:00 - 10:30 IST)
                    Dynamic Agents: [weather, ocean, geospatial, risk, explainability]
    
    
                                                    
[Weather Agent]        [Ocean Agent]         [Geospatial Agent]
Waves: 1.2m morning    SST: 28.1°C           Distance to IMBL: 18.5 km
Winds: 18 km/h NW      Chlorophyll: 2.15     Naval Range: 14.2 km
Afternoon: 2.6m swell  Productivity: 86/100  Status: Safe Waters
                                                    
    
                             
                             
                   [Risk Assessment Agent]
                   Wave Risk: 18 pts
                   Wind Risk: 12 pts
                   Lightning: 2 pts
                   Cyclone: 0 pts
                   Total Risk Score: 38/100 (MODERATE)
                             
                             
                   [Explainability Agent]
                   "Why was this recommendation generated?"
                   1. Morning waves (1.2m) & winds (18 km/h) safe for artisanal craft.
                   2. Swells surge to 2.6m with 44 km/h gusts after 11:30 AM.
                   3. No active cyclone alerts along Konkan sector.
                   4. Vessel trajectory clear of naval firing ranges.
                             
                             
                   [FastAPI ChatResponse Payload]
                   Rendered into Interactive Map & Copilot UI
```