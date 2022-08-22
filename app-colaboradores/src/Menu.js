import React from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
function Menu() {
  let navigate = useNavigate();
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Cadastros",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Colaboradores",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/Colaboradores");
          },
        },
        {
          label: "Solicitantes",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            navigate("/Solicitantes");
          },
        },
        {
          label: "Tipos Requisições",
          icon: "pi pi-fw pi-search-plus",
          command: () => {
            navigate("/TipoRequisicao");
          },
        },
        {
          label: "Requisições",
          icon: "pi pi-fw pi-bookmark",
          command: () => {
            navigate("/Requisicao");
          },
        },
        {
          label: "Atividade",
          icon: "pi pi-fw pi-pencil",
          command: () => {
            navigate("/Atividade");
          },
        },
        {
          label: "Andamento",
          icon: "pi pi-fw pi-arrow-right",
          command: () => {
            navigate("/Andamento");
          },
        },
        {
          label: "Sair",
          icon: "pi pi-sign-out",
          command: () => {
            sessionStorage.setItem("token", "");
          },
          url: "/",
        },
      ],
    },
  ];
  return <Menubar model={items} />;
}
export default Menu;
