// src/services/produtos_service.js
const produtoRepository = require("../repositories/produto_repository");
const fornecedorRepository = require("../repositories/fornecedor_repository"); 

async function listar() {
    return await produtoRepository.listar();
}

async function inserir(produto) {
    // RN: Validar campos (como você já fez)
    if (produto && produto.nome && produto.preco && produto.marca && produto.fornecedorPadrao && produto.estoque !== undefined) {
        
        // RN: Validar se o fornecedor padrão existe
        const fornecedor = await fornecedorRepository.buscarPorId(produto.fornecedorPadrao);
        if (!fornecedor) {
            throw { id: 400, msg: "Fornecedor Padrão inválido ou não encontrado" };
        }
        
        return await produtoRepository.inserir(produto);
    } else {
        throw { id: 400, msg: "Dados do produto incompletos" };
    }
}

async function buscarPorId(id) {
    const produto = await produtoRepository.buscarPorId(id);
    if (!produto) {
        throw { id: 404, msg: "Produto não encontrado" };
    }
    return produto;
}

async function atualizar(id, produto) {
    // RN: Validar campos
    if (!produto || !produto.nome || !produto.preco || !produto.marca || !produto.fornecedorPadrao || produto.estoque === undefined) {
        throw { id: 400, msg: "Dados do produto incompletos" };
    }

    // RN: Validar fornecedor
    const fornecedor = await fornecedorRepository.buscarPorId(produto.fornecedorPadrao);
    if (!fornecedor) {
        throw { id: 400, msg: "Fornecedor Padrão inválido ou não encontrado" };
    }

    const produtoAtualizado = await produtoRepository.atualizar(id, produto);
    if (!produtoAtualizado) {
        throw { id: 404, msg: "Produto não encontrado" };
    }
    return produtoAtualizado;
}

async function deletar(id) {
    const produtoDeletado = await produtoRepository.deletar(id);
    if (!produtoDeletado) {
        throw { id: 404, msg: "Produto não encontrado" };
    }
    return produtoDeletado;
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};