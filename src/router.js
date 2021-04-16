import { Router } from "express";

import ContatoController from './controllers/ContatoController.js';
import ProdutoController from "./controllers/ProdutoController.js";
import EmpregadoController from "./controllers/EmpregadoController.js";

const router = new Router();

router.get("/", async (req, res) => {
    res.send("Bem-Vindo!");
});

/** 
 * TODO :: Incluir o middleware authMiddleware nas rotas, para garantir que 
 * essas operações sejam realizadas apenas a usuários autenticados.
 * 
 * Padrão de criação das rotas:
 * 
 * GET :: listar todos os produtos
 * GET :: listar um produto por id
 * POST :: criar novo produto
 * PUT :: editar produto por id
 * DELETE :: apagando produto por id
 */

router.get("/contatos", ContatoController.list);
router.get("/contatos/:id", ContatoController.listOne);
router.post("/contatos", ContatoController.create);
router.put("/contatos/:id", ContatoController.update);
router.delete("/contatos/:id", ContatoController.deleteOne);

router.get("/produtos", ProdutoController.list);
router.get("/produtos/:id", ProdutoController.listOne);
router.post("/produtos", ProdutoController.create);
router.put("/produtos/:id", ProdutoController.update);
router.delete("/produtos/:id", ProdutoController.deleteOne);

routes.get("/empregados", EmpregadoController.list);
routes.get("/empregados/:id", EmpregadoController.listOne);
routes.post("/empregados", EmpregadoController.create);
routes.put("/empregados/:id", EmpregadoController.update);
routes.delete("/empregados/:id", EmpregadoController.deleteOne);

export default router;