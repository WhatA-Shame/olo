@echo off
cd /d "%~dp0"
echo Serving 星陨战纪 on http://127.0.0.1:8787/
start "" "http://127.0.0.1:8787/index.html"
python -m http.server 8787
pause
