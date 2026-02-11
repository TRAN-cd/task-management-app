import { useState } from "react";
import { useNavigate } from "react-router-dom";


type Props = {
  onAdd: (project: {name: string; status: string; description: string, assignee: string}) => void;
};

const ProjectCreatePage = ({onAdd}: Props) => {
  // 入力フォームの状態を管理する State
  const [name, setName] = useState("");
  const [status, setStatus] =useState("未着手"); //初期値を設定
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");

  const navigate = useNavigate();

  // フォームが送信された時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //ページのリロードを防ぐ

    if(!name) {
      alert("プロジェクト名を入力してください");
      return;
    }

    // App.tsx からもらった関数を読んで、データを追加する
    onAdd({name, status, description, assignee: assignee || "未割り当て"});

    // 追加が終わったら、一覧画面へ戻る
    navigate("/");
  }

  return (
    <div>
      <h1>新規プロジェクト作成</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            プロジェクト名：
            <input 
              type="text"
              value={name} // Stateを反映
              onChange={(e) => setName(e.target.value)} //入力されたらStateを更新
            />
          </label>
        </div>

        <div style={{marginTop: "16px"}}>
          <label>担当者：</label>
          <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="山田"></input>
        </div>

        <div>
          <p>ステータス：</p>
          {["未着手", "進行中", "完了"].map((s) => (
            <label key={s}>
              <input
                type="radio"
                name="status"
                value={s}
                checked={status === s}
                onChange={(e) => setStatus(e.target.value)}
              />
              {s}
            </label>
          ))}
        </div>

        <div>
          <label>
            備考：
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="メモとして使用"
            />
          </label>
        </div>

        <button type="submit" style={{marginTop: "20px"}}>作成する</button>
      </form>
    </div>
  )
}

export default ProjectCreatePage