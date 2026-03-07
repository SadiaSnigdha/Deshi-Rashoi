# Running Deshi Rashoi Project

This project consists of three services that need to run together:

- **Backend**: Node.js API server (Port 3000)
- **Frontend**: Vite development server (Port 5173)
- **Admin**: Vite development server (Port 5174)

## Quick Start

### Option 1: PowerShell (Recommended)
```powershell
.\run.ps1
```

### Option 2: Command Prompt (Batch)
```cmd
run.bat
```

## What the Scripts Do

1. **Check Dependencies**: Automatically installs npm packages if needed
2. **Start Services**: Launches all three services in separate terminal windows
3. **Display Ports**: Shows where each service is running

## Manual Start (Alternative)

If you prefer to start services manually:

### Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

### Terminal 3 - Admin
```bash
cd admin
npm install
npm run dev
```

## Access the Application

- **Frontend**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5174
- **Backend API**: http://localhost:3000

## Stopping Services

- Press `Ctrl+C` in each terminal window to stop the respective service
- Or close the terminal windows directly

## Troubleshooting

- **Port already in use**: If ports are in use, check `package.json` in each folder for the dev server configuration and update if needed
- **Node.js not installed**: Download from https://nodejs.org/
- **Permission denied**: For PowerShell, run:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
