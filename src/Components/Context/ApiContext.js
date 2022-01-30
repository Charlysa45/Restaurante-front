import { createContext, useEffect, useState } from 'react';
import MenuService from '../../Services/MenuService';
import RestService from '../../Services/RestService';

const ApiContext = createContext();

const ApiProvider = ({children}) => {

    const [allRestaurants, setAllRestaurants] = useState([]);
    const [allMenus, setAllMenus] = useState([]);

    useEffect(() => {
        RestService.getRestaurant()
        .then(res => {
            setAllRestaurants(res)
        })
        MenuService.getMenus()
        .then(res => {
            setAllMenus(res)
        })
    }, []);
    
    const data={allRestaurants, setAllRestaurants, allMenus, setAllMenus}

    return <ApiContext.Provider value={data}>{children}</ApiContext.Provider>
}
export {ApiProvider}
export default ApiContext;
