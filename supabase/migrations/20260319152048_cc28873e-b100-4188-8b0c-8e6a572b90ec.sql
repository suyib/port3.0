ALTER TABLE projects ADD COLUMN cover_caption text NOT NULL DEFAULT '';
ALTER TABLE project_images ADD COLUMN caption text NOT NULL DEFAULT '';