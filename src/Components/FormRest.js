import React, { useContext, useState } from 'react';
import RestService from '../Services/RestService';
import ApiContext from './Context/ApiContext';
import Loader from './Loader';

const FormRest = ({edit, restId, editSocialR, editName, editRestT, editCity, editHourO, editHourC}) => {
  
  const {allRestaurants, setAllRestaurants} = useContext(ApiContext);

    const [socialReason, setSocialReason] = useState(!editSocialR ? null : editSocialR);
    const [name, setName] = useState(!editName ? null : editName);
    const [restType, setRestType] = useState(!editRestT ? 0 : editRestT);
    const [city, setCity] = useState(!editCity ? null : editCity);
    const [hourOpen, setHourOpen] = useState(!editHourO ? null : editHourO);
    const [hourClose, setHourClose] = useState(!editHourC ? null : editHourC);

    const [activeForm, setActiveForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActiveForm(false)
        setLoading(true)

        parseInt(restType)

        const newRest = {
            socialReason,
            name,
            restType,
            city,
            hourOpen,
            hourClose
        }

        if (!edit) {
          await RestService.makeRestaurant({newRest})
          .then(res => {
            setLoading(false)
            setResponse(true)
            setTimeout(() => {
              window.location.reload()
            }, 1500);
            setAllRestaurants([...allRestaurants, newRest])
          })
          .catch(err => console.error(err))
        }else{
          await RestService.updateRestaurant({restId, newRest})
          .then(res => {
            setLoading(false)
            setResponse(true)
            setTimeout(() => {
              window.location.reload()
            }, 1500);
          })
        }
    }

  return <div>
    {activeForm &&
      <div className="card-body">
          <div className="text-center">
              <h4 className='mt-1 mb-3 pb-1 text-white fw-bold'>Tu Restaurante</h4>
          </div>

          <form onSubmit={handleSubmit} className='px-4'>
              <p className='fw-bold'>Intrese los datos del restaurante</p>
              <div className="form-outline mb-3">
                <input type="text" name="socialReason" class="form-control" defaultValue={editSocialR} onChange={(e) => setSocialReason(e.target.value)}/>
                <label class="form-label fw-bold" for="form2Example11">Razón social</label>
              </div>
              <div className="form-outline mb-3">
                <input type="text" name="nameRest" class="form-control" defaultValue={editName} onChange={(e) => setName(e.target.value)}/>
                <label class="form-label fw-bold" for="form2Example11">Nombre comercial</label>
              </div>
              <div className="form-outline mb-3">
                <select value={restType} className='form-select' defaultValue={editRestT} onChange={(e) => setRestType(e.target.value)}>
                    <option value={null}>--- Seleccione una opción ---</option>
                    <option value={1}>Vegano</option>
                    <option value={2}>Vegetariano</option>
                    <option value={3}>Carnes Rojas</option>
                    <option value={4}>Aves</option>
                </select>
                <label class="form-label fw-bold" for="form2Example11">Tipo de restaurante</label>
              </div>
              <div className="form-outline mb-3">
                <select value={city} className='form-select' defaultValue={editCity} onChange={(e) => setCity(e.target.value)}>
                    <option value={null}>--- Seleccione una opción ---</option>
                    <option value="Bogotá D.C">Bogotá D.C</option>
                    <option value="Medellín">Medellín</option>
                    <option value="Cali">Cali</option>
                    <option value="Bucaramanga">Bucaramanga</option>
                    <option value="Tunja">Tunja</option>
                    <option value="Ibagué">Ibagué</option>
                    <option value="Barranquilla">Barranquilla</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Pasto">Pasto</option>
                    <option value="Pereira">Pereira</option>
                </select>
                <label class="form-label fw-bold" for="form2Example11">Ciudad de ubicación</label>
              </div>
              <div className="form-outline mb-3">
                <input type="time" name="hourOpen" class="form-control" defaultValue={editHourO} onChange={(e) => setHourOpen(e.target.value)}/>
                <label class="form-label fw-bold" for="form2Example11">Hora de apertura</label>
              </div>
              <div className="form-outline mb-3">
                <input type="time" name="hourClose" class="form-control" defaultValue={editHourC} onChange={(e) => setHourClose(e.target.value)}/>
                <label class="form-label fw-bold" for="form2Example11">Hora de cierre</label>
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
      <h2 className='responseMsg text-white'>¡Restaurante creado con éxito!</h2> 
    </div>
    }
  </div>;
};

export default FormRest;
