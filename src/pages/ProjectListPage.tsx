// import { ProjectCard } from "../components/ProjectCard"
import { Link } from "react-router-dom"

const ProjectListPage = () => {
  return (
    <div>
      <h1>プロジェクト一覧</h1>

      {/* <ProjectCard /> */}
      {/* <ProjectCard /> */}

      <Link to="/project/1">
        プロジェクトAを見る
      </Link>

      <button>新規プロジェクト作成</button>
    </div>
  )
}

export default ProjectListPage