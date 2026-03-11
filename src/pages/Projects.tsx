import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";

const Projects = () => {
  const { data: projects, isLoading } = useProjects(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!projects) return [];
    const tags = new Set<string>();
    projects.forEach((p) => {
      if (p.category) {
        p.category.split(",").map((s) => s.trim()).filter(Boolean).forEach((t) => tags.add(t));
      }
    });
    return [...tags].sort();
  }, [projects]);

  const filtered = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.tools.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const projectTags = p.category.split(",").map((s) => s.trim());
      const matchesCategory = !activeCategory || projectTags.includes(activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [projects, search, activeCategory]);

  return (
    <main className="min-h-screen bg-background pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">
            Portfolio
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-foreground">
            All Projects
          </h1>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12 space-y-5"
        >
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, tools, categories..."
              className="w-full font-body text-sm bg-card border border-border/60 rounded-xl pl-11 pr-10 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`font-body text-xs tracking-wide px-4 py-2 rounded-full border transition-all ${
                  !activeCategory
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border/60 hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveCategory(activeCategory === cat ? null : cat)
                  }
                  className={`font-body text-xs tracking-wide px-4 py-2 rounded-full border transition-all ${
                    activeCategory === cat
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border/60 hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Project Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-secondary rounded-2xl h-56 mb-4" />
                <div className="h-3 bg-secondary rounded w-1/3 mb-3" />
                <div className="h-5 bg-secondary rounded w-2/3 mb-2" />
                <div className="h-12 bg-secondary rounded" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-body text-lg text-muted-foreground mb-2">
              No projects found
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Link
                  to={`/project/${project.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-2xl bg-secondary mb-4">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="font-body text-[11px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="font-body text-[11px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                        +{project.tools.length - 3}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Projects;
