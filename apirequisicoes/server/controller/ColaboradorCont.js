const Colaborador = require("../model/ColaboradorSchema");
const bcrypt = require("bcrypt");

module.exports = {
  listar: async (req, res) => {
    Colaborador.find((err, objetos) => {
      err ? res.status(400).send(err) : res.status(200).json(objetos);
    }).sort({ nome: 1 }); // -1 decrescente 1 crescente
  },
  incluir: async (req, res) => {
    let obj = new Colaborador(req.body);
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    obj.senha = await bcrypt.hash(obj.senha, salt);
    obj.save((err, obj) => {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },
  alterar: async (req, res) => {
    let obj = new Colaborador(req.body);
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    obj.senha = await bcrypt.hash(obj.senha, salt);
    Colaborador.updateOne({ _id: obj._id }, obj, function (err) {
      err ? res.status(400).send(err) : res.status(200).json(obj);
    });
  },

  excluir: async (req, res) => {
    Colaborador.deleteOne({ _id: req.params.id }, function (err) {
      err ? res.status(400).send(err) : res.status(200).json("message:ok");
    });
  },
  obterPeloId: async (req, res) => {
    Colaborador.findOne(
      { _id: req.params.id },
      function (err, obj) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json(obj);
        }
      }
    );
    
  },
  filtrar: async (req, res) => {
    Colaborador.find(
      {
        $or: [
          { nome: { $regex: req.params.filtro, $options: "i" } },
          { email: { $regex: req.params.filtro, $options: "i" } },
        ],
      },
      function (err, objetos) {
        if (err) res.status(400).send(err);
        res.json(objetos);
      }
    ).sort({ nome: -1 }); // -1 decrescente 1 crescente
  },
  login: async (req, res) => {
    Colaborador.findOne({ email: req.body.email }, async function (err, obj) {
    if (err) return res.status(400).send(err);
    if (!obj) return res.status(400).send("Email inválido!");
    const senhaValidada = await bcrypt.compare(
    req.body.senha, obj.senha
    );
    if (!senhaValidada)
    return res.status(400).send("Senha inválida!");
    const token = obj.generateAuthToken();
    res.send(token);
    });
    }
};
