import axios from 'axios'

const API_BASE_URL = '/api'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export type ApiCategoria = {
  id: number
  nomeCategoria: string
}

export type ApiProduto = {
  id: number
  nome: string
  descricao: string
  preco: number
  categorias: ApiCategoria[]
}

export type CreateProdutoPayload = {
  nome: string
  descricao: string
  preco: number
  categoriasId: number[]
}

export type CreateCategoriaPayload = {
  nomeCategoria: string
}

// ============ Serviço de Produtos ============
export const produtoService = {
  async listar () {
    const response = await client.get<ApiProduto[]>('/produtos')
    return response.data
  },

  async criar (payload: CreateProdutoPayload) {
    const response = await client.post<ApiProduto>('/produtos', payload)
    return response.data
  },

  async atualizar (id: number, payload: CreateProdutoPayload) {
    const response = await client.put<ApiProduto>(`/produtos/${id}`, payload)
    return response.data
  },

  async deletar (id: number) {
    await client.delete(`/produtos/${id}`)
  },
}

// ============ Serviço de Categorias ============
export const categoriaService = {
  async listar () {
    const response = await client.get<ApiCategoria[]>('/categorias')
    return response.data
  },

  async criar (payload: CreateCategoriaPayload) {
    const response = await client.post<ApiCategoria>('/categorias', payload)
    return response.data
  },

  async atualizar (id: number, payload: CreateCategoriaPayload) {
    const response = await client.put<ApiCategoria>(`/categorias/${id}`, payload)
    return response.data
  },

  async deletar (id: number) {
    await client.delete(`/categorias/${id}`)
  },
}

export default client
