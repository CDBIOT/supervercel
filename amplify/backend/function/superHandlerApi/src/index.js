

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    console.log(`EVENT: ${JSON.stringify(event)}`);
    const customerId = event.pathParameters.customerId;
    const customer = {'customerID': customerId, 'customerName': "Customer"+ customerId};


//  //Create temps
//  routers.post('/temps', async (req, res) =>{
//     const {local, temperatura, dia, mes, ano } = req.body
//        // const temps = req.params
//     const temps = {local,temperatura, dia, mes, ano}
//     const create_temp = new Temps(req.body);
//     //temps.save()
//         try{
//             await Temps.create(temps)
//             //temps.save()
//             console.log(temps)
//             res.status(201).json({message: "Temperatura inserida"})
//             }catch(error){
//             res.status(500).json({error: error})
//         }  
//     })
    
    
    //Read
    // routers.get('/temps', async (req, res) =>{
    //     try{
    //        const temps = await Temps.find()
    //         res.status(200).json({temps})
    //     }catch(error){
    //         res.status(500).json({error: error})
    //     }  
    // })
    




    
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"



     }, 
        body: JSON.stringify(customer),
    };
};
