export function formatedDate(date) {
  let formatedDate = new Date(date)
  const day = formatedDate.getDate().toString().padStart(2, '0')
  const month = (formatedDate.getMonth() + 1).toString().padStart(2, '0')
  const yaer = formatedDate.getFullYear()

  formatedDate = `${Number(day) + 1 < 10 ? `0${Number(day) + 1}` : `${Number(day) + 1}`}/${month}/${yaer}`
  return formatedDate
}

export function formatedValue(value) {
  return value
    ? (value / 100).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
    : 'R$ 0,00'
}

export function formatedCpf(cpf) {
  return cpf ? cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4') : null
}

export function formatedPhone(phone) {
  return phone ? phone.replace(/^(\d{2})(\d)(\d{4})(\d{4})$/, '($1) $2 $3-$4') : null
}

export function formatedZipCode(zipCode) {
  return zipCode ? zipCode.replace(/^(\d{5})(\d{3})$/, '$1-$2') : null
}

export function formatedValueInputBRL(value) {
  if (value.indexOf('0') === 0 && value.length >= 4) {
    value = value.replace('0', '')
  }

  const integerPart = value.slice(0, -2)
  const decimalPart = value.slice(-2)

  let formatedNumber = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart
  while (formatedNumber.length <= 3) {
    formatedNumber = `0${formatedNumber}`
  }
  return formatedNumber
}
