import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useBlogPost } from "@/hooks/useBlogPosts";

const InsightPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug || "");

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-16">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Post not found</h1>
          <Link to="/insights" className="font-body text-accent hover:underline">
            ← Back to Insights
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Insights
          </Link>

          <p className="font-body text-xs text-muted-foreground/60 mb-4">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
            {post.title}
          </h1>

          {post.image_url && (
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-10">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {post.summary && (
            <div className="bg-secondary/40 rounded-xl p-6 mb-10">
              <p className="font-body text-sm tracking-[0.2em] uppercase text-accent mb-2">Summary</p>
              <p className="font-body text-lg text-foreground leading-relaxed">
                {post.summary}
              </p>
            </div>
          )}

          <article className="prose prose-lg max-w-none font-body text-foreground/90 leading-relaxed space-y-6">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </article>
        </motion.div>
      </div>
    </main>
  );
};

export default InsightPost;
