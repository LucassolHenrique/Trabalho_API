const produtoRepository = require("../repositories/produto_repository");
// Precisamos do fornecedor para validar o 'fornecedorPadrao'
const fornecedorRepository = require("../repositories/fornecedor_repository"); 

// ... (listar, buscarPorId, deletar, atualizar - são parecidos com o de fornecedor) ...

async function inserir(produto) {
    // RN: Validar campos
    if (produto && produto.nome && produto.preco && produto.marca && produto.fornecedorPadrao && produto.estoque !== undefined) {
        
        // RN: Validar se o fornecedor padrão existe
        const fornecedor = await fornecedorRepository.buscarPorId(produto.fornecedorPadrao);
        if (!fornecedor) {
            throw { id: 400, msg: "Fornecedor Padrão inválido ou não encontrado" };
        }
        
        return await produtoRepository.inserir(produto);
    } else {
        throw { id: 400, msg: "Dados do produto incompletos" };
    }
}

// ...