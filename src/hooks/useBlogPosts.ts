import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  summary: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export function useBlogPosts(publishedOnly = true) {
  return useQuery({
    queryKey: ["blog-posts", publishedOnly],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (publishedOnly) {
        query = query.eq("published", true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as BlogPost[];
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data as BlogPost | null;
    },
    enabled: !!slug,
  });
}

export function useSaveBlogPost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (post: Partial<BlogPost> & { slug: string; title: string }) => {
      if (post.id) {
        const { error } = await supabase.from("blog_posts").update(post).eq("id", post.id);
        if (error) throw error;
      } else {
        const { id, ...rest } = post;
        const { error } = await supabase.from("blog_posts").insert(rest);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      qc.invalidateQueries({ queryKey: ["blog-post"] });
    },
  });
}

export function useDeleteBlogPost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
}

export function useUploadBlogImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = file.name.split(".").pop();
      const path = `blog/${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage.from("project-images").upload(path, file);
      if (error) throw error;

      const { data } = supabase.storage.from("project-images").getPublicUrl(path);
      return data.publicUrl;
    },
  });
}
