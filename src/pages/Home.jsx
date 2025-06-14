import Post from '../components/Post'

export default function Home({ posts, AddPostHandler, deletePostHandler }) {

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Posts Container */}
            <div className="pt-6 pb-24">
                {posts.length > 0 ? (
                    <>
                        {posts.map((post, index) => {
                            return (
                                <div
                                    key={post.postId}
                                    className="animate-fade-in"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
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
                    </>
                ) : (
                    /* Empty State */
                    <div className="max-w-2xl mx-auto p-6">
                        <div className="card bg-white/90 backdrop-blur-sm shadow-xl border border-white/20">
                            <div className="card-body text-center py-16">
                                <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">No posts yet</h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                                    Your feed is empty. Be the first to share something amazing with your community!
                                </p>
                                <button
                                    className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 gap-2"
                                    onClick={() => AddPostHandler()}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create Your First Post
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Floating Add Button (Bottom Left) */}
            <button
                className="btn btn-circle fixed bottom-6 right-10 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 h-16 w-16 z-50"
                onClick={() => AddPostHandler()}
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
            </button>

        </div>
    )
}