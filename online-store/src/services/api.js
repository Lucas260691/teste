export async function getCategories() {
  const resultado = await fetch('https://api.mercadolibre.com/sites/MLB/categories')
  .then((response) => response.json());
  return resultado;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if(!categoryId){
    const resultado = await fetch(`https://api.mercadoLibre.com/sites/MBL/search?q=${query}`)
      .then((response) => response.json());
    return resultado
  }
  if(!query){
    const resultado = await fetch(`https://api.mercadoLibre.com/sites/MBL/search?category=${categoryId}`)
      .then((response) => response.json());
    return resultado;
  }
  const resultado = await fetch(`https://api.mercadoLibre.com/sites/MBL/search?category=${categoryId}&q=${query}`)
    .then((response) => response.json())
  return resultado;
}
