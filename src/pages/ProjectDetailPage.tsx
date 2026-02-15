import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectById } from "../hooks/useProjectById";
import type { Project } from "../types/project";
import type React from "react";
import { STAFF_OPTIONS } from "../types/project";

type Props = {
  projects: Project[];
  onDelete: (id: number) => void;
  onUpdateProjectStatus: (id: number, newStatus: string) => void;
  onUpdateProjectDescription: (id: number, newDescription: string) => void;
  onUpdateAssignee: (id: number, newAssignee: string) => void;
  onAddTask: (projectId: number, taskName: string) => void;
  onUpdateTaskAssignee: (projectId: number, taskId: number, newAssignee: string) => void;
  onUpdateTaskStatus: (projectId: number, taskId: number, newAssignee: string) => void;
};


const ProjectDetailPage = ({ projects, onDelete, onUpdateProjectStatus, onUpdateProjectDescription, onUpdateAssignee, onAddTask, onUpdateTaskAssignee, onUpdateTaskStatus }: Props) => {
  //今のURLに含まれる:〇〇 の値をまとめて取得する
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = Number(id);
  const project = useProjectById(projects, projectId);
  const [taskName, setTaskName] = useState("");

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

  const handleAddTask = () => {
    if (!taskName) return;
    onAddTask(project.id, taskName);
    setTaskName(""); // 入力欄を空にする
  }

  return (
    <div>
      <h1>{project.name}</h1>

      <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>プロジェクト担当者</label>
        <select
          value={project.assignee}
          onChange={(e) => onUpdateAssignee(project.id, e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        >
          {STAFF_OPTIONS.map(staff => (
            <option key={staff} value={staff}>{staff}</option>
          ))}
        </select>
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
        <textarea value={project.description} onChange={handleDescriptionChange} rows={5} style={{width: "100%", marginTop:"8px"}}></textarea>
      </div>

      {/* 管理用ID表示 */}
      <p>URLのID: {id}</p>

      <hr style={{margin: "30px 0"}}/>

      <h3>タスク管理</h3>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input 
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="新しいタスク"
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={handleAddTask} style={{ padding: "8px 16px", cursor: "pointer" }}>追加</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>

        {[...project.tasks].sort((a, b) => {
          if (a.status === "完了" && b.status !== "完了") return 1;
          if (a.status !== "完了" && b.status === "完了") return -1;
          return 0;
        }).map((task) => {
          const isCompleted = task.status === "完了";
          return (
            <li
              key={task.id}
              style={{ 
                padding: "15px", 
                borderBottom: "1px solid #eee", 
                backgroundColor: isCompleted ? "#f9fafb" : "#fff", // 完了は背景を薄く
                color: isCompleted ? "#9ca3af" : "#000",          // 完了は文字をグレーに
                textDecoration: isCompleted ? "line-through" : "none" // 完了は打ち消し線（お好みで）
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{task.name}</div>

              <div style={{ display: "flex", gap: "20px", alignItems: "center", fontSize: "14px" }}>
                <select
                  value={task.assignee}
                  onChange={(e) => onUpdateTaskAssignee(project.id, task.id, e.target.value)}
                  style={{ color: "inherit" }}
                >
                  {STAFF_OPTIONS.map(staff => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>

                <select
                  value={task.status}
                  onChange={(e) => onUpdateTaskStatus(project.id, task.id, e.target.value)}
                  style={{ color: "inherit" }}
                >
                  <option value="未着手">未着手</option>
                  <option value="進行中">進行中</option>
                  <option value="完了">完了</option>
                </select>
              </div>
            </li>
          );
        })}
      </ul>

      <button onClick={()=> navigate("/")}>プロジェクト一覧に戻る</button>
      <hr />
      <button onClick={handleDelete} style={{color: "red"}}>このプロジェクトを削除する</button>

      {project.tasks.length === 0 && <p style={{color: "#999"}}>タスクはまだありません</p>}
    </div>
  )
}

export default ProjectDetailPage