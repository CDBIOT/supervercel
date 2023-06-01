
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
  
  
const deleteProduct = async(value,key = "id")=>{
  
    const Params = {
      TableName: "products",
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
  
  
const updateProduct = async(data = {})=>{
  
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
  
export {
  cadNewProduct,
  readAllProducts,
  deleteProduct,
  updateProduct
}