# 🧠 InterviewIntel (AI Resume Analyzer)

InterviewIntel is a full-stack, AI-powered web application designed to help job seekers prepare for interviews. By analyzing a user's resume against a target job description, the application generates a highly personalized interview preparation strategy, complete with match scores, skill gap analysis, custom technical/behavioral questions, and a day-by-day preparation roadmap. 

Additionally, it features an AI-driven resume builder that generates an optimized, ATS-friendly PDF resume tailored to the specific job description.

---

## ✨ Key Features

* **Secure Authentication:** User registration, login, and secure session management using JWT (JSON Web Tokens) stored in HTTP-only cookies, complete with token blacklisting for secure logouts.
* **Smart Resume Parsing:** Upload PDF resumes which are parsed and extracted on the backend using `pdf-parse`.
* **AI-Powered Analysis (Google Gemini):** Utilizes the `@google/genai` SDK to generate structured, strictly typed JSON reports containing:
  * **Match Score & ATS Score:** Quantitative metrics on how well the profile fits the job.
  * **Skill Gap Analysis:** Highlights missing skills categorized by severity (High, Medium, Low).
  * **Custom Interview Questions:** Tailored technical and behavioral questions with interviewer intentions and model answers.
  * **Preparation Roadmap:** A structured, day-by-day task list to prepare for the interview.
* **Dynamic ATS Resume Generation:** Uses Gemini AI to write an optimized HTML resume, which is then converted into a downloadable PDF on the server using `puppeteer`.
* **Report Dashboard:** Saves all generated reports to a MongoDB database, allowing users to revisit their past interview strategies.

---

## 🛠️ Tech Stack

**Frontend**
* **React (Vite):** Fast, modern UI development.
* **React Router DOM:** Client-side routing with protected routes.
* **SCSS:** Custom styled components and responsive layouts.
* **Axios:** API requests with credentials (cookies) enabled.
* **Context API:** Global state management for authentication and interview data.

**Backend**
* **Node.js & Express.js:** Robust REST API architecture.
* **MongoDB & Mongoose:** NoSQL database for storing user data and interview reports.
* **Google Gemini API (`@google/genai`):** Core AI engine for generating reports and HTML resumes.
* **Puppeteer:** Headless browser automation to convert HTML to downloadable PDFs.
* **Multer:** Handling `multipart/form-data` for PDF uploads.
* **JWT & bcryptjs:** Secure password hashing and authentication.

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
* Node.js (v18 or higher recommended)
* MongoDB (Local instance or MongoDB Atlas URI)
* A Google Gemini API Key

### 1. Clone the Repository
```bash
git clone [https://github.com/ASHUTOSHNANDA2006/Resume_Analyzer.git](https://github.com/ASHUTOSHNANDA2006/Resume_Analyzer.git)
cd Resume_Analyzer

```

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and set up your environment variables.

```bash
cd Backend
npm install

```

Create a `.env` file in the `Backend` directory and add the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key

```

Start the backend server:

```bash
npm run dev
# Server will run on http://localhost:3000

```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies.

```bash
cd Frontend
npm install

```

Start the React development server:

```bash
npm run dev
# Client will run on http://localhost:5173

```

---

## 📂 Folder Structure Overview

```text
📦 Resume_Analyzer
 ┣ 📂 Backend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 config       # Database connection
 ┃ ┃ ┣ 📂 controllers  # Request handling logic (auth, interviews)
 ┃ ┃ ┣ 📂 middlewares  # JWT verification, Multer file parsing
 ┃ ┃ ┣ 📂 models       # Mongoose schemas (User, InterviewReport, Blacklist)
 ┃ ┃ ┣ 📂 routes       # API route definitions
 ┃ ┃ ┗ 📂 services     # AI integration (Gemini) & Puppeteer logic
 ┃ ┣ 📜 app.js         # Express app configuration
 ┃ ┗ 📜 server.js      # Server entry point
 ┃
 ┗ 📂 Frontend
   ┣ 📂 src
   ┃ ┣ 📂 features
   ┃ ┃ ┣ 📂 auth       # Auth components, context, hooks, and pages
   ┃ ┃ ┗ 📂 interview  # Interview components, context, hooks, pages, and API calls
   ┃ ┣ 📜 App.jsx      # Global providers
   ┃ ┣ 📜 app.routes.jsx # React Router configuration
   ┃ ┗ 📜 main.jsx     # React DOM render

```

---

## 🔌 API Endpoints

### Authentication

* `POST /api/auth/register` - Create a new user account.
* `POST /api/auth/login` - Authenticate a user and set JWT cookie.
* `GET /api/auth/logout` - Blacklist token and clear cookie.
* `GET /api/auth/get-me` - Fetch currently logged-in user data.

### Interview Reports

* `POST /api/interview/` - Generate a new report (Accepts `resume` file, `jobDescription`, `selfDescription`).
* `GET /api/interview/` - Fetch all past reports for the authenticated user.
* `GET /api/interview/report/:interviewId` - Fetch a specific report by ID.
* `POST /api/interview/resume/pdf/:interviewReportId` - Generate and download a tailored ATS resume PDF.
