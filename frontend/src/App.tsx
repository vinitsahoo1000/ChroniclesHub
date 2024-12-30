import { Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"


function App() {
  return(
    <div>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Signup/>} />
      </Routes>
    </div>
  )
}

export default App
