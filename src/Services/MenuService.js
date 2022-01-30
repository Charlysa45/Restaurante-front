import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

const getMenus = async () => {
    const request = axios
    return request
    .get(`${baseUrl}/menus`)
    .then(res => res.data)
    .catch(err => console.error(err))
};

const makeMenu = async ({newMenu}) => {
    const request = axios
    return request
    .post(`${baseUrl}/menus`, newMenu)
    .then(response => response.data)
    .catch(err => console.error(err))
}

const updateMenu = async (restId, newMenu) => {
    const request = axios.put(`${baseUrl}/menus/${restId}`, newMenu)
  
    return request.then(res => res.data).catch(err => console.error(err))
  }

const deleteMenu = async ({restId}) => {
    const request = axios.delete(`${baseUrl}/menus/${restId}`)

    return request.then(res => res.data).catch(err => console.error(err))
    }

export default {getMenus, makeMenu, updateMenu, deleteMenu};
