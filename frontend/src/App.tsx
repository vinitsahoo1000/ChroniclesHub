import { Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Login } from "./pages/Login"
import { Blogs } from "./pages/Blogs"
import { BlogPost } from "./pages/BlogPost"
import { PostBlog } from "./pages/PostBlog"
import { UserProfile } from "./pages/UserProfile"
import { AuthorProfile } from "./pages/AuthorProfile"
import { EditProfile } from "./pages/EditProfile"
import { EditBlog } from "./pages/EditBlog"
import PrivateRoute from "./components/PrivateRoute"
import { UserBlogs } from "./pages/UsersBlogs"


function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        // protected route
        <Route element={<PrivateRoute/>}>
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/blog/:id" element={<BlogPost/>} />
        <Route path="/post" element={<PostBlog/>} />
        <Route path="/user/profile" element={<UserProfile/>} />
        <Route path="/author/profile/:username" element={<AuthorProfile/>} />
        <Route path="/user/profileEditor" element={<EditProfile/>} />
        <Route path="/blog/editor/:id" element={<EditBlog/>} />
        <Route path="/user/blogs" element={<UserBlogs/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
