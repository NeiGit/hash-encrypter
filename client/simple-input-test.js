import Encrypter from '../backend/hash/encrypter.js'
import fs from 'fs'


console.log(Encrypter.encrypt(fs.readFileSync('/Users/nortola/ORT/20202C/SS/presentacion/hash-example/long-text')))
console.log(Encrypter.encrypt('Hola'))