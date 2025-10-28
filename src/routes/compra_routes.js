const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compra_controller');
const { verificaToken } = require('../middlewares/auth_middleware');

router.use(verificaToken); 

router.get('/', compraController.listar);
router.post('/', compraController.inserir);

module.exports = router;