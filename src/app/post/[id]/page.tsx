import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'data', 'posts')

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const filePath = path.join(postsDirectory, `${id}.json`)
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const post = JSON.parse(fileContents)
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const { title, content } = await request.json()
  const filePath = path.join(postsDirectory, `${id}.json`)
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const post = JSON.parse(fileContents)
    const updatedPost = {
      ...post,
      title,
      content,
      excerpt: content.slice(0, 150) + '...',
      updatedAt: new Date().toISOString(),
    }
    await fs.writeFile(filePath, JSON.stringify(updatedPost, null, 2))
    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const filePath = path.join(postsDirectory, `${id}.json`)
  try {
    await fs.unlink(filePath)
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}

