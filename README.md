# SociallApp 🌐📸

**SociallApp** is a simple social media platform built with **React**, **Tailwind CSS**, **DaisyUI**, and **LocalStorage**.  
It allows users to register, log in, create, edit, and delete their own posts — each with a title, description, image, and creation time.

> 🔗 **Live Demo:** [https://social-app-gamma-nine.vercel.app](https://social-app-gamma-nine.vercel.app)  
> 🎥 **YouTube Demo:** *Coming soon*  
> 📁 **GitHub Repository:** [https://github.com/abdallaskar/SociallApp](https://github.com/abdallaskar/SocialApp)

---

## 🚀 Features

- 🔐 **Authentication** – Register, Login, Logout  
- 🏠 **Home Feed** – See all public posts  
- 📝 **Post Creation** – Add title, description, and image  
- ✏️ **Edit/Delete Posts** – Only allowed for post owner  
- 👤 Avatar & name with post timestamp  
- 🚫 Access control when logged out  
- 💾 All data persisted using `localStorage`

---
## 📸 Screen Shots
![Home Page](screenshots/home.png)
![Create Post](screenshots/create-post.png)
![User Avatar](screenshots/avatar.png)

---
## 🛠️ Tech Stack

- **Frontend:**  
  - [React](https://reactjs.org/)  
  - [React Router](https://reactrouter.com/)  
  - [Tailwind CSS](https://tailwindcss.com/)  
  - [DaisyUI](https://daisyui.com/)

- **Storage:**  
  - `localStorage` for users, sessions, and posts

---

## 🧪 Core Structure

### 🔐 Authentication System
Users can register using:
- Full name
- Email
- Password
- Profile image

Session management and validations are handled with context and localStorage.

### 📝 Posts System
Each post contains:
- Title
- Description
- Image
- Author’s name and photo
- Time created

Users can:
- ✅ Create a post (only when logged in)  
- ✏️ Edit or 🗑️ delete their own posts  
- 🚫 Cannot perform actions when logged out

---

## 💻 Getting Started

### 📦 Clone the Repository

```bash
git clone https://github.com/abdallaskar/SocialApp.git
cd SocialApp
