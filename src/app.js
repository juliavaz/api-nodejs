const express =  require("express");
const bodyParser =  require("body-parser");

const app = express();
app.use(bodyParser.json({extended: true}));

// dados estáticos
const contatos = ["Júlia", "Carlos", "Leandro", "Paulo"];

app.get("/", function(req, res) {
    res.send("index!");
});

// função anônima :: arrow function
// (param1,param2) => { instrucoes };
app.get("/contatos", (req, res) => {
    return res.json(contatos);
});

// listando
app.post("/contatos", (req, res) => {
    const { nome } = req.body;
    contatos.push(nome);

    return res.json(contatos);
});

// listando 1
app.get("/contatos/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    return res.json({
        id,
        nome: contatos[id]
    });
});

// atualizando
app.put("/contatos/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    contatos[id] = nome;

    return res.json({
        id,
        nome: contatos[id]
    });
});

// apagando
app.delete("/contatos/:id",  (req, res) => {
    const {id} = req.params;
    delete contatos[id];

    return res.json({
        id,
        contatos
    });
});

// exec servidor
app.listen(3000, function() {
    console.log("- - - -   Servidor iniciado em http://localhost:3000/ !   - - - - ");
});