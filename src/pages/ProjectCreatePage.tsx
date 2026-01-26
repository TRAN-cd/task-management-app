const ProjectCreatePage = () => {
  return (
    <div>
      <h1>新規プロジェクト作成</h1>

      <div>
        <label>
          プロジェクト名
          <input type="text" />
        </label>
      </div>

      <div>
        <p>ステータス</p>
        <label>
          <input type="radio" name="status" />
          受注済み
        </label>
        <label>
          <input type="radio" name="status" />
          進行中
        </label>
        <label>
          <input type="radio" name="status" />
          完了
        </label>
      </div>

      <button>作成する</button>
    </div>
  )
}

export default ProjectCreatePage