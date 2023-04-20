
const AWS = require('aws-sdk')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient({

accessKeyId: process.env.accessKey,
secretAccessKey: process.env.secretKey

});


let tableName = "users";

if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// Example get users method 
 

app.get('/users',function(req, res) {
  
  let getItemParams = {
    TableName: "users",
    Key: "user_id"
    
  }

dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });

  res.json({success: 'get call succeed!', url: req.url});

});

app.get('/users/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

 //Get products method 

app.get('/products', function(req, res) {
  
  let getItemParams = {
    TableName: "products",
    Key: "id"
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });
  
  // Add your code here
  res.json({success: 'get call products succeed!', url: req.url});

});

 //Get vendas method 

app.get('/vendas', function(req, res) {
  
  let getItemParams = {
    TableName: "vendas",
    Key: "salesid"
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });
  

  // Add your code here
  res.json({success: 'get call  vendas succeed!', url: req.url});

});

/****************************
* Example post method *
****************************/

app.post('/users', function(req, res) {
  
  let putItemParams = {  
    tableName: "users",
    Key: "user_id",
    user_id: req.body.user_id,
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  }
 dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'post call succeed!', url: req.url, data: data})
    }
  });
});

app.post('/users/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

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

app.put('/users/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

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

app.delete('/users/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/products', async function(req, res) {
  
  let postItemParams = {  
    tableName: "products",
    Key: "id",
    product: req.body.product,
    marca: req.body.marca,
    price: req.body.price
  }
 await dynamodb.put(postItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'post call succeed!', url: req.url, data: data})
    }
  });
});

app.post('/users/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});
app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
