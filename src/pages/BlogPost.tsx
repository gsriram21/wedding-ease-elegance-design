import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { Calendar, Clock, User, Heart, Share2, ArrowLeft, ChevronRight } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // This would typically come from an API or CMS
  const blogPost = {
    id: "modern-bridal-trends-2024",
    title: "Modern Bridal Trends: What's Inspiring 2024 Weddings",
    excerpt: "Discover the latest trends shaping weddings this year, from sustainable fashion choices to technology-enhanced ceremonies.",
    author: "Priya Sharma",
    date: "December 15, 2024",
    readTime: "5 min read",
    image: "/images/awesome-sauce-creative-N7BP10VHivU-unsplash.jpg",
    category: "Trends",
    content: `
      <p>The wedding industry is evolving at an unprecedented pace, with 2024 marking a significant shift towards more personalized, sustainable, and technologically enhanced celebrations. As couples become more conscious about their choices and seek unique ways to express their love stories, we're witnessing fascinating trends that blend tradition with innovation.</p>

      <h2>Sustainable Luxury: The New Standard</h2>
      <p>Modern couples are increasingly prioritizing sustainability without compromising on luxury. This shift has led to innovative approaches in wedding planning:</p>
      
      <ul>
        <li><strong>Eco-friendly venues:</strong> Outdoor locations and venues with green certifications are becoming highly sought after</li>
        <li><strong>Sustainable fashion:</strong> Vintage wedding dresses, rental options, and designers using eco-friendly materials</li>
        <li><strong>Local sourcing:</strong> Emphasis on local vendors, seasonal flowers, and regional cuisine</li>
      </ul>

      <h2>Technology Integration</h2>
      <p>Technology is seamlessly blending into wedding celebrations, enhancing rather than overwhelming the romantic atmosphere:</p>
      
      <ul>
        <li><strong>Virtual reality experiences:</strong> Allowing distant relatives to feel present during ceremonies</li>
        <li><strong>Digital guest books:</strong> Interactive displays capturing messages and memories</li>
        <li><strong>Smart wedding planning:</strong> AI-powered tools helping couples make informed decisions</li>
      </ul>

      <h2>Personalization at Its Peak</h2>
      <p>Every element of modern weddings tells the couple's unique story. From custom cocktails named after shared memories to personalized wedding favors that reflect the couple's journey, personalization has moved beyond monogrammed napkins.</p>

      <p>Couples are incorporating their cultural heritage, shared hobbies, and personal achievements into every aspect of their celebration. This trend extends to wedding jewelry, where custom pieces that tell the couple's story are becoming increasingly popular.</p>

      <h2>Intimate Celebrations</h2>
      <p>The trend towards smaller, more intimate weddings continues to grow. These celebrations focus on quality over quantity, allowing couples to invest more in creating meaningful experiences for their closest loved ones.</p>

      <p>This shift has also influenced wedding fashion, with many brides opting for multiple outfit changes throughout the day, allowing them to showcase different aspects of their style and personality.</p>

      <h2>Looking Ahead</h2>
      <p>As we move through 2024, these trends will continue to evolve, shaped by couples who dare to be different and vendors who support their vision. The future of weddings lies in the perfect balance of tradition and innovation, luxury and sustainability, grandeur and intimacy.</p>

      <p>At WeddingEase, we're committed to helping couples navigate these trends while staying true to their personal vision. Whether you're drawn to sustainable luxury or cutting-edge technology, our team is here to bring your dream wedding to life.</p>
    `
  };

  const relatedPosts = [
    {
      id: "choosing-perfect-wedding-jewelry",
      title: "The Art of Choosing Perfect Wedding Jewelry",
      image: "/images/accesories1.png",
      category: "Jewelry"
    },
    {
      id: "sustainable-wedding-ideas", 
      title: "Sustainable Wedding Ideas for Eco-Conscious Couples",
      image: "/images/celebration-new-1.jpg",
      category: "Sustainability"
    },
    {
      id: "destination-wedding-planning",
      title: "Destination Wedding Planning: A Complete Guide", 
      image: "/images/khadija-yousaf-lKwp3-FQomY-unsplash.jpg",
      category: "Planning"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-soft-pink to-white">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="luxury-container">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-luxury-maroon hover:text-luxury-dusty-rose transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-luxury-sans font-medium">Back to Blog</span>
          </button>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-luxury-dusty-rose text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                  {blogPost.category}
                </span>
              </div>
              
              <h1 className="font-luxury-serif text-4xl md:text-5xl font-bold text-luxury-maroon mb-6 leading-tight">
                {blogPost.title}
              </h1>
              
              <div className="flex items-center gap-6 text-luxury-maroon/60 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-luxury-sans">{blogPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-luxury-sans">{blogPost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-luxury-sans">{blogPost.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg hover:bg-white transition-colors duration-300">
                  <Heart className="w-4 h-4" />
                  <span className="font-luxury-sans text-sm">Save</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg hover:bg-white transition-colors duration-300">
                  <Share2 className="w-4 h-4" />
                  <span className="font-luxury-sans text-sm">Share</span>
                </button>
              </div>
              
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={blogPost.image} 
                  alt={blogPost.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="font-luxury-sans text-luxury-maroon/80 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            </div>

            {/* Author Bio */}
            <div className="mt-16 p-8 bg-white/80 backdrop-blur-sm rounded-xl border border-luxury-taupe/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-luxury-dusty-rose/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-luxury-dusty-rose" />
                </div>
                <div>
                  <h3 className="font-luxury-serif text-xl font-bold text-luxury-maroon">
                    {blogPost.author}
                  </h3>
                  <p className="font-luxury-sans text-luxury-maroon/70">
                    Senior Wedding Consultant & Trend Expert
                  </p>
                  <p className="font-luxury-sans text-sm text-luxury-maroon/60 mt-2">
                    With over 8 years of experience in luxury wedding planning, Priya specializes in creating 
                    unforgettable celebrations that blend traditional elegance with contemporary trends.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          <section className="mt-20">
            <h2 className="font-luxury-serif text-3xl font-bold text-luxury-maroon mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
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
                    <h3 className="font-luxury-serif text-lg font-bold text-luxury-maroon group-hover:text-luxury-dusty-rose transition-colors duration-300">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-4 text-luxury-dusty-rose">
                      <span className="font-luxury-sans text-sm font-medium">Read More</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Newsletter CTA */}
          <div className="mt-20 bg-gradient-to-r from-luxury-maroon to-luxury-burgundy rounded-2xl p-12 text-center text-white">
            <h3 className="font-luxury-serif text-3xl font-bold mb-4">
              Never Miss a Trend
            </h3>
            <p className="font-luxury-sans text-lg mb-8 opacity-90">
              Subscribe to our newsletter for the latest wedding inspiration and expert insights
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

export default BlogPost; 