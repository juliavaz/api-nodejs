const express = require("express");
const router = express.Router();

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

router.get("/", function(req, res) {
    res.send("index!");
});

// GET :: listar todos os produtos
router.get("/produtos", (req, res) => {
    return res.json({produtos});
});

// GET :: listar um produto por id
router.get("/produtos/:id", (req, res) => {
    const { id } = req.params;

    return res.json({
        id : produtos[id]
    });
});

// POST :: criar novo produto
router.post("/produtos", (req, res) => {
    const { nome, marca, tipo } = req.body;

    produtos.push({
      "nome" : nome, 
      "marca" : marca, 
      "tipo" : tipo
    });
    
    return res.json(produtos);
});

// PUT :: editar produto por id
router.put("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const { nome, marca, tipo } = req.body;
    
    produtos[id].nome = nome;
    produtos[id].marca = marca;
    produtos[id].tipo = tipo;

    return res.json({produtos});
});

// DELETE :: apagando produto por id
router.delete("/produtos/:id", (req, res) => {
    const {id} = req.params;
    produtos.splice(id, 1);

    return res.json({produtos});
});

module.exports = router;