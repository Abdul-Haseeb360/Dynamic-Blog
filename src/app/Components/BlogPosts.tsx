"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/app/lib/Posts";

interface BlogPostsProps {
  initialPosts: Post[];
}

export default function BlogPosts({ initialPosts }: BlogPostsProps) {
  const [posts, setPosts] = useState(initialPosts);

  const handleNewPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <>
      {posts.length === 0 ? (
        <p className="text-gray-600">
          No posts yet. Be the first to create one!
        </p>
      ) : (
        posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-2">
              <Link
                href={`/post/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <Link
                href={`/post/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                Read more
              </Link>
            </div>
          </article>
        ))
      )}
      <button
        onClick={() =>
          handleNewPost({
            id: posts.length + 1,
            title: "New Post",
            excerpt: "This is a new post",
            createdAt: new Date().toISOString(),
            content: "",
            updatedAt: ""
          })
        }
        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Add New Post
      </button>
      <div className="mt-8">
        <Link
          href="/create "
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Create New Post
        </Link>
      </div>
    </>
  );
}
