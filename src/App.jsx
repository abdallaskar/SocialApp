import { Routes, Route, useNavigate } from 'react-router';
import './App.css';
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';

function App() {
  const { posts, createPost, updatePost, deletePost } = useAuth();
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
  };

  const createAndUpdatepostHandler = async (postData) => {
    try {
      if (IsEditMode && EditingPost) {
        // Update existing post using context
        // Note: You might need to adjust the ID field name based on your backend
        const postId = EditingPost._id || EditingPost.postId;
        await updatePost(postId, postData);
      } else {
        // Create new post using context
        await createPost(postData);
      }

      // Reset edit mode and navigate to home
      setEditingPost(null);
      setIsEditMode(false);
      navigate('/');
    } catch (error) {
      console.error('Error creating/updating post:', error);
      // You might want to show an error message to the user
    }
  };

  const deletePostHandler = async (postId) => {
    try {
      await deletePost(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
      // You might want to show an error message to the user
    }
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
  );
}

export default App;