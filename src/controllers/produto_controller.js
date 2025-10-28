const produtoService = require('../services/produtos_service');

async function listar(req, res, next) {
    try {
        const produtos = await produtoService.listar();
        res.json(produtos);
    } catch (error) {
        next(error);
    }
}

async function inserir(req, res, next) {
    try {
        const produto = await produtoService.inserir(req.body);
        res.status(201).json(produto);
    } catch (error) {
        next(error);
    }
}

async function buscarPorId(req, res, next) {
    try {
        const id = req.params.id;
        const produto = await produtoService.buscarPorId(id);
        res.json(produto);
    } catch (error) {
        next(error);
    }
}

async function atualizar(req, res, next) {
    try {
        const id = req.params.id;
        const produto = await produtoService.atualizar(id, req.body);
        res.json(produto);
    } catch (error) {
        next(error);
    }
}

async function deletar(req, res, next) {
    try {
        const id = req.params.id;
        const produto = await produtoService.deletar(id);
        res.json({ msg: "Produto deletado com sucesso", produto });
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