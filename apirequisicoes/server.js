console.log("Arquivo server.js executado com sucesso!");

const express = require("express");

const app = express();

app.use(express.json());

require('dotenv').config();
// Liberar origens para requisições
// var cors = require('cors');
// routes.use(cors({origin: '*'}));
//routes.use(cors({origin: 'http://localhost:3001'}));

const port = process.env.PORT || 3000;

// usar o momgo
require("./server/banco/mongo");
// Usar as rotas
const routes = require('./server/routes/index');
app.use(routes);

app.listen(port, () => {
  return console.log("API executando na porta " + port);
});

