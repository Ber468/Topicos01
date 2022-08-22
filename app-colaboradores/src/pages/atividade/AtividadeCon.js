
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect, useRef } from "react";

import AtividadeList from "./AtividadeList";

import AtividadeForm from "./AtividadeForm";

import "primereact/resources/themes/saga-blue/theme.css";

import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";

import AtividadeSrv from "./AtividadeSrv";

import { Toast } from "primereact/toast";

import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import RequisicaoSrv from "../requisicao/RequisicaoSrv";
import ColaboradorSrv from "../colaborador/ColaboradorSrv";

function AtividadeCon() {
    const initialState = {
        id: null,
        titulo: "",
        descricao: "",
        status: "",
        prazo: "",
        agendaInicio: "",
        dataHoraTermino: "",
        Requisicao: "",
        Colaborador: ""
    };
  const [atividades, setAtividades] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [requisicoes, setRequisicoes] = useState([]);
  const [atividade, setAtividade] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    onClickAtualizar();
    RequisicaoSrv.listar()
    .then((response) => {
      setRequisicoes(response.data);
      toastRef.current.show({
        severity: "success",
        summary: "Requisições atualizadas",
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
    ColaboradorSrv.listar()
    .then((response) => {
      setColaboradores(response.data);
      toastRef.current.show({
        severity: "success",
        summary: "Colaboradores atualizados",
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
    AtividadeSrv.listar()
      .then((response) => {
        setAtividades(response.data);
        toastRef.current.show({
          severity: "success",
          summary: "Atividades atualizadas",
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
    setAtividade(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (atividade._id == null) { //inclusão
      AtividadeSrv.incluir(atividade)
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
      AtividadeSrv.alterar(atividade)
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
    setAtividade(
      atividades.filter((atividade) => atividade._id === _id)[0]
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
    AtividadeSrv.excluir(_id)
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
        <AtividadeList
          atividades={atividades}
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
        <AtividadeForm
          requisicoes={requisicoes}
          colaboradores={colaboradores}
          atividade={atividade}
          setAtividade={setAtividade}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef}/>
      </div>
    );
  }
}
export default AtividadeCon;
