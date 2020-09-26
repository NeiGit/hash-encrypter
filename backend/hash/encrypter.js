import Parser from './util/parser.js'

function encrypt (data) {
  // Primero preparamos la información
    // Nos aseguramos de que la longitud de 'data' sea divisible por cinco, compensando si hace falta.
    while (data.length % 5 != 0) {
      data = 'x' + data
    }

    // obtenemos un número que implique el valor de todos los caracteres de data
    let magicMultiplier = getMagicMultiplier(data)

  // Encriptamos!  

    // Declaramos las cinco variables hash
    let {H1, H2, H3, H4, H5} = '' 

    // Recorremos data en iteraciones de cinco pasos. En cada iteración actualizamos el valor de H1, H2, H3, H4, H5
    let i = 0
    while (i + 5 <= data.length) {
      H1 = encryptChar(data[i], magicMultiplier)
      H2 = encryptChar(data[i + 1], magicMultiplier)
      H3 = encryptChar(data[i + 2], magicMultiplier)
      H4 = encryptChar(data[i + 3], magicMultiplier)
      H5 = encryptChar(data[i + 4], magicMultiplier)

      i += 5
    }
    return H1 + H2 + H3 + H4 + H5
}

function encryptChar (char, magicMultiplier) {
  let result = ''

  // aplicamos dos algoritmos de encriptado para un súper cifrado
  const firstEncription = applyFirstEncryptionAlgorithm(char)
  const secondEncription = applySecondEncryptionAlgorithm(firstEncription, magicMultiplier)

  // juntamos ambos cifrados
  result = firstEncription + secondEncription

  // ajustamos la longitud del resultado para que tenga 4 caracteres
  // en caso de necesitar agregar caracteres obtenemos una letra y la agregamos
  while (result.length < 4) {
    result = result + Parser.numberToLetter(lastTwoDigitsOf(magicMultiplier * result.length) % 100)
  }
  while (result.length > 4) {
    result = result.slice(0, -1)
  }
  return result
}

/**
 * Aplica el algoritmo 1 a todos los caracteres de la entrada. 
 * Devuelve los últimos dos dígitos del producto de la suma de cada caracter encriptado.
 * @param {*} data 
 */
function getMagicMultiplier(data) {
  let result = 0
  let index = 0
  while (index <= data.length) {
    const charNumber = Parser.charToNumber(data[index])
    result = result + applyFirstEncryptionAlgorithm(charNumber)
    index ++
  }
  return lastTwoDigitsOf(result * result)
}

/**
 * Recibe un caracter, lo convierte en número y devuelve el resultado de sumarle 1
 * @param {*} number 
 */
function applyFirstEncryptionAlgorithm (char) {
  return Parser.charToNumber(char) + 1
}

/**
 * Recibe dos números. 
 * Obtiene los últimos dos dígitos del producto de ambos y luego el valor hexadecimal de esos dos dígitos. 
 * Agrega al resultado la letra que le corresponde al producto, siempre y cuando esté dentro del rango del alfabeto (27)
 * @param {*} number 
 */
function applySecondEncryptionAlgorithm(number, magicMultiplier) {
  const value = lastTwoDigitsOf((number * magicMultiplier))
  const hex = Parser.numberToHex(value)
  let result = hex
  if (value <= 27) 
    result = result + Parser.numberToLetter(number)
  return result  
}

function lastTwoDigitsOf (number) {
  return number % 100
}


export default { encrypt }