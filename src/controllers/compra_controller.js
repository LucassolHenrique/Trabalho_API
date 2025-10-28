const compraService = require('../services/compra_service');

async function listar(req, res, next) {
    try {
        const compras = await compraService.listar();
        res.json(compras);
    } catch (error) {
        next(error);
    }
}

async function inserir(req, res, next) {
    try {
        const compra = await compraService.inserir(req.body);
        res.status(201).json(compra);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listar,
    inserir
};