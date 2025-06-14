import { Routes, Route, useNavigate } from 'react-router'
import './App.css'
import Home from './pages/Home'
import AddPost from './pages/AddPost';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';

function App() {
  const { posts, createPost, updatePost, deletePost } = useAuth(); // Get posts functions from context
  const navigate = useNavigate();

  const [EditingPost, setEditingPost] = useState(null);
  const [IsEditMode, setIsEditMode] = useState(false);

  const AddPostHandler = (post = null) => {
    if (post) {
      setEditingPost(post);
      setIsEditMode(true);
    } else {
      setEditingPost(null);
      setIsEditMode(false);
    }
    navigate("/add");
  }

  const createAndUpdatepostHandler = (postData) => {
    if (IsEditMode && EditingPost) {
      // Update existing post using context
      updatePost(EditingPost.postId, postData);
    } else {
      // Create new post using context
      createPost(postData);
    }

    // Reset edit mode and navigate to home
    setEditingPost(null);
    setIsEditMode(false);
    navigate('/');
  };

  const deletePostHandler = (postId) => {
    deletePost(postId);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Home
            posts={posts}
            AddPostHandler={AddPostHandler}
            deletePostHandler={deletePostHandler}
          />
        } />
        <Route path="/add" element={
          <ProtectedRoute>
            <AddPost
              IsEditMode={IsEditMode}
              EditingPost={EditingPost}
              createAndUpdatepostHandler={createAndUpdatepostHandler}
            />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App