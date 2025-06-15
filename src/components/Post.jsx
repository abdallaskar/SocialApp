import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Post({ userId, userName, userImageUrl, createdAt, postTitle, postDescription, postImageUrl, editpostHandler, deletePostHandler }) {

    const { currentUser } = useAuth();
    const now = new Date();
    const postDate = new Date(createdAt); // Use createdAt since it's already in ISO format
    const hoursAgo = Math.floor((now - postDate) / (1000 * 60 * 60));

    return (
        <div className="max-w-2xl mx-auto p-3">
            <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all duration-500 border border-slate-200/60 rounded-3xl overflow-hidden hover:scale-[1.02] hover:border-blue-300/40">
                <div className="p-8">
                    {/* Post Header */}
                    <div className="flex items-center gap-5 mb-6">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                            <img
                                className='relative w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-xl'
                                src={userImageUrl}
                                alt="Beautiful User Image">
                            </img>
                            {
                                currentUser ? (
                                    currentUser.id === userId ? (<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-3 border-white rounded-full shadow-lg"></div>) : null
                                ) : null
                            }
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800 text-xl tracking-tight">{userName}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="font-semibold bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">{hoursAgo} hours ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Post Title */}
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 leading-tight hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                        {postTitle}
                    </h2>

                    {/* Post Description */}
                    <p className="text-700 leading-relaxed mb-6 text-lg font-medium bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                        {postDescription}
                    </p>

                    {/* Post Image */}
                    <figure className="mb-6 relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                        <img
                            src={postImageUrl}
                            alt="Beautiful Post Image"
                            className="relative w-full h-96 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.01] ring-1 ring-slate-200/50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </figure>

                    {/* Post Actions */}
                    <div className="flex justify-end items-center gap-3 pt-6 border-t border-gradient-to-r from-slate-200 via-blue-100 to-purple-100">
                        {currentUser ? (
                            currentUser.id === userId ? (
                                <button
                                    className="relative px-6 py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-blue-400/30 hover:border-purple-400/50 group overflow-hidden"
                                    onClick={editpostHandler}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                                    <div className="relative flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Post
                                    </div>
                                </button>
                            ) : null
                        ) : null}
                        {currentUser ? (
                            currentUser.id === userId ? (
                                <button
                                    className="relative px-6 py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 hover:from-rose-600 hover:via-red-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-rose-400/30 hover:border-red-400/50 group overflow-hidden"
                                    onClick={deletePostHandler}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                                    <div className="relative flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete Post
                                    </div>
                                </button>
                            ) : null
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}