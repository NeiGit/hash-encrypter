import Encrypter from '../../backend/hash/encrypter.js'
import DbEngine from '../../backend/db/db-engine.js'
import User from '../../backend/db/user-dao.js'

async function register (name, password) {
  // nos conectamos a la base
  await DbEngine.start()

  // creamos un usuario nuevo
  const user = new User()
  user.name = name
  user.password = Encrypter.encrypt(password) // Encriptamos la constraseña!
  await user.save() // persistimos al usuario en la base

  console.log(name + ' registrado!')
}

register(process.argv[2], process.argv[3])