const mongoose = require('mongoose');

module.exports = (url, port,name) => {
  mongoose.Promise = global.Promise;
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${url}:${port}/${name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }).then(() => resolve(console.log('db is connect')))
      .catch(err => reject(console.log(err)))
  })
}