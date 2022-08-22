
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect, useRef } from "react";

import RequisicaoList from "./RequisicaoList";

import RequisicaoForm from "./RequisicaoForm";

import "primereact/resources/themes/saga-blue/theme.css";

import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";

import RequisicaoSrv from "./RequisicaoSrv";

import { Toast } from "primereact/toast";

import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import TipoRequisicaoSrv from "../tipoRequisicao/TipoRequisicaoSrv";
import SolicitanteSrv from "../solicitante/SolicitanteSrv";

function RequisicaoCon() {
    const initialState = {
        id: null,
        titulo: "",
        descricao: "",
        dataHoraCriada: "",
        status: "",
        prazoAtendimento: "",
        TipoRequisicao: "",
        Solicitante: ""
    };
  const [tipoRequisicoes, setTipoRequisicoes] = useState([]);
  const [solicitantes, setSolicitantes] = useState([]);
  const [requisicoes, setRequisicoes] = useState([]);
  const [requisicao, setRequisicao] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    onClickAtualizar();
    TipoRequisicaoSrv.listar()
    .then((response) => {
      setTipoRequisicoes(response.data);
      toastRef.current.show({
        severity: "success",
        summary: "Tipo Requisições atualizadas",
        life: 3000,
      });
    })
    .catch((e) => {
      toastRef.current.show({
        severity: "error",
        summary: e.message,
        life: 3000,
      });
    });
    SolicitanteSrv.listar()
    .then((response) => {
      setSolicitantes(response.data);
      toastRef.current.show({
        severity: "success",
        summary: "Solicitantes atualizados",
        life: 3000,
      });
    })
    .catch((e) => {
      toastRef.current.show({
        severity: "error",
        summary: e.message,
        life: 3000,
      });
    });
  }, []);

  const onClickAtualizar = () => {
    RequisicaoSrv.listar()
      .then((response) => {
        setRequisicoes(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Requisições atualizados",
          life: 3000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 3000,
        });
      });
  };

  const inserir = () => {
    setRequisicao(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (requisicao._id == null) { //inclusão
      RequisicaoSrv.incluir(requisicao)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    } else {
      // alteração
      RequisicaoSrv.alterar(requisicao)
        .then((response) => {
          setEditando(false);
          onClickAtualizar();
          toastRef.current.show({
            severity: "success",
            summary: "Salvou",
            life: 2000,
          });
        })
        .catch((e) => {
          toastRef.current.show({
            severity: "error",
            summary: e.message,
            life: 4000,
          });
        });
    }
  };
  const cancelar = () => {
    setEditando(false);
  };

  const editar = (_id) => {
    setRequisicao(
     requisicoes.filter((requisicao) => requisicao._id === _id)[0]
    );
    setEditando(true);
  };

  const excluir = (_id) => {
    confirmDialog({
      message: "Confirma a exclusão?",
      header: "Confirmação",
      icon: "pi pi-question",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      accept: () => excluirConfirm(_id),
    });
  };
  const excluirConfirm = (_id) => {
    RequisicaoSrv.excluir(_id)
      .then((response) => {
        onClickAtualizar();
        toastRef.current.show({
          severity: "success",
          summary: "Excluído",
          life: 2000,
        });
      })
      .catch((e) => {
        toastRef.current.show({
          severity: "error",
          summary: e.message,
          life: 4000,
        });
      });
  };

  if (!editando) {
    return (
      <div>
        <ConfirmDialog/>
        <RequisicaoList
          requisicoes={requisicoes}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
        />
        <Toast ref={toastRef}/>
      </div>
    );
  } else {
    return (
      <div>
        <RequisicaoForm
          requisicao={requisicao}
          solicitantes={solicitantes}
          tipoRequisicoes={tipoRequisicoes}
          setRequisicao={setRequisicao}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef}/>
      </div>
    );
  }
}
export default RequisicaoCon;
