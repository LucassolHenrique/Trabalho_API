//pq este nome toda americano ?
//num sei mas a documentacao pediu
// as rotas estão salvas aqui
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

router.post('/registrar', authController.registrar);
router.post('/login', authController.login);

module.exports = router;