import { computed, ref } from 'vue'

export type Category = {
  id: number
  nome: string
  descricao: string
  ativa: boolean
  criadaEm: string
}

export type Product = {
  id: number
  nome: string
  descricao: string
  preco: number
  estoque: number
  categoriaId: number
  ativo: boolean
  criadoEm: string
}

export type CategoryPayload = {
  nome: string
  descricao: string
  ativa: boolean
}

export type ProductPayload = {
  nome: string
  descricao: string
  preco: number
  estoque: number
  categoriaId: number
  ativo: boolean
}

const categoriesState = ref<Category[]>([
  {
    id: 1,
    nome: 'Eletronicos',
    descricao: 'Dispositivos e acessorios eletronicos',
    ativa: true,
    criadaEm: '2026-03-10',
  },
  {
    id: 2,
    nome: 'Livros',
    descricao: 'Livros fisicos e digitais',
    ativa: true,
    criadaEm: '2026-03-11',
  },
  {
    id: 3,
    nome: 'Casa e Cozinha',
    descricao: 'Itens para uso domestico',
    ativa: true,
    criadaEm: '2026-03-12',
  },
])

const productsState = ref<Product[]>([
  {
    id: 1,
    nome: 'Fone Bluetooth',
    descricao: 'Fone sem fio com cancelamento de ruido',
    preco: 299.9,
    estoque: 18,
    categoriaId: 1,
    ativo: true,
    criadoEm: '2026-03-12',
  },
  {
    id: 2,
    nome: 'Panela Antiaderente',
    descricao: 'Panela de 24cm com revestimento reforcado',
    preco: 159,
    estoque: 32,
    categoriaId: 3,
    ativo: true,
    criadoEm: '2026-03-12',
  },
  {
    id: 3,
    nome: 'Livro Vue 3 na Pratica',
    descricao: 'Guia de desenvolvimento front-end moderno',
    preco: 89.5,
    estoque: 40,
    categoriaId: 2,
    ativo: true,
    criadoEm: '2026-03-13',
  },
])

const nextCategoryId = ref(Math.max(...categoriesState.value.map(item => item.id), 0) + 1)
const nextProductId = ref(Math.max(...productsState.value.map(item => item.id), 0) + 1)

export function useCatalogCrud () {
  const categories = computed(() => categoriesState.value)
  const products = computed(() => productsState.value)

  function createCategory (payload: CategoryPayload) {
    categoriesState.value.unshift({
      id: nextCategoryId.value++,
      ...payload,
      criadaEm: new Date().toISOString().slice(0, 10),
    })
  }

  function updateCategory (id: number, payload: CategoryPayload) {
    const index = categoriesState.value.findIndex(item => item.id === id)

    if (index === -1) {
      return
    }

    categoriesState.value[index] = {
      ...categoriesState.value[index],
      ...payload,
    }
  }

  function deleteCategory (id: number) {
    const hasProducts = productsState.value.some(item => item.categoriaId === id)

    if (hasProducts) {
      return false
    }

    categoriesState.value = categoriesState.value.filter(item => item.id !== id)
    return true
  }

  function createProduct (payload: ProductPayload) {
    productsState.value.unshift({
      id: nextProductId.value++,
      ...payload,
      criadoEm: new Date().toISOString().slice(0, 10),
    })
  }

  function updateProduct (id: number, payload: ProductPayload) {
    const index = productsState.value.findIndex(item => item.id === id)

    if (index === -1) {
      return
    }

    productsState.value[index] = {
      ...productsState.value[index],
      ...payload,
    }
  }

  function deleteProduct (id: number) {
    productsState.value = productsState.value.filter(item => item.id !== id)
  }

  return {
    categories,
    products,
    createCategory,
    updateCategory,
    deleteCategory,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
