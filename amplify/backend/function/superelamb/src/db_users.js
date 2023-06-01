
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
  
  
const updateUser = async(data = {})=>{
  
   
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
  
  
export {
  cadNewUser,
  readAllUsers,
  deleteUser,
  updateUser
}