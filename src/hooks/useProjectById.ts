import type { Project } from "../types/project";

/**
 * プロジェクト一覧から、指定されたIDのプロジェクトを探して返すフック
 */
export const useProjectById = (projects: Project[], id: number): Project | undefined => {
  // 配列.find() を使って、idが一致するものを探します
  const foundProject = projects.find((p) => p.id === id);
  
  return foundProject;
};