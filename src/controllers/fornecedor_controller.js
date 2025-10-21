
// const fornecedorService = require('../services/fornecedores_services');

const fornecedorService = require('../services/fornecedor_service');

async function listar(req, res) {
    const lista = await fornecedorService.listar();
    res.json(lista);
}

async function inserir(req, res, next) {
    try {
        const fornecedor = req.body;
        const fornecedorInserido = await fornecedorService.inserir(fornecedor);
        res.status(201).json(fornecedorInserido);
    } catch (error) {
        // tratamento de erro.
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
        const fornecedor = req.body;
        const fornecedorAtualizado = await fornecedorService.atualizar(id, fornecedor);
        res.json(fornecedorAtualizado);
    } catch (error) {
        next(error);
    }
}

async function deletar(req, res, next) {
    try {
        const id = req.params.id;
        const fornecedorDeletado = await fornecedorService.deletar(id);
        res.json(fornecedorDeletado);
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
}