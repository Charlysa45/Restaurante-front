import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

const getRestaurant = async () => {
    const request = axios
    return request
    .get(`${baseUrl}/restaurantes`)
    .then(response => response.data)
    .catch(err => console.error(err))
}

const makeRestaurant = async ({newRest}) => {
    const request = axios
    return request
    .post(`${baseUrl}/restaurantes`, newRest)
    .then(response => response.data)
    .catch(err => console.error(err))
}

const updateRestaurant = async ({restId, newRest}) => {
    const request = axios.put(`${baseUrl}/restaurantes/${restId}`, newRest)
  
    return request.then(res => res.data).catch(err => console.error(err))
  }

const deleteRestaurant = async ({restId}) => {
    const request = axios.delete(`${baseUrl}/restaurantes/${restId}`)

    return request.then(res => res.data).catch(err => console.error(err))
}


export default {getRestaurant, makeRestaurant, updateRestaurant, deleteRestaurant}