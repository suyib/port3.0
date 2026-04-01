import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project, ProjectImage, Iteration } from "@/types/project";
import type { Json } from "@/integrations/supabase/types";

function rowToProject(row: any, images?: ProjectImage[]): Project {
  return {
    ...row,
    pain_points: (row.pain_points ?? []) as Project["pain_points"],
    comparison: (row.comparison ?? {}) as Project["comparison"],
    process: (row.process ?? []) as Project["process"],
    tech_pivot: (row.tech_pivot ?? {}) as Project["tech_pivot"],
    component_states: (row.component_states ?? []) as Project["component_states"],
    takeaways: (row.takeaways ?? []) as Project["takeaways"],
    iterations: (row.iterations ?? []) as Iteration[],
    images,
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

      const projectIds = (data ?? []).map((p) => p.id);
      let images: any[] = [];
      if (projectIds.length > 0) {
        const { data: imgData } = await supabase
          .from("project_images")
          .select("*")
          .in("project_id", projectIds)
          .order("sort_order", { ascending: true });
        images = imgData ?? [];
      }

      return (data ?? []).map((row) =>
        rowToProject(
          row,
          images.filter((img: any) => img.project_id === row.id) as ProjectImage[]
        )
      );
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

      const { data: imgData } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", data.id)
        .order("sort_order", { ascending: true });

      return rowToProject(data, (imgData ?? []) as ProjectImage[]);
    },
    enabled: !!slug,
  });
}

export function useSaveProject() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (project: Partial<Project> & { slug: string; title: string }) => {
      const { images, ...rest } = project as any;
      const payload = {
        ...rest,
        pain_points: rest.pain_points as unknown as Json,
        comparison: rest.comparison as unknown as Json,
        process: rest.process as unknown as Json,
        tech_pivot: rest.tech_pivot as unknown as Json,
        component_states: rest.component_states as unknown as Json,
        takeaways: rest.takeaways as unknown as Json,
        iterations: rest.iterations as unknown as Json,
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

export function useReplaceProjectImage() {
  const qc = useQueryClient();
  const uploadImage = useUploadProjectImage();

  return useMutation({
    mutationFn: async ({ imageId, file }: { imageId: string; file: File }) => {
      const url = await uploadImage.mutateAsync(file);
      const { error } = await supabase
        .from("project_images")
        .update({ url })
        .eq("id", imageId);
      if (error) throw error;
      return url;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["project"] });
    },
  });
}

export function useAddProjectImage() {
  const qc = useQueryClient();
  const uploadImage = useUploadProjectImage();

  return useMutation({
    mutationFn: async ({ projectId, file, sortOrder }: { projectId: string; file: File; sortOrder: number }) => {
      const url = await uploadImage.mutateAsync(file);
      const { error } = await supabase.from("project_images").insert({
        project_id: projectId,
        url,
        sort_order: sortOrder,
      });
      if (error) throw error;
      return url;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["project"] });
    },
  });
}

export function useUpdateProjectImages() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (images: ProjectImage[]) => {
      for (const img of images) {
        const { error } = await supabase
          .from("project_images")
          .update({ sort_order: img.sort_order, visible: img.visible, caption: img.caption || "" })
          .eq("id", img.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["project"] });
    },
  });
}

export function useDeleteProjectImage() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("project_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["project"] });
    },
  });
}
