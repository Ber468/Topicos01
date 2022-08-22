import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';

const AndamentoForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setAndamento({ ...props.andamento, [name]: value });
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
          <h5 style={{textAlign:"center"}}>Cadastro de Andamentos</h5>
          <div className="container" style={{marginLeft: "38%",textAlign:"center"}}>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label style={{textAlign: "center"}} htmlFor="titulo">Titulo</label>
                <InputText
                  name="titulo"
                  {...register("titulo", {
                    required: { value: true, message: "O titulo é obrigatório!" },
                    maxLength: {
                      value: 50,
                      message: "O titulo pode ter no máximo 50 caracteres!",
                    },
                    minLength: {
                      value: 2,
                      message: "O titulo pode ter no mínimo 2 caracteres!",
                    },
                  })}
                  defaultValue={props.andamento.titulo}
                  onChange={handleInputChange}
                />
                {errors.titulo && (
                  <span style={{ color: "red" }}>{errors.titulo.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label style={{textAlign: "center"}} htmlFor="descricao">Descrição</label>
                <InputText
                  name="descricao"
                  {...register("descricao", {
                    required: { value: true, message: "O descricao é obrigatório!" },
                    maxLength: {
                      value: 100,
                      message: "O descricao pode ter no máximo 100 caracteres!",
                    }
                  })}
                  defaultValue={props.andamento.descricao}
                  onChange={handleInputChange}
                />
                {errors.descricao && (
                  <span style={{ color: "red" }}>{errors.descricao.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label style={{textAlign: "center"}} >
                  Data Hora
                </label>
                <input
                  className="form-control"
                  type="datetime-local"
                  name="dataHora"
                  value={props.andamento.dataHora}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label htmlFor="Colaborador">
                  Colaborador
                </label>
                <Dropdown
                  name="Colaborador"
                  value={props.andamento.Colaborador}
                  options={props.colaboradores}
                  optionLabel="nome"
                  optionValue="_id"
                  onChange={handleInputChange}
                  placeholder="Selecione o Colaborador"
                />
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label htmlFor="Atividade">
                  Atividade
                </label>
                <Dropdown
                  name="Atividade"
                  value={props.andamento.Atividade}
                  options={props.atividades}
                  optionLabel="descricao"
                  optionValue="_id"
                  onChange={handleInputChange}
                  placeholder="Selecione a Atividade"
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
export default AndamentoForm;
