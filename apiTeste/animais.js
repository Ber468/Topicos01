module.exports = (app) => {
    const ObjectId = require('mongodb').ObjectId;

    //Retornar animais -- GET
    app.get('/animais', (req, res) => {
        db.collection('animais').find().toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        })

    });

    //Inserir animais -- POST
    app.post('/animais', (req, res, next) => {
        db.collection('animais').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });

    //Alterar animais -- PUT
    app.put('/animais', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {
            $set: {
                nome: req.body.nome,
                tipo: req.body.tipo,
                idade: req.body.idade
            }
        };
        db.collection('animais').updateOne(
            { _id: id },
            newvalues,
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount < 1)
                    return res.json({ aviso: "Nada alterado." });
                res.json({ success: "Alterado com sucesso." });
            })
    });

    //Deletar animais --DELETE
    app.delete('/animais/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('animais').deleteOne({ _id: id }, (err, result) => {
            if (err) throw err;
            if (result.deletedCount < 1)
                return res.json({ aviso: "Nada excluído." });
            res.json({ success: "Excluído com sucesso." });
        });
    });

    //Obter obejto por ID
    app.get('/animais/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('animais').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });

    //Obter objeto por filtro
    app.get('/animais/filtro/:valor', (req, res) => {
        db.collection('animais').find({
            $or: [
                { nome: { $regex: req.params.valor, $options: "i" } },
                { tipo: { $regex: req.params.valor, $options: "i" } },
            ],
        }).toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });
}