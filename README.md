# React + Python System Info App

A simple hello-world style application demonstrating a React frontend with a Python Flask backend.

## Project Structure

```
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── SystemInfo.js
    │   │   └── SystemInfo.css
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Getting Started

### Backend Setup

1. Create and activate a virtual environment (recommended):
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask server:
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

## API Endpoints

- `GET /api/system-info` - Returns system information including:
  - Hostname, platform, architecture
  - CPU count and usage
  - Memory total and usage
  - Python version
  - Timestamp

## How It Works

1. The React frontend makes a fetch request to `/api/system-info`
2. The `proxy` setting in `package.json` forwards API requests to the Flask backend
3. Flask returns JSON with system information using the `psutil` library
4. React displays the data in a styled card component