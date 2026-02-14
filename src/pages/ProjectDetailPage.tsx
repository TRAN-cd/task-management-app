import { useState } from "react";
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
  const staffOptions = ["山田", "佐藤", "未割り当て"];

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
        <div style={{ display: "flex", gap: "15px" }}>
          {staffOptions.map((staff) => (
            <label key={staff} style={{ cursor: "pointer" }}>
              <input
                type="radio"
                name="projectAssignee"
                value={staff}
                checked={project.assignee === staff}
                onChange={(e) => onUpdateAssignee(project.id, e.target.value)}
              />
              {staff}
            </label>
          ))}
        </div>
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
        {project.tasks.map((task) => (
          <li key={task.id} style={{ padding: "15px", borderBottom: "1px solid #eee", backgroundColor: "#fff" }}>
            <div style={{ fontWeight: "bold", marginBottom: "10px" }}>{task.name}</div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", fontSize: "14px" }}>

              {/* タスク担当者のラジオボタン */}
              <div>
                <span style={{ marginRight: "10px", color: "#666" }}>担当：</span>
                {staffOptions.map((staff) => (
                  <label key={staff} style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      name={`taskAssignee-${task.id}`}
                      checked={task.assignee === staff}
                      onChange={() => onUpdateTaskAssignee(project.id,task.id, staff)}
                    />
                    {staff}
                  </label>
                ))}
              </div>

              {/* タスクステータスのセレクト */}
              <div>
                <span style={{ marginRight: "10px", color: "#666" }}>状態：</span>
                <select value={task.status} onChange={(e) => onUpdateTaskStatus(project.id, task.id, e.target.value)}>
                  <option value="未着手">未着手</option>
                  <option value="進行中">進行中</option>
                  <option value="完了">完了</option>
                </select>
              </div>
            </div>  

          </li>
        ))}
      </ul>

      <button onClick={()=> navigate("/")}>プロジェクト一覧に戻る</button>
      <hr />
      <button onClick={handleDelete} style={{color: "red"}}>このプロジェクトを削除する</button>

      {project.tasks.length === 0 && <p style={{color: "#999"}}>タスクはまだありません</p>}
    </div>
  )
}

export default ProjectDetailPage