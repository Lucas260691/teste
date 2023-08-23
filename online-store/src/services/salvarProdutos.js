const ITEM_SELECIONADO = 'produto_selecionado';

const lerListaDeProdutos = () => JSON.parse(localStorage.getItem(ITEM_SELECIONADO));

const checarProduto = (object) => {
  const listaProdutos = lerListaDeProdutos();
  const resultado = listaProdutos.find((item) => item.id === object.id);
  if(resultado){
    if (resultado.quantidade) {
      object.quantidade = resultado.quantidade + 1;
      return true;
  }
   object.quantidade = 1;
   return false;
  }
  object.quantidade = 1;
  return false;
};

const setarLocalStorage = (elementos) => {
  localStorage
    .setItem(ITEM_SELECIONADO, JSON.stringify(elementos));
};

export const removerProduto = (object) => {
  const listaProdutos = lerListaDeProdutos();
  setarLocalStorage(listaProdutos
    .filter((item) => item.id !== object.id))
};

export const atualizaItem = (object) => {
  removerProduto(object);
  const listaProdutos = lerListaDeProdutos();
  setarLocalStorage([...listaProdutos, object]);
};

export const salvarProduto = (object) => {
  const listaProdutos = lerListaDeProdutos();
  if (listaProdutos !== null) {
    const checagem = checarProduto(object);
    if (!checagem) setarLocalStorage([...listaProdutos, object]);
    else {
      atualizaItem(object);
    }
  } else {
    object.quantidade = 1;
    setarLocalStorage([object]);
  }
};

export const pegarProduto = () => {
  const retorno = JSON.parse(localStorage.getItem(ITEM_SELECIONADO));
  return retorno;
};