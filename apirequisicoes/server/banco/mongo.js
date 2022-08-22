const mongoose = require("mongoose");
const uri =
  "mongodb://admin:admin@localhost:27018/baseRequisicoes?authSource=baseRequisicoes";
mongoose.connect(uri, {});
