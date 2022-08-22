const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SolicitanteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: {type: String,  required: true}
});
SolicitanteSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, nome: this.nome },
  process.env.JWT_PRIV_KEY, { expiresIn: process.env.TOKEN_EXPIRE }
  );
  return token;
 };
module.exports = mongoose.model("Solicitante", SolicitanteSchema);
