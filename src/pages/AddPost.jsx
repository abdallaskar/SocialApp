// ADD THESE IMPORTS at the top
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


export default function AddPost({ createAndUpdatepostHandler, EditingPost, IsEditMode }) {
    window.UPLOADCARE_PUBLIC_KEY = "d6499efc521a6a295718";


    // ADD THESE STATE VARIABLES
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    // ADD THIS EFFECT for form initialization
    useEffect(() => {
        if (IsEditMode && EditingPost) {
            setTitle(EditingPost.postTitle || '');
            setDescription(EditingPost.postDescription || '');
            setImageUrl(EditingPost.postImageUrl || '');
        } else {
            setTitle('');
            setDescription('');
            setImageUrl('');
        }
    }, [IsEditMode, EditingPost]);

    // ADD THIS EFFECT for Uploadcare initialization
    useEffect(() => {
        if (!window.uploadcare) {
            const script = document.createElement('script');
            script.src = 'https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js';
            script.async = true;
            script.onload = () => {
                initializeUploadcare();
            };
            document.head.appendChild(script);
        } else {
            initializeUploadcare();
        }
    }, []);

    const initializeUploadcare = () => {
        if (window.uploadcare) {
            window.uploadcare.start({
                publicKey: 'd6499efc521a6a295718',
                tabs: 'file camera url  drive ',
                imagesOnly: true,
            });

            const widget = window.uploadcare.Widget('[role=uploadcare-uploader]');
            if (widget) {
                widget.onUploadComplete((info) => {
                    setImageUrl(info.cdnUrl);
                    setUploading(false);
                });

                widget.onChange((file) => {
                    if (file) {
                        setUploading(true);
                        file.done(() => {
                            setUploading(false);
                        });
                    } else {
                        setImageUrl('');
                        setUploading(false);
                    }
                });
            }
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        const postData = {

            title: title.trim(),
            description: description.trim(),
            imageUrl: imageUrl || '',
        };

        createAndUpdatepostHandler(postData);
    };
    const handleCancel = () => {
        navigate('/');
    };


    return (
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-4  '>
            <div className='w-full max-w-2xl mx-auto'>
                <div className='card bg-white/90 backdrop-blur-sm shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300'>
                    <div className='card-body p-8'>
                        {/* Header */}
                        <div className='text-center mb-6'>
                            <h1 className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2'>
                                {IsEditMode ? "Edit Your Post" : "Create New Post"}
                            </h1>
                        </div>

                        {/* Form */}
                        <form className='space-y-6' onSubmit={handleSubmit}>
                            {/* Title Input */}
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text font-semibold text-gray-700 flex items-center gap-2'>
                                        <svg className='w-5 h-5 text-indigo-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'></path>
                                        </svg>
                                        Post Title
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter your post title"
                                    required
                                    className='input input-bordered text-black bg-white/50 backdrop-blur-sm border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 w-full'
                                />
                            </div>

                            {/* Description Textarea */}
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text font-semibold text-gray-700 flex items-center gap-2'>
                                        <svg className='w-5 h-5 text-indigo-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h7'></path>
                                        </svg>
                                        Description
                                    </span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Write your post description..."
                                    required
                                    rows={5}
                                    className='textarea textarea-bordered text-black bg-white/50 backdrop-blur-sm border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 w-full resize-none'
                                />
                                <label className='label'>
                                    <span className={`label-text-alt transition-colors duration-200 ${description.length > 450 ? 'text-red-500' :
                                        description.length > 400 ? 'text-amber-500' :
                                            'text-gray-500'
                                        }`}>
                                        {description.length}/500 characters
                                    </span>
                                </label>
                            </div>

                            {/* Image Upload */}
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text font-semibold text-gray-700 flex items-center gap-2'>
                                        <svg className='w-5 h-5 text-indigo-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                                        </svg>
                                        Post Image
                                    </span>
                                </label>

                                <div className='border-2 border-dashed border-indigo-200 rounded-lg p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 hover:border-indigo-300 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-300'>
                                    <input
                                        className='hover:cursor-pointer'
                                        type="hidden"
                                        role="uploadcare-uploader"
                                        data-public-key="d6499efc521a6a295718"
                                        data-tabs="file camera url facebook gdrive gphotos dropbox instagram"
                                        data-crop="free"
                                        data-preview-step="true"
                                        data-clearable="true"
                                        data-multiple="false"
                                        data-images-only="true"
                                        value={imageUrl}
                                    />

                                    {uploading && (
                                        <div className='text-center'>
                                            <div className='flex items-center justify-center gap-2 text-indigo-600 font-medium'>
                                                <span className='loading loading-spinner loading-md text-indigo-500'></span>
                                                Uploading image...
                                            </div>
                                        </div>
                                    )}

                                    {imageUrl && !uploading && (
                                        <div className='text-center'>
                                            <div className='bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center justify-center gap-2'>
                                                <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                                </svg>
                                                <span className='text-green-700 font-medium'>Image uploaded successfully</span>
                                            </div>
                                            <figure className='inline-block'>
                                                <img
                                                    src={imageUrl}
                                                    alt="Preview"
                                                    className='w-[95%] max-h-48 rounded-lg object-cover border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200'
                                                />
                                            </figure>
                                        </div>
                                    )}

                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex justify-end items-center gap-3 pt-6 border-t border-gray-100'>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className='btn btn-ghost text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200'
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className={`btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 gap-2 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {uploading ? (
                                        <>
                                            <span className='loading loading-spinner loading-sm'></span>
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            {IsEditMode ? 'Update Post' : 'Create Post'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}