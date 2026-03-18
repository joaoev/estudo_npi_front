import type { ApiCategoria, ApiProduto, CreateProdutoPayload } from './api'

export type UiCategoria = {
  id: number
  nome: string
}

export type UiProduto = {
  id: number
  nome: string
  descricao: string
  preco: number
  categoriaId: number
}

export type CategoryOption = {
  title: string
  value: number
}

export function mapApiProdutoToUi (produto: ApiProduto): UiProduto {
  return {
    id: produto.id,
    nome: produto.nome,
    descricao: produto.descricao,
    preco: produto.preco,
    categoriaId: produto.categorias?.[0]?.id ?? 0,
  }
}

export function mapApiProdutosToUi (produtos: ApiProduto[]): UiProduto[] {
  return produtos.map(p => mapApiProdutoToUi(p))
}

export function mapCategoriasToOptions (categorias: ApiCategoria[]): CategoryOption[] {
  return categorias.map(cat => ({
    title: cat.nomeCategoria,
    value: cat.id,
  }))
}

export function mapApiCategoriaToUi (cat: ApiCategoria) {
  return {
    id: cat.id,
    nome: cat.nomeCategoria,
  }
}

export function mapUiProdutoToApi (produto: Partial<UiProduto>): CreateProdutoPayload {
  return {
    nome: produto.nome ?? '',
    descricao: produto.descricao ?? '',
    preco: produto.preco ?? 0,
    categoriasId: produto.categoriaId ? [produto.categoriaId] : [],
  }
}
