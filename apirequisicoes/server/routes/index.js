const { Router } = require("express");
const routes = Router();

// Liberar origens para requisições
var cors = require("cors");
routes.use(cors({ origin: "*" }));
//routes.use(cors({origin: 'http://localhost:3001'}));

//Rotas para cada módulo
const colaboradorRout = require("./ColaboradorRout");
routes.use("/api", colaboradorRout);
const jwt = require("jsonwebtoken");
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



const solicitanteRout = require("./SolicitanteRout");
routes.use("/api", solicitanteRout);

const tipoRequisicaoRout = require("./TipoRequisicaoRout");
routes.use("/api", tipoRequisicaoRout);

const AndamentoRout = require("./AndamentoRout");
routes.use("/api", AndamentoRout);

const RequisicaoRout = require("./RequisicaoRout");
routes.use("/api", RequisicaoRout);

const AtividadeRout = require("./AtividadeRout");
routes.use("/api", AtividadeRout);

module.exports = routes;
