const express =  require("express");
const bodyParser =  require("body-parser");

const app = express();
app.use(bodyParser.json({}));

// dados estáticos
const produtos = [
    {
      nome: "Inspiron",
      marca: "Dell",
      tipo: "Eletrônico",
    },
    {
      nome: "S10",
      marca: "Samsung",
      tipo: "Eletrônico"
    },
    {
      nome: "Caderno",
      marca: "Tilibra",
      tipo: "Escolar"
    },
    {
      nome: "Caneta azul 7mm",
      marca: "BIC",
      tipo: "Escolar"
    }
  ];

function validarProduto(req, res, next){
    if (!req.body.nome) {
        return res.status(400).json({
            error: "Necessário enviar o nome!"
        })
    }
    return next();
}

// produtos/:id
function validarIndiceproduto(req, res, next) {
    if (!produtos[req.params.id]) {
        return res.status(400).json({
            error: "produto não encontrado!"        
        });
    }
    return next();
}

app.get("/", function(req, res) {
    res.send("index!");
});

// GET :: listar todos os produtos
app.get("/produtos", (req, res) => {
    return res.json({produtos});
});

// GET :: listar um produto por id
app.get("/produtos/:id", (req, res) => {
    const { id } = req.params;

    return res.json({
        id : produtos[id]
    });
});

// POST :: criar novo produto
app.post("/produtos", (req, res) => {
    const { nome, marca, tipo } = req.body;
    produtos.push({
        "nome" : nome,
        "marca" : marca,
        "tipo" : tipo
    });
    
    return res.json({produtos});
});

// PUT :: editar produto por id
app.put("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const { nome, marca, tipo } = req.body;
    
    produtos[id].nome = nome;
    produtos[id].marca = marca;
    produtos[id].tipo = tipo;

    return res.json({produtos});
});

// DELETE :: apagando produto por id
app.delete("/produtos/:id", (req, res) => {
    const {id} = req.params;
    produtos.splice(id, 1);

    return res.json({produtos});
});

// exec servidor
app.listen(3000, function() {
    console.log("- - - -   Servidor iniciado em http://localhost:3000/ !   - - - - ");
});