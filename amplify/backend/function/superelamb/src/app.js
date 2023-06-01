
const AWS = require('aws-sdk')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

//const db_users = require("./db_users.js")
//const db_sales = require("./db_sales.js")
//const db_products = require("./db_products.js")
//const cors = require('cors')

AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient({

//region: 'sa-east-1',
//accessKeyId: process.env.accessKey,
//secretAccessKey: process.env.secretKey

});


let tableName = "users";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
 }
// let tableProduct = "products"
// if (process.env.ENV && process.env.ENV !== "NONE") {
//   tableProduct = tableProduct + '-' + process.env.ENV;
// }

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  
  next()
});
//app.use(cors());
//app.use(cors({credentials: true, origin: 'http://localhost:5003'}));

// Example get users method 

const readAllUsers = async()=>{
  
  const Params = {
    TableName: "users",
  }
  try{ 
    const {Items = []}= await dynamodb.scan(Params).promise()
    return{success:true, data: Items}

  }catch(error){
    return{success:false, data: null}

  }

}


app.get('/users',async function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  const { success, data } = await readAllUsers()

  if(success){
      return res.json({success, data})
  }
  return res.status(500).json({success:false, messsage: "Error"})
  
});

app.get('/users/*', function(req, res) {
  res.json({success: 'get call succeed!', url: req.url});
});

 //Get products method 
 const readAllProducts = async()=>{
  
  const Params = {
    TableName: "products",
  }
  try{ 
    const {Items = []}= await dynamodb.scan(Params).promise()
    return{success:true, data: Items}

  }catch(error){
    return{success:false, data: null}

  }

}


app.get('/products', async(req, res)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");

  const { success, data } = await readAllProducts()

  if(success){
      return res.json({success, data})
  }
  return res.status(500).json({success:false, messsage: "Error"})
  
});
  
  
const readAllSales = async()=>{
  
  try{ 
    const {Items = []}= await dynamodb.scan(Params).promise()
    return{success:true, data: Items}

  }catch(error){
    return{success:false, data: null}

  }

}


 //Get vendas method 

app.get('/vendas', async(req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { success, data } = await readAllSales()

  if(success){
      return res.json({success, data})
  }
  return res.status(500).json({success:false, messsage: "Error"})
  
});
  

/* Post users */

  
const cadNewUser = async(data = {})=>{
  
  const Params = {
    TableName: "users",
    Item: data
  }
  try{ 
    await dynamodb.put(Params).promise()
    return{success:true}

  }catch(error){
    return{success:false}

  }

}

app.post('/users', async(req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  //  {
  //   data.user_id = parseInt(req.body['user_id']),
  //   data.nome = req.body['nome'],
  //   data.email = req.body['email'],
  //   data.senha = req.body['senha']
  // }
 
  const {success, data} = await cadNewUser(req.body)
  
  if(success){
    return res.json({success, data})
}

return res.status(500).json({success: false, message: 'Error'})
})

/* Post products */
 
const cadNewProduct = async(data = {})=>{
  
  const Params = {
    TableName: "products",
    Item: data
  }
  try{ 
    await dynamodb.put(Params).promise()
    return{success:true}

  }catch(error){
    return{success:false}

  }

}

app.post('/products', async(req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
 
  // let postItemParams = {  
  //   TableName: "products",
  //   Key: "id",
  //   Item: { 
  //   id:req.body.id,
  //   product: req.body.product,
  //   marca: req.body.marca,
  //   qtd: parserInt(req.body.qtd),
  //   price: parseInt(req.body.price)
   
  //   }
  // }
  const {success, data} = await cadNewProduct(req.body)
  
  if(success){
    return res.json({success, data})
}

return res.status(500).json({success: false, message: 'Error'})
})

/* Post vendas */

const cadNewSale = async(data = {})=>{
  
  const Params = {
    TableName: "vendas",
    Item: data
  }
  try{ 
    await dynamodb.put(Params).promise()
    return{success:true}

  }catch(error){
    return{success:false}

  }

}

app.post('/vendas', async function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  // let postItemParams = {  
  //   TableName: "vendas",
  //   Key: "id",
  //   Item: {
  //   sales_id: req.body.sales_id,
  //   product: req.body.product,
  //   price: req.body.price,
  //   total: req.body.total
  //   }
  // }
  const {success, data} = await db_sales.cadNewSale(req.body)
  
  if(success){
    return res.json({success, data})
}

return res.status(500).json({success: false, message: 'Error'})
})


/****************************
* Example put method *
****************************/

app.put('/users', function(req, res) {
  
app.put(path, function(req, res) {

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else{
      res.json({ success: 'put call succeed!', url: req.url, data: data })
    }
  });
});
});

app.put('/users/:id', async(req, res) => {
  const user = req.body
    const { id } = req.params
    user.id = parseInt(id)

    const { success, data } = await cadNewUser(user)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


/****************************
* Example delete method *
****************************/

const deleteUser = async(value, key = 'user_id')=>{
  
  const Params = {
    TableName: "users",
    Key: {
      [key]:parseInt(value)
    }
  }
  try{ 
    await dynamodb.delete(Params).promise()
    return{success:true}

  }catch(error){
    return{success:false}

  }

}

app.delete('/users', function(req, res) {

  let removeItemParams = {
    TableName: "users",
    Key: id
  }
  dynamodb.delete(removeItemParams, (err, data)=> {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: data});
    }
  });
});

app.delete('/users/*', async(req, res) => {
  const { id } = req.params
  const { success, data } = await deleteUser(id)
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error'})
})


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
