import { Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Login } from "./pages/Login"
import { Blogs } from "./pages/Blogs"
import { BlogPost } from "./pages/BlogPost"
import { PostBlog } from "./pages/PostBlog"
import { UserProfile } from "./pages/UserProfile"


function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/blog/:id" element={<BlogPost/>} />
        <Route path="/post" element={<PostBlog/>} />
        <Route path="/user/profile" element={<UserProfile/>} />
      </Routes>
    </div>
  )
}

export default App
