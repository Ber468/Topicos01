import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const template2 = {
  layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
  RowsPerPageDropdown: (options) => {
    const dropdownOptions = [
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 15, value: 15 },
    ];

    return (
      <React.Fragment>
        <span
          className="mx-1"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          Itens por página:{" "}
        </span>
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      </React.Fragment>
    );
  },
  CurrentPageReport: (options) => {
    return (
      <span
        style={{
          color: "var(--text-color)",
          userSelect: "none",
          width: "120px",
          textAlign: "center",
        }}
      >
        {options.first} - {options.last} of {options.totalRecords}
      </span>
    );
  },
};
const SolicitanteList = (props) => {
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text"
          onClick={() => props.editar(rowData._id)}>
        </Button>
        <Button
          type="button" 
          icon="pi pi-trash"
          className="p-button-rounded p-button-text"
          onClick={() => props.excluir(rowData._id)}>
        </Button>
      </React.Fragment>
    );
  };
  return (
    <div>
      <div>
        <h4 style={{textAlign:'center'}}>Listagem de Solicitantes</h4>
        <Button type="button" icon="pi pi-sync" style={{marginLeft: "47%"}} className="p-button-rounded p-button-text"
          onClick={props.onClickAtualizar}>
        </Button>
        <Button type="button" icon="pi pi-plus" className="p-button-rounded p-button-text"
          onClick={props.inserir}>
        </Button>
        <div className="card">
          <DataTable value={props.solicitantes} selectionMode="single" responsiveLayout="scroll"
            paginator paginatorTemplate={template2} rows={5} paginatorClassName="justify-content-center"
            className="mt-6">
            <Column field="_id" header="ID" sortable></Column>
            <Column field="nome" header="Nome" sortable filter></Column>
            <Column field="email" header="E-mail" sortable filter></Column>
            <Column header="Operações" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default SolicitanteList;
