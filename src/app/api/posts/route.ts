import path from 'path';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';

const postsDirectory = path.join(process.cwd(), 'data', 'posts');

async function ensureDirectoryExists() {
  try {
    await fs.access(postsDirectory);
  } catch {
    await fs.mkdir(postsDirectory, { recursive: true });
  }
}

export async function GET() {
  await ensureDirectoryExists();
  const fileNames = await fs.readdir(postsDirectory);
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(filePath, 'utf8');
      return JSON.parse(fileContents);
    })
  );
  return NextResponse.json(posts);
}