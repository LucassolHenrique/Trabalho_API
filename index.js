
const express = require('express'); 
const app = express();
const port = 3000;

const authRoutes = require('./src/routes/auth_routes');
const fornecedorRoutes = require('./src/routes/fornecedor_routes');
const produtoRoutes = require('./src/routes/produto_routes');
const compraRoutes = require('./src/routes/compra_routes');

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/compras', compraRoutes);

app.use((error, req, res, next) => {
    if (error.id && error.msg) {
        res.status(error.id).json({ erro: error.msg });
    } else {
        // Erro inesperado
        console.error(error); // Logar o erro no console
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

app.listen(port, () => {
    console.log(`Servidor do Aluno 3 rodando em http://localhost:${port}`);
});