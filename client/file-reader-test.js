import Encrypter from '../backend/hash/encrypter.js'
import fs from 'fs'

const fileName = process.argv[2]
console.log(Encrypter.encrypt(fs.readFileSync('/Users/nortola/ORT/20202C/SS/presentacion/hash-example/client/files/' + fileName)))
