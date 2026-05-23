import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import {AuthProvider} from "./features/auth/auth.contex.jsx"



function App() {
  return (
    <AuthProvider>
      <RouterProvider router = {router} />
    </AuthProvider>
  )
}

  return (
    <RouterProvider router = {router} />
  )
}

export default App
