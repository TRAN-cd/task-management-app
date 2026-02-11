import { Link } from "react-router-dom";
import type { Project } from "../types/project";

type Props = {
  projects: Project[];
};

const ProjectListPage = ({ projects }: Props) => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>プロジェクト一覧</h1>
        
        {/* 新規作成ボタン */}
        <Link 
          to="/project/new" 
          style={{ 
            backgroundColor: "#2563eb", 
            color: "white", 
            padding: "8px 16px", 
            borderRadius: "6px", 
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "14px"
          }}
        >
          + 新規作成
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {projects.map((project) => (
          <div 
            key={project.id} 
            style={{ 
              border: "1px solid #e5e7eb", 
              padding: "16px", 
              borderRadius: "12px", 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              backgroundColor: "#fff"
            }}
          >
            <div>
              <Link 
                to={`/project/${project.id}`} 
                style={{ fontSize: "18px", fontWeight: "600", color: "#2563eb", textDecoration: "none" }}
              >
                {project.name}
              </Link>

              <div style={{marginTop: "8px"}}>
                <span style={{fontSize: "12px"}}>担当者 <strong style={{fontSize: "16px"}}>{project.assignee}</strong></span>
              </div>
              
              {/* ステータス表示 */}
              <div style={{ marginTop: "8px" }}>
                <span style={{ 
                  fontSize: "12px", 
                  padding: "4px 10px", 
                  borderRadius: "999px", 
                  backgroundColor: project.status === "完了" ? "#dcfce7" : "#f3f4f6",
                  color: project.status === "完了" ? "#166534" : "#374151",
                  fontWeight: "500"
                }}>
                  {project.status}
                </span>
              </div>
            </div>

            <Link to={`/project/${project.id}`} style={{ color: "#9ca3af", fontSize: "14px", textDecoration: "none" }}>
              詳細を見る →
            </Link>
          </div>
        ))}

        {projects.length === 0 && (
          <p style={{ textAlign: "center", color: "#6b7280", marginTop: "40px" }}>
            プロジェクトが登録されていません
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectListPage;