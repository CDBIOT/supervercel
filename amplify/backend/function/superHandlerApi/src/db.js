// const express = require('express');
// const app = express();
// const mongoose = require('mongoose')
// //const route = express.Router("./rotas_temps, ./mqtt");
// const awsServerlessExpress = require('aws-serverless-express');
//const app = require('./app');

// /**
//  * @type {import('http').Server}
//  */
// const server = awsServerlessExpress.createServer(app);

// require('dotenv').config()
//const Temps = require('../../..models/temps')
//const User = require('../../..models/user')
// app.use (route)

//Read
//if(process.env.NODE_ENV == "production"){
   // module.exports = 
   //{
// const MONGODB_URI= 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.mvho6.mongodb.net/'
//     +process.env.DB_NAME+'?retryWrites=true&w=majority'
//    // },
//    //{
//     useNewUrlParser: true,
    //useUnifiedTopology: true
    //}
    //}

// mongoose.connect(MONGODB_URI).then(db => 
//         console.log("MongodB conectado com sucesso!", db.connection.host))
        
//         .catch((err) => {
//             console.log("Houve um erro ao se conectar ao mongodB: " + err)
//         })
        
// //Model Temperaturas Dia Mes Ano
// const Temps = mongoose.model('Temps',{
//             //_id: Number,
//             local: String  ,
//             temperatura: Number,
//             dia: Number,
//             mes: Number,
//             ano: Number
//         })
        
//Model User
//Definindo o model
// //Tabela User
// const Person = mongoose.model('Person',{
//           nome: String  ,
//           email: String,
//           senha: String,
//         })
