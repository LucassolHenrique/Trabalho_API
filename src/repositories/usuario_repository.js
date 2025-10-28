// src/repositories/usuario_repository.js
let listaUsuarios = [];
let autoIncrement = 1;

function inserir(usuario) {
    usuario.id = autoIncrement++;
    listaUsuarios.push(usuario);
    return Promise.resolve(usuario);
}

function buscarPorEmail(email) {
    const usuario = listaUsuarios.find(u => u.email === email);
    return Promise.resolve(usuario);
}

module.exports = {
    inserir,
    buscarPorEmail
};