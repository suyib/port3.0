import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Insights = () => {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Blog</p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4">Insights</h1>
          <p className="font-body text-lg text-muted-foreground">
            Thoughts on design, development, and the creative process.
          </p>
        </motion.div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : !posts?.length ? (
          <p className="text-muted-foreground text-center py-20">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/insights/${post.slug}`}
                  className="group block"
                >
                  {post.image_url && (
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <h2 className="font-display text-xl text-foreground group-hover:text-accent transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-muted-foreground line-clamp-3">
                    {post.summary}
                  </p>
                  <p className="font-body text-xs text-muted-foreground/60 mt-3">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Insights;
