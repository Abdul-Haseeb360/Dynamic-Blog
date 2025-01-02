import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'data', 'posts')

async function ensureDirectoryExists() {
  try {
    await fs.access(postsDirectory)
  } catch (error) {
    await fs.mkdir(postsDirectory, { recursive: true })
  }
}

export async function GET() {
  await ensureDirectoryExists()
  const fileNames = await fs.readdir(postsDirectory)
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(postsDirectory, fileName)
      const fileContents = await fs.readFile(filePath, 'utf8')
      return JSON.parse(fileContents)
    })
  )
  posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const { title, content, imageUrl } = await request.json()
  const id = Date.now().toString()
  const post = {
    id,
    title,
    content,
    excerpt: content.slice(0, 150) + '...',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl
  }
  const filePath = path.join(postsDirectory, `${id}.json`)
  await fs.writeFile(filePath, JSON.stringify(post, null, 2))
  return NextResponse.json(post, { status: 201 })
}

