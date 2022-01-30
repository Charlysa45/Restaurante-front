import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Images from './Images';
import './CardRest.css'
import Modal from './Modal';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { useModal } from './Hooks/useModal';
import Loader from './Loader';
import MenuService from '../Services/MenuService';
import FormRest from './FormRest';
import RestService from '../Services/RestService';

const CardRest = ({restId, socialReason, name, restType, city, hourOpen, hourClose}) => {

    const [type, setType] = useState('');

    const[isOpenModal, openModal, closeModal] = useModal(false);
    const[isOpenModalDelete, openModalDelete, closeModalDelete] = useModal(false);


    const [activeMessage, setActiveMessage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false);

    
    useEffect(() => {
        handleType(restType)
    }, [restType]);
    
    
    const handleType = () => {
        if (restType == 1) {
            setType('Vegano')
        }else if(restType == 2){
            setType('Vegetariano')
        }else if(restType == 3){
            setType('Carnes Rojas')
        }else if(restType == 4){
            setType('Aves, Pescados & Mariscos')
        }
    }

    const handleDelete = async ({restId}) => {
        setActiveMessage(false)
        setLoading(true)

        await RestService.deleteRestaurant({restId})
        .then(res => {
            setLoading(false)
            setResponse(true)
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        })
        .catch(err =>console.error(err))
    }

  return <div>
        <div className="Rest-cards card mb-3">
                <div className="card-body">
                    <div className="d-flex bd-highlight">
                    <Link to={`${socialReason}`} className='restLink card-title flex-grow-1 bd-highlight m-0'><h3>{socialReason}</h3></Link>
                    <button onClick={openModal} className="btn btn-success bd-highlight"><AiOutlineEdit/></button>
                        <Modal isOpen={isOpenModal} closeModal={closeModal}>
                            <FormRest
                                edit={true}
                                restId={restId}
                                editSocialR={socialReason}
                                editName={name}
                                editRestT={restType}
                                editCity={city}
                                editHourO={hourOpen}
                                editHourC={hourClose}
                            />
                        </Modal>
                        <button onClick={openModalDelete} className="btn btn-danger ms-1 bd-highlight"><AiFillDelete/></button>
                        <Modal isOpen={isOpenModalDelete} closeModal={closeModalDelete}>
                            <div>
                                {activeMessage &&
                                <>
                                    <h4>¿Está seguro de eliminar este menú?</h4>
                                    <div className="d-flex justify-content-center">
                                        <button onClick={() => handleDelete({restId})} className='btn btn-success m-1'>Aceptar</button>
                                        <button onClick={closeModalDelete} className='btn btn-danger m-1'>Cancelar</button>
                                    </div>
                                </>
                                }
                                {loading && <Loader/>}
                                {response && <h4>¡Menú eliminado con éxito!</h4>}
                            </div> 
                        </Modal>
                    </div>
                    <p className='card-subtitle fw-bold d-flex mb-0'>Nombre Comercial: <p className='fw-normal ms-1 mb-0'>{name}</p></p>
                    <p className='card-subtitle fw-bold d-flex mb-0'>Ciudad: <p className='fw-normal ms-1 mb-0'>{city}</p></p>
                    <p className='card-subtitle fw-bold d-flex mb-0'>Tipo de restaurante: <p className='fw-normal ms-1 mb-0'>{type}</p></p>
                    <p className='card-subtitle fw-bold d-flex mb-0'>Hora de apertura: <p className='fw-normal ms-1 mb-0'>{hourOpen}</p></p>
                    <p className='card-subtitle fw-bold d-flex mb-0'>Hora de cierre: <p className='fw-normal ms-1 mb-0'>{hourClose}</p></p>
                    <p className='card-subtitle fw-bold d-flex mb-0'>Menús: <p className='restLink'><Link to={`${socialReason}`} className='restLink fw-normal ms-1'>Click Aqui</Link></p></p>
                </div>
        </div>
  </div>;
};

export default CardRest;
