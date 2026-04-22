import { BrowserRouter , Routes , Route} from "react-router-dom"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import { Dashboard } from "./Pages/Dashboard"
import HomeRedirect from "./Pages/HomeRedirect"
import ProtectedRoute from "./Pages/ProtectedRoute"
import { SharedBrain } from "./Pages/SharedBrain"
import { AppLayout } from "./Pages/AppLayout"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect/>}/>
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<AppLayout/>}>
        <Route path="/share/:sharelink" element={<SharedBrain/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
