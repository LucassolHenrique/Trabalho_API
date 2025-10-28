const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuario_repository');

const JWT_SECRET = "SEGREDO_SUPER_SECRETO_AULA11";

async function registrar(req, res, next) {
    try {
        const usuario = req.body;
        if (!usuario.nomeCompleto || !usuario.email || !usuario.senha) {
             throw { id: 400, msg: "Nome completo, email e senha são obrigatórios." };
        }
        
        // Verificar se email já existe (Boa prática)
        const existingUser = await usuarioRepository.buscarPorEmail(usuario.email);
        if (existingUser) {
            throw { id: 409, msg: "Este email já está cadastrado." };
        }

        const senhaHash = await bcrypt.hash(usuario.senha, 8);
        usuario.senha = senhaHash;

        const usuarioSalvoOriginal = await usuarioRepository.inserir(usuario);

        const usuarioParaResposta = { ...usuarioSalvoOriginal };
        usuarioParaResposta.senha = undefined; 
        res.status(201).json(usuarioParaResposta);


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