import { useParams } from "react-router-dom"

const projects = [
  {
    id: 1,
    name: "コーポレートサイト制作",
    assignee: "山田",
    status: "進行中",
  },
  {
    id: 2,
    name: "LP改善プロジェクト",
    assignee: "佐藤",
    status: "未着手",
  },
];

const ProjectDetailPage = () => {
  // const params = useParams(); //今のURLに含まれる:〇〇 の値をまとめて取得する
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>プロジェクトが見つかりません</p>;
  }

  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    return <p>プロジェクトが見つかりません</p>;
  }
  
  const project = projects.find((p) => p.id === projectId);
  
  if (!project) {
    return <p>プロジェクトが見つかりません</p>;
  }

  return (
    <div>
      <h1>コーポレートサイト制作（プロジェクト詳細）</h1>
      <p>URLのID: {id}</p>


      <button>プロジェクト一覧に戻る</button>
    </div>
  )
}

export default ProjectDetailPage