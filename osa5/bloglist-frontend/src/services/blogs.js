import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return request.then(response => response.data)
}

const remove = (object) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const request = axios.delete(`${baseUrl}/${object.id}`, config)
  return request.then(response => response.data)
}


export default { getAll, create, update, setToken, remove }

