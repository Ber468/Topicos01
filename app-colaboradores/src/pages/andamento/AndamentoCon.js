
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect, useRef } from "react";

import AndamentoList from "./AndamentoList";

import AndamentoForm from "./AndamentoForm";

import "primereact/resources/themes/saga-blue/theme.css";

import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";

import AndamentoSrv from "./AndamentoSrv";

import { Toast } from "primereact/toast";

import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import AtividadeSrv from "../atividade/AtividadeSrv";
import ColaboradorSrv from "../colaborador/ColaboradorSrv";


function AndamentoCon() {
    const initialState = {
        id: null,
        titulo: "",
        descricao: "",
        dataHora: "",
        Colaborador: "",
        Atividade: ""
    };
  const [atividades, setAtividades] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [andamentos, setAndamentos] = useState([]);
  const [andamento, setAndamento] = useState(initialState);
  const [editando, setEditando] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    onClickAtualizar();
    ColaboradorSrv.listar()
    .then((response) => {
      setColaboradores(response.data);
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
  }, []);

  const onClickAtualizar = () => {
    AndamentoSrv.listar()
      .then((response) => {
        setAndamentos(response.data);
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
    setAndamento(initialState);
    setEditando(true);
  };

  const salvar = () => {
    if (andamento._id == null) { //inclusão
      AndamentoSrv.incluir(andamento)
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
      AndamentoSrv.alterar(andamento)
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
    setAndamento(
      andamentos.filter((andamento) => andamento._id === _id)[0]
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
    AndamentoSrv.excluir(_id)
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
        <AndamentoList
          andamentos={andamentos}
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
        <AndamentoForm
          atividades={atividades}
          colaboradores={colaboradores}
          andamento={andamento}
          setAndamento={setAndamento}
          salvar={salvar}
          cancelar={cancelar}
        />
        <Toast ref={toastRef}/>
      </div>
    );
  }
}
export default AndamentoCon;
