

function MascaraCpf(valor) {
  if (!valor) return ''
  
  
  const apenasNumeros = valor.replace(/\D/g, '')
  
  
  const cpf = apenasNumeros.slice(0, 11)
  

  return cpf
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
}

export default MascaraCpf
