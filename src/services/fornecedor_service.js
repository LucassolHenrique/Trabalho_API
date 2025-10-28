const fornecedorRepository = require('../repositories/fornecedor_repository');

async function listar() {
    return await fornecedorRepository.listar();
}

async function inserir(fornecedor) {
    // RN: Validar campos obrigatórios
    if (!fornecedor || !fornecedor.nome || !fornecedor.cnpj || !fornecedor.email) {
        throw { id: 400, msg: "Dados do fornecedor incompletos (nome, cnpj, email são obrigatórios)" };
    }
    
    // RN: Poderia ter uma validação de CNPJ duplicado aqui
    
    return await fornecedorRepository.inserir(fornecedor);
}

async function buscarPorId(id) {
    const fornecedor = await fornecedorRepository.buscarPorId(id);
    if (!fornecedor) {
        throw { id: 404, msg: "Fornecedor não encontrado" };
    }
    return fornecedor;
}

async function atualizar(id, fornecedor) {
    // RN: Validar campos
    if (!fornecedor || !fornecedor.nome || !fornecedor.cnpj || !fornecedor.email) {
        throw { id: 400, msg: "Dados do fornecedor incompletos" };
    }

    const fornecedorAtualizado = await fornecedorRepository.atualizar(id, fornecedor);
    if (!fornecedorAtualizado) {
        throw { id: 404, msg: "Fornecedor não encontrado" };
    }
    return fornecedorAtualizado;
}

async function deletar(id) {
    const fornecedorDeletado = await fornecedorRepository.deletar(id);
    if (!fornecedorDeletado) {
        throw { id: 404, msg: "Fornecedor não encontrado" };
    }
    return fornecedorDeletado;
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};