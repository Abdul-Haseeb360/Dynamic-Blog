import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const POSTS_FILE = join(process.cwd(), 'data', 'posts.json');

async function getPosts() {
  try {
    const data = await readFile(POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function savePosts(posts: any) {
  await writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const post = { id: Date.now(), title, content };
    const posts = await getPosts();
    posts.push(post);
    await savePosts(posts);

    return NextResponse.json({ message: 'Post created successfully', post });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '', 10);

    if (!id) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const posts = await getPosts();
    const updatedPosts = posts.filter((post: { id: number; }) => post.id !== id);
    await savePosts(updatedPosts);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '', 10);
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!id || !title || !content) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const posts = await getPosts();
    const postIndex = posts.findIndex((post: { id: number; }) => post.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    posts[postIndex] = { id, title, content };
    await savePosts(posts);

    return NextResponse.json({ message: 'Post updated successfully', post: posts[postIndex] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}