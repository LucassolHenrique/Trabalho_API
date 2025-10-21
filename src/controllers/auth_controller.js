const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuario_repository');

// Seu segredo JWT (mantenha seguro em um app real)
const JWT_SECRET = "SEGREDO_SUPER_SECRETO_AULA11";

async function registrar(req, res, next) {
    try {
        const usuario = req.body; // { nomeCompleto, email, senha }
        
        // Criptografa a senha (Aula 11)
        const senhaHash = await bcrypt.hash(usuario.senha, 8);
        usuario.senha = senhaHash;
        
        const usuarioInserido = await usuarioRepository.inserir(usuario);
        // Não retornar a senha no JSON
        usuarioInserido.senha = undefined; 
        res.status(201).json(usuarioInserido);
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, senha } = req.body;

        const usuario = await usuarioRepository.buscarPorEmail(email);
        if (!usuario) {
            // Erro genérico por segurança
            throw { id: 401, msg: "Email ou senha inválidos" }; 
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw { id: 401, msg: "Email ou senha inválidos" };
        }

        // Gerar o Token JWT (Aula 11)
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email }, // Payload
            JWT_SECRET, // Segredo
            { expiresIn: '1h' } // Opções (expira em 1 hora)
        );

        res.json({ token: token });

    } catch (error) {
        next(error);
    }
}

module.exports = { registrar, login }