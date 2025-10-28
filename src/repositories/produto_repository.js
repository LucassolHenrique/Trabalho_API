let listaProdutos = [];
let autoIncrement = 1;

function listar() {
    return Promise.resolve(listaProdutos);
}

function inserir(produto) {
    produto.id = autoIncrement++;
    listaProdutos.push(produto);
    return Promise.resolve(produto);
}

function buscarPorId(id) {
    const produto = listaProdutos.find(p => p.id == id);
    return Promise.resolve(produto);
}

function findIndexById(id) {
    return listaProdutos.findIndex(p => p.id == id);
}

function atualizar(id, produtoAtualizado) {
    const index = findIndexById(id);
    if (index >= 0) {
        produtoAtualizado.id = parseInt(id);
        listaProdutos[index] = produtoAtualizado;
        return Promise.resolve(listaProdutos[index]);
    }
    return Promise.resolve(undefined);
}

function deletar(id) {
    const index = findIndexById(id);
    if (index >= 0) {
        const produtoRemovido = listaProdutos.splice(index, 1)[0];
        return Promise.resolve(produtoRemovido);
    }
    return Promise.resolve(undefined);
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};