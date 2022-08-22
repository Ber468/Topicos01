import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";

const SolicitanteForm = (props) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setSolicitante({ ...props.solicitante, [name]: value });
  };

  const [contraSenha, setContraSenha] = useState();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);
    if (contraSenha !== props.solicitante.senha) {
      setError("senha", {
        type: "custom",
        message: "Senha e contra senha são diferentes!",
      });
    } else {
      props.salvar();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div className="card">
          <h5 style={{textAlign:"center"}}>Cadastro de Solicitantes</h5>
          <div className="container" style={{marginLeft: "38%",textAlign:"center"}}>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label  htmlFor="nome">Nome</label>
                <InputText
                  name="nome"
                  {...register("nome", {
                    required: { value: true, message: "O nome é obrigatório!" },
                    maxLength: {
                      value: 50,
                      message: "O nome pode ter no máximo 50 caracteres!",
                    },
                    minLength: {
                      value: 2,
                      message: "O nome pode ter no mínimo 2 caracteres!",
                    },
                  })}
                  defaultValue={props.solicitante.nome}
                  onChange={handleInputChange}
                />
                {errors.nome && (
                  <span style={{ color: "red" }}>{errors.nome.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label htmlFor="email">Email</label>
                <InputText
                  name="email"
                  {...register("email", {
                    required: { value: true, message: "O email é obrigatório!" },
                    maxLength: {
                      value: 100,
                      message: "O email pode ter no máximo 100 caracteres!",
                    },
                    minLength: {
                      value: 10,
                      message: "O nome deve ter no mínimo 10 caracteres!",
                    },
                  })}
                  defaultValue={props.solicitante.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label htmlFor="senha">Senha</label>
                <InputText
                  name="senha"
                  {...register("senha", {})}
                  defaultValue={props.solicitante.senha}
                  onChange={handleInputChange}
                />
                {errors.senha && (
                  <span style={{ color: "red" }}>{errors.senha.message}</span>
                )}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-3 md:col-4">
                <label htmlFor="contraSenha">Contra Senha</label>
                <InputText
                  name="contraSenha"
                  defaultValue={contraSenha}
                  onChange={(e) => setContraSenha(e.target.value)}
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
export default SolicitanteForm;
