"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";

interface Post {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: string;
  author: {
    id: string;
    email: string;
    fullName: string | null;
    avatarUrl: string | null;
  };
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [isCreating, setIsCreating] = useState(false);

  const supabase = createSupabaseBrowserClient();

  // 获取文章列表
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/posts");
      const data = await response.json();
      
      if (response.ok) {
        setPosts(data.posts);
      } else {
        setError(data.error || "Failed to fetch posts");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // 创建新文章
  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim()) return;

    try {
      setIsCreating(true);
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();

      if (response.ok) {
        setPosts([data.post, ...posts]);
        setNewPost({ title: "", content: "" });
      } else {
        setError(data.error || "Failed to create post");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-gray-600">加载中...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 创建文章表单 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3">创建新文章</h3>
        <form onSubmit={createPost} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="文章标题"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="文章内容 (可选)"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={isCreating || !newPost.title.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? "创建中..." : "创建文章"}
          </button>
        </form>
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* 文章列表 */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            暂无文章，请先登录并创建一篇文章
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              {post.content && (
                <p className="text-gray-700 mb-3">{post.content}</p>
              )}
              <div className="flex items-center text-sm text-gray-500">
                <span>作者: {post.author.fullName || post.author.email}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 刷新按钮 */}
      <button
        onClick={fetchPosts}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        刷新列表
      </button>
    </div>
  );
}
