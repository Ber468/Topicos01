const express = require("express");
const routes = express.Router();
const controle = require("../controller/TipoRequisicaoCont");

//Aqui refere-se as rotas do módulo e o que executar no controller
routes.route('/tiporequisicoes').get(controle.listar);
routes.route('/tiporequisicoes').post(controle.incluir);
routes.route('/tiporequisicoes').put(controle.alterar);
routes.route('/tiporequisicoes/:id').delete(controle.excluir);
routes.route('/tiporequisicoes/:id').get(controle.obterPeloId);
routes.route('/tiporequisicoes/filtro/:filtro').get(controle.filtrar);
module.exports = routes;