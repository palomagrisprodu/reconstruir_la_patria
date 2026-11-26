@echo off
setlocal
title Game Server

rem Serve the folder this .bat file is in
cd /d "%~dp0"

set PORT=8000

rem Find a working Python ("py" launcher first, then "python")
set PY=
py -3 --version >nul 2>&1 && set PY=py -3
if not defined PY (
    python --version >nul 2>&1 && set PY=python
)

if not defined PY (
    echo.
    echo Python was not found on this computer.
    echo Install it from https://www.python.org/downloads/
    echo and tick "Add python.exe to PATH" during setup, then run this again.
    echo.
    pause
    exit /b 1
)

echo.
echo Starting the game at http://localhost:%PORT%
echo Keep this window open while playing. Close it to stop the game.
echo.

rem Open the browser after a short delay so the server is ready
start "" cmd /c "timeout /t 2 >nul & start http://localhost:%PORT%/index.html"

%PY% -m http.server %PORT% --bind 127.0.0.1

echo.
echo The server stopped. If it closed straight away, port %PORT% may be in use.
pause