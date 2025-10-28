const compraRepository = require('../repositories/compra_repository');
const produtoRepository = require('../repositories/produto_repository');
const fornecedorRepository = require('../repositories/fornecedor_repository');

async function listar() {
    return await compraRepository.listar();
}

async function inserir(compra) {
    if (!compra || !compra.fornecedorId || !compra.itens || compra.itens.length === 0) {
        throw { id: 400, msg: "Dados da compra incompletos" };
    }

    const fornecedorCompra = await fornecedorRepository.buscarPorId(compra.fornecedorId);
    if (!fornecedorCompra) {
        throw { id: 404, msg: "Fornecedor da compra não encontrado" };
    }

    let produtosDiferentesCount = 0;

    const promisesItens = compra.itens.map(async (item) => {
        const produto = await produtoRepository.buscarPorId(item.produtoId);
        if (!produto) {
            throw { id: 404, msg: `Produto com ID ${item.produtoId} não encontrado` };
        }

        // RN 1: Atualizar o estoque
        produto.estoque += item.quantidade;
        await produtoRepository.atualizar(produto.id, produto);

        // RN 2: Calcular "produtos diferentes"
        // Compara o 'fornecedorPadrao' do produto (ID) com o 'fornecedorId' da compra (ID)
        if (produto.fornecedorPadrao !== compra.fornecedorId) {
            produtosDiferentesCount++;
        }
    });

    await Promise.all(promisesItens);

    const novaCompra = {
        dataHora: new Date(),
        fornecedorId: compra.fornecedorId,
        itens: compra.itens,
        produtosDiferentes: produtosDiferentesCount
    };

    // Salvar a compra
    return await compraRepository.inserir(novaCompra);
}

module.exports = { listar, inserir }