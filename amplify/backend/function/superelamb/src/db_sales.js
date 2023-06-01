
const readAllSales = async()=>{
  
    const Params = {
      TableName: "vendas",
    }
    try{ 
      const {Items = []}= await dynamodb.scan(Params).promise()
      return{success:true, data: Items}
  
    }catch(error){
      return{success:false, data: null}
  
    }
  
  }
  
  
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
  
  
const deleteSale = async(value,key = "sales_id")=>{
  
    const Params = {
      TableName: "vendas",
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
  
  
const updateSale = async(data = {})=>{
  
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
  
export {
  cadNewSale,
  readAllSales,
  deleteSale,
  updateSale
}
  