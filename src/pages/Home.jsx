import Post from '../components/Post'

export default function Home({ posts, AddPostHandler, deletePostHandler }) {

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/5 via-purple-300/5 to-pink-300/5 rounded-full blur-3xl"></div>
            </div>
            {/* Posts Container */}
            <div className="relative z-10 pb-32">
                {posts.length > 0 ? (
                    <div className="space-y-8">
                        {posts.map((post, index) => {
                            return (
                                <div
                                    key={post.postId}
                                    className="animate-fade-in transform transition-all duration-700"
                                    style={{
                                        animationDelay: `${index * 0.15}s`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <Post
                                        userName={post.userName}
                                        userImageUrl={post.userImageUrl}
                                        createdAt={post.createdAt}
                                        postTitle={post.postTitle}
                                        postDescription={post.postDescription}
                                        postImageUrl={post.postImageUrl}
                                        userId={post.userId}
                                        editpostHandler={() => AddPostHandler(post)}
                                        deletePostHandler={() => deletePostHandler(post.postId)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    /* Enhanced Empty State */
                    <div className="max-w-3xl mx-auto p-6">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                            <div className="relative bg-gradient-to-br from-white/95 via-slate-50/95 to-blue-50/95 backdrop-blur-xl shadow-2xl border border-slate-200/50 rounded-3xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>

                                <div className="relative text-center py-20 px-8">
                                    {/* Animated Icon */}
                                    <div className="relative mb-8">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-25 animate-pulse"></div>
                                        <div className="relative w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                                            <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <h3 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-4">
                                        Your Story Starts Here
                                    </h3>
                                    <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">
                                        Be the first to share something incredible with your community. Every great conversation starts with a single post.
                                    </p>

                                    {/* Enhanced CTA Button */}
                                    <button
                                        className="relative group/btn inline-flex items-center gap-3 px-8 py-4 font-bold text-white rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform border border-blue-400/30 hover:border-purple-400/50 overflow-hidden"
                                        onClick={() => AddPostHandler()}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out"></div>
                                        <div className="relative flex items-center gap-3">
                                            <svg className="w-6 h-6 group-hover/btn:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                            <span className="text-lg">Create Your First Post</span>
                                        </div>
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Enhanced Floating Add Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                    <button
                        className="relative w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group border-2 border-white/20"
                        onClick={() => AddPostHandler()}
                    >
                        <svg className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}