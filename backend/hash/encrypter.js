import Parser from './util/parser.js'

const COMPENSATOR = 'x'

function encrypt (data) {
  // Eliminamos todos los espacios
  data = data.replace(/\s/g,'')

  // Declaramos las cinco variables hash
  let {H1, H2, H3, H4, H5} = '' 

  // Nos aseguramos de que la longitud de 'data' sea divisible por cinco, compensando si hace falta.
  while (data.length % 5 != 0) {
    data = COMPENSATOR + data
  }

  // obtenemos un número basado en el valor de todos los caracteres de data
  let magicMultiplier = applyFirstEncryptionAlgorithmToWholeData(data)

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
  // convertimos el caracter a número
  const charNumber = Parser.charToNumber(char)

  // aplicamos dos algoritmos de encriptado para un súper cifrado
  const firstEncription = applyFirstEncryptionAlgorithm(charNumber)
  const secondEncription = applySecondEncryptionAlgorithm(firstEncription, magicMultiplier)

  // juntamos ambos cifrados
  result = firstEncription + secondEncription

  // ajustamos la longitud del resultado para que tenga 10 caracteres
  while (result.length < 4) {
    result = result + Parser.numberToLetter(lastTwoDigitsOf(magicMultiplier * result.length))
  }
  while (result.length > 4) {
    result = result.slice(0, -1)
  }
  return result
}

/**
 * Recibe un número y devuelve el resultado de sumarle 1
 * @param {*} number 
 */
function applyFirstEncryptionAlgorithm (number) {
  return number + 1
}

/**
 * Recibe un número. Lo multiplica por 10 y devuelve el valor hexadecimal.
 * @param {*} number 
 */
function applySecondEncryptionAlgorithm(number, magicMultiplier) {
  const value = lastTwoDigitsOf((number * magicMultiplier))
  const hex = Parser.numberToHex(value)
  let result = hex
  if (isWithinAlphabetRange(value)) 
    result = result + Parser.numberToLetter(number)
  return result  
}

function applyFirstEncryptionAlgorithmToWholeData(data) {
  let result = 0
  let index = 0
  while (index <= data.length) {
    const charNumber = Parser.charToNumber(data[index])
    result = result + applyFirstEncryptionAlgorithm(charNumber)
    index ++
  }
  return lastTwoDigitsOf(result * result)
}

function lastTwoDigitsOf (number) {
  return number % 100
}

function isWithinAlphabetRange (number) {
  return number >= 0 && number <= 27 
}

export default { encrypt }