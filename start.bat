@echo off
echo Starting SalonEase Project...
echo.

start cmd /k "cd mobile-salon-backend && npm run dev"
timeout /t 5
start cmd /k "cd SalonEase frotend && npm start"

echo.
echo Backend and Frontend starting...
echo Check the opened terminal windows
