Tabela de Clientes

App em React + Vite para gerenciar clientes com filtros, edição e persistência no navegador.

🚀 Como rodar
npm install
npm run dev

Acesse: http://localhost:5173

Build:

npm run build

✨ Funcionalidades
Listagem de clientes (mock)
Filtro por status: Todos | Ativos | Inativos
Busca por nome, email, documento ou telefone
Ordenação A-Z / Z-A
Edição inline
Máscaras de CPF e telefone
Persistência com localStorage
Layout responsivo

🗂️ Estrutura
src/
  App.jsx
  components/
  utils/
  data/clientes.json

📝 Observações
Dados salvos no localStorage
Para resetar:
useLocalStorage.clearClients()