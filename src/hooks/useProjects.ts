import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/types/project";
import type { Json } from "@/integrations/supabase/types";

function rowToProject(row: any): Project {
  return {
    ...row,
    pain_points: (row.pain_points ?? []) as Project["pain_points"],
    comparison: (row.comparison ?? {}) as Project["comparison"],
    process: (row.process ?? []) as Project["process"],
    tech_pivot: (row.tech_pivot ?? {}) as Project["tech_pivot"],
    component_states: (row.component_states ?? []) as Project["component_states"],
    takeaways: (row.takeaways ?? []) as Project["takeaways"],
  };
}

export function useProjects(publishedOnly = true) {
  return useQuery({
    queryKey: ["projects", publishedOnly],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });

      if (publishedOnly) {
        query = query.eq("published", true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []).map(rowToProject);
    },
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      return rowToProject(data);
    },
    enabled: !!slug,
  });
}

export function useSaveProject() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (project: Partial<Project> & { slug: string; title: string }) => {
      const payload = {
        ...project,
        pain_points: project.pain_points as unknown as Json,
        comparison: project.comparison as unknown as Json,
        process: project.process as unknown as Json,
        tech_pivot: project.tech_pivot as unknown as Json,
        component_states: project.component_states as unknown as Json,
        takeaways: project.takeaways as unknown as Json,
      };

      if (project.id) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["project"] });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUploadProjectImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("project-images")
        .upload(path, file);
      if (error) throw error;

      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(path);

      return data.publicUrl;
    },
  });
}
