

function MascaraTelefone(valor) {
  if (!valor) return ''


  const apenasNumeros = valor.replace(/\D/g, '')

 
  if (apenasNumeros.length < 10) {
    return apenasNumeros
  }

  const telefone = apenasNumeros.slice(0, 11)

  
  if (telefone.length === 11) {
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`
  }

  if (telefone.length === 10) {
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6)}`
  }

  return apenasNumeros
}

export default MascaraTelefone