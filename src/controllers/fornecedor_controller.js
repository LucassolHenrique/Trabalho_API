const fornecedorService = require('../services/fornecedor_service');

async function listar(req, res, next) {
    try {
        const fornecedores = await fornecedorService.listar();
        res.json(fornecedores);
    } catch (error) {
        next(error); // Passa o erro para o middleware de erro no index.js
    }
}

async function inserir(req, res, next) {
    try {
        const fornecedor = await fornecedorService.inserir(req.body);
        res.status(201).json(fornecedor);
    } catch (error) {
        next(error);
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = req.params.id;
        const fornecedor = await fornecedorService.buscarPorId(id);
        res.json(fornecedor);
    } catch (error) {
        next(error);
    }
}

async function atualizar(req, res, next) {
    try {
        const id = req.params.id;
        const fornecedor = await fornecedorService.atualizar(id, req.body);
        res.json(fornecedor);
    } catch (error) {
        next(error);
    }
}

async function deletar(req, res, next) {
    try {
        const id = req.params.id;
        const fornecedor = await fornecedorService.deletar(id);
        res.json({ msg: "Fornecedor deletado com sucesso", fornecedor });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};