// src/controllers/auth_controller.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuario_repository');

const JWT_SECRET = "SEGREDO_SUPER_SECRETO_AULA11";

async function registrar(req, res, next) {
    try {
        const usuario = req.body;

        // Validação básica de entrada
        if (!usuario.nomeCompleto || !usuario.email || !usuario.senha) {
             throw { id: 400, msg: "Nome completo, email e senha são obrigatórios." };
        }
        
        // Verificar se email já existe (Boa prática)
        const existingUser = await usuarioRepository.buscarPorEmail(usuario.email);
        if (existingUser) {
            throw { id: 409, msg: "Este email já está cadastrado." }; // 409 Conflict
        }

        const senhaHash = await bcrypt.hash(usuario.senha, 8);
        usuario.senha = senhaHash;

        const usuarioSalvoOriginal = await usuarioRepository.inserir(usuario);

        // --- CORREÇÃO ---
        // 1. Criar uma cópia do objeto para a resposta
        const usuarioParaResposta = { ...usuarioSalvoOriginal };
        // 2. Apagar a senha SOMENTE da cópia
        usuarioParaResposta.senha = undefined; 
        // 3. Enviar a cópia na resposta
        res.status(201).json(usuarioParaResposta);
        // --- FIM DA CORREÇÃO ---

    } catch (error) {
        next(error);
    }
}

// A função login continua igual
async function login(req, res, next) {
    try {
        const { email, senha } = req.body;

         if (!email || !senha) {
             throw { id: 400, msg: "Email e senha são obrigatórios." };
        }

        const usuario = await usuarioRepository.buscarPorEmail(email);
        if (!usuario) {
            throw { id: 401, msg: "Email ou senha inválidos" };
        }

        // Agora usuario.senha deve existir!
        const senhaValida = await bcrypt.compare(senha, usuario.senha); 
        if (!senhaValida) {
            throw { id: 401, msg: "Email ou senha inválidos" };
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token: token });

    } catch (error) {
        next(error);
    }
}

module.exports = { registrar, login }