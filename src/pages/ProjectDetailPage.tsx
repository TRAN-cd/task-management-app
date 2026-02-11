import { useParams, useNavigate } from "react-router-dom";
import { useProjectById } from "../hooks/useProjectById";
import type { Project } from "../types/project";
import type React from "react";

type Props = {
  projects: Project[];
  onDelete: (id: number) => void;
  onUpdateProjectStatus: (id: number, newStatus: string) => void;
  onUpdateProjectDescription: (id: number, newDescription: string) => void;
  onUpdateAssignee: (id: number, newAssignee: string) => void;
};


const ProjectDetailPage = ({ projects, onDelete, onUpdateProjectStatus, onUpdateProjectDescription, onUpdateAssignee }: Props) => {
  //今のURLに含まれる:〇〇 の値をまとめて取得する
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = Number(id);
  const project = useProjectById(projects, projectId);

  if (!id) {
    return <p>プロジェクトが見つかりません</p>;
  }

  if (Number.isNaN(projectId)) {
    return <p>プロジェクトが見つかりません</p>;
  }
  
  if (!project) {
    return <p>プロジェクトが見つかりません</p>;
  }

  const handleDelete = () => {
    if (window.confirm("本当に消しますか？")) {
      onDelete(project.id);
      navigate("/")
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateProjectStatus(project.id, e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateProjectDescription(project.id, e.target.value);
  };

  return (
    <div>
      <h1>{project.name}</h1>

      <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>プロジェクト担当者</label>
        <input
          type="text"
          value={project.assignee}
          onChange={(e) => onUpdateAssignee(project.id, e.target.value)}
          style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
      </div>

      <div>
        <label>
          ステータス：
          <select value={project.status} onChange={handleStatusChange}>
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
        </label>
      </div>

      <div style={{marginTop: "20px"}}>
        <label style={{display: "block"}}>備考</label>
        <textarea value={project.description} onChange={handleDescriptionChange} rows={5} style={{widows: "100%", marginTop:"8px"}}></textarea>
      </div>

      {/* 管理用ID表示 */}
      <p>URLのID: {id}</p>


      <button onClick={()=> navigate("/")}>プロジェクト一覧に戻る</button>
      <hr />
      <button onClick={handleDelete} style={{color: "red"}}>このプロジェクトを削除する</button>
    </div>
  )
}

export default ProjectDetailPage