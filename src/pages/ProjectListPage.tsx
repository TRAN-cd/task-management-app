import { ProjectCard } from "../components/ProjectCard"

const ProjectListPage = () => {
  return (
    <div>
      <h1>プロジェクト一覧</h1>

      <ProjectCard />
      <ProjectCard />

      <button>新規プロジェクト作成</button>
    </div>
  )
}

export default ProjectListPage