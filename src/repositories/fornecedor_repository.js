let listaFornecedores = [];
let autoIncrement = 1;

function listar() {
    return Promise.resolve(listaFornecedores);
}

function inserir(fornecedor) {
    // Validação simples de CNPJ (exemplo)
    const existente = listaFornecedores.find(f => f.cnpj === fornecedor.cnpj);
    if (existente) {
        return Promise.reject({ id: 400, msg: "CNPJ já cadastrado" });
    }

    fornecedor.id = autoIncrement++;
    listaFornecedores.push(fornecedor);
    return Promise.resolve(fornecedor);
}

function buscarPorId(id) {
    const idNum = parseInt(id); // Garante que o ID seja número
    return Promise.resolve(listaFornecedores.find(
        (fornecedor) => fornecedor.id === idNum
    ));
}

function atualizar(id, fornecedorAtual) {
    const idNum = parseInt(id);
    const indice = listaFornecedores.findIndex((f) => f.id === idNum);
    
    if (indice >= 0) {
        fornecedorAtual.id = idNum;
        listaFornecedores[indice] = fornecedorAtual;
        return Promise.resolve(listaFornecedores[indice]);
    }
    return Promise.resolve(undefined);
}

function deletar(id) {
    const idNum = parseInt(id);
    const indice = listaFornecedores.findIndex((f) => f.id === idNum);
    
    if (indice >= 0) {
        const [fornecedorRemovido] = listaFornecedores.splice(indice, 1);
        return Promise.resolve(fornecedorRemovido);
    }
    return Promise.resolve(undefined);
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}