import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Post({ userId, userName, userImageUrl, createdAt, postTitle, postDescription, postImageUrl, editpostHandler, deletePostHandler }) {

    const { currentUser } = useAuth();
    const now = new Date();
    const postDate = new Date(createdAt); // Use createdAt since it's already in ISO format
    const hoursAgo = Math.floor((now - postDate) / (1000 * 60 * 60));

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="card bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
                <div className="card-body">
                    {/* Post Header */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                            <img
                                className='w-14 h-14 rounded-full object-cover ring-2 ring-indigo-100 shadow-md'
                                src={userImageUrl}
                                alt="Beautiful User Image">
                            </img>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-800 text-lg">{userName}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium">{hoursAgo} hours ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Post Title */}
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3 leading-tight">
                        {postTitle}
                    </h2>

                    {/* Post Description */}
                    <p className="text-gray-700 leading-relaxed mb-4 text-lg font-medium">
                        {postDescription}
                    </p>

                    {/* Post Image */}
                    <figure className="mb-4 relative group">
                        <img
                            src={postImageUrl}
                            alt="Beautiful Post Image"
                            className="w-full h-96 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </figure>
                    {/* Post Actions */}
                    <div className="card-actions justify-end items-center pt-4 border-t border-gradient-to-r from-indigo-100 to-purple-100">
                        {currentUser ? (
                            currentUser.id === userId ? (

                                <button
                                    className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 gap-2"
                                    onClick={editpostHandler}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Post
                                </button>

                            ) : null
                        ) : null}
                        {currentUser ? (
                            currentUser.id === userId ? (
                                <button
                                    className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 gap-2"
                                    onClick={deletePostHandler}
                                >
                                    🗑️
                                    Delete Post
                                </button>

                            ) : null
                        ) : null}
                    </div>
                </div>
            </div >
        </div>
    )
}