const express =  require("express");
const bodyParser =  require("body-parser");

const app = express();
app.use(bodyParser.json({extended: true}));

// dados estáticos
const contatos = ["Júlia", "Carlos", "Leandro", "Paulo"];

// Middleware
/*app.use((req, res, next) =>{
    console.log("Acessou o middleware!");
    next();
});*/

function validarContato(req, res, next){
    if (!req.body.nome) {
        return res.status(400).json({
            error: "Necessário enviar o nome!"
        })
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
}

app.get("/", function(req, res) {
    res.send("index!");
});

// função anônima :: arrow function
// (param1,param2) => { instrucoes };
app.get("/contatos", (req, res) => {
    return res.json(contatos);
});

// cadastrar novo contato
app.post("/contatos", validarContato, (req, res) => {
    const { nome } = req.body;
    contatos.push(nome);

    return res.json(contatos);
});

// listar um contato por id
app.get("/contatos/:id", validarIndiceContato, (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    return res.json({
        id,
        nome: contatos[id]
    });
});

// editar contato por id
app.put("/contatos/:id", validarContato, validarIndiceContato, (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    contatos[id] = nome;

    return res.json({
        id,
        nome: contatos[id]
    });
});

// apagando contato por id
app.delete("/contatos/:id", validarIndiceContato, (req, res) => {
    const {id} = req.params;
    contatos.splice(id, 1);

    return res.json({contatos});
});

// exec servidor
app.listen(3000, function() {
    console.log("- - - -   Servidor iniciado em http://localhost:3000/ !   - - - - ");
});