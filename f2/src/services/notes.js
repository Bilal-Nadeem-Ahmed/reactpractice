import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/notes'
const baseUrl = 'https://agile-bayou-94903.herokuapp.com/api/notes'

const getAll = () => {
  const req= axios.get(baseUrl)
  return req.then(res=>res.data)
}

const create = newObject => {
  const req= axios.post(baseUrl, newObject)
  return req.then(res=>res.data)
}

const update = (id, newObject) => {
  const req= axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res=>res.data)
}

export default { 
   getAll, 
   create, 
   update 
}