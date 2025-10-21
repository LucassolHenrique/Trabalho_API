const express = require('express');
const app = express();
const port = 3000;

// Importar as rotas
const authRoutes = require('./src/routes/auth_routes');
const fornecedorRoutes = require('./src/routes/fornecedor_routes');
const produtoRoutes = require('./src/routes/produto_routes');
const compraRoutes = require('./src/routes/compra_routes');

// Middleware para ler JSON do body
app.use(express.json());

// Rotas de Autenticação (públicas)
app.use('/api/auth', authRoutes);

// Rotas de Negócio (protegidas pelo middleware dentro de cada arquivo de rota)
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/compras', compraRoutes);

// Middleware de tratamento de erros (deve ser o último)
// (Baseado na Aula 07)
app.use((error, req, res, next) => {
    if (error.id && error.msg) {
        // Erro de negócio que nós criamos (ex: {id: 404, msg: "Não encontrado"})
        res.status(error.id).json({ erro: error.msg });
    } else {
        // Erro inesperado (ex: "bcrypt is not defined")
        console.error(error); // Logar o erro no console
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.listen(port, () => {
    console.log(`Servidor do Aluno 3 rodando em http://localhost:${port}`);
});