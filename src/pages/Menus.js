import React, { useContext, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CardMenu from '../Components/CardMenu';
import ApiContext from '../Components/Context/ApiContext';
import FormMenu from '../Components/FormMenu';
import { useModal } from '../Components/Hooks/useModal';
import Modal from '../Components/Modal';

const Menus = () => {

    const[isOpenModal, openModal, closeModal] = useModal(false);
    const {allMenus} = useContext(ApiContext);
    console.log(allMenus)
          

  return <div className='container py-5'>

    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="/" style={{textDecoration:'none', color:'orange'}}>Inicio</Link></li>
            <li class="breadcrumb-item active" aria-current="page">Menús</li>
        </ol>
    </nav>

    <h1>Menús📜</h1>
    <hr className='barra-menus' />

    <button onClick={openModal} className='btn btn-warning mb-3'>
        <div className="row">
            <div className="col-3">
                <div className="newRest-user-card">
                    <AiOutlinePlus size={65}/>
                </div>
            </div>
            <div className="col-9 mx-0 d-flex align-items-center">
                <div className="newRest-title">    
                    <h5>Añadir nuevo menú</h5>
                </div>    
            </div>
        </div>
    </button>

    <Modal isOpen={isOpenModal} closeModal={closeModal}>
        <FormMenu/>
    </Modal>
    <div className="menuCards row row-cols-3">
        {allMenus &&
            allMenus.map(res =>
                <CardMenu
                    key={res.id}
                    restId={res.id}
                    restPage={true}
                    nameRest={res.restaurant}
                    menuType={res.menuType}
                    nameMenu={res.nameMenu}
                    ingredients={res.ingredients}
                    price={res.price}
                />
                )
        }
    </div>
  </div>;
};

export default Menus;
