import React, { useState } from 'react'
import '../../App.css'

function Filters({ filter, setFilter, searchTerm, setSearchTerm, onSort }) {
  const [sortOrder, setSortOrder] = useState('none') // 'none', 'asc', 'desc'

  const handleFilter = (status) => {
    setFilter(status)
  }

  const handleSort = () => {
    let newOrder = 'none'
    
    if (sortOrder === 'none') {
      newOrder = 'asc'
    } else if (sortOrder === 'asc') {
      newOrder = 'desc'
    } else {
      newOrder = 'none'
    }
    
    setSortOrder(newOrder)
    onSort(newOrder)
  }

  const getSortButtonLabel = () => {
    if (sortOrder === 'asc') return 'A-Z ↑'
    if (sortOrder === 'desc') return 'Z-A ↓'
    return 'Ordenar'
  }

  return (
    <div className="filter-buttons">
      <button 
        className={filter === 'all' ? 'active' : ''} 
        onClick={() => handleFilter('all')}
      >
        Todos
      </button>
      
      <button 
        className={filter === 'active' ? 'active' : ''} 
        onClick={() => handleFilter('active')}
      >
        Ativos
      </button>
      
      <button 
        className={filter === 'inactive' ? 'active' : ''} 
        onClick={() => handleFilter('inactive')}
      >
        Inativos
      </button>

      <button
        className={sortOrder !== 'none' ? 'active' : ''}
        onClick={handleSort}
      >
        {getSortButtonLabel()}
      </button>
      
      <input 
        className='searchBox' 
        type="text" 
        placeholder="Pesquisar por nome, email ou documento" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
      />
    </div>
  )
}

export default Filters
