@echo off
title TerraHistoria — Lokalny Serwer Podgladu
echo Uruchamianie aplikacji TerraHistoria...
start "" http://localhost:8080
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-server.ps1" -Port 8080
pause
