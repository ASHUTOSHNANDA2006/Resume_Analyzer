import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import {AuthProvider} from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import Toast from "./components/Toast"


function AppContent() {
  return (
    <InterviewProvider>
      <Toast />
      <RouterProvider router={router} />
    </InterviewProvider>
  )
}

function App() {

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

