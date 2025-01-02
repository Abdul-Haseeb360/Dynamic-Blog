"use client"
import Link from 'next/link'
import { useState } from 'react'
import { Home, Info, Mail, PenSquare, Menu, Notebook } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Dynamic Blog</Link>
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <nav className="hidden lg:block">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="flex items-center hover:text-gray-300">
                  <Home className="w-5 h-5 mr-1" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/create" className="flex items-center hover:text-gray-300">
                  <PenSquare className="w-5 h-5 mr-1" />
                  <span>Create Post</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center hover:text-gray-300">
                  <Notebook className="w-5 h-5 mr-1" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center hover:text-gray-300">
                  <Info className="w-5 h-5 mr-1" />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center hover:text-gray-300">
                  <Mail className="w-5 h-5 mr-1" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link href="/" className="flex items-center hover:text-gray-300">
                  <Home className="w-5 h-5 mr-1" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/create" className="flex items-center hover:text-gray-300">
                  <PenSquare className="w-5 h-5 mr-1" />
                  <span>Create Post</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center hover:text-gray-300">
                  <Info className="w-5 h-5 mr-1" />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center hover:text-gray-300">
                  <Mail className="w-5 h-5 mr-1" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

