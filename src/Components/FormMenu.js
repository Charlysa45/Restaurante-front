import React, { useContext, useState } from 'react';
import MenuService from '../Services/MenuService';
import ApiContext from './Context/ApiContext';
import './FormMenu.css'
import { useModal } from './Hooks/useModal';
import Loader from './Loader';

const FormMenu = ({edit, restId, editNameR, editMenuT, editNameM, editIngredients, editPrice}) => {

  const {allRestaurants, allMenus, setAllMenus} = useContext(ApiContext);
  const[isOpenModal, openModal, closeModal] = useModal(false);

    const [restaurant, setRestaurant] = useState(!editNameR ? null : editNameR);
    const [menuType, setMenuType] = useState(!editMenuT ? 0 : editMenuT);
    const [nameMenu, setNameMenu] = useState(!editNameM ? null : editNameM);
    const [ingredients, setIngredients] = useState([]);
    const [price, setPrice] = useState(!editPrice ? null : editPrice);

    const [activeForm, setActiveForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false);

    const [suma, setSuma] = useState(0);

    // const editNewIngredients = () => {
    //   if (ingredients.length == 0) {
    //     setIngredients([...ingredients, editIngredients])
    //     console.log(ingredients)
    //   }
    // }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setActiveForm(false)
        setLoading(true)

        parseInt(menuType)
        parseInt(price)

       let newMenu = {}

        if (ingredients.length == 0) {
          newMenu = {
            restaurant,
            menuType,
            nameMenu,
            ingredients: editIngredients,
            price,
          }
        }else{
          newMenu = {
            restaurant,
            menuType,
            nameMenu,
            ingredients,
            price
          }
        }
        
        if (!edit) {
          await MenuService.makeMenu({newMenu})
          .then(res => {
            setLoading(false)
            setResponse(true)
            setTimeout(() => {
              window.location.reload()
            }, 1500);
            
            console.log(res)
            parseFloat(newMenu.menuType)
            newMenu.restaurant = new Array(allRestaurants.find(res => res.id === restaurant)) 
            setAllMenus([...allMenus, newMenu])
          })
        }else{
          await MenuService.updateMenu(restId, newMenu)
          .then(res =>{
            setLoading(false)
            setResponse(true)
            setTimeout(() => {
                window.location.reload()
              }, 1500);
            })
      }

    }

    
    function sumar(check, valor, ingName){
      if (check === true) {
        var valorInt = parseInt(valor)
        var acumulado = suma+valorInt
        if (acumulado>2000) {
          alert('La suma de calorias no puede ser mayor a 2000')
          setSuma(suma-valorInt)
        }else{
          setIngredients([...ingredients, ingName])
          setSuma(suma+valorInt)
        }
      }else{
        var valorInt = parseInt(valor)
        ingredients.pop()
        setSuma(suma-valorInt)
      }
  }

  return <div>
    {activeForm &&
      <div className="card-body">
          <div className="text-center">
              <h4 className='mt-1 mb-3 pb-1 text-white fw-bold'>Tu Restaurante</h4>
          </div>

          <form onSubmit={handleSubmit} className='px-4'>
              <p className='fw-bold'>Intrese los datos del menú</p>
              <div className="form-outline mb-3">
                {!edit &&
                  <select value={restaurant} className='form-select' onChange={(e) => setRestaurant(e.target.value)} required>
                    <option value={null}>--- Seleccione una opción ---</option>
                      {allRestaurants &&
                          allRestaurants.map(res =>
                            <option value={res.id}>{res.socialReason}</option>
                          )
                      }
                  </select>
                }
                {!edit && <label class="form-label fw-bold" for="form2Example11">Restaurante objetivo</label>}
              </div>
              <div className="form-outline mb-3">
                  {!edit ?
                    <select value={menuType} className='form-select' onChange={(e) => setMenuType(e.target.value)} required>
                        <option value={null}>--- Seleccione una opción ---</option>
                        <option value={1}>Entrada</option>
                        <option value={2}>Plato Fuerte</option>
                        <option value={3}>Postres</option>
                        <option value={4}>Bebidas</option>
                    </select>
                    :
                    <select defaultValue={editMenuT} className='form-select' onChange={(e) => setMenuType(e.target.value)}>
                        <option value={null}>--- Seleccione una opción ---</option>
                        <option value={1}>Entrada</option>
                        <option value={2}>Plato Fuerte</option>
                        <option value={3}>Postres</option>
                        <option value={4}>Bebidas</option>
                    </select>
                    }
                <label class="form-label fw-bold" for="form2Example11">Tipo de Menú</label>
              </div>
              <div className="form-outline mb-3">
                {!edit ?
                  <input type="text" name="nameMenu" class="form-control" onChange={(e) => setNameMenu(e.target.value)} required/>
                  :
                  <input type="text" name="nameMenu" class="form-control" defaultValue={editNameM} onChange={(e) => setNameMenu(e.target.value)}/>
                }
                <label class="form-label fw-bold" for="form2Example11">Nombre del menú</label>
              </div>
              <div className="form-outline mb-3">
                <div className='bg-white text-dark p-2' style={{borderRadius: '10px'}}>
                  <div className="row row-cols-2 fw-bold">
                    <p>Productos</p>
                    <p>Calorias</p>
                  </div>
                  <div className="products row row-cols-2">
                    <div>
                      <input type="checkbox" name=" Sal" value="0" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)}  />
                      <label className='ms-1'>Sal</label><br />
                    </div>
                    <div>
                      <p>0</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Lechuga" value="15" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)} />
                      <label className='ms-1'>Lechuga</label><br />
                    </div>
                    <div>
                      <p>15</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Pollo" value="239" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)} />
                      <label className='ms-1'>Pollo</label><br />
                    </div>
                    <div>
                      <p>239</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Carne" value="143" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)} />
                      <label className='ms-1'>Carne</label><br />
                    </div>
                    <div>
                      <p>143</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Papas-fritas" value="400" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)} />
                      <label className='ms-1'>Papas fritas</label><br />
                    </div>
                    <div>
                      <p>400</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Papas-cocinadas" value="100" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)} />
                      <label className='ms-1'>Papas cocinadas</label><br />
                    </div>
                    <div>
                      <p>180</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Aceite" value="884" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)} />
                      <label className='ms-1'>Aceite</label><br />
                    </div>
                    <div>
                      <p>884</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Lentejas" value="116" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)} />
                      <label className='ms-1'>Lentejas</label><br />
                    </div>
                    <div>
                      <p>116</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Tomate" value="18" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)} />
                      <label className='ms-1'>Tomate</label><br />
                    </div>
                    <div>
                      <p>18</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Cebolla" value="40" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)} />
                      <label className='ms-1'>Cebolla</label><br />
                    </div>
                    <div>
                      <p>40</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Pescado" value="206" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)} />
                      <label className='ms-1'>Pescado</label><br />
                    </div>
                    <div>
                      <p>206</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Leche" value="42" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)}/>
                      <label className='ms-1'>Leche</label><br />
                    </div>
                    <div>
                      <p>42</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Chocolate" value="546" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)}/>
                      <label className='ms-1'>Chocolate</label><br />
                    </div>
                    <div>
                      <p>546</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Huevos" value="155" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)}/>
                      <label className='ms-1'>Huevos</label><br />
                    </div>
                    <div>
                      <p>155</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Limon" value="29" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)}/>
                      <label className='ms-1'>Limon</label><br />
                    </div>
                    <div>
                      <p>29</p>
                    </div>
                    <div>
                      <input type="checkbox" name=" Naranja" value="53" onChange={(e)=> sumar(e.target.checked, e.target.value, e.target.name)}/>
                      <label className='ms-1'>Naranja</label><br />
                    </div>
                    <div>
                      <p>53</p>
                    </div>
                    <div>
                  </div>
                </div>
              </div>
              <div className="row row-cols-2">
                <label className="form-label fw-bold" for="form2Example11">Ingredientes</label>
                <label className='form-label fw-bold' htmlFor="form2Example11">Total Calorias: {suma}</label>
              </div>
              </div>
              <div className="form-outline mb-3">
                <div className="d-flex">
                  {!edit ?
                  <>
                    <label className='fs-4 me-1'>$</label>
                    <input type="number" name="price" class="form-control" min={5} max={500}  step="0.10" onChange={(e) => setPrice(e.target.value)} required/>
                  </>
                    :
                  <>
                    <label className='fs-4 me-1'>$</label>
                    <input type="number" name="price" class="form-control" defaultValue={editPrice} min={5} max={500}  step="0.10" onChange={(e) => setPrice(e.target.value)}/>
                  </>
                  }
                </div>
                <label class="form-label fw-bold" for="form2Example11">Precio</label>
              </div>
              <div className="d-flex justify-content-center mb-4 mt-3">
                <button className='btn btn-success mx-1'>Aceptar</button>
                </div>
          </form>
      </div>
    }
    {loading && <Loader/>}
    {response && 
    <div className="p-5 mt-2 d-flex justify-content-center">
      {!edit ?
        <h2 className='responseMsg text-white'>¡Menú creado con éxito!</h2> 
        :
        <h2 className='responseMsg text-white'>¡Menú editado con éxito!</h2> 

      }
    </div>
    }

  </div>;
};

export default FormMenu;

