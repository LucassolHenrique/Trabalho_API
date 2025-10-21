const jwt = require('jsonwebtoken');
const JWT_SECRET = "SEGREDO_SUPER_SECRETO_AULA11";

function verificaToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ msg: "Token não fornecido" });
    }

    // O header vem como "Bearer TOKEN_AQUI"
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Adiciona o ID do usuário na requisição para uso posterior
        req.usuarioId = decoded.id; 
        
        next(); // Permite continuar para a rota
    } catch (error) {
        return res.status(401).json({ msg: "Token inválido" });
    }
}

module.exports = { verificaToken }