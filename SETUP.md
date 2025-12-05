# Setup Instructions

## Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org/))
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))
- **Terminal/Command Prompt**

## Step-by-Step Setup

### 1. Clone or Download the Repository

```bash
git clone <your-repo-url>
cd Build-Postcraft-AI
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
# On Windows (PowerShell):
New-Item -Path .env -ItemType File

# On Mac/Linux:
touch .env
```

**Add to `.env` file:**
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
```

**Start backend:**
```bash
npm run dev
```

✅ Backend should be running on `http://localhost:5000`

### 3. Frontend Setup

**Open a NEW terminal window:**

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend should be running (usually `http://localhost:5173`)

### 4. Verify Setup

1. Open browser to the frontend URL (e.g., `http://localhost:5173`)
2. Fill in product details
3. Click "🚀 Generate All"
4. You should see AI-generated content appear

## Troubleshooting

**"GEMINI_API_KEY is missing" error:**
- Check that `.env` file exists in `backend/` directory
- Verify the API key is correct (no extra spaces)
- Restart the backend server after adding the key

**"Cannot connect to backend" error:**
- Ensure backend is running on port 5000
- Check `vite.config.js` has correct proxy settings
- Try restarting both frontend and backend

**Port already in use:**
- Change `PORT` in backend `.env` to a different port (e.g., 5001)
- Update `vite.config.js` proxy target accordingly

## Production Build

**Frontend:**
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

**Backend:**
```bash
cd backend
npm start
# Uses node instead of nodemon
```

