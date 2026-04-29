import { useState, useEffect } from 'react'
import './App.css'
import MascaraCpf from './components/maks/mascaraCpf'
import MascaraTelefone from './components/maks/mascaraTelefone'
import Filters from './components/filters/filters'
import { useLocalStorage } from './utils/localStorage'
import listaClientes from './data/clientes.json'

function App() {
  const clientesArmazenados = useLocalStorage.getClients()
  const clientesIniciais = clientesArmazenados || listaClientes

  const [clients, setClients] = useState(clientesIniciais)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('none')
  const [editing, setEditing] = useState(null)
  const [editName, setEditName] = useState('')
  const [editDocument, setEditDocument] = useState('')
  const [editMobilePhone, setEditMobilePhone] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editStatus, setEditStatus] = useState('')

  // Salva dados no localStorage sempre que clients mudar
  useEffect(() => {
    useLocalStorage.saveClients(clients)
  }, [clients])

  const handleSort = (order) => {
    setSortOrder(order)
  }

  const displayedClients = clients
    .filter(client => filter === 'all' || client.status === filter)
    .filter(client => {
      const term = searchTerm.toLowerCase()
      return (
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.document.includes(term) ||
        client.mobile_phone.includes(term) ||
        client.phone.includes(term)
      )
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name)
      } else if (sortOrder === 'desc') {
        return b.name.localeCompare(a.name)
      }
      return 0
    })

  const startEdit = (client) => {
    setEditing(client.id)
    setEditName(client.name)
    setEditDocument(client.document)
    setEditMobilePhone(client.mobile_phone)
    setEditPhone(client.phone)
    setEditStatus(client.status)
  }

  const saveEdit = (id) => {
    const updated = clients.map(c =>
      c.id === id
        ? {
            ...c,
            name: editName,
            document: editDocument,
            mobile_phone: editMobilePhone,
            phone: editPhone,
            status: editStatus,
          }
        : c
    )
    setClients(updated)
    setEditing(null)
    setEditName('')
    setEditDocument('')
    setEditMobilePhone('')
    setEditPhone('')
    setEditStatus('')
  }

  const cancelEdit = () => {
    setEditing(null)
    setEditName('')
    setEditDocument('')
    setEditMobilePhone('')
    setEditPhone('')
    setEditStatus('')
  }

  return (
    <div className="app-shell">
      <h1>Tabela de Clientes</h1>

      <Filters 
        filter={filter} 
        setFilter={setFilter} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        onSort={handleSort}
      />

      <table className="clients-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Documento</th>
            <th>Contato</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {displayedClients.map(client => (
            <tr key={client.id}>
              <td>
                {editing === client.id ? (
                  <input className="input-inline" value={editName} onChange={e => setEditName(e.target.value)} />
                ) : (
                  client.name
                )}
              </td>
              <td>
                {editing === client.id ? (
                  <input className="input-inline" value={editDocument} onChange={e => setEditDocument(e.target.value)} />
                ) : (
                  MascaraCpf(client.document)
                )}
              </td>
              <td className="contact-cell">
                {editing === client.id ? (
                  <>
                    <input className="input-inline" value={editMobilePhone} onChange={e => setEditMobilePhone(e.target.value)} />
                    <input className="input-inline" value={editPhone} onChange={e => setEditPhone(e.target.value)} />
                  </>
                ) : (
                  <>
                    <p>{MascaraTelefone(client.mobile_phone)}</p>
                    <p>{MascaraTelefone(client.phone)}</p>
                  </>
                )}
              </td>
              <td>
                {editing === client.id ? (
                  <input className="input-inline" value={editStatus} onChange={e => setEditStatus(e.target.value)} />
                ) : (
                  <span className={`status-pill ${client.status}`}>{client.status}</span>
                )}
              </td>
              <td>
                <div className="action-group">
                  {editing === client.id ? (
                    <>
                      <button onClick={() => saveEdit(client.id)}>Salvar</button>
                      <button onClick={cancelEdit}>Cancelar</button>
                    </>
                  ) : (
                    <button onClick={() => startEdit(client)}>Editar</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
