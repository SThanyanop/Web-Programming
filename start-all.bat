@echo off
echo Starting all projects...

start "FUN-04" cmd /k "cd assignments/FUN-04/my-counter && npm run dev"
start "FUN-05" cmd /k "cd assignments/FUN-05/client && npm run dev"
start "FUN-07" cmd /k "cd assignments/FUN-07 && npm run dev"

echo All servers started!