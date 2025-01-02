import Link from 'next/link'
import { BookOpen, PenTool, Users } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 mb-8 rounded-lg shadow-lg">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Dynamic Blog</h1>
        <p className="text-xl mb-8 text-center">Explore, Create, and Connect with Our Community</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/blog" className="block">
            <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <BookOpen className="w-12 h-12 mb-4 mx-auto text-blue-500" />
              <h2 className="text-xl font-semibold mb-2 text-center">Read Articles</h2>
              <p className="text-center">Discover insightful content from our talented writers.</p>
            </div>
          </Link>
          <Link href="/create" className="block">
            <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <PenTool className="w-12 h-12 mb-4 mx-auto text-purple-500" />
              <h2 className="text-xl font-semibold mb-2 text-center">Write Posts</h2>
              <p className="text-center">Share your knowledge and experiences with our community.</p>
            </div>
          </Link>
          <Link href="/contact" className="block">
            <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <Users className="w-12 h-12 mb-4 mx-auto text-green-500" />
              <h2 className="text-xl font-semibold mb-2 text-center">Connect</h2>
              <p className="text-center">Engage with like-minded individuals and grow your network.</p>
            </div>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/#blog-section" className="bg-white text-blue-600 py-2 px-6 rounded-full font-semibold hover:bg-blue-100 transition-colors duration-300">
            Explore Blog Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

