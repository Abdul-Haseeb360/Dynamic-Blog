"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/Loeading';
import { DeleteIcon, Edit } from 'lucide-react';

const BlogPage = () => {
  interface Post {
    id: number;
    title: string;
    content: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/upload');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/upload?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleEdit = (post: Post) => {
    router.push(`/create?id=${post.id}&title=${encodeURIComponent(post.title)}&content=${encodeURIComponent(post.content)}`);
  };

  const handleView = (id: number) => {
    router.push(`/post/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded-lg shadow-sm cursor-pointer" onClick={() => handleView(post.id)}>
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="truncate">{post.content}</p>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(post);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md flex gap-2 hover:bg-blue-600 font-semibold"
                >
                  <Edit size={20} /> Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md flex gap-2 hover:bg-red-600 font-semibold"
                >
                  <DeleteIcon size={20} /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogPage;