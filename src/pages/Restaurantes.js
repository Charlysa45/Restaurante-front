import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Images from '../Components/Images';
import './Restaurantes.css'
import {AiOutlinePlus} from 'react-icons/ai'
import CardRest from '../Components/CardRest';
import { useModal } from '../Components/Hooks/useModal';
import Modal from '../Components/Modal';
import FormRest from '../Components/FormRest';
import ApiContext from '../Components/Context/ApiContext';

const Restaurantes = () => {

    const[isOpenModal, openModal, closeModal] = useModal(false);
    const {allRestaurants} = useContext(ApiContext);

  return <div>

      <div className="container py-5">
      <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/" className='link-success' style={{textDecoration:'none'}}>Inicio</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Restaurantes</li>
            </ol>
        </nav>

          <h1>Restaurantes 🍽</h1>
          <hr className='barra-rest' />

            <button onClick={openModal} className='btn btn-success mb-3'>
                <div className="row">
                    <div className="col-3">
                        <div className="newRest-user-card">
                            <AiOutlinePlus size={65}/>
                        </div>
                    </div>
                    <div className="col-9 mx-0 d-flex align-items-center">
                        <div className="newRest-title">    
                            <h5>Añadir nuevo restaurante.</h5>
                        </div>    
                    </div>
                </div>
            </button>

            <Modal isOpen={isOpenModal} closeModal={closeModal}>
                <FormRest/>
            </Modal>

        <div className="restCards row row-cols-3">
            {allRestaurants && 
                allRestaurants.map(res =>
                    <CardRest
                        key={res.id}
                        restId={res.id}
                        socialReason={res.socialReason}
                        name={res.name}
                        restType={res.restType}
                        city={res.city}
                        hourOpen={res.hourOpen}
                        hourClose={res.hourClose}
                    />
                )
            }
        </div>
      </div>
  </div>;
};

export default Restaurantes;
