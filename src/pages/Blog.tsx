import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { Calendar, Clock, User, Heart, ChevronRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  featured?: boolean;
}

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts: BlogPost[] = [
    {
      id: "modern-bridal-trends-2024",
      title: "Modern Bridal Trends: What's Inspiring 2024 Weddings",
      excerpt: "Discover the latest trends shaping weddings this year, from sustainable fashion choices to technology-enhanced ceremonies.",
      author: "Priya Sharma",
      date: "December 15, 2024",
      readTime: "5 min read",
      image: "/images/awesome-sauce-creative-N7BP10VHivU-unsplash.jpg",
      category: "Trends",
      featured: true
    },
    {
      id: "choosing-perfect-wedding-jewelry",
      title: "The Art of Choosing Perfect Wedding Jewelry",
      excerpt: "Expert guidance on selecting jewelry that complements your style and enhances your wedding day elegance.",
      author: "Meera Patel",
      date: "December 10, 2024", 
      readTime: "7 min read",
      image: "/images/accesories1.png",
      category: "Jewelry"
    },
    {
      id: "destination-wedding-planning",
      title: "Destination Wedding Planning: A Complete Guide",
      excerpt: "Everything you need to know about planning the perfect destination wedding, from venue selection to logistics.",
      author: "Raj Kumar",
      date: "December 8, 2024",
      readTime: "10 min read", 
      image: "/images/khadija-yousaf-lKwp3-FQomY-unsplash.jpg",
      category: "Planning"
    },
    {
      id: "sustainable-wedding-ideas",
      title: "Sustainable Wedding Ideas for Eco-Conscious Couples",
      excerpt: "Create a beautiful, memorable wedding while being mindful of your environmental impact with these sustainable ideas.",
      author: "Anita Desai",
      date: "December 5, 2024",
      readTime: "6 min read",
      image: "/images/celebration-new-1.jpg", 
      category: "Sustainability"
    },
    {
      id: "wedding-invitation-etiquette",
      title: "Wedding Invitation Etiquette: Traditional Meets Modern",
      excerpt: "Navigate the delicate balance between traditional wedding invitation customs and contemporary preferences.",
      author: "Kavya Singh",
      date: "December 1, 2024",
      readTime: "4 min read",
      image: "/images/invites1.png",
      category: "Etiquette"
    },
    {
      id: "monsoon-wedding-tips",
      title: "Monsoon Wedding Magic: Tips for Rainy Season Celebrations",
      excerpt: "Turn the challenges of monsoon weddings into opportunities for unique and magical celebrations.",
      author: "Arjun Mehta",
      date: "November 28, 2024", 
      readTime: "8 min read",
      image: "/images/celebration-new-3.jpg",
      category: "Planning"
    }
  ];

  const categories = ["all", "Trends", "Jewelry", "Planning", "Sustainability", "Etiquette"];

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-soft-pink to-white">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h1 className="font-luxury-serif text-5xl font-bold text-luxury-maroon mb-4">
              Wedding Inspiration
            </h1>
            <p className="font-luxury-sans text-xl text-luxury-maroon/70 max-w-3xl mx-auto">
              Discover the latest trends, expert tips, and inspiring stories to make your special day unforgettable
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-luxury-taupe/10">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-luxury-dusty-rose text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                        Featured
                      </span>
                      <span className="text-luxury-dusty-rose font-medium text-sm">
                        {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="font-luxury-sans text-luxury-maroon/70 mb-6 text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-luxury-maroon/60 mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/blog/${featuredPost.id}`)}
                      className="bg-luxury-maroon text-white px-6 py-3 rounded-lg hover:bg-luxury-burgundy transition-colors duration-300 flex items-center gap-2 w-fit"
                    >
                      Read Article
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 font-luxury-sans font-medium ${
                    selectedCategory === category
                      ? 'bg-luxury-dusty-rose text-white shadow-lg'
                      : 'bg-white/80 text-luxury-maroon hover:bg-luxury-soft-pink/30'
                  }`}
                >
                  {category === "all" ? "All Articles" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post) => (
              <article 
                key={post.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-luxury-taupe/10 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-luxury-maroon px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon mb-3 group-hover:text-luxury-dusty-rose transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="font-luxury-sans text-luxury-maroon/70 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-luxury-maroon/60">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-gradient-to-r from-luxury-maroon to-luxury-burgundy rounded-2xl p-12 text-center text-white">
            <h3 className="font-luxury-serif text-3xl font-bold mb-4">
              Stay Inspired
            </h3>
            <p className="font-luxury-sans text-lg mb-8 opacity-90">
              Get the latest wedding trends and expert tips delivered to your inbox
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-luxury-maroon"
              />
              <button className="bg-white text-luxury-maroon px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog; 