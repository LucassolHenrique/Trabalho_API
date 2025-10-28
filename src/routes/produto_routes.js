const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produto_controller');
const { verificaToken } = require('../middlewares/auth_middleware');

router.use(verificaToken); 

router.get('/', produtoController.listar);
router.post('/', produtoController.inserir);
router.get('/:id', produtoController.buscarPorId);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

module.exports = router;