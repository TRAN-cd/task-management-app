import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectCreatePage from "./pages/ProjectCreatePage";
import { useState, useEffect } from "react";
import type { Project } from "./types/project";

const App = () => {
  // const [projects, setProjects] = useState<Project[]>([
  //   {
  //     id: 1,
  //     name: "コーポレートサイト制作",
  //     assignee: "山田",
  //     status: "進行中",
  //     description: "トップページと会社概要の刷新。",
  //   },
  //   {
  //     id: 2,
  //     name: "LP改善プロジェクト",
  //     assignee: "佐藤",
  //     status: "未着手",
  //     description: "スケジュール未確認",
  //   },
  // ]);

  // 1. 初期値を LocalStorage から読み込む
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("my-projects");
    if (saved) {
      return JSON.parse(saved);
    }
    return [ //データがない場合の初期値
      { id: 1, name: "コーポレートサイト制作", assignee: "山田", status: "進行中", description: "HPの刷新" },
      { id: 2, name: "LP改善プロジェクト", assignee: "佐藤", status: "未着手", description: "CVR向上" },
    ];
  });

  // 2. projects が更新されるたびに、LocalStorageに保存する
  useEffect(() => {
    localStorage.setItem("my-projects", JSON.stringify(projects));
    }, [projects]);


  // 新しいプロジェクトを追加する関数
  const addProject = (newProject: { name: string; status: string; description: string }) => {
    // 新しいIDを生成する（今の最大ID + 1）
    const nextId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;

    // 新しいプロジェクトオブジェクトを作成
    const projectToAdd: Project = {
      id: nextId,
      name: newProject.name,
      status: newProject.status,
      assignee: "未割り当て",
      description: newProject.description,
    };

    // Stateを更新する（元の配列を壊さず、あたらしい配列を作る）
    setProjects((prevProjects) => [...prevProjects, projectToAdd]);
  };

  const deleteProject = (id: number) => {
    // 指定されたID以外を抽出して、新しい配列を作る
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const updateProjectStatus = (id: number, newStatus: string) => {
    setProjects((prev) => 
      prev.map((project) => 
        project.id === id ? { ...project, status: newStatus} : project
      )
    );
  };

  const updateProjectDescription = (id: number, newDescription: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? {...project, description: newDescription} : project
      )
    );
  };

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectListPage projects={projects} />}/>
        <Route path="/project/:id" 
          element={
          <ProjectDetailPage 
            projects={projects} 
            onDelete={deleteProject} 
            onUpdateProjectStatus={updateProjectStatus}
            onUpdateProjectDescription={updateProjectDescription}/>}
        />
        <Route path="/project/new" element={<ProjectCreatePage onAdd={addProject}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App



// Routesとは、「URLと画面の対応表」を書く箱。