@echo off
echo.
echo  Beacon Quran Institute - Deploy to Vercel
echo  ==========================================
echo.

set /p msg=Kya change kiya? (short mein likhein): 

D:\Git\cmd\git.exe add .
D:\Git\cmd\git.exe commit -m "Update: %msg%"
D:\Git\cmd\git.exe push

echo.
echo  ✅ Done! Vercel par 2 minute mein live ho jaayega.
echo  🌐 https://beacon-quran-institute.vercel.app
echo.
pause
