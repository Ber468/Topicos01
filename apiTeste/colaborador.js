module.exports = (app) => {
    const ObjectId = require('mongodb').ObjectId;

    //Retornar colaborador -- GET
    app.get('/colaborador', (req, res) => {
        db.collection('colaborador').find().toArray((err, results) => {
            if (err) throw err;
            res.json(results);
        })

    });

     //Inserir colaborador -- POST
     app.post('/colaborador', (req, res, next) => {
        db.collection('colaborador').insertOne(req.body, (err, result) => {
            if (err) throw err;
            res.json({ success: "Incluído com sucesso." });
        })
    });

    //Alterar animais -- PUT
    app.put('/colaborador', (req, res) => {
        var id = ObjectId(req.body._id);
        var newvalues = {
            $set: {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            }
        };
        db.collection('colaborador').updateOne(
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
    app.delete('/colaborador/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('colaborador').deleteOne({ _id: id }, (err, result) => {
            if (err) throw err;
            if (result.deletedCount < 1)
                return res.json({ aviso: "Nada excluído." });
            res.json({ success: "Excluído com sucesso." });
        });
    });

    //Obter obejto por ID
    app.get('/colaborador/:id', (req, res) => {
        var id = ObjectId(req.params.id);
        db.collection('colaborador').findOne({ _id: id }, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    });
}