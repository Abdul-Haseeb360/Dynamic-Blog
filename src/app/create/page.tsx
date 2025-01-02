"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  useEffect(() => {
    if (postId) {
      const title = searchParams.get('title') || '';
      const content = searchParams.get('content') || '';
      setTitle(title);
      setContent(content);
    }
  }, [postId, searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    try {
      const response = await fetch(postId ? `http://localhost:3000/api/upload?id=${postId}` : 'http://localhost:3000/api/upload', {
        method: postId ? 'PUT' : 'POST',
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('API endpoint not found');
        }
        throw new Error('Failed to create/update post');
      }

      setSuccess(postId ? 'Post updated successfully!' : 'Post created successfully!');
      setTitle('');
      setContent('');

      // Redirect to the blog page after a short delay
      setTimeout(() => {
        router.push('/blog');
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">{postId ? 'Edit Post' : 'Create a New Post'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={5}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {postId ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;