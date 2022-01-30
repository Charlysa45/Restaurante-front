import React, { useContext, useEffect, useState } from 'react';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import MenuService from '../Services/MenuService';
import ApiContext from './Context/ApiContext';
import FormMenu from './FormMenu';
import { useModal } from './Hooks/useModal';
import Images from './Images';
import Modal from './Modal';
import Loader from './Loader';

const CardMenu = ({restId, restPage, bg, nameRest, menuType, nameMenu, ingredients, price}) => {


    const[isOpenModal, openModal, closeModal] = useModal(false);
    const[isOpenModalDelete, openModalDelete, closeModalDelete] = useModal(false);

    const [activeMessage, setActiveMessage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false);

    var menuTypeString = ''

    if (menuType === 1) {
        menuTypeString = 'Entrada'
    }
    if (menuType === 2) {
        menuTypeString = 'Plato Fuerte'
    }
    if (menuType === 3) {
        menuTypeString = 'Postres'
    }
    if (menuType === 4) {
        menuTypeString = 'Bebidas'
    }

    const handleDelete = async ({restId}) => {
        setActiveMessage(false)
        setLoading(true)

        await MenuService.deleteMenu({restId})
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
        <div>
            <div className={`card ${bg} mb-3`}>
                <div className="card-body">
                    <div className="d-flex bd-highlight">
                        <h3 className="card-title flex-grow-1 bd-highlight">{nameMenu}</h3>
                        <button onClick={openModal} className="btn btn-warning bd-highlight"><AiOutlineEdit/></button>
                        <Modal isOpen={isOpenModal} closeModal={closeModal}>
                            <FormMenu 
                                edit={true}
                                restId={restId}
                                editNameR={nameRest}
                                editMenuT={menuType}
                                editNameM={nameMenu}
                                editIngredients={ingredients}
                                editPrice={price}
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
                    {restPage &&
                        <p className="card-text m-0 fw-bold d-flex">Restaurante: 
                            {nameRest &&
                            <>
                                <p className='ms-1 m-0 fw-normal'>
                                    <Link to={`/restaurantes/${nameRest.map(res=>res.socialReason)}`}>{nameRest.map(res=>res.socialReason)}</Link>
                                </p>
                            </>
                            }
                        </p>
                    }
                    {restPage && <p className="card-text m-0 fw-bold d-flex">Tipo de menú: <p className='ms-1 m-0 fw-normal'>{menuTypeString}</p></p>}
                    <p className="card-text m-0 fw-bold d-flex">Precio: <p className='ms-1 m-0 fw-normal'>${price}</p></p>
                    <p className="card-text m-0 fw-bold">Ingredientes: <small className='ms-1 m-0 fw-normal'>{ingredients.toString()}</small></p>
                </div>
            </div>
        </div>
  </div>;
};

export default CardMenu;

