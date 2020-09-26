import Encrypter from '../../backend/hash/encrypter.js'
import DbEngine from '../../backend/db/db-engine.js'
import User from '../../backend/db/user-dao.js'

async function login (name, password) {
  // nos conectamos a la base
  await DbEngine.start()

  // buscamos al usuario por nombre y contraseña encriptada, ya que así está guardada en la base
  password = Encrypter.encrypt(password)
  const user = await User.find({name: name, password: password})
  if (user.length) {
    console.log('Bienvenido ' + name)
  } else {
    console.log('Datos incorrectos')
  }
}  
  
login(process.argv[2], process.argv[3]);