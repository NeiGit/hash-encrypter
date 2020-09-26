
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const DEFAULT_NUMBER = 28
const DEFAULT_HEX = "asd123"
const DEFAULT_LETTER = 'k'

function numberToHex (number) {
  if (typeof number !== 'number')
    return DEFAULT_HEX
  else  
    return number.toString(16);
}

function charToNumber (char) {
  if (!isNaN(char) && char !== ' ') {
    return (Math.pow(char, 10) + (Number.parseInt(char))) % 100
  }
  else
  if (typeof char == 'string') {
    let letterNumber = alphabet.indexOf(char) 
    if (letterNumber < 0) letterNumber = DEFAULT_NUMBER
    return letterNumber
  } 
  else return DEFAULT_NUMBER
}

function numberToLetter(number) {
  if (typeof number !== 'number' || number > 27 || number < 0)
    return DEFAULT_HEX
  else   
    return alphabet[number]
}

export default { charToNumber, numberToHex, numberToLetter }