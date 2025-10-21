// src/routes/fornecedor_routes.js
const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedor_controller');
const { verificaToken } = require('../middlewares/auth_middleware');

// Protegendo todas as rotas de fornecedor com o middleware
router.use(verificaToken); 

router.get('/', fornecedorController.listar);
router.post('/', fornecedorController.inserir);
router.get('/:id', fornecedorController.buscarPorId);
router.put('/:id', fornecedorController.atualizar);
router.delete('/:id', fornecedorController.deletar);

module.exports = router;