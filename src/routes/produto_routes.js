// src/routes/produto_routes.js
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produto_controller');
const { verificaToken } = require('../middlewares/auth_middleware');

// Protegendo todas as rotas de produto
router.use(verificaToken); 

router.get('/', produtoController.listar);
router.post('/', produtoController.inserir);
router.get('/:id', produtoController.buscarPorId);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

module.exports = router;