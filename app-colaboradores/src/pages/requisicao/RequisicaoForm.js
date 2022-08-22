import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";

const RequisicaoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setRequisicao({ ...props.requisicao, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div className="card">
          <h5 style={{ textAlign: "center" }}>Cadastro de Requisições</h5>
          <div className="container" style={{marginLeft: "38%",textAlign:"center"}}>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label style={{textAlign: "center"}} htmlFor="titulo">
                  Titulo
                </label>
                <InputText
                  name="titulo"
                  {...register("titulo", {
                    required: {
                      value: true,
                      message: "O titulo é obrigatório!",
                    },
                    maxLength: {
                      value: 50,
                      message: "O titulo pode ter no máximo 50 caracteres!",
                    },
                    minLength: {
                      value: 2,
                      message: "O titulo pode ter no mínimo 2 caracteres!",
                    },
                  })}
                  defaultValue={props.requisicao.titulo}
                  onChange={handleInputChange}
                />
                {errors.titulo && (
                  <span style={{ color: "red" }}>{errors.titulo.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label style={{textAlign: "center"}} htmlFor="descricao">
                  Descrição
                </label>
                <InputText
                  name="descricao"
                  {...register("descricao", {
                    required: {
                      value: true,
                      message: "A descricao é obrigatória!",
                    },
                    maxLength: {
                      value: 100,
                      message: "A descricao pode ter no máximo 100 caracteres!",
                    },
                    minLength: {
                      value: 10,
                      message: "A descricao deve ter no mínimo 10 caracteres!",
                    },
                  })}
                  defaultValue={props.requisicao.descricao}
                  onChange={handleInputChange}
                />
                {errors.descricao && (
                  <span style={{ color: "red" }}>
                    {errors.descricao.message}
                  </span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label style={{textAlign: "center"}} >
                  Data e Hora
                </label>
                <input
                  className="form-control"
                  type="datetime-local"
                  name="dataHoraCriada"
                  value={props.requisicao.dataHoraCriada}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label style={{textAlign: "center"}} htmlFor="status">
                  Status
                </label>
                <InputText
                  name="status"
                  {...register("status", {
                    required: {
                      value: true,
                      message: "O titulo é obrigatório!",
                    },
                    maxLength: {
                      value: 50,
                      message: "O titulo pode ter no máximo 50 caracteres!",
                    },
                    minLength: {
                      value: 2,
                      message: "O titulo pode ter no mínimo 2 caracteres!",
                    },
                  })}
                  defaultValue={props.requisicao.status}
                  onChange={handleInputChange}
                />
                {errors.status && (
                  <span style={{ color: "red" }}>{errors.status.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label htmlFor="prazoAtendimento">
                  Prazo de Atendimento
                </label>
                <input
                  className="form-control"
                  type="datetime-local"
                  name="prazoAtendimento"
                  value={props.requisicao.prazoAtendimento}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label htmlFor="tipoRequisicao">
                  tipoRequisicao
                </label>
                <Dropdown
                  name="TipoRequisicao"
                  value={props.requisicao.TipoRequisicao}
                  options={props.tipoRequisicoes}
                  optionLabel="descricao"
                  optionValue="_id"
                  onChange={handleInputChange}
                  placeholder="Selecione o Tipo de Requisição"
                />
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label htmlFor="solicitante">
                  solicitante
                </label>
                <Dropdown
                  name="Solicitante"
                  value={props.requisicao.Solicitante}
                  options={props.solicitantes}
                  optionLabel="nome"
                  optionValue="_id"
                  onChange={handleInputChange}
                  placeholder="Selecione o Solicitante"
                />
              </div>
            </div>
          </div>
          <div style={{marginLeft:"32em"}}>
              <Button
                type="submit"
                icon="pi pi-save"
                className="p-button-rounded p-button-text "
                label="Salvar"
                onClick={props.salvar}
              ></Button>
              <Button
                type="button"
                icon="pi pi-times-circle"
                className="p-button-rounded p-button-text"
                label="Cancelar"
                onClick={props.cancelar}
              ></Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default RequisicaoForm;
