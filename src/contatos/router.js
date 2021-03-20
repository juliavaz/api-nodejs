const { Router } = require("express");
const routers = require ("express");

const router = new Router();

// dados estáticos
const contatos = ["Júlia", "Carlos", "Leandro", "Paulo"];

function validarContato(req, res, next){
    if (!req.body.nome) {
        return res.status(400).json({
            error: "Necessário enviar o nome!"
        });
    }
    return next();
}

// contatos/:id
function validarIndiceContato(req, res, next) {
    if (!contatos[req.params.id]) {
        return res.status(400).json({
            error: "Contato não encontrado!"        
        });
    }
    return next();
};

router.get("/", function(req, res) {
    res.send("index!");
});

// função anônima :: arrow function
// (param1,param2) => { instrucoes };
router.get("/contatos", (req, res) => {
    return res.json(contatos);
});

// cadastrar novo contato
router.post("/contatos", validarContato, (req, res) => {
    const { nome } = req.body;
    contatos.push(nome);

    return res.json(contatos);
});

// listar um contato por id
router.get("/contatos/:id", validarIndiceContato, (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    return res.json({
        id,
        nome: contatos[id]
    });
});

// editar contato por id
router.put("/contatos/:id", validarContato, validarIndiceContato, (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    contatos[id] = nome;

    return res.json({
        id,
        nome: contatos[id]
    });
});

// apagando contato por id
router.delete("/contatos/:id", validarIndiceContato, (req, res) => {
    const {id} = req.params;
    contatos.splice(id, 1);

    return res.json({contatos});
});

module.exports = router;