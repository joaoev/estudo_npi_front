import { computed, ref } from 'vue'
import { categoriaService, produtoService } from '@/services/api'
import {
  mapApiProdutosToUi,
  mapCategoriasToOptions,
  mapUiProdutoToApi,
} from '@/services/mappers'

export type Category = {
  id: number
  nome: string
}

export type Product = {
  id: number
  nome: string
  descricao: string
  preco: number
  categoriaId: number
}

export type CategoryPayload = {
  nome: string
}

export type ProductPayload = {
  nome: string
  descricao: string
  preco: number
  categoriaId: number
}

const categoriesState = ref<Category[]>([])
const productsState = ref<Product[]>([])
const categoriesOptionsState = ref<Array<{
  title: string
  value: number
}>>([])
const loadingState = ref(false)
const errorState = ref<string | null>(null)

export function useCatalogCrud () {
  const categories = computed(() => categoriesState.value)
  const products = computed(() => productsState.value)
  const categoryOptions = computed(() => categoriesOptionsState.value)
  const loading = computed(() => loadingState.value)
  const error = computed(() => errorState.value)

  async function loadCategorias () {
    try {
      loadingState.value = true
      errorState.value = null
      const apiCategorias = await categoriaService.listar()
      categoriesState.value = apiCategorias.map(cat => ({
        id: cat.id,
        nome: cat.nomeCategoria,
      }))
      categoriesOptionsState.value = mapCategoriasToOptions(apiCategorias)
    } catch (error_) {
      errorState.value = `Erro ao carregar categorias: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`
      console.error(error_)
    } finally {
      loadingState.value = false
    }
  }

  async function loadProdutos () {
    try {
      loadingState.value = true
      errorState.value = null
      const apiProdutos = await produtoService.listar()
      productsState.value = mapApiProdutosToUi(apiProdutos) as Product[]
    } catch (error_) {
      errorState.value = `Erro ao carregar produtos: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`
      console.error(error_)
    } finally {
      loadingState.value = false
    }
  }

  async function loadAll () {
    await Promise.all([loadCategorias(), loadProdutos()])
  }

  async function createCategory (payload: CategoryPayload) {
    try {
      errorState.value = null
      await categoriaService.criar({
        nomeCategoria: payload.nome,
      })
      await loadCategorias()
    } catch (error_) {
      errorState.value = `Erro ao criar categoria: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`
      console.error(error_)
      throw error_
    }
  }

  async function updateCategory (id: number, payload: CategoryPayload) {
    try {
      errorState.value = null
      await categoriaService.atualizar(id, {
        nomeCategoria: payload.nome,
      })
      await loadCategorias()
    } catch (error_) {
      errorState.value = `Erro ao atualizar categoria: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`
      console.error(error_)
      throw error_
    }
  }

  async function deleteCategory (id: number) {
    try {
      errorState.value = null
      await categoriaService.deletar(id)
      await loadCategorias()
      await loadProdutos()
      return true
    } catch (error_) {
      errorState.value = `Erro ao deletar categoria: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`
      console.error(error_)
      return false
    }
  }

  async function createProduct (payload: ProductPayload) {
    try {
      errorState.value = null
      const apiPayload = mapUiProdutoToApi(payload)
      await produtoService.criar(apiPayload)
      await loadProdutos()
    } catch (error_) {
      errorState.value = `Erro ao criar produto: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`
      console.error(error_)
      throw error_
    }
  }

  async function updateProduct (id: number, payload: ProductPayload) {
    try {
      errorState.value = null
      const apiPayload = mapUiProdutoToApi(payload)
      await produtoService.atualizar(id, apiPayload)
      await loadProdutos()
    } catch (error_) {
      errorState.value = `Erro ao atualizar produto: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`
      console.error(error_)
      throw error_
    }
  }

  async function deleteProduct (id: number) {
    try {
      errorState.value = null
      await produtoService.deletar(id)
      await loadProdutos()
      return true
    } catch (error_) {
      errorState.value = `Erro ao deletar produto: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`
      console.error(error_)
      return false
    }
  }

  return {
    categories,
    categoryOptions,
    createCategory,
    createProduct,
    deleteCategory,
    deleteProduct,
    error,
    loading,
    loadAll,
    loadCategorias,
    loadProdutos,
    products,
    updateCategory,
    updateProduct,
  }
}
