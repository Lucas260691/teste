import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaInicial from './componentes/paginaInicial';
import PaginaCart from './componentes/paginaCart';
import DetalhamentoDoProduto from './componentes/detalhamentoDoProduto';
//import finalizaCompras from './componentes/finalizaCompras';
import { pegarProduto } from "./services/salvarProdutos";

class App extends React.Component {
  constructor() {
    super();
    const lista = pegarProduto();
    const verificaLista = lista ? lista
      .reduce((acc, curr) => acc + curr.quantidade, 0) : 0;
    this.state = {
      quantidade: verificaLista,
    };

    this.atualizaLista = this.atualizaLista.bind(this);
  }

  atualizaLista() {
    const lista = pegarProduto();
    const verificaLista = lista ? lista
      .reduce((acc, curr) => acc + curr.quantidade, 0) : 0;
    this.setState({ quantidade: verificaLista });
  }

  render() {
    const { quantidade } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path='/carrinho'
              render={ () => <PaginaCart />}
            />
            <Route
              path="/detalhe/:categoryId/:id"
              render={ (props) => (
                <DetalhamentoDoProduto
                  {...props }
                  quantidade={ quantidade }
                  atualizaLista={ this.atualizaLista }
                />
              ) }
            />
            <Route path="/checkout"  render={ <finalizaCompras/> } />
            <Route
              path="/"
              render={ () => (
                <PaginaInicial
                  quantidade={ quantidade }
                  atualizaLista={ this.atualizaLista }
                />
              ) }
            />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;