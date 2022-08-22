const express = require("express");
const routes = express.Router();
const controle = require("../controller/ColaboradorCont");

const jwt = require("jsonwebtoken");
routes.route('/login').post(controle.login);
routes.use(function (req, res, next) {
  // interceptar as requisições a validar o token
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(403)
        .send({
          message: "Não possui token de autenticação. Acesso não autorizado!",
        });
    jwt.verify(token, process.env.JWT_PRIV_KEY, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .send({
            auth: false,
            message: "Token inválido. Acesso não autorizado!",
          });
      // estando tudo certo guarda no request para uso posterior
      req.userId = decoded._id;
      req.userName = decoded.nome;
      next();
    });
  } catch (error) {
    res.status(400).send("Erro no token de autenticação!");
  }
});

//Aqui refere-se as rotas do módulo e o que executar no controller
routes.route('/colaboradores').get(controle.listar);
routes.route('/colaboradores').post(controle.incluir);
routes.route('/colaboradores').put(controle.alterar);
routes.route('/colaboradores/:id').delete(controle.excluir);
routes.route('/colaboradores/:id').get(controle.obterPeloId);
routes.route('/colaboradores/filtro/:filtro').get(controle.filtrar);


module.exports = routes;
