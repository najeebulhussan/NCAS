# 🛠️ FFmpeg Setup Instructions for NCAS

NajeebCyber AI Studio uses FFmpeg for video compositing, scene concatenation, and audio mixing.

### Option A: Install via Winget (Recommended for Windows)
Run in PowerShell:
```powershell
winget install FFmpeg
```

### Option B: Portable Download
1. Download official static FFmpeg build from: https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-essentials.7z
2. Extract `ffmpeg.exe` to: `e:\NCAS\bin\ffmpeg.exe`

Once installed, `npm run composite-video` will render 60s vertical MP4 videos natively!
