# 🧠 InterviewIntel (AI Resume Analyzer & Mock Coach)

[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD8FF)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)

**InterviewIntel** is a high-fidelity, full-stack, AI-powered interview preparation suite designed to help job seekers tailor their applications and conquer their upcoming interviews. 

By analyzing a candidate's uploaded PDF resume against a target job description and self-assessment, the application generates a comprehensive, personalized interview preparation strategy. It features dynamic match/ATS scores, custom technical and behavioral interview questions with suggested model answers, a visual day-wise preparation roadmap, and a server-side resume builder that outputs highly optimized, ATS-friendly A4 PDFs tailored directly to the target role.

---

## 📖 Sub-Module Documentation

For specific technical configurations, route endpoints, architecture definitions, and components, explore our sub-module guides:

*   ⚙️ [**Backend API Documentation** (Express, Puppeteer, Gemini Schemas)](file:///c:/Users/ashut/Music/Resume-Analyzer/Backend/README.md)
*   🎨 [**Frontend Client Documentation** (React 4-Layer Architecture, Dynamic Icons, SCSS)](file:///c:/Users/ashut/Music/Resume-Analyzer/Frontend/README.md)

---

## ✨ Premium Highlights & Features

### 🌟 High-Fidelity UI/UX & Interactive Design
- **Ambient Dark Theme:** Curated dark theme incorporating sleek glassmorphism panels, glowing cards, and custom typography (**Outfit** & **Inter** font faces) for an ultra-premium feel.
- **Dynamic Score Dials (`AnimatedScore`):** Count-up dial rings that animate Match and ATS Scores from `0` on load, complete with dynamic descriptions (e.g. *Excellent match*, *Strong match*, *Needs moderate optimization*) and corresponding glowing neon styling modifiers in SCSS.
- **Interactive Severity Gaps Legend:** Color-graded Skill Gaps sidebar chips categorized as **Critical** (🔥), **Important** (⚠️), and **Elective** (🟢). Hovering over a legend chip dynamically dims all unrelated skills to $22\%$ opacity, letting users instantly focus on high-impact areas.
- **Drag-and-Drop Uploader:** Responsive file upload zone that handles drag-and-drop PDF uploads with glowing neon ambient outline reactions during drag events.
- **Day-Wise Progress Timelines:** Timeline preparation cards featuring clickable checkmarks that trigger green neon glows, text strikethroughs, and task tracking.
- **Interactive FAQ Accordions:** Beautiful accordion modules displaying frequently asked questions complete with smooth rotating chervons and expanding content transitions.
- **Location-Aware Navbar & Footers:** Fully connected navigation links with hash anchors that smoothly scroll users to active upload zones and FAQ sections from sub-views.
- **State-Driven Toast Notices:** Centrally managed visual Toast alerts with slide-in animations and a 4-second auto-dismissal timer for auth and upload validation.

### 🧠 Core Logical Pipelines
- **Type-Safe AI Ingestion (Gemini 2.5):** Uses the official `@google/genai` SDK and structures strict JSON response schemas (`responseSchema`) to enforce bulletproof JSON parsing from LLM models.
- **Blacklisted Token Revocation:** Reordered logout events hit the server-side `/api/auth/logout` endpoint *prior* to wiping local sessions, enabling robust MongoDB `blacklistTokens` saves for complete cookie revocation.
- **Non-Blocking PDF Compilers:** PDF compilers run asynchronously inside single-button loaders, letting users compile and download custom resumes without freezing the global interface.
- **Flicker-Free Report Caching:** Context-level lookups verify if a selected report is already cached in memory, eliminating global loading splash screens during navigations.

---

## 🛠️ Tech Stack

### Frontend Client
*   **React (Vite):** Client execution runtime.
*   **React Router v7:** Page path management with protected route wrapping.
*   **Context API:** Centralized session and report state management.
*   **SCSS:** Structured variables, responsive media queries, and neon glow keyframes.
*   **Axios:** Network clients supporting HTTP-Only session cookies (`withCredentials: true`).

### Backend Service API
*   **Node.js & Express:** Lightweight REST service architecture.
*   **MongoDB & Mongoose:** Schema mapping for users, reports, and token blacklists.
*   **Google Gemini SDK (`@google/genai`):** Core generator powering custom reports.
*   **Puppeteer:** Headless browser rendering tailored HTML layouts into A4 PDF papers.
*   **Multer:** In-memory stream handling of `multipart/form-data` uploads.
*   **pdf-parse:** Raw binary text extraction from uploaded resume files.

---

## 🚀 Getting Started

Follow these steps to set up a local instance of InterviewIntel:

### Prerequisites
*   Node.js (v18 or higher recommended)
*   MongoDB (Local service or MongoDB Atlas URI connection string)
*   Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/ASHUTOSHNANDA2006/Resume_Analyzer.git
cd Resume_Analyzer
```

### 2. Configure the Backend API
1.  Navigate to the `/Backend` directory and install dependencies:
    ```bash
    cd Backend
    npm install
    ```
2.  Create a `.env` file inside the `/Backend` folder:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secure_jwt_key
    GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
    ```
3.  Boot up the development API server:
    ```bash
    npm run dev
    # Server active on http://localhost:3000
    ```

### 3. Configure the Frontend Client
1.  Open a new shell window, navigate to the `/Frontend` directory, and install dependencies:
    ```bash
    cd Frontend
    npm install
    ```
2.  Boot up the Vite client developer server:
    ```bash
    npm run dev
    # Client active on http://localhost:5173
    ```

---

## 📂 File Layout Map

```text
📦 Resume_Analyzer
 ┣ 📂 Backend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 config       # Database connector
 ┃ ┃ ┣ 📂 controllers  # Controller handlers (Auth, Reports)
 ┃ ┃ ┣ 📂 middlewares  # Session validation, CORS, Multer storage
 ┃ ┃ ┣ 📂 models       # Mongoose schemas (User, Report, Blacklist)
 ┃ ┃ ┣ 📂 routes       # Express router endpoints
 ┃ ┃ ┗ 📂 services     # Google GenAI Structured JSON service & Puppeteer HTML renderer
 ┃ ┣ 📜 app.js         # App configs
 ┃ ┣ 📜 README.md      # Backend detailed guide
 ┃ ┗ 📜 server.js      # Main server runner
 ┃
 ┗ 📂 Frontend
   ┣ 📂 src
   ┃ ┣ 📂 components          # Core reusable widgets (Navbar, Footer, Toast)
   ┃ ┣ 📂 features            # Feature-centric modules
   ┃ ┃ ┣ 📂 auth              # Auth pages, contexts, hooks, and services
   ┃ ┃ ┗ 📂 interview         # Report pages, styles, hooks, and services
   ┃ ┣ 📂 style               # Reusable stylesheet definitions
   ┃ ┣ 📜 App.jsx             # Providers wrapper
   ┃ ┣ 📜 app.routes.jsx      # Navigation router config
   ┃ ┗ 📜 style.scss          # Core typography
   ┣ 📜 index.html            # Google Font imports & DOM target root
   ┗ 📜 README.md             # Frontend detailed guide
```

---

## 🔌 Core API Endpoints

### 🔐 Authentication (`/api/auth`)
*   `POST /api/auth/register` - Create user profile and set JWT session.
*   `POST /api/auth/login` - Authenticate user profile and retrieve JWT.
*   `GET /api/auth/logout` - Blacklist user JWT token in Mongoose database and flush cookie.
*   `GET /api/auth/get-me` - Return currently authenticated profile parameters.

### 🧠 Interview & Resumes (`/api/interview`)
*   `POST /api/interview/` - Processes Multer PDF upload alongside job descriptions to render structured reports.
*   `GET /api/interview/` - Fetch all report histories generated by active user profile.
*   `GET /api/interview/report/:interviewId` - Fetch one report by its unique ID.
*   `POST /api/interview/resume/pdf/:interviewReportId` - Renders custom ATS HTML resume and converts it to dynamic Puppeteer PDF binary.
