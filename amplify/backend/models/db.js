const mongoose = require('mongoose')
let isConnected;

mongoose.Promise = global.Promise;

//MONGODB_URI: process.env.MONGODB_URI
//MONGODB_URI =  'mongodb+srv://'+process.env.MONGODB_URI+':'+process.env.DB_PASS+'@cluster0.mvho6.mongodb.net/'
//+process.env.DB_NAME+'?retryWrites=true&w=majority'
//const MONGODB_URI = db.MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI

//MONGODB_URI: 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.mvho6.mongodb.net/'
//+process.env.DB_NAME+'?retryWrites=true&w=majority'

//Configuração do mongoose
module.exports = connectToDatabase = ()=> {
if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
}
console.log('=> using new database connection')
return mongoose.connect(process.env.MONGODB_URI)
.then(db=>{
    isConnected = db.connections[0].readyState;
} );

}


// //try{
// mongoose.connect(MONGODB_URI).then(db => 
// console.log("MongodB conectado com sucesso!", db.connection.host))

// .catch((err) => {
//     console.log("Houve um erro ao se conectar ao mongodB: " + err)
// })
