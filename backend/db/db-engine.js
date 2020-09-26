import mongoose from 'mongoose'

async function start() {
  const uri = 'mongodb+srv://NeiDB:dni36583721@login-node-4uqxw.mongodb.net/user-registration-hash?retryWrites=true&w=majority'
  console.log(`Connecting to database`)

  try {
      await mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
      mongoose.Model.on('index', function(err) {
          if (err) console.log(err)
        })
      console.log( `Succesfully connected to database`)
  } catch (err) {
      console.log(`Failed to connect to database ${err}`)
  }
}

export default { start }