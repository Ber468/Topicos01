import "./App.css";
import LoginForm from "./pages/login/LoginForm";
import React, { Suspense, lazy, useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Menu";

const Home = lazy(() => import("./pages/home/Home"));
const ColaboradorCon = lazy(() => import("./pages/colaborador/ColaboradorCon"));
const SolicitanteCon = lazy(() => import("./pages/solicitante/SolicitanteCon"));
const TipoRequisicaoCon = lazy(() => import("./pages/tipoRequisicao/TipoRequisicaoCon"));
const RequisicaoCon = lazy(() => import("./pages/requisicao/RequisicaoCon"));
const AtividadeCon = lazy(() => import("./pages/atividade/AtividadeCon"));
const AndamentoCon = lazy(() => import("./pages/andamento/AndamentoCon"));


function App() {
  const [token, setToken] = useState([])
  useEffect(() => {
  setToken(sessionStorage.getItem('token'));
  }, []);
  if (!token) {
  return <LoginForm />
  }
 
  return (
    <BrowserRouter>
      <Menu />
      <Suspense fallback={<div>Carregando ...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colaboradores" element={<ColaboradorCon />} />
          <Route path="/solicitantes" element={<SolicitanteCon />} />
          <Route path="/tipoRequisicao" element={<TipoRequisicaoCon />} />
          <Route path="/requisicao" element={<RequisicaoCon />} />
          <Route path="/atividade" element={<AtividadeCon />} />
          <Route path="/andamento" element={<AndamentoCon />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
