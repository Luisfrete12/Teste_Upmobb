const STORAGE_KEY = 'clientes_data'

export const useLocalStorage = {
  saveClients: (clients) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error)
    }
  },

  getClients: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error)
      return null
    }
  },

  clearClients: () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Erro ao limpar dados do localStorage:', error)
    }
  },

  hasData: () => {
    return localStorage.getItem(STORAGE_KEY) !== null
  }
}
