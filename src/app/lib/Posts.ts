export interface Post {
  id: number
  title: string
  content: string
  excerpt: string
  createdAt: string
  updatedAt: string
  imageUrl?: string
}

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  return await response.json()
}

export async function getPostById(id: string): Promise<Post | null> {
  const response = await fetch(`/api/posts/${id}`)
  if (!response.ok) {
    return null
  }
  return response.json()
}

export async function createPost(title: string, content: string, imageUrl?: string): Promise<Post> {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content, imageUrl }),
  })
  if (!response.ok) {
    throw new Error('Failed to create post')
  }
  return response.json()
}

export async function updatePost(id: string, postData: { title: string; content: string }): Promise<Post | null> {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  if (!response.ok) {
    return null
  }
  return response.json()
}

export async function deletePost(id: string): Promise<boolean> {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  })
  return response.ok
}

