let listaCompras = [];
let autoIncrement = 1;

function listar() {
    return Promise.resolve(listaCompras);
}

function inserir(compra) {
    compra.id = autoIncrement++;
    listaCompras.push(compra);
    return Promise.resolve(compra);
}

module.exports = {
    listar,
    inserir
};