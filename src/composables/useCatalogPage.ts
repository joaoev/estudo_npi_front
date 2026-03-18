import { computed, onMounted, reactive, ref } from 'vue'
import {
  type Category,
  type CategoryPayload,
  type Product,
  type ProductPayload,
  useCatalogCrud,
} from '@/composables/useCatalogCrud'

type DeleteDialogState = {
  open: boolean
  message: string
  action: null | (() => void)
}

type SnackbarState = {
  open: boolean
  text: string
  color: 'success' | 'error' | 'warning'
}

export function useCatalogPage () {
  const {
    categories,
    categoryOptions: apiCategoryOptions,
    products,
    createCategory,
    deleteCategory,
    deleteProduct,
    loadAll,
    updateCategory,
    updateProduct,
    createProduct,
  } = useCatalogCrud()

  onMounted(() => {
    loadAll()
  })

  const tab = ref<'produtos' | 'categorias'>('produtos')

  const categorySearch = ref('')
  const productSearch = ref('')

  const categoryDialog = ref(false)
  const productDialog = ref(false)

  const editingCategoryId = ref<number | null>(null)
  const editingProductId = ref<number | null>(null)

  const deleteDialog = reactive<DeleteDialogState>({
    open: false,
    message: '',
    action: null,
  })

  const snackbar = reactive<SnackbarState>({
    open: false,
    text: '',
    color: 'success',
  })

  const categoryForm = reactive<CategoryPayload>({
    nome: '',
  })

  const productForm = reactive<ProductPayload>({
    nome: '',
    descricao: '',
    preco: 0,
    categoriaId: 0,
  })

  const categoryHeaders = [
    { title: 'ID', key: 'id' },
    { title: 'Nome', key: 'nome' },
    { title: 'Acoes', key: 'acoes', sortable: false },
  ]

  const productHeaders = [
    { title: 'ID', key: 'id' },
    { title: 'Nome', key: 'nome' },
    { title: 'Descricao', key: 'descricao' },
    { title: 'Categoria', key: 'categoriaId' },
    { title: 'Preco', key: 'preco' },
    { title: 'Acoes', key: 'acoes', sortable: false },
  ]

  const filteredCategories = computed(() => {
    const search = categorySearch.value.trim().toLowerCase()

    if (!search) {
      return categories.value
    }

    return categories.value.filter(item => {
      return item.nome.toLowerCase().includes(search)
    })
  })

  const filteredProducts = computed(() => {
    const search = productSearch.value.trim().toLowerCase()

    if (!search) {
      return products.value
    }

    return products.value.filter(item => {
      const categoryName = getCategoryName(item.categoriaId)

      return [
        item.nome,
        item.descricao,
        categoryName,
        item.preco.toString(),
      ].join(' ').toLowerCase().includes(search)
    })
  })

  const categoryOptions = computed(() => apiCategoryOptions.value)

  const categoryFormErrors = computed(() => {
    return {
      nome: categoryForm.nome.trim() ? [] : ['Nome e obrigatorio'],
    }
  })

  const productFormErrors = computed(() => {
    return {
      nome: productForm.nome.trim() ? [] : ['Nome e obrigatorio'],
      descricao: productForm.descricao.trim() ? [] : ['Descricao e obrigatoria'],
      categoriaId: productForm.categoriaId > 0 ? [] : ['Categoria e obrigatoria'],
      preco: productForm.preco >= 0 ? [] : ['Preco nao pode ser negativo'],
    }
  })

  const isCategoryFormValid = computed(() => {
    return categoryFormErrors.value.nome.length === 0
  })

  const isProductFormValid = computed(() => {
    return productFormErrors.value.nome.length === 0
      && productFormErrors.value.descricao.length === 0
      && productFormErrors.value.categoriaId.length === 0
      && productFormErrors.value.preco.length === 0
  })

  function getCategoryName (categoriaId: number) {
    return categories.value.find(item => item.id === categoriaId)?.nome ?? 'Sem categoria'
  }

  function formatCurrency (value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  function notify (text: string, color: SnackbarState['color'] = 'success') {
    snackbar.text = text
    snackbar.color = color
    snackbar.open = true
  }

  function resetCategoryForm () {
    categoryForm.nome = ''
  }

  function resetProductForm () {
    productForm.nome = ''
    productForm.descricao = ''
    productForm.preco = 0
    productForm.categoriaId = categoryOptions.value[0]?.value ?? 0
  }

  function openCreateCategory () {
    editingCategoryId.value = null
    resetCategoryForm()
    categoryDialog.value = true
  }

  function openEditCategory (category: Category) {
    editingCategoryId.value = category.id
    categoryForm.nome = category.nome
    categoryDialog.value = true
  }

  function closeCategoryDialog () {
    categoryDialog.value = false
    editingCategoryId.value = null
  }

  function saveCategory () {
    if (!isCategoryFormValid.value) {
      return
    }

    const payload = {
      nome: categoryForm.nome.trim(),
    }

    try {
      if (editingCategoryId.value) {
        updateCategory(editingCategoryId.value, payload)
        notify('Categoria atualizada com sucesso')
      } else {
        createCategory(payload)
        notify('Categoria criada com sucesso')
      }
      closeCategoryDialog()
    } catch (error_) {
      notify(`Erro ao salvar categoria: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`, 'error')
    }
  }

  function openDeleteCategory (category: Category) {
    deleteDialog.open = true
    deleteDialog.message = `Deseja excluir a categoria "${category.nome}"?`
    deleteDialog.action = () => {
      try {
        const removed = deleteCategory(category.id)

        if (!removed) {
          notify('Nao e possivel excluir categoria com produtos vinculados', 'warning')
          return
        }

        notify('Categoria excluida com sucesso')
      } catch (error_) {
        notify(`Erro ao deletar categoria: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`, 'error')
      }
    }
  }

  function openCreateProduct () {
    editingProductId.value = null
    resetProductForm()
    productDialog.value = true
  }

  function openEditProduct (product: Product) {
    editingProductId.value = product.id
    productForm.nome = product.nome
    productForm.descricao = product.descricao
    productForm.preco = product.preco
    productForm.categoriaId = product.categoriaId
    productDialog.value = true
  }

  function closeProductDialog () {
    productDialog.value = false
    editingProductId.value = null
  }

  function saveProduct () {
    if (!isProductFormValid.value) {
      return
    }

    const payload = {
      nome: productForm.nome.trim(),
      descricao: productForm.descricao.trim(),
      preco: Number(productForm.preco),
      categoriaId: Number(productForm.categoriaId),
    }

    try {
      if (editingProductId.value) {
        updateProduct(editingProductId.value, payload)
        notify('Produto atualizado com sucesso')
      } else {
        createProduct(payload)
        notify('Produto criado com sucesso')
      }
      closeProductDialog()
    } catch (error_) {
      notify(`Erro ao salvar produto: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`, 'error')
    }
  }

  function openDeleteProduct (product: Product) {
    deleteDialog.open = true
    deleteDialog.message = `Deseja excluir o produto "${product.nome}"?`
    deleteDialog.action = () => {
      try {
        deleteProduct(product.id)
        notify('Produto excluido com sucesso')
      } catch (error_) {
        notify(`Erro ao deletar produto: ${error_ instanceof Error ? error_.message : 'Desconhecido'}`, 'error')
      }
    }
  }

  function closeDeleteDialog () {
    deleteDialog.open = false
    deleteDialog.message = ''
    deleteDialog.action = null
  }

  function confirmDelete () {
    deleteDialog.action?.()
    closeDeleteDialog()
  }

  return {
    tab,
    categorySearch,
    productSearch,
    categoryDialog,
    productDialog,
    editingCategoryId,
    editingProductId,
    deleteDialog,
    snackbar,
    categoryForm,
    productForm,
    categoryHeaders,
    productHeaders,
    filteredCategories,
    filteredProducts,
    categoryOptions,
    categoryFormErrors,
    productFormErrors,
    isCategoryFormValid,
    isProductFormValid,
    getCategoryName,
    formatCurrency,
    openCreateCategory,
    openEditCategory,
    closeCategoryDialog,
    saveCategory,
    openDeleteCategory,
    openCreateProduct,
    openEditProduct,
    closeProductDialog,
    saveProduct,
    openDeleteProduct,
    closeDeleteDialog,
    confirmDelete,
  }
}
