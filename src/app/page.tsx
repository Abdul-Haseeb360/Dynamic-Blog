import BlogPosts from "./Components/BlogPosts";
import { getPosts } from "./lib/Posts";
import HeroSection from './Components/HeroSection'

export default  async function Home() {
  // const posts = await getPosts()
  return (
    <div>
      <HeroSection/>
    
      <div id="blog-section" className="space-y-8">
      <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
      <BlogPosts/>
    </div>

    </div>
  );
}
