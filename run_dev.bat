@echo off
echo ===================================================================
echo               MarineMind AI - Launching Development Servers
echo ===================================================================
echo.
echo Starting FastAPI Backend on http://localhost:8000 ...
start "MarineMind Backend" cmd /k "python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload"

echo Starting Vite Frontend on http://localhost:5173 ...
start "MarineMind Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Servers are launching in separate windows.
echo API Docs: http://localhost:8000/docs
echo Web App:  http://localhost:5173
echo.