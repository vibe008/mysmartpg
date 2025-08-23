@echo off
echo Copying files to repository...
xcopy "D:\devankWeb\Archive\*" "D:\devankWeb\Archive\web_mysmartapp" /E /H /C /I /Y /EXCLUDE:exclude.txt

echo Adding to git...
cd D:\devankWeb\Archive\web_mysmartapp
git add .

echo Committing changes...
git commit -m "Update: %date% %time%"

echo Pushing to GitHub...
git push origin main

echo Done!
pause