import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

let token = null

const setToken = newToken =>{
  token = `bearer ${newToken}`
}


const getAll = () => {
  const req= axios.get(baseUrl)
  return req.then(res=>res.data)
}

const create = async newObject => {
  const config = {
    headers:{ Authorization: token}
  }
  const response= await axios.post(baseUrl, newObject,config)
  return response.data
}

const update = (id, newObject) => {
  const req= axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res=>res.data)
}

export default { 
   getAll, 
   create, 
   update,
   setToken 
}