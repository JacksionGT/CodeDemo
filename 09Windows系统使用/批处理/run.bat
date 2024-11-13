@echo off
:: 设置项目路径 - 请将下面的路径替换为你的实际项目路径
set PROJECT_PATH=D:\your\project\path

:: 检查Cursor是否已安装在默认位置
if exist "C:\Users\%USERNAME%\AppData\Local\Programs\Cursor\Cursor.exe" (
    start "" "C:\Users\%USERNAME%\AppData\Local\Programs\Cursor\Cursor.exe" "%PROJECT_PATH%"
) else (
    echo Cursor未找到，请确保已正确安装Cursor编辑器
    pause
)
