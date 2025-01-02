import { Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Login } from "./pages/Login"
import { Blogs } from "./pages/Blogs"


function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/blogs" element={<Blogs/>} />
      </Routes>
    </div>
  )
}

export default App
