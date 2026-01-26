import { TaskItem } from "../components/TaskItem"

const ProjectDetailPage = () => {
  return (
    <div>
      <h1>コーポレートサイト制作</h1>
      <p>ステータス：進行中</p>

      <hr />

      <TaskItem />
      <TaskItem />

      <button>プロジェクト一覧に戻る</button>
    </div>
  )
}

export default ProjectDetailPage