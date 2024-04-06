import "./index.css";
import produtoService from "../../services/produto-service";
import Swal from "sweetalert2";
import Produto from "../../models/Produto";
import imgLogo from "../../img/logoControleEstoque.png";

import { useState, useEffect } from 'react'

export default function Produtos(){
    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState(new Produto());
    const [modoEdicao, setModoEdicao] = useState(false);

    useEffect(() => {
        produtoService.obter()
            .then((response) => {
                setProdutos(response.data);
            })
            .catch(erro => { })
    }, []);

    const editar = (e) => {
        setModoEdicao(true);
        let produtoParaEditar = produtos.find(c => c.id == e.target.id);
        produtoParaEditar.dataCadastro = produtoParaEditar.dataCadastro.substring(0, 10);

        setProduto(produtoParaEditar);
    }

    const excluir = (e) => {
        let produtoParaExcluir = produtos.find(c => c.id == e.target.id);

        Swal.fire({
            title: 'Exclusão',
            text: 'Deseja realmente excluir o produto: ' + produtoParaExcluir.nome,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#033594',
            cancelButtonColor: '#2C59AC',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {    
                Swal.fire({
                    title: 'Deletado!',
                    text: 'O produto foi deletado com sucesso!',
                    icon:'success',
                    confirmButtonColor: '#033594',
                });

                produtoService.excluir(produtoParaExcluir.id)
                .then(() => {
                    excluirProdutoNaLista(produtoParaExcluir);
                })
                .catch((error) => {
                    console.error('Erro ao excluir o produto:', error);
                });
            }
        });
        
    }

    const excluirProdutoNaLista = (produto) => {
        let indice = produtos.findIndex(c => c.id == produto.id);

        produtos.splice(indice, 1);

        setProdutos(arr => [...arr]);
    }

    const adicionarProdutoNoBackend = (produto) => {
        produtoService.adicionar(produto)
            .then(response => {
                setProdutos(lista => [...lista, new Produto(response.data)]);

               limparModal();

                Swal.fire({
                    icon: 'success',
                    title: `Produto ${produto.nome}, foi cadastrado com sucesso!`,
                    showConfirmButton: true,
                    confirmButtonColor: '#033594',
                    timer: 4000
                })
            })
    }

    const atualizarProdutoNoBackend = (produto) => {
        produtoService.atualizar(produto)
        .then(response => {

            Swal.fire({
                icon: 'success',
                title: `Produto ${produto.nome}, foi atualizado com sucesso!`,
                showConfirmButton: true,
                confirmButtonColor: '#033594',
                timer: 4000
            })

            let indice = produtos.findIndex(c => c.id == produto.id);
            produtos.splice(indice, 1, produto);

            setProdutos(lista => [...lista]);

        })
    }

    const salvar = () => {
        if ((!produto.quantidadeEstoque || !produto.valor || !produto.nome)) {
            Swal.fire({
                icon: 'error',
                text: 'Quantidade, valor e nome são obrigatórios.',
                confirmButtonColor: '#033594'
            });

            return;
        }

        (modoEdicao)? atualizarProdutoNoBackend(produto): adicionarProdutoNoBackend(produto);
    }

    const adicionar = () => {
        setModoEdicao(false);
        limparModal();
    }

    const limparModal = () => {
        setProduto({
           ...produto,
           id: '',
           nome: '',
           valor: '',
           quantidadeEstoque: '',
           observacao: '',
           dataCadastro: '' 
       });
   }

    return (
        <>
            <div className="container">
                <div id='logo' className="row col-sm-12">
                    <div className="col-sm-12">
                        <img src={imgLogo}/>
                    </div>
                </div>

                <div className="row col-sm-12 mt-3">
                    <div className="col-sm-12">
                        <h4 id="txt-titulo">Controle de estoque</h4>
                        <hr/>
                    </div>
                </div>

                <div className="row col-sm-12">
                    <div className="col-sm-3">
                        <button onClick={adicionar} id="btn-adicionar" className="btn btn-primary btn-sm" data-bs-toggle="modal"
                            data-bs-target="#modal-produto">Adicionar</button>
                    </div>
                </div>

                <div className="row col-sm-12 mt-3">
                    <div className="col-sm-12">

                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome </th>
                                    <th>Valor </th>
                                    <th>Quantidade em estoque </th>
                                    <th>Observação </th>
                                    <th>Data de cadastro</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {produtos.map(produto => (
                                <tr>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.quantidadeEstoque}</td>
                                    <td>{produto.valor}</td>
                                    <td>{produto.observacao}</td>
                                    <td>{new Date(produto.dataCadastro).toLocaleDateString()}</td>
                                    <td id="botoes">
                                        <button id={produto.id} onClick={editar} className="btn btn-outline-primary btn-sm" data-bs-toggle="modal"
                                            data-bs-target="#modal-produto">
                                            Editar
                                        </button>
                                        <button id={produto.id} onClick={excluir} className="btn btn-outline-primary btn-sm">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="modal" id="modal-produto">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">{modoEdicao ? 'Editar Produto' : 'Adicionar Produto'}</h4>
                            </div>

                            <div className="modal-body">

                                <div className="row">

                                    <div className="col-sm-3">
                                        <label for="id" className="form-label">Id</label>
                                        <input id="id" type="text" disabled className="form-control"
                                        value={produto.id}
                                        onChange={(e) => setProduto({ ...produto, id: e.target.value })}/>
                                    </div>

                                    <div className="col-sm-9">
                                        <label for="nome" className="form-label">Nome</label>
                                        <input id="nome" type="text" className="form-control"
                                        value={produto.nome}
                                        onChange={(e) => setProduto({ ...produto, nome: e.target.value })}/>
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col-sm-3">
                                        <label for="valor" className="form-label">Valor</label>
                                        <input id="valor" type="text" className="form-control"
                                        value={produto.valor}
                                        onChange={(e) => setProduto({ ...produto, valor: e.target.value })}/>
                                    </div>

                                    <div className="col-sm-3">
                                        <label for="quantidade" className="form-label">Quantidade</label>
                                        <input id="quantidade" type="text" className="form-control"
                                        value={produto.quantidadeEstoque} 
                                        onChange={(e) => setProduto({ ...produto, quantidadeEstoque: e.target.value })}/>
                                    </div>

                                    <div className="col-sm-6">
                                        <label for="dataCadastro" className="form-label">Data de Cadastro</label>
                                        <input id="dataCadastro" type="date" className="form-control"
                                        value={produto.dataCadastro}
                                        onChange={(e) => setProduto({ ...produto, dataCadastro: e.target.value })}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <label for="observacao" className="form-label">Observação</label>
                                        <input id="observacao" type="text" className="form-control"
                                        value={produto.observacao}
                                        onChange={(e) => setProduto({ ...produto, observacao: e.target.value })}/>      
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button onClick={salvar} id="btn-salvar" type="button" className="btn btn-primary btn-sm" 
                                data-bs-dismiss= {modoEdicao ? 'modal' : ''}>Salvar</button>
                                <button id="btn-cancelar" type="button" className="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div id="copyright">
                <label for="copyright"> © 2024 - José Walter</label>
            </div>
        </>
    )
}