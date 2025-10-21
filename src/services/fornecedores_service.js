const fornecedorRepository = require("../repositories/fornecedor_repository");

async function listar() {
    return await fornecedorRepository.listar();
}

async function inserir(fornecedor) {
    // RN: Campos obrigatórios
    if (fornecedor && fornecedor.nomeEmpresa && fornecedor.cnpj && fornecedor.email) {
        try {
            return await fornecedorRepository.inserir(fornecedor);
        } catch (error) {
            // Repassa o erro do repositório (ex: CNPJ duplicado)
            throw error;
        }
    } else {
        throw { id: 400, msg: "Dados do fornecedor incompletos" };
    }
}

async function buscarPorId(id) {
    let fornecedor = await fornecedorRepository.buscarPorId(id);
    if (fornecedor) {
        return fornecedor;
    } else {
        throw { id: 404, msg: "Fornecedor não encontrado" };
    }
}

async function atualizar(id, fornecedor) {
    if (!fornecedor || !fornecedor.nomeEmpresa || !fornecedor.cnpj || !fornecedor.email) {
        throw { id: 400, msg: "Dados do fornecedor incompletos" };
    }
    
    const fornecedorAtualizado = await fornecedorRepository.atualizar(id, fornecedor);
    if (fornecedorAtualizado) {
        return fornecedorAtualizado;
    } else {
        throw { id: 404, msg: "Fornecedor não encontrado" };
    }
}

async function deletar(id) {
    let fornecedorDeletado = await fornecedorRepository.deletar(id);
    if (fornecedorDeletado) {
        return fornecedorDeletado;
    } else {
        throw { id: 404, msg: "Fornecedor não encontrado" };
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}