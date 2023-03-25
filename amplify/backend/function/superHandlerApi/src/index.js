
// const express = require('express');
// const app = express();
// const mongoose = require('mongoose')
// const route = express.Router("./rotas_temps, ./mqtt");

// require('dotenv').config()
//const Temps = require('../../..models/temps')
//const User = require('../../..models/user')
// app.use (route)

// //Read
// //if(process.env.NODE_ENV == "production"){
//    // module.exports = 
//    //{
//     const MONGODB_URI= 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.mvho6.mongodb.net/'
//     +process.env.DB_NAME+'?retryWrites=true&w=majority'
//    // },
//    //{
//     useNewUrlParser: true,
//     //useUnifiedTopology: true
//     //}
//     //}

// mongoose.connect(MONGODB_URI).then(db => 
//         console.log("MongodB conectado com sucesso!", db.connection.host))
        
//         .catch((err) => {
//             console.log("Houve um erro ao se conectar ao mongodB: " + err)
//         })
        
//         //Model Temperaturas Dia Mes Ano
        
//         const Temps = mongoose.model('Temps',{
//             //_id: Number,
//             local: String  ,
//             temperatura: Number,
//             dia: Number,
//             mes: Number,
//             ano: Number
//         })
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    console.log(`EVENT: ${JSON.stringify(event)}`);
    const customerId = event.pathParameters.customerId;
    const customer = {'customerID': customerId, 'customerName': "Customer"+ customerId};

//  //Create temps
// module.exports.create = (event,context,callback) =>{
//     const {local, temperatura, dia, mes, ano } = req.body
//      //const temps = req.params
//         const temps = {local,temperatura, dia, mes, ano}
//          const create_temp = new Temps(req.body);
//          //temps.save()
//          try{
//             Temps.create(temps)
//              temps.save()
//                  console.log(temps)
//                  res.status(201).json({message: "Temperatura inserida"})
//                  }catch(error){
//                  res.status(500).json({error: error})
//              }  
// }

// //Read
// module.exports.create = (event,context,callback) =>{
//  routers.get('/temps', async (req, res) =>{
//          try{
//             const temps = await Temps.find()
//              res.status(200).json({temps})
//          }catch(error){
//              res.status(500).json({error: error})
//          }  
//      })
// }

// module.exports.create = (event,context,callback) =>{
//     context.callbackWaisForEmptyEventLoop = false;
//     return connectToDatabase()
//     .then(() => 
//     User.create(JSON.parse(event.body)))
//     .then(user => callback(null,{
//         statusCode: 200,
//         body: JSON.stringify(user)
//     }))
//     .catch(err => callback(null, {
//         statusCode: err.statusCode || 500,
//         headers:{ 'Comtemt-Type': 'text/plain'},
//         body: 'Could not create the user.'
//     }));

// }
    
// module.exports.post('/produtos',async(req, res) =>{
//      const  produto = {
//         nome: req.body.nome,
//         preco: req.body.preco
//      }
//      res.status(201).send({
//      mensagem: 'inserido',
//      produtoCriado: produto
//      })
//    });
  
//  //Create user
//  routers.post('/user', async (req, res) =>{
//     const {nome, email, senha } = req.body
//     const person = { nome,email,senha }
//     try{
//         await Person.create(person)
//         res.status(201).json({message: "Pessoa inserida com sucesso"})
//     }catch(error){
//         res.status(500).json({error: error})
//     }  
// })
    

    return {
        statusCode: 200,
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*",
         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, X-Content-Type-Options:nosniff, Accept,Authorization",
         "Access-Control-Allow-Methods":"GET, POST, PUT, PATCH, DELETE, OPTIONS"
     }, 
        body: JSON.stringify(customer),
    };
};
