import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectCreatePage from "./pages/ProjectCreatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectListPage/>}/>
        <Route path="/project/:id" element={<ProjectDetailPage/>}/>
        <Route path="/project/new" element={<ProjectCreatePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App



// Routesとは、「URLと画面の対応表」を書く箱。